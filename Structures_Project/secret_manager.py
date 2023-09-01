import boto3
from botocore.exceptions import ClientError
import json
import os

def get_secret(**AWS_SECRET_MANAGER_CREDENTIALS):
    
    """ Used to retrieve the secret credentials stored in the aws secret manager
    using the IAM access key. """

    os_secret = os.environ.get("SECRET_ARGS")
    if os_secret is not None:
        return json.loads(os_secret)

    credentials = {}
    credentials['aws_access_key_id'] = AWS_SECRET_MANAGER_CREDENTIALS.get('ACCESS_KEY')
    credentials['aws_secret_access_key'] = AWS_SECRET_MANAGER_CREDENTIALS.get('SECRET_KEY')
    credentials['region_name'] = AWS_SECRET_MANAGER_CREDENTIALS.get('REGION_NAME')
    
    #initiate session
    session = boto3.session.Session(**credentials)
    # Create a Secrets Manager client
    client = session.client(service_name='secretsmanager')

    # In this sample we only handle the specific exceptions for the 'GetSecretValue' API.
    # See https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
    # We rethrow the exception by default.

    try:
        get_secret_value_response = client.get_secret_value(
            SecretId=AWS_SECRET_MANAGER_CREDENTIALS.get('SECRET_NAME')
        )
    except Exception as e:
        print("Erro durante execucao: {}".format(str(e)))
        raise e
    else:
        secret = get_secret_value_response['SecretString']
        return json.loads(secret)