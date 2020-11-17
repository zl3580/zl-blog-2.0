import React, { useState } from 'react';
import { useRequest } from 'umi';
import styles from './index.less';
import './message.less';

export default (props: any) => {
  const [data, setData] = useState([]);
  //获取照片列表
  useRequest(
    () => ({
      url: 'http://127.0.0.1:7001/api/message/get',
      method: 'POST',
      data: {
        pageNum: 1,
        pageSize: 10,
      },
    }),
    {
      onSuccess: data => {
        console.log('data', data);
        setData(data.list);
      },
    },
  );
  return (
    <div className={styles.messageContainer}>
      <div className={styles.messageBox}>
        <div className={styles.messageInputBox}>
          <span>用户名：</span>
          <input type="text" autoFocus placeholder="神秘人"></input>
        </div>
        <div className={styles.messageInputBox}>
          <span>留言内容：</span>
          <input type="text" className="textarea" autoFocus></input>
        </div>
      </div>
      <div className={styles.messageList}>
        {data.map(item => {
          return (
            <div className={styles.messageItemContainer}>
              <div className={styles.messageAvatar}>
                <img src={item.avatar} alt="" srcset="" />
              </div>
              <div className={styles.messageInfo}>
                <div className={styles.messageName}>
                  {item.name} 
                  <span>{item.createdAt}</span>
                </div>
                <div className={styles.messageInfoContent}>{item.content}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
