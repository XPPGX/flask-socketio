FROM python:3.7


RUN git clone https://github.com/a607ernie/flask-socketio.git\
&&  cd flask-socketio\
&&  pip install -r requirements.txt\
&&  chmod +x entrypoint.sh

WORKDIR /flask-socketio


ENTRYPOINT ["./entrypoint.sh"]