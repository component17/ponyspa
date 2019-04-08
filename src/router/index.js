import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index'
import Settings from '@/pages/settings'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
    },
    {
      path: '/port/:id',
      name: 'Settings',
      component: Settings,
    }
  ]
})
