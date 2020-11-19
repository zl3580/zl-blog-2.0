import React, { useEffect, useState } from 'react';
import { useRequest } from 'umi';
import styles from './index.less';

export default (props:any) => {
let id=props.location.query.id
const [data,setData]=useState()
//获取文章详情
useRequest(()=>({
  url: window.baseUrl+'/photo/details',
  method:'POST',
  data:{_id:id}
}),
  {
    onSuccess:(data)=>{
    console.log("data", data)
    setData(data.url)
    }
  }
)
  return (
    <div className={styles.photoDetailsContainer}>
      <div className={styles.photoDetails} >
        <img src={data} alt="" srcset=""/>
      </div>
    </div>
  );
};
