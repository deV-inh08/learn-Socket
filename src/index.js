const express = require('express')

const app = express();
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

const PORT = 3000;

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.get('/chat', (req, res) => {
   res.render('login.ejs')
})


io.on('connection', (socket) => {
    console.log('user connected')
    let room;
    socket.on('join', function(data) {
        console.log(data)
        room = data.room
        socket.join(room)
    })

    socket.on('message', (msg) => {
        io.to(room).emit('thread', msg)
    });

   
})

server.listen(PORT, () => {
    console.log(`Server is running at: http://localhost:${PORT}`)
})