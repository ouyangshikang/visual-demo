<template>
     <transition name="fade">
         <div class="nav-list-wrapper">
             <ul class="nav-list" id="nav-bar-nav">
                 <li
                    class="nav-item"
                    v-for="(item,index) in items"
                    :key="index"
                >
                     <router-link :to="'/' + item.ad">{{item.name}}</router-link>
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
                    ad: 'blog'
                }, {
                    name: 'Javascript',
                    ad: 'js'
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
    @media screen and (min-width: 500px) and (max-width: 1100px){
        *{
            box-sizing: border-box;
        }
        body{
            background-color: #fff;
            width: 100%;
        }
        #nav-bar-nav{
            position: fixed;
            top: 50px;
            left: 0;
            width: 100%;
            height: 40px;
            z-index: 100;
            background: #fff;
            border:none;
            border-right: 1px solid #eee;
            display: flex;
            display: -webkit-flex;
            justify-content: space-between;
            overflow-x: auto;
            box-shadow: 0 1px 2px rgba(0,0,0,.1);
        }
        #nav-bar-nav:after{
            content: '';
            display: table;
            clear: both;
        }
        #nav-bar-nav::-webkit-scrollbar{
            width: 0;
            height: 0;
        }
        .qr_logo{
            display: none;
        }
        .nav-list{
            height: 45px;
        }
        .nav-item{
            list-style: none;
            text-align: center;
            cursor: pointer;
            min-width: 80px;
            background-color: #fff;
            border-bottom: 1px solid #eee
        }
        .nav-item a{
            display: block;
            min-width: 80px;
            height: 100%;
            text-decoration: none;
            color: #000;
            padding-left: 0;
        }
        a.router-link-active{
            color: #1BA261;
            font-weight: bold;
        }
        a.router-link-active:before{
            display: none;
        }
        .nav-item a:hover{
            background-color: #f0f0f0;
            cursor: pointer;
            color: #008000;
        }
        .fade-enter-active, .fade-leave-active {
          transition: opacity .3s;
        }
        .fade-enter, .fade-leave-active {
          opacity: 0;
        }
    }
    @media screen and (max-width: 500px){
        .nav-list-wrapper{
            position: fixed;
            top: 50px;
            left: 0;
            width: 100%;
            height: 40px;
            z-index: 100;
        }
        #nav-bar-nav{
            position: fixed;
            top: 50px;
            left: 0;
            width: 100%;
            height: 40px;
            z-index: 100;
            background: #fff;
            border:none;
            border-right: 1px solid #eee;
            display: flex;
            display: -webkit-flex;
            justify-content: space-between;
            overflow-x: auto;
            box-shadow: 0 1px 2px rgba(0,0,0,.1);
        }
        #nav-bar-nav:after{
            content: '';
            display: table;
            clear: both;
        }
        #nav-bar-nav::-webkit-scrollbar{
            width: 0;
            height: 0;
        }
        .qr_logo{
            display: none;
        }
        .nav-list{
            height: 45px;
        }
        .nav-item{
            list-style: none;
            text-align: center;
            cursor: pointer;
            min-width: 80px;
            background-color: #fff;
            border-bottom: 1px solid #eee
        }
        .nav-item a{
            display: block;
            min-width: 80px;
            height: 100%;
            text-decoration: none;
            color: #000;
            padding-left: 0;
        }
        a.router-link-active{
            color: #1BA261;
            font-weight: bold;
        }
        a.router-link-active:before{
            display: none;
        }
        .nav-item a:hover{
            background-color: #f0f0f0;
            cursor: pointer;
            color: #008000;
        }
        .fade-enter-active, .fade-leave-active {
          transition: opacity .3s;
        }
        .fade-enter, .fade-leave-active {
          opacity: 0;
        }
    }
</style>
