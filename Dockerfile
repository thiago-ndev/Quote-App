FROM public.ecr.aws/ubuntu/ubuntu:focal-20.04_edge
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

COPY . /home/ubuntu/Structures-Quote-App/
COPY db.sqlite3 /home/ubuntu/Structures-Quote-App/

RUN apt-get update -y
RUN apt-get install -y sudo
RUN DEBIAN_FRONTEND=noninteractive TZ=Etc/UTC apt-get -y install tzdata
RUN sudo apt-get install software-properties-common --yes
RUN sudo add-apt-repository ppa:deadsnakes/ppa --yes
RUN sudo apt-get install python3.8 --yes
RUN sudo apt install python3-pip --yes
RUN sudo apt-get install python3-venv --yes

RUN sudo apt-get install python3-dev default-libmysqlclient-dev build-essential --yes
RUN sudo apt-get install libssl-dev python3.8-dev libffi-dev --yes
RUN sudo apt-get update -y

WORKDIR /home/ubuntu/Structures-Quote-App/

RUN python3 -m venv venv
RUN source venv/bin/activate

RUN venv/bin/pip3 install -r requirements.txt

ARG SECRET_ARGS

RUN venv/bin/python3 manage.py collectstatic


RUN sudo apt-get install --no-install-recommends --no-install-suggests nginx --yes

RUN ls

RUN cp ./mindtecnologia.pem /etc/ssl/mindtecnologia.pem
RUN cp ./mindtecnologia.key /etc/ssl/mindtecnologia.key

COPY ./deploy/django_nginx.default /etc/nginx/sites-available/default

RUN ln -sf /dev/stdout /var/log/nginx/access.log \
    && ln -sf /dev/stderr /var/log/nginx/error.log


RUN chown -R www-data:www-data /home/ubuntu/Structures-Quote-App/


EXPOSE 443
RUN sudo chmod 755 ./deploy/start_server.sh
CMD ["./deploy/start_server.sh"]