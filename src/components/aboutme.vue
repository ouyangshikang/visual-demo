<template>
    <div class="aboutme">
        <section class="main-abs">
            <div class="main-mod-about">
                <div class="art">
                    <h2>Google书签的由来</h2>
                    <p>开发过程经常遇到很多不错的个人博客，技术文章，长时间下来，浏览器的书签已经臃肿不堪，所以有了这个依托于github的微网站~</p>
                </div>
                <div class="art">
                    <h2>这里有什么</h2>
                    <p>前端社区,大牛博客,工具？等等等~慢慢都会有</p>
                </div>
                <div class="art">
                    <h2>你也想参与？</h2>
                    <a class="suggest" href="https://github.com/BiYuqi/vuenotes/issues" target="_blank">综合建议(提交链接)</a>
                </div>
                <div class="art">
                    <h2>最后更新时间:</h2>
                    <h4 class="update-time">更新于:{{update}}</h4>
                </div>
                <div class="art">
                    <h2>版本迭代</h2>
                    <div class="art-version">
                        <h4>2017/09/06日更新</h4>
                        <ul>
                            <li>移除移动端侧滑菜单，采用顶部吸顶，左右滑动交互</li>
                            <li>列表样式修改，布局修改</li>
                        </ul>
                    </div>
                    <div class="art-version">
                        <h4>2017/04/01日更新</h4>
                        <ul>
                            <li>增加移动端左右滑动调出侧边栏菜单</li>
                        </ul>
                    </div>
                    <div class="art-version">
                        <h4>2017/03/24日更新</h4>
                        <ul>
                            <li>重构全新UI</li>
                            <li><a href="http://loadingmore.com/gnotes">旧版入口</a></li>
                        </ul>
                    </div>
                    <div class="art-version">
                        <h4>2016/12/7日更新</h4>
                        <ul>
                            <li>对移动端做了适配</li>
                            <li>设计PC端logo</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { format } from '../assets/js/format.js'
export default {
    data() {
        return {
            update:''
        }
    },
    mounted() {
        this.update = format('YY/MM/DD')
    }
}
</script>

<style scoped>
    .aboutme{
        padding: 10px 15px;
    }
    .update-time{
        font-size: 14px;
    }
    li{
        list-style: none;
    }
    li a{
        text-decoration: none;
        color: #4FC08D;
    }
    h2{
        margin: 0;
        padding: 0;
    }
    .main-mod-about h2{
        color: #4FC08D;
        margin-bottom: 10px;
        font-size: 16px;
        font-weight: lighter;
        padding-bottom: 10px;
        text-align: left;
        border-bottom: 1px solid #FFCD45;
    }
    .main-mod-about p{
        text-align: left;
    }
    .art{
        margin-bottom: 20px;
    }
    .art .suggest{
        display: block;
        width: 200px;
        text-align: center;
        padding: 5px 8px;
        border-radius: 4px;
        margin-right: 5px;
        color: #FFF;
        background-color: #4FC08D;
        transition: all .4s;
        text-decoration: none;
    }
    .art-version h4{
        height: 22px;
        line-height: 22px;
        width: 100%;
        background-color: #eee;
        position: relative;
        padding-left: 10px;
        text-align: left;
    }
    .art-version li{
        text-align: left;
        margin-left: 30px;
        list-style: square;
    }
</style>
