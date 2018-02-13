<template>
    <div class="header">
        <a href="https://github.com/ouyangshikang/canvas" target="_blank" title="我的Github" class="logo"><img src="../assets/img/logo.png" alt=""></a>
        <i class="btn_logo">canvas-book</i>
        <iframe
            style="position:absolute;top:23px;right:6px;"
            frameborder="0" scrolling="0" width="91px" height="20px" class="star-gihub"
            src="https://ghbtns.com/github-btn.html?user=ouyangshikang&repo=canvas&type=star&count=true" >
        </iframe>
        <a href="http://frontman.cn/" target="_blank" title="我的博客" class="github-img">
            <img src="http://loadingmore.com/demo/src/img/timg.png" alt="">
        </a>
    </div>
</template>

<script>
    export default {
        data() {
            return {

            };
        },
        mounted() {

        },
        components: {

        }
    };
</script>
<style scoped>
    .github-img {
        position: absolute;
        top: 25px;
        right: 115px;
        display: block;
        width: 45px;
        height: 30px;
    }
    .github-img img{
        width: 45px;
        height: 30px;
    }
</style>
