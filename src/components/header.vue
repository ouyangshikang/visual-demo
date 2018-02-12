<template>
    <div class="header" :class="{active:isactive}">
        <canvas-btn v-if="isactive"></canvas-btn>
        <a href="https://github.com/BiYuqi" target="_blank" title="我的Github" class="logo"><img src="../../static/img/logo.png" alt=""></a>
        <i class="btn_logo">前端导航</i>
        <iframe
            style="position:absolute;top:23px;right:6px;"
            frameborder="0" scrolling="0" width="91px" height="20px" class="star-gihub"
            src="https://ghbtns.com/github-btn.html?user=BiYuqi&repo=vuenotes&type=star&count=true" >
        </iframe>
        <!-- <span class="btn"></span> -->
        <!-- <span class="btn" @click="toShow"></span> -->
        <a href="http://loadingmore.com/" target="_blank" class="github-img" title="我的博客">
            <img src="http://loadingmore.com/demo/src/img/timg.png" alt="">
        </a>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    import canvasBtn from '../../src/components/canvas.vue'
    export default {
        data () {
            return {
                isactive:false
            }
        },
        mounted() {
            const m = new Date().getMonth()+1
            const d = new Date().getDate()
            if(m === 12 && (d === 25 || d === 24)){
                this.isactive = true
            }
        },
        components:{
            canvasBtn
        }
    }
</script>
<style scoped>
    .github-img{
        width: 40px;
        height: 40px;
        display: inline-block;
        position: absolute;
        right: 120px;
        top: 20px;
    }
    .github-img img{
        width: 45px;
        height: 30px;
    }
</style>
