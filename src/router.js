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
					path: '/list/:id',
					name: 'list',
					component: () => import(/* webpackChunkName: "list" */ './views/List.vue')
				},
				{
					path: '/details/:id',
					name: 'details',
					component: () => import(/* webpackChunkName: "list" */ './views/Details.vue')
				}
			]
    }
  ]
})
