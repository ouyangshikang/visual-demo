// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import store from './store/store';
import VueRouter from 'vue-router';
import routes from './router';

Vue.use(VueRouter);
/* eslint-disable no-new */

const router = new VueRouter({
    routes
});

new Vue({
    el: '#app',
    template: '<App/>',
    components: { App },
    router,
    store
});
