<template>
    <div class="vuereact">
        <section class="main-mod">
            <p class="design">VueJs</p>
            <ul class="main-wraper">
                <li class="main-mod-con" v-for="(item,index) in vue1">
                    <a  v-bind:href="item.link" target="_blank">{{item.name}}</a>
                </li>
            </ul>
        </section>
        <section class="main-mod">
            <p class="design">VueJs&Demo</p>
            <ul class="main-wraper">
                <li class="main-mod-con" v-for="(item,index) in vue2">
                    <a  v-bind:href="item.link" target="_blank">{{item.name}}</a>
                </li>
            </ul>
        </section>
        <section class="main-mod">
            <p class="design">React</p>
            <ul class="main-wraper">
                <li class="main-mod-con" v-for="(item,index) in react">
                    <a  v-bind:href="item.link" target="_blank">{{item.name}}</a>
                </li>
            </ul>
        </section>
        <section class="main-mod">
            <p class="design">React-Native</p>
            <ul class="main-wraper">
                <li class="main-mod-con" v-for="(item,index) in reactNative">
                    <a  v-bind:href="item.link" target="_blank">{{item.name}}</a>
                </li>
            </ul>
        </section>
    </div>
</template>

<script>
    import data from '../../static/data/basedata.json'
    export default {
        data () {
            return {
                vue1:null,
                vue2:null,
                react:null,
                reactNative:null
            }
        },
        methods:{
            getData(){
                this.vue1 = data.vueReact.vuejs;
                this.vue2 = data.vueReact.vueDemo;
                this.react = data.vueReact.react;
                this.reactNative = data.vueReact.reactDemo;

            }
        },
        mounted () {
            this.getData();
        }
    }
</script>

<style>

</style>
