<template>
     <transition name="fade">
         <div class="nav-list-wrapper">
             <ul class="nav-list" id="nav-bar-nav">
                 <li
                    class="nav-item"
                    v-for="(item,index) in items"
                    :key="index"
                >
                     <router-link :to="'/' + item.url">{{item.name}}</router-link>
                 </li>
             </ul>
         </div>
    </transition>
</template>

<script>
    // import { mapActions } from 'vuex';
    export default {
        data () {
            return {
                items: [{
                    name: '技术博客',
                    url: 'blog'
                }, {
                    name: 'Javascript',
                    url: 'js'
                }, {
                    name: 'canvas学习demo',
                    url: 'canvas-demo'
                }]
            };
        }
    };
</script>

<style scoped>
    .nav-list-wrapper{
        width: 200px;
        height: 100%;
        position: absolute;
        top: 60px;
        left: 0;
        background-color: #fff;
        border-right: 1px solid #E8E8E8;
    }
    .qr_logo{
        position: absolute;
        top: 520px;
        left: 0;
        width: 200px;
        height: 120px;

    }
    .qr_logo span{
        display: block;
        height: 40px;
        color: #333;
        line-height: 40px;
        cursor: pointer;
        padding-left: 30px;
        background-color: #fff;
        border-right: 1px solid #E8E8E8;
        border-bottom: 1px solid #eee;
    }
    .qr_logo:hover img{
        opacity: 1;
    }
    .qr_logo img{
        position: absolute;
        top: 45px;
        left: 15px;
        width: 100px;
        height: 100px;
        opacity: 0;
        transition: all .2s;
    }
    .nav-list{
        width: 200px;
        position: absolute;
        top: 0;
        left: 0;
        box-sizing: border-box;
        background-color: #fff;
        border-right: 1px solid #E8E8E8;
    }
    .nav-item{
        list-style: none;
        height: 40px;
        line-height: 40px;
        position: relative;
        cursor: pointer;
        border-bottom: 1px solid #eee;
    }
    .nav-item a{
        display: block;
        text-decoration: none;
        color: #727272;
        font-weight: bold;
        transition: all .2s;
        padding-left: 30px;
    }
    .nav-item a:hover{
        background-color:rgba(0,0,0,0.05);;
        cursor: pointer;
        color: #021c36;
        font-weight: bold;
    }
    a.router-link-active{
        color:#021c36;
        font-weight: bold;
        background: rgba(0,0,0,0.05);
    }
    a.router-link-active:before{
        position: absolute;
        left: 0;
        bottom: 0;
        display: block;
        content: '';
        width: 4px;
        height: 40px;
        background-color: #021c36;
    }
</style>
