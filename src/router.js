import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
			redirect: '/home', //路由重定向
			children: [
				{
					path: '/home',
					name: 'home',
					component: Home
				},
				{
					path: '/list/:url/:modelName',
					//path: '/list',
					name: 'list',
					component: () => import(/* webpackChunkName: "list" */ './views/List.vue')
				},
				{
					path: '/detail/:id',
					name: 'detail',
					component: () => import(/* webpackChunkName: "detail" */ './views/Detail.vue')
				},
				{
					path: '/download',
					name: 'download',
					component: () => import(/* webpackChunkName: "download" */ './views/Download.vue')
				},
				{
					path: '/searchNews',
					name: 'searchNews',
					component: () => import(/* webpackChunkName: "searchNews" */ './views/SearchNews.vue')
				}
			]
    },
		{
			path: '/email',
			name: 'email',
			component: () => import(/* webpackChunkName: "email" */ './views/Email.vue')
		}
  ],
	scrollBehavior (to, from, savedPosition) {//切换路由的时候滚动到顶部
		return { x: 0, y: 0 }
	}
})

