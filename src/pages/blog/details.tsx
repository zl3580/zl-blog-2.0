import React, { useEffect, useState } from 'react';
import { useRequest,history } from 'umi';
import styles from './index.less';
import codeBlock from './codeBlock'
import ReactMarkdown  from 'react-markdown/with-html'
import xin from './../../assets/xin.png'
import xin1 from './../../assets/xin_1.png'
import back from './../../assets/fanhui.png'

export default (props:any) => {
let id=props.location.query.id
const [data,setData]=useState()
const [title,setTitle]=useState('')
const [like,setLike]=useState(0)
const [time,setTime]=useState('')

function renderTime(date:any) {
  const dateee = new Date(date).toJSON();
  return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ')
    .replace(/\.[\d]{3}Z/, '');
}
//获取文章详情
useRequest(()=>({
  url: window.baseUrl+'/article/details',
  method:'POST',
  data:{_id:id}
}),
  {
    onSuccess:(data)=>{
    console.log("data", data)
    setData(data.content)
    setTitle(data.title)
    setLike(data.pageview)
    const time=renderTime(data.createdAt);
    setTime(time)
    }
  }
)
useEffect(()=>{
  
})
const handleLike=()=>{
  console.log(111)
}
const handleTop=()=>{
  history.push('/blog');
}

  return (
    <div className={styles.blogDetailsContainer}>
      <p className={styles.blogDetailsTitle}>{title}</p>
      <div className={styles.blogDetails} >
        <ReactMarkdown children={data} renderers={{code:codeBlock}} className="markdown" allowDangerousHtml={true}></ReactMarkdown>
        <div className={styles.endInfo}>
        <div className={styles.creatTime}>创建时间：<span>{time}</span></div>
        <div className={styles.creatTime}>公众号：<span>写代码的机器人</span></div>
        </div>
       
      </div>
      <div className={styles.operation}>
        <div onClick={handleLike} className={styles.like}>
        <img src={xin}></img>
        {/* <img src={xin1}></img> */}
        {like>0&& <span>{like}</span>}
        </div>
        <div onClick={handleTop} className={styles.like}>
        <img src={back}></img>
        </div>
      </div>
    </div>
  );
};
