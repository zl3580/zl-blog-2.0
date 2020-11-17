import React, { useState } from 'react';
import { useRequest } from 'umi';
import styles from './index.less';

export default (props:any) => {
  const [data,setData]=useState([])
   //获取照片列表
   useRequest(()=>({
    url:'http://127.0.0.1:7001/api/photo/find',
    method:'POST',
  }),
    {
      onSuccess:(data)=>{
      console.log("data", data)
      setData(data.list)
      }
    }
  )
  return (
    <div className={styles.photoContainer}>
      {
        data.map(item=>{
          return (
            <div className={styles.photoImageBox}>
              <div className={styles.photoImageBox2} >
              <img src={item.url} alt="" srcset=""/>
              </div>
            
          </div>
          )
        })
      }
      
      </div>
  );
};
