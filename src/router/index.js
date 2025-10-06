import { createRouter, createWebHistory } from 'vue-router';

import Contact from '../views/Contact.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Dashboard from '../views/Dashboard.vue';

// Définis les routes
const routes = [
  { path: '/', redirect: '/login' },
  { path: '/contact', component: Contact },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/dashboard', component: Dashboard },
];

// Crée l'instance du routeur
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
