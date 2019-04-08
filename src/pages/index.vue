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

                <div class="card">
                    <div class="header">
                        <span>Порт 1</span>
                        <router-link to="/port/0">
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
                                  :width="canvasBlockWidth - 400"
                                  :cells="cells.filter(i => i.port === 0)"
                                  :lamps="60"
                        ></selector>

                    </div>
                </div>

                <div class="card">
                    <div class="header">
                        <span>Порт 2</span>
                        <router-link to="/port/1">
                            <div class="set-port">
                                <img src="" alt="">
                                <span>
                                    <span class="mdi mdi-settings-outline"></span>
                                    Настроить порт
                                </span>
                            </div>
                        </router-link>
                    </div>
                    <div class="canvas">
                        <selector v-if="!isLoading"
                                  :width="canvasBlockWidth - 400"
                                  :cells="cells.filter(i => i.port === 1)"
                                  :lamps="60"
                        ></selector>
                    </div>
                </div>

                <div class="card">
                    <div class="header">
                        <span>Порт 3</span>
                        <router-link to="/port/2">
                            <div class="set-port">
                                <img src="" alt="">
                                <span>
                                    <span class="mdi mdi-settings-outline"></span>
                                    Настроить порт
                                </span>
                            </div>
                        </router-link>
                    </div>
                    <div class="canvas">
                        <selector v-if="!isLoading"
                                  :width="canvasBlockWidth - 400"
                                  :cells="cells.filter(i => i.port === 2)"
                                  :lamps="60"
                        ></selector>
                    </div>
                </div>

                <div class="card">
                    <div class="header">
                        <span>Порт 4</span>
                        <router-link to="/port/3">
                            <div class="set-port">
                                <img src="" alt="">
                                <span>
                                    <span class="mdi mdi-settings-outline"></span>
                                    Настроить порт
                                </span>
                            </div>
                        </router-link>
                    </div>
                    <div class="canvas">
                        <selector v-if="!isLoading"
                                  :width="canvasBlockWidth - 400"
                                  :cells="cells.filter(i => i.port === 3)"
                                  :lamps="60"
                        ></selector>
                    </div>
                </div>
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
                this.canvasBlockWidth = this.$refs.canvas.offsetWidth;

                console.log(this.canvasBlockWidth)

                this.cells = response.data;
                this.isLoading = false;
            })
        },
        methods: {

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
