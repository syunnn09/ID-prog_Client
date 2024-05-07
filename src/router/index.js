import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Editor from '../views/Editor.vue'
import EditorJS from '../views/EditorJS.vue'

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
      path: '/edit',
      name: 'editorjs',
      component: EditorJS
    },
  ]
})

export default router
