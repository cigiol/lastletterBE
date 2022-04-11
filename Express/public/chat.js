//Connection
var socket = io.connect('http://localhost:5000');

var userName = document.querySelector("#name");
var button = document.querySelector("#send");
var fuck = document.querySelector("#fuck");

var message = document.querySelector("#message");
var send = document.querySelector("#sendMessage");
var messageArea = document.querySelector("#msgArea");

var typing = document.querySelector("#msgtyping");

/*button.addEventListener("click",function(){
    socket.emit('matching',{
        message: userName.value
    });
});

message.addEventListener("keypress",function(){
    socket.emit('typing',{
        user: userName.value
    });
});

send.addEventListener("click",function(){
    socket.emit('chat',{
        user: userName.value,
        message: message.value
    });
    message.value="";
});

socket.on('matching',function(data){
    if(data=='Wait'){
        fuck.innerHTML=`
        <h1>STILL WAITING FOR MATCHING</h1>
        `;
    }
    else{
        fuck.innerHTML=`
            <h1>player1:</h1>${data.player1}
            <h1>player2:</h1>${data.player2}
            <h1>Room:</h1>${data.roomId}
        `;
    }
   
});

socket.on('chat',function(data){
    console.log(data.user);
    typing.innerHTML="";
    messageArea.innerHTML+=`
        <p><bold>${data.user}:</bold>${data.message}</p>
    `;
});

socket.on('typing',function(data){
    console.log(data.user);
    typing.innerHTML=`
        <p><bold>${data.user}</bold> is typing</p>
    `;
});*/