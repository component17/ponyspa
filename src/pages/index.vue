<template>
    <div class="content">

        <div class="header-block">

            <div class="title">
                <img src="../../static/icons/light-bulb.svg" height="40">
                <h1>Настройка контроллера</h1>
            </div>

        </div>

        <div class="body">
            <div class="settings">

                <h3 class="ports-list">Список портов</h3>

                <div class="card"
                v-for="i in 4">
                    <div class="header">
                        <span>Порт {{i}}</span>
                        <router-link :to="'/port/'+(i-1) ">
                            <div class="set-port">
                                <img src="" alt="">
                                <span>
                                    <span class="mdi mdi-settings-outline"></span>
                                    Настроить порт
                                </span>
                            </div>
                        </router-link>
                    </div>
                    <div class="canvas" ref="canvas">
                        <selector v-if="!isLoading"
                                  :width="canvasBlockWidth - 80"
                                  :cells="cells.filter(item => item.port === i - 1)"
                                  :index="+i - 1"
                                  :lamps="60"
                        ></selector>

                    </div>
                </div>

                <!--<div class="card">-->
                    <!--<div class="header">-->
                        <!--<span>Порт 2</span>-->
                        <!--<router-link to="/port/1">-->
                            <!--<div class="set-port">-->
                                <!--<img src="" alt="">-->
                                <!--<span>-->
                                    <!--<span class="mdi mdi-settings-outline"></span>-->
                                    <!--Настроить порт-->
                                <!--</span>-->
                            <!--</div>-->
                        <!--</router-link>-->
                    <!--</div>-->
                    <!--<div class="canvas">-->
                        <!--&lt;!&ndash;<selector v-if="!isLoading"&ndash;&gt;-->
                                  <!--&lt;!&ndash;:width.="canvasBlockWidth - 400"&ndash;&gt;-->
                                  <!--&lt;!&ndash;:cells="cells.filter(i => i.port === 1)"&ndash;&gt;-->
                                  <!--&lt;!&ndash;:lamps="60"&ndash;&gt;-->
                        <!--&lt;!&ndash;&gt;</selector>&ndash;&gt;-->
                    <!--</div>-->
                <!--</div>-->

                <!--<div class="card">-->
                    <!--<div class="header">-->
                        <!--<span>Порт 3</span>-->
                        <!--<router-link to="/port/2">-->
                            <!--<div class="set-port">-->
                                <!--<img src="" alt="">-->
                                <!--<span>-->
                                    <!--<span class="mdi mdi-settings-outline"></span>-->
                                    <!--Настроить порт-->
                                <!--</span>-->
                            <!--</div>-->
                        <!--</router-link>-->
                    <!--</div>-->
                    <!--<div class="canvas">-->
                        <!--&lt;!&ndash;<selector v-if="!isLoading"&ndash;&gt;-->
                                  <!--&lt;!&ndash;:width="canvasBlockWidth - 400"&ndash;&gt;-->
                                  <!--&lt;!&ndash;:cells="cells.filter(i => i.port === 2)"&ndash;&gt;-->
                                  <!--&lt;!&ndash;:lamps="60"&ndash;&gt;-->
                        <!--&lt;!&ndash;&gt;</selector>&ndash;&gt;-->
                    <!--</div>-->
                <!--</div>-->

                <!--<div class="card">-->
                    <!--<div class="header">-->
                        <!--<span>Порт 4</span>-->
                        <!--<router-link to="/port/3">-->
                            <!--<div class="set-port">-->
                                <!--<img src="" alt="">-->
                                <!--<span>-->
                                    <!--<span class="mdi mdi-settings-outline"></span>-->
                                    <!--Настроить порт-->
                                <!--</span>-->
                            <!--</div>-->
                        <!--</router-link>-->
                    <!--</div>-->
                    <!--<div class="canvas">-->
                        <!--&lt;!&ndash;<selector v-if="!isLoading"&ndash;&gt;-->
                                  <!--&lt;!&ndash;:width="canvasBlockWidth - 400"&ndash;&gt;-->
                                  <!--&lt;!&ndash;:cells="cells.filter(i => i.port === 3)"&ndash;&gt;-->
                                  <!--&lt;!&ndash;:lamps="60"&ndash;&gt;-->
                        <!--&lt;!&ndash;&gt;</selector>&ndash;&gt;-->
                    <!--</div>-->
                <!--</div>-->
            </div>

            <div class="info">
                <h3>Сетевые интерфейсы</h3>

                <div class="info__network" v-for="(item, index) in networks">
                    <img src="../../static/icons/ip_icon.svg" alt="" class="info__network-img">
                    <div>
                        <p class="info__network-name">{{ item.name }}</p>
                        <span class="info__network-ip">{{ item.ip }}</span>
                    </div>
                </div>
            </div>
        </div>



    </div>
</template>

<script>
    export default {
        components: {
            selector: require('../components/canvas_selector').default
        },
        data(){
            return {
                networks: [],
                canvasBlockWidth: 0,
                cells: [],
                isLoading: true,
                width: 0
            }
        },
        created(){
            this.$axios.get('/network').then((response) => {
                this.networks = response.data;
            });
            this.$axios.get('/cells').then((response) => {
                this.cells = response.data;
                this.isLoading = false;

                console.log(this.cells)
            })
        },
        mounted(){
            setTimeout(() => {
                this.getSize()
            }, 100);

            window.addEventListener("resize", () => {
                if(this.$refs.canvas.length === 0) return
                this.getSize()
            }, false);
        },
        methods: {
            getSize(){
                let div = this.$refs.canvas[0];
                this.canvasBlockWidth = div.offsetWidth
            }
        }
    }
</script>

<style>
    #app {
        display: flex;
        flex-direction: column;
        flex-grow: 2;
        min-width: 960px;
    }
</style>
