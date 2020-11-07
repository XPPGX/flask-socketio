Flask socketio example
===

## 鳴謝
> 本專案修改自[simple-flask-socketio-example](https://github.com/josharnoldjosh/simple-flask-socketio-example)，僅加上
> 1. 模擬貼圖donate功能
> 2. 加入/離開聊天室

## 聲明
網頁中使用之貼圖皆為網路上取得，僅作為教育研究用途之素材，無用於營利。

## Index
- [Flask socketio example](#flask-socketio-example)
  - [鳴謝](#鳴謝)
  - [聲明](#聲明)
  - [Index](#index)
- [Installation](#installation)
- [Usage](#usage)
  - [Modify service file](#modify-service-file)
  - [Deploy](#deploy)
  - [Result](#result)
- [License](#license)

Installation
===

Use the package manager pip to install requirement package.

```bash
$pip install -r requirements.txt
```


Usage
===
clone this repo
```bash
$git clone https://github.com/a607ernie/flask-socketio.git

$cd flask-socketio
```
Create python virtualenv
```bash
$virtualenv venv
```

into the venv，建議 python 3.6 以上
```bash
$source venv/bin/activate
$python -V
#python 3.6.3
```

## Modify service file
modify chatroom.service, just modify 
- User
- Group
- WorkingDirectory
- the workdir path of 'ExecStart' 

```bash
[Unit]
Description=Gunicorn instance to serve chatroom
After=network.target

[Service]
User=ubuntu #modify your user name
Group=ubuntu # modify your group
RuntimeDirectory=gunicorn
WorkingDirectory=/home/ubuntu/Documents/flask-socketio  #modify the folder path
ExecStart=/home/ubuntu/Documents/flask-socketio/venv/bin/gunicorn \ #modify the folder path
-k geventwebsocket.gunicorn.workers.GeventWebSocketWorker \
-w 1 \ 
wsgi:app \ 
-b 0.0.0.0:5000


[Install]
WantedBy=multi-user.target
```

## Deploy
- copy chatroom.service to systemd
```bash
$sudo cp chatroom.service /etc/systemd/system
```

- start the chatroom.service 

```bash
$sudo systemctl start chatroom.service

#check the service status
$sudo systemctl status chatroom.service

#stop or restart
$sudo systemctl [stop/restart] chatroom.service
```

## Result
check the result

```bash
http://ServerIP:5000/
```

License
===
[MIT](https://choosealicense.com/licenses/mit/)