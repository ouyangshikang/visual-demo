<template>
    <div class="javascript">
        <section class="main-mod">
            <p class="design">Javascript</p>
            <ul class="main-wraper">
                <li
                    class="main-mod-con"
                    v-for="(item,index) in jsData"
                    :key="index"
                >
                    <a v-bind:href="item.link" target="_blank">{{item.name}}</a>
                </li>
            </ul>
        </section>
    </div>
</template>

<script>
    import data from '../../static/data/basedata.json';
    export default {
        data () {
            return {
                jsData: null,
                jsData2: null
            };
        },
        methods: {
            getData () {
                this.jsData = data.jsBlog.js1;
                this.jsData2 = data.jsBlog.jq1;
            }
        },
        mounted () {
            this.getData();
        }
    };
</script>

<style lang="css">

</style>
