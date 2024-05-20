import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Editor from '../views/Editor.vue'
import Login from '../views/Login.vue'
<<<<<<< HEAD
=======
import store from '@/store/index.js'
>>>>>>> 9d9642f28d952ed1890028a5c4b3bd46424e6cc2

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/editor',
      name: 'editor',
      component: Editor
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
  ]
});
<<<<<<< HEAD
=======

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && !store.state.user) {
    next({ path: '/login', query: { redirect: to.fullPath } });
  } else {
    next();
  }
});
>>>>>>> 9d9642f28d952ed1890028a5c4b3bd46424e6cc2

export default router
