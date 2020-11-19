import React, { useState } from 'react';
import styles from './index.less';

export default (props:any) => {
  return (
    <div className={styles.homeContainer}>
        <div className={styles.title}>
          门前<span>顾城</span>
        </div>
        <div className={styles.contentWrap}>
          <div className={styles.contentLeft}>
            <p> 我多么希望，有一个门口。</p>
            <p> 早晨，阳光照在草上。</p>
            <p> 我们站着，扶着自己的门。</p>
            <p> 扇门很低，但太阳是明亮的。</p>
            <p> 草在结它的种子，风在摇它的叶子。</p>
            <p> 我们站着，不说话，就十分美好。</p>
            <p> 有门，不用开开，</p>
            <p> 是我们的，就十分美好。</p>
            <p> 黑夜，还要流浪。</p>
            <p> 我们把六弦琴交给他，我们不走了，</p>
          </div>
          <div className={styles.contentRight}>
            <p> 我们需要土地，需要永不毁灭的土地，</p>
            <p> 我们要乘着它度过一生。</p>
            <p> 土地是粗糙的，有时狭隘。</p>
            <p> 然而，它有历史，</p>
            <p> 有一份天空，一份月亮，一份露水，和早晨。</p>
            <p> 我们爱土地，</p>
            <p> 我们站着用木鞋挖着泥土，门也晒热了。</p>
            <p> 我们轻轻靠着，十分美好。</p>
            <p>墙后的草不会再长大了，</p>
            <p> 它只用指尖，触了触阳光。</p>
          </div>
        </div>
      </div>
  );
};
