import { createRouter, createWebHistory } from 'vue-router'
import ProfileView from '@/views/ProfileView.vue'

import Login from "@/views/auth/Login.vue";
import Register from "@/views/auth/Register.vue";
import VerifySms from "@/views/auth/VerifySms.vue";
import LogoutView from "@/views/auth/LogoutView.vue";
import PassportView from "@/views/PassportView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/verify-sms',
      name: 'verify-sms',
      component: VerifySms
    },
    {
      path: '/logout',
      name: 'logout',
      component: LogoutView
    },
    {
      path: '/profile/passport',
      name: 'passport',
      component: PassportView
    },
  ]
})

export default router
