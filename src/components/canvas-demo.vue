<template>
    <div class="javascript">
        <section class="main-mod">
            <p class="design">canvas学习demo</p>
            <ul class="main-wraper">
                <li
                    class="main-mod-con"
                    v-for="(item,index) in canvasDemo"
                    :key="index"
                >
                    <a v-bind:href="item.url" target="_blank">{{item.name}}</a>
                </li>
            </ul>
        </section>
        <router-view class="fullpage-demo"></router-view>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                baseUrl: ''
            };
        },
        computed: {
            canvasDemo() {
                const baseUrl = this.baseUrl;
                return [{
                    url: baseUrl + '/canvasClock',
                    name: '数字时钟特效'
                }];
            }
        },
        methods: {

        },
        mounted () {
            this.baseUrl = window.location.href;
        }
    };
</script>

<style lang="css">
    .fullpage-demo {
        position: fixed;
        width: 100vw;
        z-index: 999;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #fff;
    }
</style>
