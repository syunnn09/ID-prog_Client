import { createRouter, createWebHistory } from 'vue-router'
import Editor from '../views/Editor.vue'
import Login from '../views/Login.vue'
import SignupView from '../views/SignupView.vue'
import UserTop from '../views/UserTop.vue'
import StudyView from '../views/StudyView.vue'
import SectionsListView from '../views/SectionsListView.vue'
import Questionnaire from '../views/Questionnaire.vue'
import ContenteditableEditor from '../views/ContenteditableEditor.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: UserTop
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
    {
      path: '/signup',
      name: 'signup',
      component: SignupView
    },
    {
      path: '/study/:id',
      name: 'study',
      component: SectionsListView
    },
    {
      path: '/study/:id/:section',
      name: 'questions',
      component: StudyView
    },
    {
      path: '/questionnaire',
      name: 'questionnaire',
      component: Questionnaire
    },
    {
      path: '/contenteditable',
      name: 'contenteditable',
      component: ContenteditableEditor
    },
  ]
});

export default router
