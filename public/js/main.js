const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector('.chat-messages');
const socket = io();

//Message from server
socket.on('message', (message, toAll)=> {
    console.log(message);
    outputMessage(message, toAll);

    //Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

//Message submit
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //Get username
    const username = Qs.parse(location.search, {
        ignoreQueryPrefix: true
    });

    //Get message
    const msg = e.target.elements.msg.value;

    //Emit message to server
    socket.emit('chatMessage', {username: username.username,msg:msg});

    //Clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus;
});

//Output message to DOM
function outputMessage(message, toAll){
    const div = document.createElement('div');

    //Play notification sound
    const notification = new Audio('../sound/notify.mp3');
    notification.play();
    
    //console.log(toAll);

    //Choose div depending on who's the sender
    if(message.username == 'Nuncio'){
        div.classList.add('message-bot');
    } else if(toAll === false) {
        div.classList.add('message-outcome');
    }
    else {
        div.classList.add('message-income');
    }

    div.innerHTML = `<h6 class="name">${message.username}</h6>
    <p class="text">${message.text}</p>
    <span class="time">${message.time}</span>`;
    document.querySelector('.chat-messages').appendChild(div);
}