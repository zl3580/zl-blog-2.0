import url from '*.svg';
import React, { useState } from 'react';
import { history,useRequest } from 'umi';
import styles from './index.less';



function renderTime(date:any) {
  const dateee = new Date(date).toJSON();
  return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ')
    .replace(/\.[\d]{3}Z/, '');
}
export default () => {
  const [bloData,setBlogData]=useState([])
  //获取文章列表
  const {data}=useRequest(()=>({
    url:'http://127.0.0.1:7001/api/article/find',
    method:'POST',
  }),
    {
      onSuccess:(data)=>{
      console.log("data", data)
      let temp=[];
      temp=data.list.map(item=>{
        return {
          id:item._id,
          title:item.title,
          createdAt:renderTime(item.createdAt),
        }
      })
      setBlogData(temp)
      }
    }
  )
  //获取文章详情
  const handleDetails=(id)=>{
    history.push( 
    {
    pathname: '/blog/details',
    query: {
      id,
    }
  },)
  }
  console.log("data", data)
  return (
 
    <div className={styles.blogContainer}>
      {
        bloData.map(item=>{
          return (
            <div className={styles.blogContent}>
            <div className={styles.blogTime}>{item.createdAt}</div>
            <div className={styles.blogInfo}>
                  <div className={styles.blogList} onClick={()=>handleDetails(item.id)}>
                  {item.title}
                  </div>
              <div className={styles.blogTimeEnd}></div>
            </div>
          </div>
          )
        })
      }
    </div>
  );
};
