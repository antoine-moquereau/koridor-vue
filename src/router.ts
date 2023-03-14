import { createRouter, createWebHistory } from 'vue-router'
import Home from './components/pages/Home.vue'
import Game from './components/pages/Game.vue'
import Rules from './components/pages/Rules.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      alias: '/home',
      component: Home,
      path: '/'
    },
    {
      component: Rules,
      path: '/rules'
    },
    {
      component: Game,
      path: '/game/:players(2|4)?'
    },
  ],
})
