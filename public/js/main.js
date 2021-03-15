const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-right');

const socket = io();

//Message from server
socket.on('message', message => {
    console.log(message);
    outputMessage(message);

    //Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

//Message submit
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    //Get message
    //potrebuji username, text a time v jednom objektu, kvuli absenci v poslednich hodinach nemam naproste poneti jak to udelat
    const username = Qs.parse(location.search, {
        ignoreQueryPrefix: true
    });
    const msg = e.target.elements.msg.value;
    console.log(msg);
    console.log(username);
    //Emit message to server
    socket.emit('chatMessage', (username,msg));
    //Clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus;
});

//Output message to DOM
function outputMessage(message){
    const div = document.createElement('div');
    div.classList.add('message-outcome');
    div.innerHTML = `<h6 class="name">${message.username}</h6>
    <p class="text">${message.text}</p>
    <span class="time">${message.time}</span>`;
    document.querySelector('.chat-right').appendChild(div);
}