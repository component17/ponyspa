import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index'
import Settings from '@/pages/settings'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings,
    }
  ]
})
