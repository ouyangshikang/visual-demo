<template>
    <div class="mobile">
        <section class="main-mod">
            <p class="design">移动端开发</p>
            <ul class="main-wraper">
                <li class="main-mod-con" v-for="(item,index) in mobile1">
                    <a  v-bind:href="item.link" target="_blank">{{item.name}}</a>
                </li>
            </ul>
        </section>
        <section class="main-mod">
            <p class="design">移动web UI框架</p>
            <ul class="main-wraper">
                <li class="main-mod-con" v-for="(item,index) in mobile2">
                    <a  v-bind:href="item.link" target="_blank">{{item.name}}</a>
                </li>
            </ul>
        </section>
        <section class="main-mod">
            <p class="design">性能调优</p>
            <ul class="main-wraper">
                <li class="main-mod-con" v-for="(item,index) in mobile3">
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
                mobile1:null,
                mobile2:null,
                mobile3:null
            }
        },
        methods: {
            getData () {
                this.mobile1 = data.makeBlog.mobile1;
                this.mobile2 = data.makeBlog.mobile2;
                this.mobile3 = data.makeBlog.mobile3;
            }
        },
        mounted () {
            this.getData();
        }
    }
</script>

<style scoped>

</style>
