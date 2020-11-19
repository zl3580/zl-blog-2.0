import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/',
     component: '@/layout/index',
     routes:[
      { path: '/', component: '@/pages/home/index' },
      { path: '/blog', component: '@/pages/blog/index' },
      { path: '/blog/details', component: '@/pages/blog/details' },
      { path: '/photo', component: '@/pages/photo/index' },
      { path: '/photo/details', component: '@/pages/photo/details' },
      { path: '/message', component: '@/pages/message/index' },
    ]},
   
  ],
});
