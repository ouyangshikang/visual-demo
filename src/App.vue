<template>
  <div id="app">
    <Headers></Headers>
    <NavBar></NavBar>
    <transition name="no-mode-translate-fade">
        <router-view class="main_content"></router-view>
    </transition>
  </div>
</template>

<script>
import NavBar from './components/nav.vue';
import Headers from './components/header.vue';

export default {
    name: 'app',
    components: {
        NavBar,
        Headers
    },
    data () {
        return {

        };
    }
};
</script>

<style>
    @import './assets/css/app.css';
</style>
