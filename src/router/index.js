import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/Login.vue'
import Home from '@/components/home/Home.vue'
import Users from '@/components/users/Users.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      name:'login',
      path:'/login',
      component:Login,
    },
    {
      name:'home',
      path:'/',
      component:Home,
      children:[
        {name:'users',
        path:'users',
        component:Users,
      }
      ]
    }

  ]
})
