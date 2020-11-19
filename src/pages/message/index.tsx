import React, { useEffect, useState } from 'react';
import { useRequest } from 'umi';
import styles from './index.less';
import './message.less';
import { socketSend, socketget, socketSendBack } from '../../utils/webocket';

export default (props: any) => {
  const [data, setData] = useState([]);
  const [pageData, setPageData] = useState([]);
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [pageCheck, setPageCheck] = useState(1);
  const [translate, setTranslate] = useState(0);
  const [value, setValue] = useState({ username: '神秘人', content: '' });
  const [isAnswerData, setIsAnswerData] = useState([]);
  const [backValue, setBackValue] = useState('');
  const [isEmpty, setIsEmpty] = useState([]);
  const [isEmptyContent, setIsEmptyContent] = useState(false);

  //获取照片列表
  const { run: getData } = useRequest(
    pageNum => ({
      url: window.baseUrl+'/message/get',
      method: 'POST',
      data: {
        pageNum,
        pageSize: 10,
      },
    }),
    {
      onSuccess: data => {
        console.log('data', parseInt(data.count / 10 + 1));
        setData(data.list);
        let length =
          data.count % 10 === 0
            ? data.count / 10
            : parseInt(data.count / 10 + 1);
        console.log('length', length);
        setCount(length);
        setTotal(data.count);
        let pageData = [];
        for (let i = 1; i <= length; i++) {
          pageData.push(i);
        }
        setPageData(pageData);
      },
    },
  );
  useEffect(() => {
    socketget(setData, setCount, setTotal);
    console.log(window)
    if (window.Notification) {
      // 支持
      console.log('支持')
      let msg=new Notification('留言板回复', {body:'你是傻逼吗'});
      console.log("msg", msg)
      msg.onshow('ss')
    } else {
      // 不支持
      console.log('不支持')
    }
  }, []);
  //username
  const handleUsername = event => {
    console.log(event.target.value);
    setValue({ username: event.target.value, content: value.content });
  };
  //留言内容
  const handleContent = event => {
    setValue({ content: event.target.value, username: value.username });
    setIsEmptyContent(false)
  };
  //提交
  const handleSubmit = async () => {
   
    if (!value.content) {
     
      setIsEmptyContent(true)
      return;
    }
    
    await socketSend({ content: value.content, name: value.username||'神秘人' });
    setValue({ username: '神秘人', content: '' });
    setPageCheck(1);
  };
  //回复内容
  const handleBackValue = event => {
    setBackValue(event.target.value);
  };
  //确认回复
  const handleBackSubmit = async (index, id) => {
    if (!backValue) {
      let temp = [...isEmpty];
      temp[index] = !temp[index];
      setIsEmpty(temp);
      return;
    }
    await socketSendBack({ id, backMessage: backValue });
    let temp = [...isAnswerData];
    temp[index] = !temp[index];
    setIsAnswerData(temp);
    setBackValue('');
  };

  //分页
  const handlePage = (index: Number) => {
    setPageCheck(index);
    getData(index);
    window.scrollTo(0, 0);
  };
  //上一页
  const handlePagePre = () => {
    let pageNumber = pageCheck - 1 > 0 ? pageCheck - 1 : 1;
    getData(pageNumber);
    setPageCheck(pageNumber);
    if (pageNumber === 1) {
      setTranslate(0);
      return;
    }
    setTranslate(translate + 1);
  };
  //下一页
  const handlePageNext = () => {
    console.log('count', count);
    let pageNumber = pageCheck + 1 > count ? count : pageCheck + 1;
    getData(pageNumber);
    setPageCheck(pageNumber);
    if (pageNumber === count) {
      setTranslate(-(count - 10));
      return;
    }
    console.log('translate', translate);
    if (translate <= 10 - count + 1) {
      setTranslate(-(count - 10));
      return;
    }
    setTranslate(translate - 1);
  };
  return (
    <div className={styles.messageContainer}>
      <div className={styles.messageBox}>
        <div className={styles.messageInputBox}>
          <span>用户名：</span>
          <input
            type="text"
            autoFocus
            onChange={handleUsername}
            value={value.username}
          ></input>
        </div>
        <div className={styles.messageInputBox}>
          <span>留言内容：</span>
          <textarea
            className="textarea"
            autoFocus
            onChange={handleContent}
            value={value.content}
          ></textarea>
           <div
                    style={{
                      paddingLeft:'200px',
                      color: '#e45353',
                      fontSize: '12px',
                      padding: '5px',
                      opacity: `${isEmptyContent ? '1' : '0'}`,
                    }}
                  >
                    内容不能为空
                  </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <input
            type="button"
            value="提交"
            className="button"
            onClick={handleSubmit}
          ></input>
        </div>
      </div>
      <div className={styles.messageList}>
        <div></div>
        {data.map((item, index) => {
          return (
            <div className={styles.messageItemContainer}>
              <div className={styles.messageAvatar}>
                <img src={item.avatar} alt="" srcset="" />
              </div>
              <div className={styles.messageInfo}>
                <div className={styles.messageName}>
                  <div style={{ float: 'left' }}>
                    {item.name}
                    <span>{item.ip}</span>
                    <span>第{total - (pageCheck - 1) * 10 - index}楼</span>
                  </div>
                  <div
                    style={{
                      float: 'right',
                      fontSize: '14px',
                      fontWeight: 'normal',
                    }}
                  >
                    {item.createdAt}
                  </div>
                </div>
                <div className={styles.messageInfoContent}>{item.content}</div>
                {item.backInfo.map((option, index) => {
                  return (
                    <div className={styles.messageCallBack}>
                      机器人{index + 1}号：{option.message}
                    </div>
                  );
                })}
                <div
                  className={styles.backInput}
                  style={{
                    display: `${isAnswerData[index] ? 'block' : 'none'}`,
                  }}
                >
                  <textarea
                    className="textarea"
                    autoFocus
                    onChange={handleBackValue}
                    value={backValue}
                    placeholder="回复内容..."
                  ></textarea>
                  <div  className={styles.backbutton}>
                  <a
                   style={{marginRight:'10px'}}
                    onClick={() => {
                      let temp = [...isAnswerData];
                      temp[index] = false;
                      setIsAnswerData(temp);
                    }}
                  >
                    取消
                  </a>
                  <a
                   
                    onClick={() => handleBackSubmit(index, item._id)}
                  >
                    提交
                  </a>
                  </div>
                  
                  <div
                    style={{
                      color: '#e45353',
                      fontSize: '12px',
                      padding: '5px',
                      opacity: `${isEmpty[index] ? '1' : '0'}`,
                    }}
                  >
                    内容不能为空
                  </div>
                </div>

                <div className={styles.backContainer}>
                  <a
                    onClick={() => {
                      let temp = [];
                      temp[index] = true;
                      setIsAnswerData(temp);
                      setIsEmpty([])
                      setBackValue('')
                    }}
                  >
                    回复
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.page}>
        <div className={styles.pageItem} onClick={handlePagePre}>
          {' '}
          &lt;{' '}
        </div>
        <div className={styles.pageTranslate}>
          <div
            className={styles.pageContainer}
            style={{ transform: `translateX(${translate * 40}px)` }}
          >
            {pageData.map(item => (
              <div
                className={styles.pageItem}
                onClick={() => handlePage(item)}
                style={{
                  color: `${pageCheck === item ? '#80dfcf' : '#fff'}`,
                  borderColor: `${pageCheck === item ? '#80dfcf' : '#385550'}`,
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        <div
          className={styles.pageItem}
          onClick={handlePageNext}
          style={{
            background: `${pageCheck === count ? '#ccc' : ''}`,
            cursor: `${pageCheck === count ? 'not-allowed' : 'pointer'}`,
          }}
        >
          &gt;
        </div>
      </div>
    </div>
  );
};
