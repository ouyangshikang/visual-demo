<template>
    <div class="make-tool">
        <section class="main-mod">
            <p class="design">Gulp教程</p>
            <ul class="main-wraper">
                <li class="main-mod-con" v-for="(item,index) in gulps">
                    <a v-bind:href="item.link" target="_blank">{{item.name}}</a>
                </li>
            </ul>
        </section>
        <section class="main-mod">
            <p class="design">Webpack教程</p>
            <ul class="main-wraper">
                <li class="main-mod-con" v-for="(item,index) in webpacks">
                    <a v-bind:href="item.link" target="_blank">{{item.name}}</a>
                </li>
            </ul>
        </section>
        <section class="main-mod">
            <p class="design">RollupJs教程</p>
            <ul class="main-wraper">
                <li class="main-mod-con" v-for="(item,index) in rollup">
                    <a v-bind:href="item.link" target="_blank">{{item.name}}</a>
                </li>
            </ul>
        </section>
        <section class="main-mod">
            <p class="design">CSS预处理</p>
            <ul class="main-wraper">
                <li class="main-mod-con" v-for="(item,index) in csss">
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
                gulps: null,
                webpacks: null,
                rollup: null,
                csss: null
            }
        },
        methods: {
            getData () {
                this.gulps = data.makeDeail.gulps
                this.webpacks = data.makeDeail.webpacks
                this.rollup =data.makeDeail.rollup
                this.csss = data.makeDeail.csss
            }
        },
        mounted () {
            this.getData();
        }
    }
</script>

<style scoped>

</style>
