const express = require('express')
const app = express()
// const cors = require('cors')
// app.use(cors())
const server = require('http').Server(app)
const io = require('socket.io')(server)
const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(server, {
  debug: true
});
const { v4: uuidV4 } = require('uuid')

app.use('/peerjs', peerServer);

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

var onlineusersid = [];
var onlineusersname = [];
 
 io.on('connection', socket => {
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId)
    socket.to(roomId).broadcast.emit('user-connected', userId);
    // messages
  //   socket.on('msg', (message) => {
    //     //send message to the same room
    //     io.to(roomId).emit('msg', message)
  // });
  
  socket.on("msg", function (data) {
      io.to(roomId).emit('msg', { msg: data.message, name: data.name })
    // io.emit("msgs", { msg: data.message, name: data.name });
io.to(roomId).emit("online", { nums: onlineusersid, name: onlineusersname });

})

socket.on("nameset", function (data) {
  onlineusersid.push(socket.id);
  onlineusersname.push(data);
io.to(roomId).emit("online", { nums: onlineusersid, name: onlineusersname });

 
  // console.log(onlineusersid.length , " nameset wla console ",data ,"  ",onlineusersname);

})


    socket.on('disconnect', () => {
      socket.to(roomId).broadcast.emit('user-disconnected', userId)
    })
  })
})

server.listen(process.env.PORT||3030)
