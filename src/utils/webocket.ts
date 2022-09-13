
import io from 'socket.io-client';
const socketSend=(params)=>{
  const socket=io('https://zhouyanli.lxzyl.cn', {transports: ['websocket']});
  socket.on('connect', () => {
    console.log('已连接!');
    socket.emit('message', params);
    if (window.Notification) {
    console.log("🚀 ~ file: webocket.ts ~ line 9 ~ socket.on ~ params", params)
      // 支持
      console.log('支持');
     
      Notification.requestPermission().then(function(permission) {
        if(permission === 'granted'){
            console.log('用户允许通知');
            new Notification('一条新留言', { body: `${params.name}留言:${params.content}` });
        }else if(permission === 'denied'){
            console.log('用户拒绝通知');
        }
    });
    
    } else {
      // 不支持
      console.log('不支持');
    }
  });
};
const socketSendBack=(params)=>{
  const socket=io('https://zhouyanli.lxzyl.cn', {transports: ['websocket']});
  socket.on('connect', () => {
    console.log('已连接!');
    socket.emit('messageBack', params);
    if (window.Notification) {
        // 支持
        console.log('支持');
       
        Notification.requestPermission().then(function(permission) {
          if(permission === 'granted'){
              console.log('用户允许通知');
              new Notification('一条回复消息', { body: params.backMessage });
          }else if(permission === 'denied'){
              console.log('用户拒绝通知');
          }
      });
      
      } else {
        // 不支持
        console.log('不支持');
      }
    });
};
const socketget=(setList, setCount, setTotal)=>{
  const socket=io('https://zhouyanli.lxzyl.cn', {transports: ['websocket']});
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