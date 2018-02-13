<template>
    <div>
        <div id="personBlog">
            <section class="main-mod">
                <p class="design">个人博客</p>
                <ul class="main-wraper">
                    <li
                        class="main-mod-con"
                        v-for="(item,index) in items"
                        :key="index"
                    >
                        <a  v-bind:href="item.link" target="_blank" :title="item.title ? item.title :''">{{item.name}}</a>
                    </li>
                </ul>
            </section>
            <section class="main-mod">
                <p class="design">优秀团队</p>
                <ul class="main-wraper">
                    <li
                        class="main-mod-con"
                        v-for="(item,index) in teams"
                        :key="index"
                    >
                        <a v-bind:href="item.link" target="_blank" :title="item.title ? item.title :''">{{item.name}}</a>
                    </li>
                </ul>
            </section>
            <section class="main-mod">
                <p class="design">技术社区</p>
                <ul class="main-wraper">
                    <li
                        class="main-mod-con"
                        v-for="(item,index) in nation"
                        :key="index"
                    >
                        <a v-bind:href="item.link" target="_blank" :title="item.title ? item.title :''">{{item.name}}</a>
                    </li>
                </ul>
            </section>
            <section class="main-mod">
                <p class="design" title="如你遇上,那边是缘">Learn Anything</p>
                <ul class="main-wraper">
                    <li
                        class="main-mod-con"
                        v-for="(item,index) in learn"
                        :key="index"
                    >
                        <a v-bind:href="item.link" target="_blank" :title="item.title ? item.title :''">{{item.name}}</a>
                    </li>
                </ul>
            </section>
        </div>
    </div>
</template>

<script>
    import data from '../../static/data/basedata.json';
    export default {
        data () {
            return {
                items: null,
                teams: null,
                nation: null,
                learn: null
            };
        },
        methods: {
            getData() {
                this.items = data.techBlog;
                this.teams = data.teamBlog;
                this.nation = data.nationBlog;
                this.learn = data.learnAny;
            }
        },
        mounted () {
            this.getData();
        }
    };
</script>

<style scoped>
    #personBlog{
        height: 100%;
    }
</style>
