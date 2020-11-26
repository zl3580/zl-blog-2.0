import React, { useEffect, useState } from 'react';
import { useRequest } from 'umi';
import styles from './index.less';
import codeBlock from './codeBlock'
import ReactMarkdown  from 'react-markdown/with-html'

export default (props:any) => {
let id=props.location.query.id
const [data,setData]=useState()
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
    }
  }
)
useEffect(()=>{
  
})

  return (
    <div className={styles.blogDetailsContainer}>
      <div className={styles.blogDetails} >
        <ReactMarkdown children={data} renderers={{code:codeBlock}} className="markdown" allowDangerousHtml={true}></ReactMarkdown>
      </div>
    </div>
  );
};
