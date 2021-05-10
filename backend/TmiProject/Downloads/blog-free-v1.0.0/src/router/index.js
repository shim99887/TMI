import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import SearchPwd from '../components/sub1/searchPwd.vue'
import regist from '../components/sub1/regist.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/searchPwd',
      name: 'searchPwd',
      component: SearchPwd,
    },
    {
      path: '/regist',
      name: 'regist',
      component: regist,
    }
  ],
})
