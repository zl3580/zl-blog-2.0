import React, { useState } from 'react';
import styles from './index.less';
import { history } from 'umi';
import githubIcon from '@/assets/github.png';
import emailIcon from '@/assets/email.png';


export default (props:any) => {
console.log("props", props)
  const [active, setActive] = useState(props.location.pathname);
  const handleHome = () => {
    setActive('/');
    history.push('/')
  };
  const handleBlog = () => {
    setActive('/blog');
    history.push('/blog')
  };
  const handlePhoto = () => {
    setActive('/photo');
    history.push('/photo')
  };
  const handleMessage=()=>{
    setActive('/message');
    history.push('/message')
  }
  const handleImage=()=>{
    setActive('/');
    history.push('/')
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.side}>
        <div
        onClick={handleImage}
          className={styles.sideBtn}
          style={{
            backgroundPosition: `${(active === '/' && ' 78px 15px') ||
              (active === '/blog' && '143px 15px') ||
              (active === '/photo' && '199px 15px')||
              (active === '/message' && '262px 15px')} `,
          }}
        ></div>
        <div className={styles.navLink}>
          <a
            onClick={handleHome}
            style={{ color: `${active === '/' ? '#336699' : '#fff'}` }}
          >
            首页
          </a>
        </div>
        <div className={styles.navLink}>
          <a
            onClick={handleBlog}
            style={{ color: `${active === '/blog' ? '#336699' : '#fff'}` }}
          >
            博客
          </a>
        </div>
        <div className={styles.navLink}>
          <a
            onClick={handlePhoto}
            style={{ color: `${active === '/photo' ? '#336699' : '#fff'}` }}
          >
            照片
          </a>
        </div>
        <div className={styles.navLink}>
          <a
            onClick={handleMessage}
            style={{ color: `${active === '/message' ? '#336699' : '#fff'}` }}
          >
            留言板
          </a>
        </div>
        <div className={styles.githubLink}>
          <a href="https://github.com/zl3580?tab=repositories" target="_blank">
          <img src={githubIcon} alt="" />
          </a>
        </div>
        <div className={styles.emailLink}>
          <img src={emailIcon} alt="" />
        </div>
        <div className={styles.emailNum}>
        <span>zxc35804583@163.com</span>
        </div>
      </div>
      <div className={styles.content}>
      { props.children }
      </div>
    </div>
  );
};
