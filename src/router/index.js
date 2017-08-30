import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Grid from '@/components/Grid'
import Table from '@/components/Table'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: '/table'
    },
    {
      path: '/hello',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/table',
      name: 'Table',
      component: Table
    },
    {
      path: '/grid',
      name: 'Grid',
      component: Grid
    }
  ]
})
