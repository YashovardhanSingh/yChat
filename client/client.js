// var HOST = location.origin.replace(/^http/, 'ws')
const socket = io('http://127.0.0.1:5500/');

const form = document.getElementById('send-cont');
const messageInp = document.getElementById('message');
const messageCont = document.querySelector('.container');
var audio = new Audio('ting.mp3');

const append = (message, position)=>{
    const mess = document.createElement('div');
    mess.innerText = message;
    mess.classList.add('message');
    mess.classList.add(position);
    messageCont.append(mess);
    if(position == 'left'){
        audio.play();
    }
}

const user = (message, position)=>{
    const mess = document.createElement('div');
    mess.innerText = message;
    mess.classList.add('users');
    mess.classList.add(position);
    messageCont.append(mess);
    audio.play();
}

const name = prompt("Enter your name: ");
socket.emit('new-user-joined', name);

socket.on('user-joined', name => {
    user(`${name} joined the chat`, 'left');
});

socket.on('receive', data => {
    append(`${data.name}: ${data.message} `, 'left');
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInp.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInp.value = "";
})

socket.on('left', name => {
    user(`${name} left the chat`, 'left');
});