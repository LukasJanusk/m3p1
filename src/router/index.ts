import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView/HomeView.vue'
import CalendarView from '@/views/CalendarView/CalendarView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      props: route => {
        const dateParam = route.query.date
        return { date: dateParam }
      },
      children: [
        {
          path: 'day/:date',
          name: 'HomeView',
          component: HomeView,
          props: true,
        },
      ],
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: CalendarView,
      props: route => {
        const dateParam = route.query.date as string | undefined
        return { date: dateParam }
      },
      children: [
        {
          path: 'day/:date',
          name: 'CalendarView',
          component: CalendarView,
          props: true,
        },
      ],
    },
    {
      path: '/habits',
      name: 'habits',
      component: () => import('../views/HabitView/HabitsView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})
export default router
