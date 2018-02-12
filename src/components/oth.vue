<template>
    <div class="oth">
        <section class="main-mod">
            <p class="design">Python</p>
            <ul class="main-wraper">
                <li class="main-mod-con" v-for="(item,index) in art1">
                    <a v-bind:href="item.link" target="_blank">{{item.name}}</a>
                </li>
            </ul>
        </section>
        <section class="main-mod">
            <p class="design">Python博客</p>
            <ul class="main-wraper">
                <li class="main-mod-con" v-for="(item,index) in py">
                    <a v-bind:href="item.link" target="_blank">{{item.name}}</a>
                </li>
            </ul>
        </section>
        <section class="main-mod">
            <p class="design">PHP</p>
            <ul class="main-wraper">
                <li class="main-mod-con" v-for="(item,index) in art3">
                    <a v-bind:href="item.link" target="_blank">{{item.name}}</a>
                </li>
            </ul>
        </section>
        <section class="main-mod">
            <p class="design">阅读</p>
            <ul class="main-wraper">
                <li class="main-mod-con" v-for="(item,index) in art2">
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
                py:null
            }
        },
        methods: {
            getData () {
                this.art1 = data.oth.o1;
                this.art2 = data.oth.o2;
                this.art3 = data.oth.o3;
                this.py = data.oth.o4;
            }
        },
        mounted () {
            this.getData();
        }
    }
</script>

<style scoped>

</style>
