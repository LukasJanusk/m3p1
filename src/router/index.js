import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CalendarView from '../views/CalendarView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      props: route => {
        const dateParam =
          route.query.date || new Date().toISOString().split('T')[0]
        return { date: dateParam }
      },
    },
    {
      path: '/day/:date',
      name: 'HomeView',
      component: HomeView,
      props: true,
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: () => import('../views/CalendarView.vue'),
      props: route => {
        const dateParam =
          route.query.date || new Date().toISOString().split('T')[0]
        return { date: dateParam }
      },
    },
    {
      path: '/calendar/day/:date',
      name: 'CalendarView',
      component: CalendarView,
      props: true,
    },
    {
      path: '/habits',
      name: 'habits',
      component: () => import('../views/HabitsView.vue'),
    },
  ],
})

export default router
