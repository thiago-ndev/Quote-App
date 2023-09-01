from django.contrib import messages
from django.shortcuts import render, redirect
from django.views.generic import TemplateView
import boto3
import pandas as pd
from io import BytesIO
import csv
import math
from user_agents import parse
from scipy.stats import norm
import hmac
import json
import hashlib
from pandas_market_calendars import get_calendar
import base64
from django.conf import settings
from pycognito import Cognito
from pycognito.exceptions import ForceChangePasswordException
import traceback
from cognitojwt import decode
import requests


class UserAccessMixin:
    def dispatch(self, request, *args, **kwargs):
        try:
            claims = decode(
                token=self.request.session.get("access_token"),
                region="us-east-1",
                userpool_id=settings.AWS_POOL_ID,
                app_client_id=settings.AWS_CLIENT_ID,
            )

            if "cognito:groups" in claims.keys():
                request.session["group"] = claims["cognito:groups"]
            else:
                request.session["group"] = []
        except Exception as e:
            return redirect("forbidden/")

        return super(UserAccessMixin, self).dispatch(request, *args, **kwargs)


def create_user_and_add_to_group(user_pool_id, username, administrative):
    # Create a Cognito Identity Provider client
    if settings.AWS_ACCESS_KEY != "" and settings.AWS_SECRET_KEY != "":
        cognito = boto3.client(
            "cognito-idp",
            region_name="us-east-1",
            aws_access_key_id=settings.AWS_ACCESS_KEY,
            aws_secret_access_key=settings.AWS_SECRET_KEY,
        )
    else:
        cognito = boto3.client("cognito-idp", region_name="us-east-1")

    # Create the user in the user pool
    response = cognito.admin_create_user(
        UserPoolId=user_pool_id,
        Username=username,
        UserAttributes=[
            {"Name": "email", "Value": username},
            {"Name": "email_verified", "Value": "True"},
        ],
        DesiredDeliveryMediums=["EMAIL"],
        ForceAliasCreation=True,
    )

    # Get the user's username and sub (subject) attributes
    user_username = response["User"]["Username"]
    user_sub = response["User"]["Attributes"][0]["Value"]

    # Add the user to the group
    if administrative == "true":
        cognito.admin_add_user_to_group(
            UserPoolId=user_pool_id, Username=user_username, GroupName="adm-users"
        )


def delete_cognito_user(username):
    if settings.AWS_ACCESS_KEY != "" and settings.AWS_SECRET_KEY != "":
        cognito = boto3.client(
            "cognito-idp",
            region_name="us-east-1",
            aws_access_key_id=settings.AWS_ACCESS_KEY,
            aws_secret_access_key=settings.AWS_SECRET_KEY,
        )
    else:
        cognito = boto3.client("cognito-idp", region_name="us-east-1")

    try:
        response = cognito.admin_delete_user(
            UserPoolId=settings.AWS_POOL_ID, Username=username
        )
        print("User deleted successfully:", response)
        return True
    except Exception as e:
        print("Error deleting user:", e)
        return False


def calculate_business_days(date):
    # Configurar o calendário brasileiro
    brasil_calendar = get_calendar("BMF")

    # Definir a data de início e fim
    start_date = pd.Timestamp.now(tz="UTC")
    end_date = pd.Timestamp(date, tz="UTC")

    # Calcular os dias úteis
    business_days = brasil_calendar.valid_days(start_date=start_date, end_date=end_date)

    # Contar o número de dias úteis
    num_business_days = len(business_days)

    return num_business_days


def black_scholes(S, K, T, r, sigma, option_type):
    """
    Calculate the theoretical price of a European option using the Black-Scholes formula.

    Parameters:
        S (float): Current price of the underlying asset.
        K (float): Strike price of the option.
        T (float): Time to expiration in years.
        r (float): Risk-free interest rate.
        sigma (float): Volatility of the underlying asset.
        option_type (str): Option type, either 'call' or 'put'.

    Returns:
        float: Theoretical price of the option.
    """
    d1 = (math.log(S / K) + (r + 0.5 * sigma**2) * T) / (sigma * math.sqrt(T))
    d2 = d1 - sigma * math.sqrt(T)

    if option_type == "CALL":
        price = S * norm.cdf(d1) - K * math.exp(-r * T) * norm.cdf(d2)
    elif option_type == "PUT":
        price = K * math.exp(-r * T) * norm.cdf(-d2) - S * norm.cdf(-d1)
    else:
        raise ValueError("Invalid option type. Must be 'call' or 'put'.")

    return price


class LogInView(TemplateView):
    template_name = "login.html"

    def post(self, request, **kwargs):
        context = self.get_context_data(**kwargs)

        username = self.request.POST.get("email").replace(" ", "")
        password = self.request.POST.get("password")
        user_info = None
        try:
            if settings.AWS_ACCESS_KEY != "" and settings.AWS_SECRET_KEY != "":
                clien = boto3.client(
                    "cognito-idp",
                    region_name="us-east-1",
                    aws_access_key_id=settings.AWS_ACCESS_KEY,
                    aws_secret_access_key=settings.AWS_SECRET_KEY,
                )
            else:
                clien = boto3.client("cognito-idp", region_name="us-east-1")
            msg = username + settings.AWS_CLIENT_ID
            user_agent = parse(request.META.get("HTTP_USER_AGENT", ""))
            is_mobile = user_agent.is_mobile

            if is_mobile:
                self.template_name = "login_mobile.html"

            # Calcula o hash HMAC usando a chave Secret do App Client
            digest = hmac.new(
                settings.AWS_CLIENT_SECRET.encode("UTF-8"),
                msg.encode("UTF-8"),
                hashlib.sha256,
            ).digest()

            # Codifica o hash em base64
            secret_hash = base64.b64encode(digest).decode()

            # Chama a função initiate_auth
            response = clien.initiate_auth(
                ClientId=settings.AWS_CLIENT_ID,
                AuthFlow="USER_PASSWORD_AUTH",
                AuthParameters={
                    "USERNAME": username,
                    "PASSWORD": password,
                    "SECRET_HASH": secret_hash,
                },
            )
            # Obtém o token de acesso a partir da resposta
            access_token = response["AuthenticationResult"]["AccessToken"]

            request.session["access_token"] = access_token
            request.session["username"] = username

            if access_token:
                claims = decode(
                    token=access_token,
                    region="us-east-1",
                    userpool_id=settings.AWS_POOL_ID,
                    app_client_id=settings.AWS_CLIENT_ID,
                )

                if "cognito:groups" in claims.keys():
                    return redirect("/structures_lab/")
                else:
                    return redirect("/structures_lab_assessores/")
            else:
                return redirect("/forbidden/")

        except Exception as e:
            t = traceback.format_exc()
            print(t)
            context["error"] = "Incorrect email or password."
            messages.warning(request, "Incorrect email or password.")

        return render(request, self.template_name, context)

    def get_context_data(self, **kwargs):
        context = super(LogInView, self).get_context_data(**kwargs)
        user_agent = parse(self.request.META.get("HTTP_USER_AGENT", ""))
        is_mobile = user_agent.is_mobile

        if is_mobile:
            self.template_name = "login_mobile.html"

        try:
            return context

        except Exception as e:
            print(e)
            return context


class ForgotPasswordView(TemplateView):
    template_name = "conf_code.html"

    def post(self, request, **kwargs):
        context = self.get_context_data(**kwargs)

        javascript_post_answer = self.request.body
        list_infos_post = javascript_post_answer.decode()
        central_post_command = list_infos_post.split(",")

        if central_post_command[0] == "get_code":
            username = central_post_command[1]

            try:
                if settings.AWS_ACCESS_KEY != "" and settings.AWS_SECRET_KEY != "":
                    clien = boto3.client(
                        "cognito-idp",
                        region_name="us-east-1",
                        aws_access_key_id=settings.AWS_ACCESS_KEY,
                        aws_secret_access_key=settings.AWS_SECRET_KEY,
                    )
                else:
                    clien = boto3.client("cognito-idp", region_name="us-east-1")

                msg = username + settings.AWS_CLIENT_ID
                dig = hmac.new(
                    str(settings.AWS_CLIENT_SECRET).encode("utf-8"),
                    msg=str(msg).encode("utf-8"),
                    digestmod=hashlib.sha256,
                ).digest()
                secrethash = base64.b64encode(dig).decode()
                response = clien.forgot_password(
                    ClientId=settings.AWS_CLIENT_ID,
                    Username=username,
                    SecretHash=secrethash,
                )
                request.session["username"] = username

            except Exception as e:
                print(e)
                return redirect("forbidden/")

        else:
            list_of_infos = central_post_command[1].split("-")
            username = list_of_infos[0]
            conf_code = list_of_infos[1]
            password = list_of_infos[2]

            try:
                msg = username + settings.AWS_CLIENT_ID
                dig = hmac.new(
                    str(settings.AWS_CLIENT_SECRET).encode("utf-8"),
                    msg=str(msg).encode("utf-8"),
                    digestmod=hashlib.sha256,
                ).digest()
                secrethash = base64.b64encode(dig).decode()
                clien = boto3.client("cognito-idp", region_name="us-east-1")
                response = clien.confirm_forgot_password(
                    ClientId=settings.AWS_CLIENT_ID,
                    Username=username,
                    ConfirmationCode=str(conf_code),
                    Password=password,
                    SecretHash=secrethash,
                )

                return redirect("/")
            except Exception as e:
                print(e)
                messages.warning(request, "Incorrect Confirmation Code")

        return render(request, self.template_name, context)

    def get_context_data(self, **kwargs):
        context = super(ForgotPasswordView, self).get_context_data(**kwargs)

        try:
            return context

        except Exception as e:
            print(e)
            return context


class ChangePasswordView(TemplateView):
    template_name = "change_password.html"

    def post(self, request, *args, **kwargs):
        username = request.POST.get("email")
        old_password = request.POST.get("password")
        new_password = request.POST.get("new_password")

        try:
            # Use Boto3 to change the password in Cognito
            if settings.AWS_ACCESS_KEY != "" and settings.AWS_SECRET_KEY != "":
                clien = boto3.client(
                    "cognito-idp",
                    region_name="us-east-1",
                    aws_access_key_id=settings.AWS_ACCESS_KEY,
                    aws_secret_access_key=settings.AWS_SECRET_KEY,
                )
            else:
                clien = boto3.client("cognito-idp", region_name="us-east-1")
            response = clien.admin_get_user(
                UserPoolId=settings.AWS_POOL_ID, Username=username
            )
            user_status = response["UserStatus"]
            if user_status == "CONFIRMED":
                return redirect("/change_password")
            
            msg = username + settings.AWS_CLIENT_ID
            dig = hmac.new(
                str(settings.AWS_CLIENT_SECRET).encode("utf-8"),
                msg=str(msg).encode("utf-8"),
                digestmod=hashlib.sha256,
            ).digest()
            secret_hash = base64.b64encode(dig).decode()

            authentication_params = {
            'AuthFlow': 'ADMIN_NO_SRP_AUTH',
            'ClientId': settings.AWS_CLIENT_ID,
            'UserPoolId': settings.AWS_POOL_ID,
            'AuthParameters': {
                'USERNAME': username,
                'PASSWORD': old_password,
                'SECRET_HASH': secret_hash,
            },
        }
        
            try:
                auth_response = clien.admin_initiate_auth(**authentication_params)
                
                challenge_response_data = {
                    'ChallengeName': 'NEW_PASSWORD_REQUIRED',
                    'ClientId': settings.AWS_CLIENT_ID,
                    'UserPoolId': settings.AWS_POOL_ID,
                    'ChallengeResponses': {
                        'USERNAME': username,
                        'SECRET_HASH': secret_hash,
                        'NEW_PASSWORD': new_password,
                    },
                    'Session': auth_response['Session'],
                }
                
                response = clien.admin_respond_to_auth_challenge(**challenge_response_data)
            except:
                raise ValueError('User Doesnt Exist')
            # Success!
            messages.success(request, "Your password has been changed successfully.")
            return redirect("/")

        except Exception as e:
            messages.error(
                request, "There was an error changing your password: {}".format(str(e))
            )
            print(e)
            return redirect("/change_password")


class QuotePrincipalView(UserAccessMixin, TemplateView):
    template_name = "structures_lab.html"

    def post(self, request, **kwargs):
        context = {}

        if settings.AWS_ACCESS_KEY != "" and settings.AWS_SECRET_KEY != "":
            session = boto3.Session(
                region_name="us-east-1",
                aws_access_key_id=settings.AWS_ACCESS_KEY,
                aws_secret_access_key=settings.AWS_SECRET_KEY,
            )
        else:
            session = boto3.Session(region_name="us-east-1")

        s3 = session.resource("s3")
        s3_bucket = str(settings.S3_BUCKET_NAME)
        s3_path_structures = str(settings.S3_PATH_STRUCTURES)
        objeto = s3.Object(s3_bucket, s3_path_structures).get()
        body = objeto["Body"].read()
        df = pd.read_csv(BytesIO(body))

        data = json.loads(self.request.body)
        row_data_array = data[1]  # Extract the rowDataArray from the request body
        if df.empty:
            for row in row_data_array:
                row.insert(0, 1)
                row.append(request.session.get("username"))
        else:
            new_index = df.id_strategy.to_list()[-1] + 1
            for row in row_data_array:
                row.insert(0, new_index)
                row.append(request.session.get("username"))

        new_df = pd.DataFrame(row_data_array, columns=df.columns)

        # Append the new DataFrame to the original DataFrame
        df = df.append(new_df, ignore_index=True)

        csv_buffer = BytesIO()
        df.to_csv(csv_buffer, index=False, quoting=csv.QUOTE_NONNUMERIC)
        s3.Object(s3_bucket, s3_path_structures).put(Body=csv_buffer.getvalue())

        return render(request, self.template_name, context)

    def get_context_data(self, **kwargs):
        context = super(QuotePrincipalView, self).get_context_data(**kwargs)

        context["oplab_token"] = settings.TOKEN_OPLAB

        context["free_risk_rate"] = float(settings.SELIC_RATE)

        if settings.AWS_ACCESS_KEY != "" and settings.AWS_SECRET_KEY != "":
            session = boto3.Session(
                region_name="us-east-1",
                aws_access_key_id=settings.AWS_ACCESS_KEY,
                aws_secret_access_key=settings.AWS_SECRET_KEY,
            )
        else:
            session = boto3.Session(region_name="us-east-1")

        s3 = session.resource("s3")
        s3_bucket = str(settings.S3_BUCKET_NAME)
        s3_path_contacts = str(settings.S3_PATH_CONTACTS)
        objeto = s3.Object(s3_bucket, s3_path_contacts).get()
        body = objeto["Body"].read()
        df = pd.read_csv(BytesIO(body))
        df.drop_duplicates(inplace=True)

        if settings.AWS_ACCESS_KEY != "" and settings.AWS_SECRET_KEY != "":
            session = boto3.Session(
                region_name="us-east-1",
                aws_access_key_id=settings.AWS_ACCESS_KEY,
                aws_secret_access_key=settings.AWS_SECRET_KEY,
            )
        else:
            session = boto3.Session(region_name="us-east-1")

        s3 = session.resource("s3")
        s3_bucket = str(settings.S3_BUCKET_NAME)
        s3_path_vol_balization = str(settings.S3_PATH_VOL_BALIZATION)
        objeto = s3.Object(s3_bucket, s3_path_vol_balization).get()
        body = objeto["Body"].read()
        df_stock_volatility = pd.read_csv(BytesIO(body))
        df_stock_volatility["volatility"] = df_stock_volatility["volatility"].astype(
            float
        )
        df_stock_volatility["action"] = df_stock_volatility["action"].apply(
            lambda action: "SELL" if action == "VENDA" else "BUY"
        )

        context["contacts_information"] = df.to_dict(orient="records")
        context["vol_information"] = df_stock_volatility.to_dict(orient="records")

        return context  # redirect('forbidden/')


class QuotePrincipalAssessoresView(UserAccessMixin, TemplateView):
    template_name = "structures_lab_assessores.html"

    def post(self, request, **kwargs):
        context = {}

        if settings.AWS_ACCESS_KEY != "" and settings.AWS_SECRET_KEY != "":
            session = boto3.Session(
                region_name="us-east-1",
                aws_access_key_id=settings.AWS_ACCESS_KEY,
                aws_secret_access_key=settings.AWS_SECRET_KEY,
            )
        else:
            session = boto3.Session(region_name="us-east-1")

        s3 = session.resource("s3")
        s3_bucket = str(settings.S3_BUCKET_NAME)
        s3_path_structures = str(settings.S3_PATH_STRUCTURES)
        objeto = s3.Object(s3_bucket, s3_path_structures).get()
        body = objeto["Body"].read()
        df = pd.read_csv(BytesIO(body))

        data = json.loads(self.request.body)
        row_data_array = data[1]  # Extract the rowDataArray from the request body
        if df.empty:
            for row in row_data_array:
                row.insert(0, 1)
                row.append(request.session.get("username"))
        else:
            new_index = df.id_strategy.to_list()[-1] + 1
            for row in row_data_array:
                row.insert(0, new_index)
                row.append(request.session.get("username"))

        new_df = pd.DataFrame(row_data_array, columns=df.columns)

        # Append the new DataFrame to the original DataFrame
        df = df.append(new_df, ignore_index=True)

        csv_buffer = BytesIO()
        df.to_csv(csv_buffer, index=False, quoting=csv.QUOTE_NONNUMERIC)
        s3.Object(s3_bucket, s3_path_structures).put(Body=csv_buffer.getvalue())

        return render(request, self.template_name, context)

    def get_context_data(self, **kwargs):
        context = super(QuotePrincipalAssessoresView, self).get_context_data(**kwargs)

        context["oplab_token"] = settings.TOKEN_OPLAB

        context["free_risk_rate"] = float(settings.SELIC_RATE)

        if settings.AWS_ACCESS_KEY != "" and settings.AWS_SECRET_KEY != "":
            session = boto3.Session(
                region_name="us-east-1",
                aws_access_key_id=settings.AWS_ACCESS_KEY,
                aws_secret_access_key=settings.AWS_SECRET_KEY,
            )
        else:
            session = boto3.Session(region_name="us-east-1")

        s3 = session.resource("s3")
        s3_bucket = str(settings.S3_BUCKET_NAME)
        s3_path_contacts = str(settings.S3_PATH_CONTACTS)
        objeto = s3.Object(s3_bucket, s3_path_contacts).get()
        body = objeto["Body"].read()
        df = pd.read_csv(BytesIO(body))
        df.drop_duplicates(inplace=True)

        if settings.AWS_ACCESS_KEY != "" and settings.AWS_SECRET_KEY != "":
            session = boto3.Session(
                region_name="us-east-1",
                aws_access_key_id=settings.AWS_ACCESS_KEY,
                aws_secret_access_key=settings.AWS_SECRET_KEY,
            )
        else:
            session = boto3.Session(region_name="us-east-1")

        s3 = session.resource("s3")
        s3_bucket = str(settings.S3_BUCKET_NAME)
        s3_path_vol_balization = str(settings.S3_PATH_VOL_BALIZATION)
        objeto = s3.Object(s3_bucket, s3_path_vol_balization).get()
        body = objeto["Body"].read()
        df_stock_volatility = pd.read_csv(BytesIO(body))
        df_stock_volatility["volatility"] = df_stock_volatility["volatility"].astype(
            float
        )
        df_stock_volatility["action"] = df_stock_volatility["action"].apply(
            lambda action: "SELL" if action == "VENDA" else "BUY"
        )

        context["contacts_information"] = df.to_dict(orient="records")
        context["vol_information"] = df_stock_volatility.to_dict(orient="records")

        return context  # redirect('forbidden/')


class OptionsChainView(UserAccessMixin, TemplateView):
    template_name = "options_chain.html"

    def post(self, request, **kwargs):
        context = self.get_context_data(**kwargs)
        return render(request, self.template_name, context)

    def get_context_data(self, **kwargs):
        context = super(OptionsChainView, self).get_context_data(**kwargs)
        context["oplab_token"] = settings.TOKEN_OPLAB

        return context  # redirect('forbidden/')


class StoredStructuresView(UserAccessMixin, TemplateView):
    template_name = "stored_structures.html"

    def post(self, request, **kwargs):
        context = {}

        javascript_post_answer = self.request.body
        list_infos_post = javascript_post_answer.decode()
        central_post_command = list_infos_post.split(",")

        if settings.AWS_ACCESS_KEY != "" and settings.AWS_SECRET_KEY != "":
            session = boto3.Session(
                region_name="us-east-1",
                aws_access_key_id=settings.AWS_ACCESS_KEY,
                aws_secret_access_key=settings.AWS_SECRET_KEY,
            )
        else:
            session = boto3.Session(region_name="us-east-1")

        s3 = session.resource("s3")
        s3_bucket = str(settings.S3_BUCKET_NAME)
        s3_path_structures = str(settings.S3_PATH_STRUCTURES)
        objeto = s3.Object(s3_bucket, s3_path_structures).get()
        body = objeto["Body"].read()
        df_stored_structures = pd.read_csv(BytesIO(body))
        df_stored_structures = df_stored_structures[
            df_stored_structures["id_strategy"] != int(central_post_command[1])
        ]

        csv_buffer = BytesIO()
        df_stored_structures.to_csv(
            csv_buffer, index=False, quoting=csv.QUOTE_NONNUMERIC
        )
        s3.Object(s3_bucket, s3_path_structures).put(Body=csv_buffer.getvalue())

        return render(request, self.template_name, context)

    def get_context_data(self, **kwargs):
        context = super(StoredStructuresView, self).get_context_data(**kwargs)
        context["oplab_token"] = settings.TOKEN_OPLAB

        free_risk_rate = float(settings.SELIC_RATE)

        if settings.AWS_ACCESS_KEY != "" and settings.AWS_SECRET_KEY != "":
            session = boto3.Session(
                region_name="us-east-1",
                aws_access_key_id=settings.AWS_ACCESS_KEY,
                aws_secret_access_key=settings.AWS_SECRET_KEY,
            )
        else:
            session = boto3.Session(region_name="us-east-1")

        s3 = session.resource("s3")
        s3_bucket = str(settings.S3_BUCKET_NAME)
        s3_path_structures = str(settings.S3_PATH_STRUCTURES)
        objeto = s3.Object(s3_bucket, s3_path_structures).get()
        body = objeto["Body"].read()
        df_stored_structures = pd.read_csv(BytesIO(body))

        df_stored_structures = df_stored_structures[
            df_stored_structures["username"] == self.request.session.get("username")
        ]
        bearish_strats = ["Bear Call Spread", "Fence"]
        bullish_strats = [
            "Bull Put Spread",
            "Call Backspread",
            "Long Call",
            "Dividendo Sintético",
            "Booster (Double Up)",
        ]
        protection_strats = ["Financiamento", "Zero Cost Collar"]

        if not df_stored_structures.empty:
            ######plot infos
            grouped_df = df_stored_structures.groupby("id_strategy").first()
            # Reset the index of the grouped DataFrame
            grouped_df = grouped_df.reset_index()
            grouped_df["outlook"] = grouped_df["strategy"].apply(
                lambda strategy: "Otimista"
                if strategy in bullish_strats
                else "Pessimista"
                if strategy in bearish_strats
                else "Proteção"
                if strategy in protection_strats
                else "Estratégia Customizada"
            )

            strategys_plot_df = (
                grouped_df.groupby("outlook")
                .agg({"id_strategy": "count"})
                .reset_index()
            )
            strategys_plot_df.rename(columns={"id_strategy": "count"}, inplace=True)
            strategys_plot_df = strategys_plot_df.to_dict(orient="records")
            context["strategys_plot_df"] = strategys_plot_df
            #####################################################################################

            stock_present_in_stored_structures = (
                df_stored_structures.underlying_asset.unique()
            )

            url = "https://api.oplab.com.br/v3/market/stocks"

            headers = {"Access-Token": settings.TOKEN_OPLAB}

            response = requests.get(url, headers=headers)
            data = response.json()
            df_stock_infos = pd.json_normalize(data)

            df_stock_infos = df_stock_infos[
                df_stock_infos["symbol"].isin(stock_present_in_stored_structures)
            ]

            df_stock_infos = df_stock_infos[["symbol", "close", "iv_current"]]
            df_stock_infos.rename(columns={"symbol": "underlying_asset"}, inplace=True)

            df_stored_structures = df_stored_structures.merge(
                df_stock_infos, on="underlying_asset", how="left"
            )
            df_stored_structures["maturity_days"] = df_stored_structures.apply(
                lambda row: calculate_business_days(row["vencimento"]), axis=1
            )
            df_stored_structures["actual_price"] = df_stored_structures.apply(
                lambda row: black_scholes(
                    float(row["close"]),
                    float(row["strike"]),
                    row["maturity_days"] / 252,
                    free_risk_rate,
                    row["iv_current"] / 100,
                    row["type"],
                ),
                axis=1,
            )
            df_stored_structures[
                "actual_price"
            ] = df_stored_structures.actual_price.round(2)

            context["structures_active"] = df_stored_structures.values.tolist()

            context["unique_structures"] = df_stored_structures.id_strategy.unique()
            df_timeline_grouped = df_stored_structures.groupby("id_strategy").first()
            # Reset the index of the grouped DataFrame
            df_timeline_grouped = df_timeline_grouped.reset_index()
            df_timeline_grouped.sort_values(
                by="id_strategy", inplace=True, ascending=False
            )
            context["df_to_timeline"] = df_timeline_grouped.values.tolist()
        else:
            context["structures_active"] = []
            context["unique_structures"] = []
            context["strategys_plot_df"] = []
            context["df_to_timeline"] = []

        return context  # redirect('forbidden/')


class AdministrativeAreaView(UserAccessMixin, TemplateView):
    template_name = "administrative_area.html"

    def post(self, request, **kwargs):
        context = self.get_context_data(**kwargs)

        javascript_post_answer = self.request.body
        list_infos_post = javascript_post_answer.decode()
        central_post_command = list_infos_post.split(",")

        if central_post_command[0] == "userNew":
            create_user_and_add_to_group(
                str(settings.AWS_POOL_ID),
                central_post_command[1],
                central_post_command[2],
            )
        elif central_post_command[0] == "volatilityNew":
            if settings.AWS_ACCESS_KEY != "" and settings.AWS_SECRET_KEY != "":
                session = boto3.Session(
                    region_name="us-east-1",
                    aws_access_key_id=settings.AWS_ACCESS_KEY,
                    aws_secret_access_key=settings.AWS_SECRET_KEY,
                )
            else:
                session = boto3.Session(region_name="us-east-1")

            s3 = session.resource("s3")
            s3_bucket = str(settings.S3_BUCKET_NAME)
            s3_path_volatility = str(settings.S3_PATH_VOLATILITY)
            objeto = s3.Object(s3_bucket, s3_path_volatility).get()
            body = objeto["Body"].read()
            df_stock_volatility = pd.read_csv(BytesIO(body))

            new_row = pd.DataFrame(
                [central_post_command[1:]], columns=df_stock_volatility.columns
            )
            df = df_stock_volatility.append(new_row, ignore_index=True)

            # Save the updated DataFrame back to the S3 object
            csv_buffer = BytesIO()
            df.to_csv(csv_buffer, index=False, quoting=csv.QUOTE_NONNUMERIC)
            s3.Object(s3_bucket, s3_path_volatility).put(Body=csv_buffer.getvalue())
        elif central_post_command[0] == "volatilityEdit":
            if settings.AWS_ACCESS_KEY != "" and settings.AWS_SECRET_KEY != "":
                session = boto3.Session(
                    region_name="us-east-1",
                    aws_access_key_id=settings.AWS_ACCESS_KEY,
                    aws_secret_access_key=settings.AWS_SECRET_KEY,
                )
            else:
                session = boto3.Session(region_name="us-east-1")

            s3 = session.resource("s3")
            s3_bucket = str(settings.S3_BUCKET_NAME)
            s3_path_volatility = str(settings.S3_PATH_VOLATILITY)
            objeto = s3.Object(s3_bucket, s3_path_volatility).get()
            body = objeto["Body"].read()
            df_stock_volatility = pd.read_csv(BytesIO(body))

            df_stock_volatility.loc[
                int(central_post_command[3])
            ] = central_post_command[1:-1]

            csv_buffer = BytesIO()
            df_stock_volatility.to_csv(
                csv_buffer, index=False, quoting=csv.QUOTE_NONNUMERIC
            )
            s3.Object(s3_bucket, s3_path_volatility).put(Body=csv_buffer.getvalue())
        elif central_post_command[0] == "volatilityDelete":
            if settings.AWS_ACCESS_KEY != "" and settings.AWS_SECRET_KEY != "":
                session = boto3.Session(
                    region_name="us-east-1",
                    aws_access_key_id=settings.AWS_ACCESS_KEY,
                    aws_secret_access_key=settings.AWS_SECRET_KEY,
                )
            else:
                session = boto3.Session(region_name="us-east-1")

            s3 = session.resource("s3")
            s3_bucket = str(settings.S3_BUCKET_NAME)
            s3_path_volatility = str(settings.S3_PATH_VOLATILITY)
            objeto = s3.Object(s3_bucket, s3_path_volatility).get()
            body = objeto["Body"].read()
            df_stock_volatility = pd.read_csv(BytesIO(body))

            df_stock_volatility = df_stock_volatility.drop(int(central_post_command[1]))

            csv_buffer = BytesIO()
            df_stock_volatility.to_csv(
                csv_buffer, index=False, quoting=csv.QUOTE_NONNUMERIC
            )
            s3.Object(s3_bucket, s3_path_volatility).put(Body=csv_buffer.getvalue())

        else:
            if settings.AWS_ACCESS_KEY != "" and settings.AWS_SECRET_KEY != "":
                session = boto3.Session(
                    region_name="us-east-1",
                    aws_access_key_id=settings.AWS_ACCESS_KEY,
                    aws_secret_access_key=settings.AWS_SECRET_KEY,
                )
            else:
                session = boto3.Session(region_name="us-east-1")

            s3 = session.resource("s3")
            s3_bucket = str(settings.S3_BUCKET_NAME)
            s3_path_contacts = str(settings.S3_PATH_CONTACTS)
            objeto = s3.Object(s3_bucket, s3_path_contacts).get()
            body = objeto["Body"].read()
            df = pd.read_csv(BytesIO(body))

            # Replace with the actual values you want to add

            # Add a new row to the DataFrame
            new_row = pd.DataFrame([central_post_command[1:]], columns=df.columns)
            df = df.append(new_row, ignore_index=True)

            # Save the updated DataFrame back to the S3 object
            csv_buffer = BytesIO()
            df.to_csv(csv_buffer, index=False, quoting=csv.QUOTE_NONNUMERIC)
            s3.Object(s3_bucket, s3_path_contacts).put(Body=csv_buffer.getvalue())

        return render(request, self.template_name, context)

    def get_context_data(self, **kwargs):
        context = super(AdministrativeAreaView, self).get_context_data(**kwargs)

        if settings.AWS_ACCESS_KEY != "" and settings.AWS_SECRET_KEY != "":
            session = boto3.Session(
                region_name="us-east-1",
                aws_access_key_id=settings.AWS_ACCESS_KEY,
                aws_secret_access_key=settings.AWS_SECRET_KEY,
            )
        else:
            session = boto3.Session(region_name="us-east-1")

        s3 = session.resource("s3")
        s3_bucket = str(settings.S3_BUCKET_NAME)
        s3_path_volatility = str(settings.S3_PATH_VOLATILITY)
        objeto = s3.Object(s3_bucket, s3_path_volatility).get()
        body = objeto["Body"].read()
        df_stock_volatility = pd.read_csv(BytesIO(body))

        context["df_stock_volatility"] = df_stock_volatility.values.tolist()

        return context  # redirect('forbidden/')


class ManageUsersAreaView(UserAccessMixin, TemplateView):
    template_name = "manage_users.html"

    def post(self, request, **kwargs):
        context = {}

        javascript_post_answer = self.request.body
        list_infos_post = javascript_post_answer.decode()
        central_post_command = list_infos_post.split(",")
        if central_post_command[0] == "userErase":
            delete_cognito_user(central_post_command[1])

        return render(request, self.template_name, context)

    def get_context_data(self, **kwargs):
        context = super(ManageUsersAreaView, self).get_context_data(**kwargs)

        if settings.AWS_ACCESS_KEY != "" and settings.AWS_SECRET_KEY != "":
            session = boto3.Session(
                region_name="us-east-1",
                aws_access_key_id=settings.AWS_ACCESS_KEY,
                aws_secret_access_key=settings.AWS_SECRET_KEY,
            )
        else:
            session = boto3.Session(region_name="us-east-1")

        if settings.AWS_ACCESS_KEY != "" and settings.AWS_SECRET_KEY != "":
            cognito = boto3.client(
                "cognito-idp",
                region_name="us-east-1",
                aws_access_key_id=settings.AWS_ACCESS_KEY,
                aws_secret_access_key=settings.AWS_SECRET_KEY,
            )
        else:
            cognito = boto3.client("cognito-idp", region_name="us-east-1")

        cognito = session.client("cognito-idp")

        # List users in a Cognito User Pool
        response = cognito.list_users(UserPoolId=str(settings.AWS_POOL_ID))

        # Extract relevant information from the response
        users = response["Users"]
        user_data = []
        for user in users:
            username = user["Username"]
            user_status = user["UserStatus"]
            user_groups = cognito.admin_list_groups_for_user(
                UserPoolId=str(settings.AWS_POOL_ID), Username=username
            )
            groups = [group["GroupName"] for group in user_groups["Groups"]]
            user_data.append([username, user_status, groups])

        # Create a DataFrame from the user data
        df = pd.DataFrame(user_data, columns=["Username", "User Status", "User Groups"])

        context["df_with_users"] = df.values.tolist()

        return context  # redirect('forbidden/')
