<template>
    <div class="canvas-start">
        <canvas id="canvas"></canvas>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                WINDOW_WIDTH: 1024, // 画布大小
                WINDOW_HEIGHT: 768,
                MARGIN_LEFT: 20, // 球数字距离画布的位置
                MARGIN_TOP: 20,
                radius: 8, // 小球半径
                numbers: [
                    [
                        [0, 0, 1, 1, 1, 0, 0],
                        [0, 1, 1, 0, 1, 1, 0],
                        [1, 1, 0, 0, 0, 1, 1],
                        [1, 1, 0, 0, 0, 1, 1],
                        [1, 1, 0, 0, 0, 1, 1],
                        [1, 1, 0, 0, 0, 1, 1],
                        [1, 1, 0, 0, 0, 1, 1],
                        [1, 1, 0, 0, 0, 1, 1],
                        [0, 1, 1, 0, 1, 1, 0],
                        [0, 0, 1, 1, 1, 0, 0]
                    ], // 0
                    [
                        [0, 0, 0, 1, 1, 0, 0],
                        [0, 1, 1, 1, 1, 0, 0],
                        [0, 0, 0, 1, 1, 0, 0],
                        [0, 0, 0, 1, 1, 0, 0],
                        [0, 0, 0, 1, 1, 0, 0],
                        [0, 0, 0, 1, 1, 0, 0],
                        [0, 0, 0, 1, 1, 0, 0],
                        [0, 0, 0, 1, 1, 0, 0],
                        [0, 0, 0, 1, 1, 0, 0],
                        [1, 1, 1, 1, 1, 1, 1]
                    ], // 1
                    [
                        [0, 1, 1, 1, 1, 1, 0],
                        [1, 1, 0, 0, 0, 1, 1],
                        [0, 0, 0, 0, 0, 1, 1],
                        [0, 0, 0, 0, 1, 1, 0],
                        [0, 0, 0, 1, 1, 0, 0],
                        [0, 0, 1, 1, 0, 0, 0],
                        [0, 1, 1, 0, 0, 0, 0],
                        [1, 1, 0, 0, 0, 0, 0],
                        [1, 1, 0, 0, 0, 1, 1],
                        [1, 1, 1, 1, 1, 1, 1]
                    ], // 2
                    [
                        [1, 1, 1, 1, 1, 1, 1],
                        [0, 0, 0, 0, 0, 1, 1],
                        [0, 0, 0, 0, 1, 1, 0],
                        [0, 0, 0, 1, 1, 0, 0],
                        [0, 0, 1, 1, 1, 0, 0],
                        [0, 0, 0, 0, 1, 1, 0],
                        [0, 0, 0, 0, 0, 1, 1],
                        [0, 0, 0, 0, 0, 1, 1],
                        [1, 1, 0, 0, 0, 1, 1],
                        [0, 1, 1, 1, 1, 1, 0]
                    ], // 3
                    [
                        [0, 0, 0, 0, 1, 1, 0],
                        [0, 0, 0, 1, 1, 1, 0],
                        [0, 0, 1, 1, 1, 1, 0],
                        [0, 1, 1, 0, 1, 1, 0],
                        [1, 1, 0, 0, 1, 1, 0],
                        [1, 1, 1, 1, 1, 1, 1],
                        [0, 0, 0, 0, 1, 1, 0],
                        [0, 0, 0, 0, 1, 1, 0],
                        [0, 0, 0, 0, 1, 1, 0],
                        [0, 0, 0, 1, 1, 1, 1]
                    ], // 4
                    [
                        [1, 1, 1, 1, 1, 1, 1],
                        [1, 1, 0, 0, 0, 0, 0],
                        [1, 1, 0, 0, 0, 0, 0],
                        [1, 1, 1, 1, 1, 1, 0],
                        [0, 0, 0, 0, 0, 1, 1],
                        [0, 0, 0, 0, 0, 1, 1],
                        [0, 0, 0, 0, 0, 1, 1],
                        [0, 0, 0, 0, 0, 1, 1],
                        [1, 1, 0, 0, 0, 1, 1],
                        [0, 1, 1, 1, 1, 1, 0]
                    ], // 5
                    [
                        [0, 0, 0, 0, 1, 1, 0],
                        [0, 0, 1, 1, 0, 0, 0],
                        [0, 1, 1, 0, 0, 0, 0],
                        [1, 1, 0, 0, 0, 0, 0],
                        [1, 1, 0, 1, 1, 1, 0],
                        [1, 1, 0, 0, 0, 1, 1],
                        [1, 1, 0, 0, 0, 1, 1],
                        [1, 1, 0, 0, 0, 1, 1],
                        [1, 1, 0, 0, 0, 1, 1],
                        [0, 1, 1, 1, 1, 1, 0]
                    ], // 6
                    [
                        [1, 1, 1, 1, 1, 1, 1],
                        [1, 1, 0, 0, 0, 1, 1],
                        [0, 0, 0, 0, 1, 1, 0],
                        [0, 0, 0, 0, 1, 1, 0],
                        [0, 0, 0, 1, 1, 0, 0],
                        [0, 0, 0, 1, 1, 0, 0],
                        [0, 0, 1, 1, 0, 0, 0],
                        [0, 0, 1, 1, 0, 0, 0],
                        [0, 0, 1, 1, 0, 0, 0],
                        [0, 0, 1, 1, 0, 0, 0]
                    ], // 7
                    [
                        [0, 1, 1, 1, 1, 1, 0],
                        [1, 1, 0, 0, 0, 1, 1],
                        [1, 1, 0, 0, 0, 1, 1],
                        [1, 1, 0, 0, 0, 1, 1],
                        [0, 1, 1, 1, 1, 1, 0],
                        [1, 1, 0, 0, 0, 1, 1],
                        [1, 1, 0, 0, 0, 1, 1],
                        [1, 1, 0, 0, 0, 1, 1],
                        [1, 1, 0, 0, 0, 1, 1],
                        [0, 1, 1, 1, 1, 1, 0]
                    ], // 8
                    [
                        [0, 1, 1, 1, 1, 1, 0],
                        [1, 1, 0, 0, 0, 1, 1],
                        [1, 1, 0, 0, 0, 1, 1],
                        [1, 1, 0, 0, 0, 1, 1],
                        [0, 1, 1, 1, 0, 1, 1],
                        [0, 0, 0, 0, 0, 1, 1],
                        [0, 0, 0, 0, 0, 1, 1],
                        [0, 0, 0, 0, 1, 1, 0],
                        [0, 0, 0, 1, 1, 0, 0],
                        [0, 1, 1, 0, 0, 0, 0]
                    ], // 9
                    [
                        [0, 0, 0, 0],
                        [0, 0, 0, 0],
                        [0, 1, 1, 0],
                        [0, 1, 1, 0],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0],
                        [0, 1, 1, 0],
                        [0, 1, 1, 0],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0]
                    ] // :
                ],
                ball: {  // 小球对象
                    x: 512,
                    y: 100,
                    r: 20,
                    g: 2, // 重力加速度
                    vx: -4, // x方向的速度
                    vy: 0, // y方向的速度
                    color: '#005588'
                },
                balls: [],
                colors: [
                    '#FFB3A7',
                    '#9D2933',
                    '#FF0097',
                    '#FFF143',
                    '#FF8C31',
                    '#00BC12',
                    '#00E09E',
                    '#424C50',
                    '#44CEF6',
                    '#8D4BBB'
                ],
                curSeconds: 0,
                curMinutes: 0,
                curHours: 0
            };
        },

        methods: {
            winLoad() {
                let canvas = document.getElementById('canvas');
                canvas.width = this.WINDOW_WIDTH;
                canvas.height = this.WINDOW_HEIGHT;
                let context = canvas.getContext('2d');
                let root = this;
                setInterval(() => {
                    root.render(context);
                }, 50);
                // this.render(context);
            },
            render(context) {
                let date = new Date();
                let hours = date.getHours();
                let minutes = date.getMinutes();
                let seconds = date.getSeconds();
                // 秒钟的判断
                if (parseInt(this.curSeconds / 10) !== parseInt(seconds / 10)) {
                    this.addBalls(this.MARGIN_LEFT + 80 * (this.radius + 1), this.MARGIN_TOP, parseInt(seconds / 10));
                }
                if (parseInt(this.curSeconds % 10) !== parseInt(seconds % 10)) {
                    this.addBalls(this.MARGIN_LEFT + 95 * (this.radius + 1), this.MARGIN_TOP, parseInt(seconds % 10));
                }
                this.curSeconds = seconds;
                // 分钟判断
                if (parseInt(this.curMinutes / 10) !== parseInt(minutes / 10)) {
                    this.addBalls(this.MARGIN_LEFT + 40 * (this.radius + 1), this.MARGIN_TOP, parseInt(minutes / 10));
                }
                if (parseInt(this.curMinutes % 10) !== parseInt(minutes % 10)) {
                    this.addBalls(this.MARGIN_LEFT + 55 * (this.radius + 1), this.MARGIN_TOP, parseInt(minutes % 10));
                }
                this.curMinutes = minutes;
                // 时钟判断
                if (parseInt(this.curHours / 10) !== parseInt(hours / 10)) {
                    this.addBalls(this.MARGIN_LEFT + 15 * (this.radius + 1), this.MARGIN_TOP, parseInt(hours / 10));
                }
                if (parseInt(this.curHours % 10) !== parseInt(hours % 10)) {
                    this.addBalls(this.MARGIN_LEFT + 30 * (this.radius + 1), this.MARGIN_TOP, parseInt(hours % 10));
                }
                this.curHours = hours;
                // 绘制之前清空画布
                context.clearRect(0, 0, this.WINDOW_WIDTH, this.WINDOW_HEIGHT);
                // context.clearRect(0, 0, context.canvas.width, context.canvas.height);
                // 绘制小时
                this.renderClock(this.MARGIN_LEFT, this.MARGIN_TOP, parseInt(hours / 10), context);
                this.renderClock(this.MARGIN_LEFT + 15 * (this.radius + 1), this.MARGIN_TOP, parseInt(hours % 10), context);
                // 绘制冒号
                this.renderClock(this.MARGIN_LEFT + 30 * (this.radius + 1), this.MARGIN_TOP, 10, context);
                // 绘制分钟
                this.renderClock(this.MARGIN_LEFT + 40 * (this.radius + 1), this.MARGIN_TOP, parseInt(minutes / 10), context);
                this.renderClock(this.MARGIN_LEFT + 55 * (this.radius + 1), this.MARGIN_TOP, parseInt(minutes % 10), context);
                // 绘制冒号
                this.renderClock(this.MARGIN_LEFT + 70 * (this.radius + 1), this.MARGIN_TOP, 10, context);
                // 绘制秒钟
                this.renderClock(this.MARGIN_LEFT + 80 * (this.radius + 1), this.MARGIN_TOP, parseInt(seconds / 10), context);
                this.renderClock(this.MARGIN_LEFT + 95 * (this.radius + 1), this.MARGIN_TOP, parseInt(seconds % 10), context);
            },

            /**
             * renderClock 绘制时钟数字
             * @param {number} x 距离画布的margin-left
             * @param {number} y 距离画布的margin-top
             * @param {number} num 时钟对应的数字
             * @param {object} context 画布的上下文环境
             */
            renderClock(x, y, num, context) {
                context.fillStyle = '#005588';
                const numbers = this.numbers;
                const digit = numbers[num];
                const radius = this.radius; // 小球的半径
                for (let i = 0; i < digit.length; i++) {
                    for (let j = 0; j < digit.length; j++) {
                        if (digit[i][j] === 1) {
                            context.beginPath();
                            context.arc(x + 2 * j * (radius + 1) + radius + 1, y + 2 * i * (radius + 1) + radius + 1, radius, 0, 2 * Math.PI);
                            context.closePath();
                            context.fill();
                        }
                    }
                }
            },
            /**
             *  update 小球的位置更新
             */
            update() {
                this.ball.x += this.ball.vx;
                this.ball.y += this.ball.vy;
                this.ball.vy += this.ball.g;
                // 碰撞检测
                if (this.ball.y >= (768 - this.ball.r)) {
                    this.ball.y = 768 - this.ball.r;
                    this.ball.vy = -this.ball.vy * 0.5; // 阻力系数0.5
                }
            },
            /**
             *  addBalls 生成一堆的小球
             */
            addBalls(x, y, num) {

            }
        },
        mounted () {
            this.winLoad();
        }
    };
</script>

<style lang="scss" scoped>
    .canvas-start {
        canvas {
            display: block;
            margin: 50px auto;
        }
    }
</style>
