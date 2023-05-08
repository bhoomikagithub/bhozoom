const express = require('express')
const app = express()
// const cors = require('cors')
// app.use(cors())
const server = require('http').Server(app)
const io = require('socket.io')(server)
var bodyParser = require('body-parser');
const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(server, {
  debug: true
});
const { v4: uuidV4 } = require('uuid')

app.use('/peerjs', peerServer);
app.use(bodyParser());

app.set('view engine', 'ejs')
app.use(express.static('public'))

// app.get('/', (req, res) => {
//   res.redirect(`/${uuidV4()}`)
// })
app.get('/', (req, res) => {
  
  res.render('first', { roomId: req.params.room })
  
})
app.post('/joinroom', function(req, res){
  res.redirect(`/${req.body.id}`)
})

app.get('/join/room', function(req, res){
  res.render('welcome', { roomId: req.params.room })  
})
app.get('/:room', (req, res) => {
  res.render('index', { roomId: req.params.room })
})
app.get('/craeteroom/new', function(req, res){
  res.redirect(`/${uuidV4()}`)
})
app.get('/n', function(req, res){
  res.render('welcome') 
})

var usernames = []

// var onlineUserNames = [];
// var onlineUsersId = [];
 var users={};
 io.on('connection', socket => {
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId)
    socket.to(roomId).broadcast.emit('user-connected', userId);
        io.emit("user-list", users)

        socket.on('name', username =>{
          usernames.push(username);
          socket.emit('users', usernames);
        })
        
    // messages
  //   socket.on('msg', (message) => {
    //     //send message to the same room
    //     io.to(roomId).emit('msg', message)
  // });
  
//   socket.on('nameset',(data)=>{
//     console.log(data)
//     onlineUserNames.push(data)
//     onlineUsersId.push(socket.id);
//     io.emit('online', onlineUserNames);

// })

    socket.on('disconnect', () => {
      socket.to(roomId).broadcast.emit('user-disconnected', userId)
      io.emit("user-list", users)
      
  //     var joIndexremoveKarnaHai= onlineUsersId.indexOf(socket.id , 1)
  //     onlineUserNames.splice(joIndexremoveKarnaHai);
  //     onlineUsersId.splice (joIndexremoveKarnaHai ,1);
  // io.emit('online', onlineUserNames);
  // console.log()
    })
  })
})

server.listen(process.env.PORT||3030)
