import { createRouter, createWebHistory } from 'vue-router';
import EnergyData from "@/components/EnergyData.vue";
import LoginRegister from "@/components/LoginRegister.vue";
import Cookies from 'js-cookie'; // Import js-cookie for handling cookies

const routes = [
  { path: '/', name: 'LoginRegister', component: LoginRegister },
  { path: '/main', name: 'EnergyData', component: EnergyData, meta: { requiresAuth: true } }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const user = Cookies.get('user'); // Get the user from cookies

  if (requiresAuth && !user) {
    next('/');
  } else {
    next(); 
  }
});

export default router;
