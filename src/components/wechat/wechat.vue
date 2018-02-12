<template>
    <div class="vuereact">
        <section class="main-mod">
            <p class="design">小程序官方文档</p>
            <ul class="main-wraper">
                <li class="main-mod-con" v-for="(item,index) in wechat">
                    <a  v-bind:href="item.link" target="_blank">{{item.name}}</a>
                </li>
            </ul>
        </section>
        <section class="main-mod">
            <p class="design">小程序社区</p>
            <ul class="main-wraper">
                <li class="main-mod-con" v-for="(item,index) in wechat1">
                    <a  v-bind:href="item.link" target="_blank">{{item.name}}</a>
                </li>
            </ul>
        </section>
        <section class="main-mod">
            <p class="design">小程序教程</p>
            <ul class="main-wraper">
                <li class="main-mod-con" v-for="(item,index) in wechat2">
                    <a  v-bind:href="item.link" target="_blank">{{item.name}}</a>
                </li>
            </ul>
        </section>
    </div>
</template>

<script>
    import data from '../../../static/data/basedata.json'
    export default {
        data () {
            return {
                wechat:null,
                wechat1:null,
                wechat2:null
            }
        },
        methods:{
            getData(){
                this.wechat = data.vueReact.wechat
                this.wechat1 = data.vueReact.wesocial1
                this.wechat2 = data.vueReact.wesocial2

            }
        },
        mounted () {
            this.getData();
        }
    }
</script>

<style>

</style>
