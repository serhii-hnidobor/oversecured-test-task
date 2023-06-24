import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'
import EditVisitorView from '../views/EditVisitorView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainView
    },
    {
      path: '/add-visitor',
      name: 'add visitor',
      component: EditVisitorView
    },
    {
      path: '/update/:id',
      name: 'update',
      component: EditVisitorView,
      props: true
    }
  ]
})

export default router
