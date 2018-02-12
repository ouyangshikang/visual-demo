<template>
    <div>
        <div class="angular">
            <section class="main-mod">
                <p class="design">Angular教程</p>
                <ul class="main-wraper">
                    <li class="main-mod-con" v-for="(item,index) in data1">
                        <a  v-bind:href="item.link" target="_blank">{{item.name}}</a>
                    </li>
                </ul>
            </section>
            <section class="main-mod">
                <p class="design">Angular博文</p>
                <ul class="main-wraper">
                    <li class="main-mod-con" v-for="(item,index) in data2">
                        <a  v-bind:href="item.link" target="_blank">{{item.name}}</a>
                    </li>
                </ul>
            </section>
        </div>
    </div>
</template>

<script>
    import data from '../../static/data/basedata.json'
    export default {
        data () {
            return {
                data1:null,
                data2:null
            }
        },
        methods:{
            getData () {
                this.data1 = data.angularBlog.angular1;
                this.data2 = data.angularBlog.angular2;
            }
        },
        mounted () {
            this.getData()
        }
    }
</script>

<style scoped>

</style>
