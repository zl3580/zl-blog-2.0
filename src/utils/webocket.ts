
import io from 'socket.io-client';
const socketSend=(params)=>{
  const socket=io('http://127.0.0.1:7001', {transports: ['websocket']});
  socket.on('connect', () => {
    console.log('已连接!');
    socket.emit('message', params);
  });
};
const socketSendBack=(params)=>{
  const socket=io('http://127.0.0.1:7001', {transports: ['websocket']});
  socket.on('connect', () => {
    console.log('已连接!');
    socket.emit('messageBack', params);
  });
};
const socketget=(setList, setCount, setTotal)=>{
  const socket=io('http://127.0.0.1:7001', {transports: ['websocket']});
  socket.on('res', (msg)=>{
    console.log('接收到res');
    let count=Number.isInteger(msg.count/10)?msg.count/10:parseInt(msg.count/10)+1;
    setList(msg.list);
    setCount(count);
    setTotal(msg.count);
  }
  );
};
export {socketSend, socketget, socketSendBack};