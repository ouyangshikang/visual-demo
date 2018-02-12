<template>
    <div class="header" :class="{active:isactive}">
        <canvas-btn v-if="isactive"></canvas-btn>
        <a href="https://github.com/ouyangshikang/canvas" target="_blank" title="我的Github" class="logo"><img src="../../static/img/logo.png" alt=""></a>
        <i class="btn_logo">canvas-book</i>
        <iframe
            style="position:absolute;top:23px;right:6px;"
            frameborder="0" scrolling="0" width="91px" height="20px" class="star-gihub"
            src="https://ghbtns.com/github-btn.html?user=ouyangshikang&repo=canvas&type=star&count=true" >
        </iframe>

    </div>
</template>

<script>
    // import { mapActions } from 'vuex';
    import canvasBtn from '../../src/components/canvas.vue';
    export default {
        data() {
            return {
                isactive: false
            };
        },
        mounted() {
            const m = new Date().getMonth() + 1;
            const d = new Date().getDate();
            if (m === 12 && (d === 25 || d === 24)) {
                this.isactive = true;
            }
        },
        components: {
            canvasBtn
        }
    };
</script>
<style scoped>

</style>
