import { createRouter, createWebHistory } from 'vue-router';
import { loadViewRoutes } from './helpers';

const routes = loadViewRoutes();

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title as string;
  next();
});

export default router;
