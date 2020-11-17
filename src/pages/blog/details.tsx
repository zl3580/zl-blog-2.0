import React, { useEffect, useState } from 'react';
import { useRequest } from 'umi';
import styles from './index.less';
import './../../global.less'
import ReactMarkdown  from 'react-markdown'

export default (props:any) => {
let id=props.location.query.id
const [data,setData]=useState()
//获取文章详情
useRequest(()=>({
  url:'http://127.0.0.1:7001/api/article/details',
  method:'POST',
  data:{_id:id}
}),
  {
    onSuccess:(data)=>{
    console.log("data", data)
    setData(data.content)
    }
  }
)
useEffect(()=>{
  
})

  return (
    <div className={styles.blogDetailsContainer}>
      <div className={styles.blogDetails} >
        <ReactMarkdown source={data} className="markdown"></ReactMarkdown>
      </div>
    </div>
  );
};
