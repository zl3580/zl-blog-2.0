import url from '*.svg';
import React, { useState } from 'react';
import { history, useRequest } from 'umi';
import styles from './index.less';
import soushuo from './../../assets/soushuo.png';

function renderTime(date: any) {
  const dateee = new Date(date).toJSON();
  return new Date(+new Date(dateee) + 8 * 3600 * 1000)
    .toISOString()
    .replace(/T/g, ' ')
    .replace(/\.[\d]{3}Z/, '');
}
export default () => {
  const [bloData, setBlogData] = useState([]);
  const [tagData, setTagData] = useState([]);
  const [searchData, setSearchData] = useState(undefined);
  //获取文章列表
  useRequest(
    () => ({
      url: window.baseUrl + '/article/find',
      method: 'POST',
    }),
    {
      onSuccess: data => {
        console.log('data', data);
        let temp = [];
        temp = data.list.map(item => {
          return {
            id: item._id,
            title: item.title,
            createdAt: renderTime(item.createdAt),
          };
        });
        setBlogData(temp);
      },
    },
  );
  //获取文章分类
  useRequest(
    () => ({
      url: window.baseUrl + '/tag/get',
      method: 'POST',
    }),
    {
      onSuccess: data => {
        console.log('data', data);
        setTagData(data.list);
      },
    },
  );
   //搜索文章
   const {run:runSearch}=useRequest(
    (data) => ({
      url: window.baseUrl + '/menubar/search',
      method: 'POST',
      data,
    }),
    {
      manual: true,
      onSuccess: data => {
        console.log('data', data);
      },
    },
  );
  //获取文章详情
  const handleDetails = id => {
    history.push({
      pathname: '/blog/details',
      query: {
        id,
      },
    });
  };
   //input值
   const handleChange=(event)=>{
    console.log("🚀 ~ file: index.tsx ~ line 61 ~ handleChange ~ val", event.target.value)
    setSearchData(event.target.value)
    }
    //搜素
    const handleSearch=()=>{
// let input=document.getElementById('searchInputId')
// input.style.width='200px'
// console.log("🚀 ~ file: index.tsx ~ line 83 ~ handleSearch ~ inputId", input)
      runSearch({type:'article',keyword:searchData})
console.log('搜搜')
    }
  return (
    <div className={styles.blogContainer}>
      <div className={styles.blogSearch}>
        <div className={styles.soushuoContainer}>
          <input type="text" onChange={handleChange} id="searchInputId"/>
          <a className={styles.iconWrap} onClick={handleSearch}>
          <img src={soushuo} ></img>
          </a>
        </div>

        <div>
          {tagData.map(item => {
            return <div className={styles.tag}>{item.title}</div>;
          })}
        </div>
      </div>
      <div className={styles.blogWidth}>
        {bloData.map(item => {
          return (
            <div className={styles.blogContent}>
              <div className={styles.blogTime}>{item.createdAt}</div>
              <div className={styles.blogInfo}>
                <div
                  className={styles.blogList}
                  onClick={() => handleDetails(item.id)}
                >
                  {item.title}
                </div>
                <div className={styles.blogTimeEnd}></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
