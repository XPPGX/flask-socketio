from flask import *
from flask_socketio import *
import json
# Init the server
app = Flask(__name__)
app.config['SECRET_KEY'] = 'some super secret key!'
socketio = SocketIO(app, logger=True)

# Send HTML!
@app.route('/')
def root():    
    return "Hello world!"

# Returns a random number
@app.route('/random')
def random():  
    from random import randint  
    html = str(randint(1, 100))
    return html

# Prints the user id
@app.route('/user/<id>')
def user_id(id):
    return str(id)

# Display the HTML Page & pass in a username parameter
@app.route('/html/<username>')
def html(username):
    return render_template('index.html', username=username)

# Receive a message from the front end HTML
@socketio.on('send_message')   
def message_recieved(data):
    print(data)
    username = data['username']
    room = data['room']
    text = data['text']
    print(text)
    emit('message_from_server', {'text':username+": "+text},room=room)



# Receive a message from the front end HTML
@socketio.on('send_superchat')   
def superchat_recieved(data):
    print(data)
    username = data['username']
    room = data['room']
    text = data['text']
    emit('message_from_server', {'text':username+" 送了一份斗內  "+ text},room=room)



@socketio.on('join')
def on_join(data):
    print(data)
    username = data['username']
    room = data['room']
    join_room(room)
    emit('join',{'text':username + ' has entered the room.'}, room=room)
    

@socketio.on('leave')
def on_leave(data):
    username = data['username']
    room = data['room']
    leave_room(room)
    emit('leave',{'text':username + ' has left the room.'}, room=room)


# Actually Start the App
if __name__ == '__main__':
    """ Run the app. """    
    socketio.run(app, port=8000, debug=True)