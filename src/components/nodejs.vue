<template>
    <div id="nodejs">
        <section class="main-mod">
            <p class="design">NodeJs教程</p>
            <ul class="main-wraper">
                <li class="main-mod-con" v-for="(item,index) in nodeData">
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
                nodeData:null
            }
        },
        methods: {
            getData () {
                this.nodeData = data.nodeJsBlog;
            }
        },
        mounted () {
            this.getData();
        }
    }
</script>

<style scoped>

</style>
