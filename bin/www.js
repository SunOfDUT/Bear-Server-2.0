#!/usr/bin/env node
var app = require('../app');
var debug = require('debug')('bear-server-2.0:server');
var http = require('http');
const { Server } = require("socket.io");
const db = require('./db')
const SocketOpeartion = require('./ChatSocket')

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);
const io = new Server(server);
/**
 * Create Socket server.
 */
/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('lisconnectiontening', onListening);


// 一旦某个用户连接上了 就自动进入只有自己一个人的房间 方便只给自己推送消息
io.on('connection',(socket)=>{
  console.log(socket.id)
  socket.on('disconnect',(reason)=>{
    console.log(reason);
  })

  socket.on('OwnMessage',(msg,callback)=>{

  })

  socket.on('LikeVideo',(msg,callback)=>{
    // 将客户端发送过来喜欢的人 和被喜欢的ID 将喜欢的人的名字推送给被喜欢的人
    socket.timeout(5000).to(msg.ObjectId).emit('LikeVideo',msg.Message,(err,response)=>{
        console.log(response);
        callback(response)
    })
    console.log(msg);
  })

  socket.on('Concern',(msg,callback)=>{
    // 将客户端发送过来喜欢的人 和被喜欢的ID 将喜欢的人的名字推送给被喜欢的人
    socket.timeout(5000).to(msg.ObjectId).emit('Concern',msg.Message,(err,response)=>{
         console.log(response);
        callback(response)
    })
    console.log(msg);
  })
  socket.on('Vistor',(msg,callback)=>{
    // 将客户端发送过来喜欢的人 和被喜欢的ID 将喜欢的人的名字推送给被喜欢的人
    socket.timeout(5000).to(msg.ObjectId).emit('Vistor',msg.Message,(err,response)=>{
        callback(response)
    })
    console.log(msg);
  })

  socket.on('Comment',(msg,callback)=>{
    // 将客户端发送过来喜欢的人 和被喜欢的ID 将喜欢的人的名字推送给被喜欢的人
    socket.timeout(5000).to(msg.ObjectId).emit('Comment',msg.Message,(err,response)=>{
        console.log(response);
        callback(response)
    })
    console.log(msg);
  })

  socket.on('CommentLike',(msg,callback)=>{
    // 将客户端发送过来喜欢的人 和被喜欢的ID 将喜欢的人的名字推送给被喜欢的人
    socket.timeout(5000).to(msg.ObjectId).emit('CommentLike',msg.Message,(err,response)=>{
         console.log(response);
        callback(response)
    })
    console.log(msg);
  })

  socket.on('ReadResponse',(msg)=>{
      // 设置ID
      socket.to(msg.RoomID).emit('ReadResponse',msg.Message);
  })

  socket.on('ReadResponse',(msg,callback)=>{
      console.log(msg);
      callback("read")
  })

  socket.on("TalkInRoomWithID",(msg,callback)=>{
      console.log(msg.RoomID);
      socket.timeout(5000).to(msg.RoomID).emit('chat',msg.Message,(err,response)=>{
        console.log(response);
        callback(response)
     })
  })

  socket.on("joinRoom",(msg,callback)=>{
      socket.join(msg);
      console.log("joinRoom",msg);
      callback("didJoinRoom");
  })

  socket.on('ChatinputState',(msg)=>{
      socket.to(msg.RoomID).emit('ChatinputState',msg.Message);
      console.log(msg.Message,msg);
  })

  socket.on('chat',(message)=>{
      console.log("有人发送啦消息给你",message);
  })
  
  socket.on('GetCurrentRoom',(CurrentRoom)=>{
      const value = Object.values(socket.rooms);
      console.log(value)
      socket.emit('chat',value)
  })


});

function onListening() {
  console.log('Server is running on 127.0.0.1 :' + port);
}

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
 }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

module.exports = {
  io
}

