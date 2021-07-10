const express = require('express');


const app = express();
const server = require('http').createServer(app)
const io = require('socket.io')(server,{cors:{origin:"*"}})

const rooms = new Map()


app.get('/rooms',  (req,res) => {
    rooms.set('hello' , '')
    res.json(rooms)
});

io.on('connections', socket =>{
    console.log('socket connected', socket.id)
})

server.listen(9999, (err) =>{
    if(err){
        throw Error(err)
    }
    console.log('server is start')
})
