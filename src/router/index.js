import Vue from 'vue'
import Router from 'vue-router'
import Store from '@/components/Store'
import Menu from '@/components/Menu'
import Order from '@/components/Order'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Store',
      component: Store
    },
    {
      path: '/orders',
      name: 'Order',
      component: Order
    },
    {
      path: '/menus',
      name: 'Menu',
      component: Menu
    }
  ]
})
