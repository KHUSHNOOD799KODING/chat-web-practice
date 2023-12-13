// const io = require('socket.io')(8000)

// const users = {};

// io.on('connection', socket =>{
//     socket.on('new-user-joined', nam =>{
//         // console.log("New user", username);
//         users[socket.id] = nam;
//         socket.broadcast.emit('user-joined',nam)

//     })
//     socket.on('send',message =>{
//         socket.broadcast.emit('receive',{message: message, name: users[socket.id]})
//     })
// });



// const io = require('socket.io')(8000);

const io = require('socket.io')(8000, {
    cors: {
      origin: ['http://127.0.0.1:5500'], // Replace with your client application origin
      methods: ['GET', 'POST'], // Adjust based on your application's needs
      credentials: false
    }
  });
  
  const users = {};
  
  io.on('connection', (socket) => {
    socket.on('new-user-joined', (name) => {
      users[socket.id] = name;
      socket.broadcast.emit('user-joined', name);
    });
  
    socket.on('send', (message) => {
      const senderName = users[socket.id];
      socket.broadcast.emit('receive', { message, name: senderName });
    });
  
    socket.on('disconnect', () => {
      const disconnectedUserName = users[socket.id];
      delete users[socket.id];
      socket.broadcast.emit('user-left', disconnectedUserName);
    });
  
    socket.on('error', (error) => {
      console.error(`Socket error: ${error.message}`);
    });
  });
  
