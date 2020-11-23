#!/bin/bash
echo "开始部署前端页面！"
git fetch --all  
git reset --hard origin/master
echo "开始 cnpm install"
cnpm install
echo "开始stop express"
pm2 stop 3
echo "开始 npm build"
npm run build
echo "开始start express"
pm2 restart 3
echo "前端页面部署完成！"

