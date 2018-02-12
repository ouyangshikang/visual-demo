import 'babel-polyfill';
import Vue from 'vue';
import Vuex from 'vuex';
import isShow from './isShow';

Vue.use(Vuex);

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    modules: {
        isShow
    }
});
