<template>
    <div class="hello">
        <div v-if="isEdited">
            <button @click="deleteBlock">Удалить</button>
        </div>

        <div class="scene" v-if="width">
            <canvas ref="canvas"
                    :style="`border: 1px ${style.guideLine} solid`"
                    @mousemove="mouseMove"
                    @mousedown="mouseDown"
                    @mouseup="mouseUp"
                    @mouseleave="mouseLeave"
            ></canvas>
            <div v-for="(item, index) in this.blocks" :key="index"
                 :style="getStyle(item)"
                 class="toolTips">{{item.name}}
            </div>
        </div>

        <div v-if="isEdited" class="pixel-settings" v-for="(item, index) in blocks" :key="index"
             :class="{active : active === index}">
            <div class="pixel-settings-name">
                <p>Название:</p>
                <input type="text" v-model="blocks[index].name">{{ index }}
            </div>

            <div class="color-picker">
                <p>RGB:</p>
                <input type="number" v-model.number="blocks[index].color.r">
                <input type="number" v-model.number="blocks[index].color.g">
                <input type="number" v-model.number="blocks[index].color.b">
                <div class="color-result"
                     :style="`background-color: rgb(${item.color.r}, ${item.color.g}, ${item.color.b})`"></div>
            </div>

            <span class="mdi mdi-delete"></span>
        </div>

        <!--<div class="inputs">-->
        <!--<div class="items" v-for="(item, index) in blocks" :key="index">-->
        <!--<input type="text" placeholder="Цвет" v-model="blocks[index].color">-->
        <!--<input type="text" placeholder="Название ячейки" v-model="blocks[index].name">-->
        <!--</div>-->
        <!--</div>-->
    </div>
</template>

<script>
    import _ from 'lodash'

    export default {
        name: 'HelloWorld',
        props: {
            isEdited: {
                type: Boolean,
                default: false
            },
            width: {
                type: Number,
                required: true
            },
            lamps: {
                type: Number
            },
            cells: {
                type: Array
            }
        },
        watch: {
            lamps() {
                this.mouseLeave();
                this.markers = [];
                this.blocks = this.cells
            },
            blocks: {
                handler(state) {
                    this.$emit('update:cells', state);
                },
                deep: true
            },
            width(state) {
                this.canvas.width = this.width;
                this.sceneWidth = this.width - 20;
            }
        },
        data() {
            return {
                style: {
                    scene: {
                        padding: 0
                    },
                    label: {
                        font: "12px Arial",
                        padding: {
                            top: 10,
                            left: 20
                        }
                    },
                    guideLine: '#e0e0e0',
                    activeColor: '#4a4a4a'
                },
                blocks: this.cells,
                canvas: null,
                scene: {
                    x: 10,
                    y: 10,
                    height: 100
                },
                sceneWidth: this.width - 20,
                height: 120,
                ctx: null,
                colorPicker: {
                    r: 255,
                    g: 0,
                    b: 0,
                },
                cellName: 'Без имени',
                mouse: {
                    x: 0,
                    y: 0,
                    vx: 0,
                    vy: 0,
                    old: {
                        x: 0,
                        y: 0,
                        cell: 0,
                    },
                    cell: 0,
                    width: 1,
                    height: 1,
                    isDown: false,
                    dragStart: false,
                    resizeStart: false,
                },
                create: {
                    start: false,
                    end: false,
                },
                deltaX: 0,
                active: false,
                markers: [],
                activeMarker: false,
            }
        },
        mounted() {
            (function () {
                let lastTime = 0
                let vendors = ['ms', 'moz', 'webkit', 'o']
                for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
                    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame']
                    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame']
                        || window[vendors[x] + 'CancelRequestAnimationFrame']
                }

                if (!window.requestAnimationFrame)
                    window.requestAnimationFrame = (callback, element) => {
                        let currTime = new Date().getTime()
                        let timeToCall = Math.max(0, 16 - (currTime - lastTime))
                        let id = window.setTimeout(function () {
                                callback(currTime + timeToCall)
                            },
                            timeToCall)
                        lastTime = currTime + timeToCall
                        return id
                    }

                if (!window.cancelAnimationFrame)
                    window.cancelAnimationFrame = function (id) {
                        clearTimeout(id)
                    }
            }())

            this.canvas = this.$refs.canvas;
            this.canvas.width = this.width;
            this.canvas.height = this.height;
            this.ctx = this.canvas.getContext('2d');

            this.start();
            
            console.log({step: this.step});

        },
        computed: {
            step() {
                return ~~this.sceneWidth / this.lamps
            }
        },
        methods: {
            getStyle(item) {
                return `
                    position: absolute;
                    left: ${this.scene.x + item.x}px;
                    top: ${this.scene.y + item.y + item.height}px;
                    width: ${item.width}px;
                    font-size: 14px;`;
            },

            save(index, block) {
                this.$set(this.blocks, +index, block);
            },

            loop() {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.drawScene();
                this.drawGuideLines();
                this.drawRect();
                this.drawActive();
                this.drawMarkers();
                this.drawCreate();

                window.requestAnimationFrame(this.loop)
            },

            mouseMove(e) {
                this.mouse.old = {x: this.mouse.x, y: this.mouse.y};
                this.mouse.old.cell = this.mouse.cell;

                this.mouse.x = e.offsetX;
                this.mouse.y = e.offsetY;

                this.mouse.vx = this.mouse.x - this.mouse.old.x;
                this.mouse.vy = this.mouse.y - this.mouse.old.y;

                this.mouse.cell = ~~(this.mouse.x / this.step)

                this.mouse.vc = this.mouse.cell - this.mouse.old.cell;

                this.resize()
                this.dragMove()

                this.eventCreateMove()
            },

            mouseDown() {
                this.mouse.isDown = true
                this.resizeStart()
                this.dragStart()
                this.createStart()
            },

            mouseUp() {
                let b = this.createEnd()

                this.mouse.isDown = false

                if (!b) {
                    this.dragStop()
                }
            },

            mouseLeave() {
                this.dragStop()
                this.mouse.isDown = false
                this.create.start = false
                this.create.end = false
            },

            deleteBlock() {
                if (this.markers.length === 0) return
                let index = this.markers[0].parent
                this.blocks.splice(+index, 1)
                this.dragStop()
                this.markers = []
            },

            isCollision(rect1, rect2) {
                return rect1.x < rect2.x + rect2.width &&
                    rect1.x + rect1.width > rect2.x &&
                    rect1.y < rect2.y + rect2.height &&
                    rect1.y + rect1.height > rect2.y
            },

            createStart() {
                if (this.mouse.dragStart || this.mouse.resizeStart || this.blocksCollision(this.mouse) || !this.mouse.isDown || !this.isEdited) return
                this.create.start = this.mouse.cell
                this.eventCreateStart()
            },

            createEnd() {
                let bool = false
                if (this.mouse.dragStart || this.mouse.resizeStart || !this.create.rect || !this.isEdited || !this.create.start) return
                this.create.end = this.mouse.cell

                if (this.create.rect.width !== 0 && !this.blocksCollision(this.create.rect)) {
                    this.blocks.push(this.create.rect)
                    this.active = this.blocks.length - 1
                    bool = true
                    this.setMarker()
                }

                return bool
            },

            drawScene() {
                this.ctx.strokeStyle = this.style.guideLine
                this.ctx.strokeRect(~~this.scene.x + .5, ~~this.scene.y + .5, this.sceneWidth, this.scene.height)
            },

            drawCreate() {
                this.ctx.fillStyle = `rgb(${this.colorPicker.r},${this.colorPicker.g},${this.colorPicker.b})`;
                if ((this.mouse.dragStart || this.mouse.resizeStart) || !this.mouse.isDown || !this.isEdited) return
                let rect = {
                    x: this.create.start * this.step,
                    y: 0,
                    width: (this.step * (this.create.start - this.mouse.cell - 1)) * -1,
                    height: this.scene.height,
                    color: this.colorPicker,
                    name: this.cellName
                }

                if (rect.width < 0) {
                    rect.x -= Math.abs(rect.width)
                    rect.width = Math.abs(rect.width)

                    rect.x -= this.step
                    rect.width += this.step * 2

                } else {
                    if (this.create.start - this.mouse.cell - 1 === 0) {
                        rect.width = this.step
                    }
                }
                this.create.rect = rect

                this.ctx.fillRect(~~this.scene.x + rect.x + .5, ~~this.scene.y + rect.y - 1 + .5, rect.width, rect.height + 1)
            },

            start() {
                this.loop()
            },

            toScene(rect) {
                let d = JSON.parse(JSON.stringify(rect))
                d.x += this.scene.x
                d.y += this.scene.y

                return d
            },

            dragStart() {
                if (!this.mouse.isDown || this.mouse.resizeStart) return
                let bool = false
                for (let index in this.blocks) {
                    let rect = this.toScene(this.blocks[index])
                    if (this.isCollision(this.mouse, rect)) {
                        this.active = index
                        this.mouse.dragStart = true
                        this.deltaX = this.mouse.x - rect.x
                        this.eventBlockActive()
                        bool = true
                        this.setMarker()
                        break
                    }
                }

                if (bool) {
                    return
                }

                this.markers = []

                this.dragStop()
            },

            drawActive() {
                if (this.markers.length === 0) return

                let point = this.markers[0].parent

                this.ctx.strokeStyle = this.style.activeColor

                let rect = this.blocks[point]

                this.ctx.strokeRect(~~this.scene.x + rect.x + .5, ~~this.scene.y + rect.y + .5, rect.width - 1, rect.height - 1)

            },

            dragMove() {
                if (this.mouse.resizeStart || !this.mouse.isDown || !this.mouse.dragStart || this.active === false || !this.isEdited) return

                let rect = JSON.parse(JSON.stringify(this.blocks[this.active]))

                let d = this.deltaX % this.step

                rect.x = this.mouse.cell * this.step - this.deltaX + d

                if (rect.x < 0) {
                    rect.x = 0
                }

                if (rect.x + rect.width > this.sceneWidth) {
                    rect.x = this.sceneWidth - rect.width
                }

                this.ctx.fillStyle = "red"

                if (!this.blocksCollision(rect)) {
                    this.save(this.active, rect);
                    this.eventMove()
                }

                this.setMarker()
            },

            dragStop() {
                this.mouse.dragStart = false
                this.active = false
                this.mouse.resizeStart = false
                this.create.start = false
            },

            drawRect() {
                for (let obj of this.blocks) {
                    this.ctx.fillStyle = `rgb(${obj.color.r},${obj.color.g},${obj.color.b})`;
                    this.ctx.strokeStyle = `rgb(${obj.color.r},${obj.color.g},${obj.color.b})`;
                    let rect = {
                        start: ~~(obj.x/this.step),
                        end: ~~((obj.x+obj.width)/this.step),
                        x: 0,
                        width: 0
                    };
                    rect.widht = (rect.end - rect.start)*this.step
                    rect.x = ~~(this.scene.x + (rect.start*this.step))+.5
                    
                    this.ctx.fillRect(rect.x, ~~this.scene.y + obj.y + .5, rect.widht, obj.height)
                }
            },

            setMarker() {
                if (this.active === false) return
                this.markers = []
                let obj = this.blocks[this.active]

                let mk = {
                    width: 8,
                    height: 8
                }

                let m1 = {
                    x: this.scene.x + obj.x - (mk.width / 2),
                    y: this.scene.y + obj.y + (obj.height / 2) - (mk.height / 2),
                    width: mk.width,
                    height: mk.height,
                    position: 'left',
                    parent: this.active,
                }
                let m2 = {
                    x: this.scene.x + obj.x + obj.width - (mk.width / 2),
                    y: this.scene.y + obj.y + (obj.height / 2) - (mk.height / 2),
                    width: mk.width,
                    height: mk.height,
                    position: 'right',
                    parent: this.active,
                }

                this.markers.push(m1)
                this.markers.push(m2)
            },

            drawMarkers() {
                if (!this.isEdited) return
                this.ctx.fillStyle = 'white'
                this.ctx.strokeStyle = 'black'
                for (let obj of this.markers) {
                    this.ctx.fillRect(~~obj.x + .5, ~~obj.y + .5, obj.width, obj.height)
                    this.ctx.strokeRect(~~obj.x + .5, ~~obj.y + .5, obj.width, obj.height)
                }
            },

            resizeStart() {
                for (let index in this.markers) {
                    let rect = this.markers[index]
                    if (this.isCollision(this.mouse, rect)) {
                        this.mouse.resizeStart = true
                        this.activeMarker = rect
                        this.active = rect.parent
                        this.create.start = this.mouse.cell
                        break
                    }
                }
            },

            blocksCollision(obj) {
                let bool = false
                for (let index in this.blocks) {
                    if (+index === +this.active) continue
                    if (this.isCollision(obj, this.blocks[index])) {
                        bool = true
                        break
                    }
                }

                return bool
            },

            drawGuideLines() {
                this.ctx.strokeStyle = this.style.guideLine
                for (let x = 0; x <= this.sceneWidth - this.step; x += this.step) {
                    if (x === 0) {
                        continue
                    }
                    this.ctx.beginPath()
                    this.ctx.moveTo(~~this.scene.x + x + .5, this.scene.y)
                    this.ctx.lineTo(~~this.scene.x + x + .5, this.scene.y + this.scene.height)
                    this.ctx.stroke()
                }
            },

            resize() {
                if (!this.mouse.resizeStart || this.active === false || !this.isEdited) return

                let rect = JSON.parse(JSON.stringify(this.blocks[this.active]))

                if (this.activeMarker.position === "left") {
                    rect.x += this.mouse.vc * this.step
                    rect.width -= this.mouse.vc * this.step
                } else {
                    rect.width = this.mouse.cell * this.step - rect.x
                }

                if (rect.width < this.step) {
                    return
                }

                if (this.blocksCollision(rect)) {
                    return
                }

                this.save(this.active, rect);

                this.eventResize()

                this.setMarker()
            },

            eventCreateStart() {
                // console.log('eventCreateStart:', this.create.start);
            },
            eventCreateMove() {
                if (!this.create.start || this.mouse.resizeStart) return;
                //console.log('eventCreateMove:', this.create.start, this.mouse.cell);

                this.$emit('update:cells', this.blocks);

                this.sendMessage([
                    {
                        port: 0,
                        start: ~~this.$route.params.id,
                        end: this.mouse.cell,
                        color: this.colorPicker
                    },
                ])
            },
            eventMove() {
                let start = ~~this.blocks[this.active].x / this.step;
                let end = ~~((this.blocks[this.active].x + this.blocks[this.active].width) / this.step) - 1;

                this.blocks[this.active].start = ~~start;
                this.blocks[this.active].end = ~~end;

                this.$emit('update:cells', this.blocks);


                this.sendMessage([
                    {
                        port: ~~this.$route.params.id,
                        start: ~~start,
                        end: end,
                        color: this.blocks[this.active].color
                    },
                ]);


            },
            eventResize() {
                let start = ~~this.blocks[this.active].x / this.step;
                let end = ~~((this.blocks[this.active].x + this.blocks[this.active].width) / this.step) - 1

                this.blocks[this.active].start = ~~start;
                this.blocks[this.active].end = ~~end;

                this.$emit('update:cells', this.blocks);

                this.sendMessage([
                    {
                        port: ~~this.$route.params.id,
                        start: ~~start,
                        end: end,
                        color: this.blocks[this.active].color
                    }
                ])


            },
            eventBlockActive() {
                this.$emit('update:cells', this.blocks);

                let start = ~~this.blocks[this.active].x / this.step;
                let end = ~~((this.blocks[this.active].x + this.blocks[this.active].width) / this.step) - 1
                // console.log('eventBlockActive: ',{index: +this.active, start, end});


                this.sendMessage([
                    {
                        port: ~~this.$route.params.id,
                        start: ~~start,
                        end: end,
                        color: this.blocks[this.active].color
                    },
                ])
            },
            sendMessage: _.throttle(function (data) {
                this.$axios.post('/move', data)
            }, 150),
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .inputs {
        margin-top: 8px;
    }

    .scene {
        position: relative;
        display: inline-block;
    }
</style>
