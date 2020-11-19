import React, { useState } from 'react';
import { useRequest,history } from 'umi';
import styles from './index.less';

export default (props: any) => {
  const [data, setData] = useState([]);
  //获取照片列表
  useRequest(
    () => ({
      url:  window.baseUrl+'/photo/find',
      method: 'POST',
    }),
    {
      onSuccess: data => {
        console.log('data', data);
        setData(data.list);
      },
    },
  );
  //查看图片
  const handleImage=(id)=>{
    history.push( 
      {
      pathname: '/photo/details',
      query: {
        id,
      }
    },)
  }
  return (
    <div className={styles.photoContainer}>
      {data.map(item => {
        return (
          <div className={styles.photoImageBox}>
            <div className={styles.photoImageBox2}>
              <img src={item.url} alt="" srcset="" />
            </div>
            <div className={styles.photoImgShade}>
            </div>
            <img src={item.url} alt="" srcset=""
             className={styles.circleImage} onClick={()=>handleImage(item._id)}/>
          </div>
        );
      })}
    </div>
  );
};
