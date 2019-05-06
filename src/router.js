import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import MyFriends from './views/MyFriends.vue';
import MyExercise from './views/MyExercise.vue';
import AddWorkout from './views/AddWorkout.vue';
import Register from './views/Register.vue';
import Login from './views/Login.vue';
import SiteUsers from './views/SiteUsers.vue';
import { Globals } from './models/api';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/MyFriends',
      name: 'my-friends',
      component: MyFriends,
    },
    {
      path: '/SiteUsers',
      name: 'site-users',
      component: SiteUsers,
    },
    {
      path: '/MyExercise',
      name: 'my-exercise',
      component: MyExercise,
    },
    {
      path: '/AddWorkout',
      name: 'add-workout',
      component: AddWorkout,
    },
    {
      path: '/Register',
      name: 'register',
      component: Register,
    },
    {
      path: '/Login',
      name: 'login',
      component: Login,
    },
    {
      path: '/About',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const publicRoutes = ['home', 'login', 'register', 'about', 'site-users'];
  if (!publicRoutes.includes(to.name) && !Globals.user) {
    Globals.redirectRoute = {
      name: to.name, path: to.path, params: to.params, query: to.query, hash: to.hash,
    };
    return next('Login');
  }
  return next();
});

export default router;
