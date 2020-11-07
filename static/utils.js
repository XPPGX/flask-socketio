//Script to handle socket.io
var socket;            

$(document).ready(function() {
    
    // The http vs. https is important. Use http for localhost!
    socket = io.connect('http://' + document.domain + ':' + location.port);
    var username = document.getElementsByClassName("title")[0].baseURI.split('/chat/')[1];
    
    // join the room
    var joinRoom = function (){
        var data = {
            room : 'chat',
            username : username
        }
        socket.emit('join',data)
    }
    joinRoom()

    // join the room ,send message to chat
    socket.on('join', function(data) {
        var text = data['text'];
        document.getElementById("chat").innerHTML += "Server: " + text + "\n";   
    });
    
    
    // exit the page
    window.onbeforeunload = function () {
        var data = {
            room : 'chat',
            username : username
        }
        socket.emit('leave', data)
    }
    // Message recieved from server
    socket.on('leave', function(data) {
        var text = data['text'];
        document.getElementById("chat").innerHTML += "Server: " + text + "\n";   
    });
    
    
    document.getElementById("send_button").addEventListener("click",getMessageAndSend);
    // Button was clicked
    function getMessageAndSend() {
        // Get the text value
        var text = document.getElementById("textfield_input").value;
        if (text == "" || text == " "){
            return 0;
        }
        // Update the chat window
        
        var data = {
            room : 'chat',
            username : username,
            text : text
        }
        //document.getElementById("chat").innerHTML += username +": " + text + "\n\n";                    
        
        // Emit a message to the 'send_message' socket
        socket.emit('send_message', data);

        // Set the textfield input to empty
        document.getElementById("textfield_input").value = "";
    }

    // send message when key enter or click button
    var input = document.getElementById("textfield_input")

    input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        if (input.value != ""){
            event.preventDefault();
            document.getElementById("send_button").click();
            input.value = "";
        }
        }
    });

    document.getElementById("sc-001").onclick = function() {sendsuperchat("Good")};
    document.getElementById("sc-002").onclick = function() {sendsuperchat("Europe King")};
    document.getElementById("sc-003").onclick = function() {sendsuperchat("Nice Play")};
    document.getElementById("sc-004").onclick = function() {sendsuperchat("Rocket")};
    document.getElementById("sc-005").onclick = function() {sendsuperchat("red envelope")};
    function sendsuperchat(text) {
        
        data = {
            room : 'chat',
            username : username,
            text : text
        }
        //console.log(data);
        socket.emit('send_superchat', data);
        document.getElementById("textfield_input").value = "";
    }            


    // Message recieved from server , show on chat
    socket.on('message_from_server', function(data) {
        var text = data['text'];
        document.getElementById("chat").innerHTML += text + "\n";   
        document.getElementById("chat").scrollTop = document.getElementById("chat").scrollHeight;
    });

});