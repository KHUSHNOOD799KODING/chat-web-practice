// const socket = io('http://localhost:8000')

// const form = document.getElementById('send-container');

// const messageInput = document.getElementById('messageInp')
// const messageContainer = document.querySelector(".container")

// const append = (message, position)=>{
//     const messgageElement = document.createElement('div');
//     messgageElement.innerText = message;
//     messgageElement.classList.add('message')
//     messgageElement.classList.add(position);
//     messageContainer.append(messgageElement);
// }

// form.addEventListener('submit',(e)=>{
//    e.preventDefault();
//    const message = messageInput.value;
//    append(`You: ${message}`, 'right');
//    socket.emit('send',message);
//    messageInput.value ='' ;
// })

// const nam = prompt("Enter your name to join");
// socket.emit('new-user-joined',nam);

// socket.on('user-joined', nam =>{
// append(`${nam} joined the chat`, 'right')
// })

// socket.on('receive', name =>{
// append(`${name.message}:${name.users}`, 'left')
// })


const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');

const append = (message, position, username = '') => {
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageElement.classList.add('message');
  messageElement.classList.add(position);
  if (username) {
    const userElement = document.createElement('span');
    userElement.innerText = username;
    userElement.classList.add('username');
    messageElement.appendChild(userElement);
  }
  messageContainer.append(messageElement);
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = messageInput.value.trim();
  if (!message) return;
  append(`You: ${message}`, 'right');
  socket.emit('send', message);
  messageInput.value = '';
});

const name = prompt('Enter your name to join');
socket.emit('new-user-joined', name);

socket.on('user-joined', (name) => {
  append(`${name} joined the chat`, 'right');
});

socket.on('receive', ({ message, username }) => {
  append(message, 'left', username);
});

socket.on('disconnect', () => {
  append('**You have been disconnected from the server.**', 'right');
});

socket.on('connect_error', (error) => {
  append(`**Error connecting to the server: ${error.message}**`, 'right');
});

append(`You: ${message}`, 'right', name); // For your own messages
socket.on('receive', ({ message, username }) => {
  append(message, 'left', username); // For other users' messages
});

