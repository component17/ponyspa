<template>
    <div class="content">

        <div class="header-block">

            <div class="title title-settings">
                <h1>Порт {{+$route.params.id+1}}</h1>
                <div class="button-block">
                    <button @click="saveCells" class="settings-button save">
                        <span class="mdi mdi-content-save"></span>
                        <p>Сохранить</p>
                    </button>
                    <router-link to="/" class="settings-button">
                        <span class="mdi mdi-close"></span>
                    </router-link>
                </div>
            </div>
            <p>Задайте количество пикселей (светодиодов) в ленте и выберите область, под которой будет размещена
                ячейка. Редактор позволяет изменять полодение блоков, менять их размеры, задавать цвет подстветки и
                добавлять описание ячейки.</p>

        </div>

        <div class="body">
            <div class="settings">

                <h3>Количество пикселей (светодиодов) в ленте:</h3>

                <input class="pixel-count" type="number" v-model="lamps">

                <p class="warning">ВНИМАНИЕ! При изменении количества пикселей в ленте все установленные
                    настройки будут удалены.</p>


                <div class="canvas" ref="canvas">
                    <selector v-if="!isLoading"
                              :width="canvasBlockWidth - 50"
                              :lamps="lamps"
                              :cells.sync="cells"
                              :index="+$route.params.id"
                              isEdited/>
                </div>


                <!--<div class="pixel-settings" :class="{active : isActive}">-->
                <!--<div class="pixel-settings-name">-->
                <!--<p>Название:</p>-->
                <!--<input type="text">-->
                <!--</div>-->

                <!--<div class="color-picker">-->
                <!--<p>RGB:</p>-->
                <!--<input type="number">-->
                <!--<input type="number">-->
                <!--<input type="number">-->
                <!--<div class="color-result"></div>-->
                <!--</div>-->

                <!--<span class="mdi mdi-delete"></span>-->
                <!--</div>-->

                <!--<div class="pixel-settings">-->
                <!--<div class="pixel-settings-name">-->
                <!--<p>Название:</p>-->
                <!--<input type="text">-->
                <!--</div>-->

                <!--<div class="color-picker">-->
                <!--<p>RGB:</p>-->
                <!--<input type="number">-->
                <!--<input type="number">-->
                <!--<input type="number">-->
                <!--<div class="color-result"></div>-->
                <!--</div>-->

                <!--<span class="mdi mdi-delete"></span>-->
                <!--</div>-->

                <!--<div class="pixel-settings">-->
                <!--<div class="pixel-settings-name">-->
                <!--<p>Название:</p>-->
                <!--<input type="text">-->
                <!--</div>-->

                <!--<div class="color-picker">-->
                <!--<p>RGB:</p>-->
                <!--<input type="number">-->
                <!--<input type="number">-->
                <!--<input type="number">-->
                <!--<div class="color-result"></div>-->
                <!--</div>-->
                <!--<span class="mdi mdi-delete"></span>-->
                <!--</div>-->


            </div>

        </div>


    </div>
</template>

<script>
    export default {
        components: {
            selector: require('../components/canvas_selector').default
        },
        data() {
            return {
                canvasBlockWidth: 0,
                isActive: false,
                lamps: 60,

                isLoading: true,
                cells: []
            }
        },
        created() {
            this.$axios.get('/cells-on-port/' + this.$route.params.id).then((response) => {
                this.canvasBlockWidth = this.$refs.canvas.offsetWidth

                this.cells = response.data
                this.isLoading = false
            })
        },
        mounted() {
            window.addEventListener("resize", () => {
                if (!this.$refs.canvas) return

                let div = this.$refs.canvas
                this.canvasBlockWidth = div.offsetWidth
            }, false)
        },
        methods: {
            saveCells() {
                console.log('save cells', this.cells)

                this.cells.map(i => {
                    i.port = +this.$route.params.id
                })

                this.$axios.post('/cells-on-port/' + this.$route.params.id, this.cells).then((response) => {
                    console.log(response.data)
                })
            },
        }
    }
</script>

<style>
    #app {
        display: flex;
        flex-direction: column;
        flex-grow: 2;
    }
</style>
