


const express = require('express');


const app = express();
const server = require('http').createServer(app)
const io = require('socket.io')(server,{cors:{origin:"*"}})

app.use(express.json())

const rooms = new Map()


app.get('/rooms',  (req,res) => {
    rooms.set('hello' , '')
    res.json(rooms)
});

app.post('/rooms', (req,res) =>{
    const {roomId, userName} = req.body
    if(!rooms.has(roomId)){
        rooms.set(roomId, new Map([
            ['users', new Map()],
            ['messages', []],
        ]))
    }
    res.send();
})

io.on('connection', (socket) =>{
    socket.on('ROOM:JOIN', ({roomId, userName}) =>{
        socket.join(roomId)
        rooms.get(roomId).get('users').set(socket.id, userName)
        const users = [...rooms.get(roomId).get('users').values()];
        socket.broadcast.to(roomId).emit('ROOM:JOINED', users)
    })
    console.log('socket connected', socket.id)
})

io.on('disconnect', (socket) => {
    rooms.forEach((value, roomId) => {
        if (value.get('users').delete(socket.id)) {
            const users = [...value.get('users').values()];
            socket.broadcast.to(roomId).emit('ROOM:SET_USERS', users);
        }
    });
});

server.listen(3001, (err) =>{
    if(err){
        throw Error(err)
    }
    console.log('server is start')
})
