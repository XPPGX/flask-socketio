FROM python:3.7
#FROM python:3.7-alpine

RUN git clone https://github.com/a607ernie/flask-socketio.git\
&&  cd flask-socketio\
&&  pip install -r requirements.txt\


WORKDIR /flask-socketio

#COPY . /docker_api


RUN /usr/local/bin/gunicorn \
-k geventwebsocket.gunicorn.workers.GeventWebSocketWorker \
-w 1 \
wsgi:app \
-b 0.0.0.0:5000