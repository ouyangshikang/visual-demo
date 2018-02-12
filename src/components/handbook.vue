<template>
    <div class="hand-book">
        <section class="main-mod">
            <p class="design">开发工具</p>
            <ul class="main-wraper">
                <li class="main-mod-con" v-for="(item,index) in art1">
                    <a v-bind:href="item.link" target="_blank">{{item.name}}</a>
                </li>
            </ul>
        </section>
        <section class="main-mod">
            <p class="design">开发规范</p>
            <ul class="main-wraper">
                <li class="main-mod-con" v-for="(item,index) in art2">
                    <a v-bind:href="item.link" target="_blank">{{item.name}}</a>
                </li>
            </ul>
        </section>
        <section class="main-mod">
            <p class="design">开源库</p>
            <ul class="main-wraper">
                <li class="main-mod-con" v-for="(item,index) in art3">
                    <a v-bind:href="item.link" target="_blank">{{item.name}}</a>
                </li>
            </ul>
        </section>
        <section class="main-mod">
            <p class="design">前端资源</p>
            <ul class="main-wraper">
                <li class="main-mod-con" v-for="(item,index) in art4">
                    <a v-bind:href="item.link" target="_blank">{{item.name}}</a>
                </li>
            </ul>
        </section>
        <section class="main-mod">
            <p class="design">正则专题</p>
            <ul class="main-wraper">
                <li class="main-mod-con" v-for="(item,index) in art5">
                    <a v-bind:href="item.link" target="_blank">{{item.name}}</a>
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
                art1:null,
                art2:null,
                art3:null,
                art4:null,
                art5:null
            }
        },
        methods: {
            getData () {
                this.art1 = data.articleBlog.art1;
                this.art2 = data.articleBlog.art2;
                this.art3 = data.articleBlog.art3;
                this.art4 = data.articleBlog.art4;
                this.art5 = data.articleBlog.art5;
            }
        },
        mounted () {
            this.getData();
        }
    }
</script>

<style scoped>

</style>
