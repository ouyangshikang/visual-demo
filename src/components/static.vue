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
            <p class="design">常用插件库</p>
            <ul class="main-wraper">
                <li class="main-mod-con" v-for="(item,index) in art2">
                    <a v-bind:href="item.link" target="_blank">{{item.name}}</a>
                </li>
            </ul>
        </section>
        <section class="main-mod">
            <p class="design">Awesome集合</p>
            <ul class="main-wraper">
                <li class="main-mod-con" v-for="(item,index) in art3">
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
                art3:null
            }
        },
        methods: {
            getData () {
                this.art1 = data.quietBlog.static1;
                this.art2 = data.quietBlog.static2;
                this.art3 = data.quietBlog.static3;
            }
        },
        mounted () {
            this.getData();
        }
    }
</script>

<style scoped>

</style>
