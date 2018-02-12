<template>
    <div class="hand-book">
        <section class="main-mod">
            <p class="design">开发工具</p>
            <ul class="main-wraper">
                <li class="main-mod-con" v-for="(item,index) in git1">
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
                git1:null
            }
        },
        methods: {
            getData () {
                this.git1 = data.gits.git1;
            }
        },
        mounted () {
            this.getData();
        }
    }
</script>

<style scoped>

</style>
