import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import WorkoutGenerator from '../views/WorkoutGenerator.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/WorkoutGenerator',
    name: 'WorkoutGenerator',
    component: WorkoutGenerator
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
