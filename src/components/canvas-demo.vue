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
    </div>
</template>

<script>
    export default {
        data () {
            return {
                canvasDemo: [{
                    url: '',
                    name: '星座特效'
                }]
            };
        },
        methods: {

        },
        mounted () {
        }
    };
</script>

<style lang="css">

</style>
