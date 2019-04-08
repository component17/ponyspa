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
                        <router-link to="/settings">
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

                        <selector v-if="canvasBlockWidth" :width="canvasBlockWidth"></selector>

                    </div>
                </div>

                <div class="card">
                    <div class="header">
                        <span>Порт 2</span>
                        <router-link to="/settings">
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
                        <!--<selector></selector>-->
                    </div>
                </div>

                <div class="card">
                    <div class="header">
                        <span>Порт 3</span>
                        <router-link to="/settings">
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
                        <!--<selector></selector>-->
                    </div>
                </div>

                <div class="card">
                    <div class="header">
                        <span>Порт 4</span>
                        <router-link to="/settings">
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
                        <!--<selector></selector>-->
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

                <div class="info__network">
                    <img src="../../static/icons/ip_icon.svg" alt="" class="info__network-img">
                    <div>
                        <p class="info__network-name">abc</p>
                        <span class="info__network-ip">192.16.1.11</span>
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
                canvasBlockWidth: 0
            }
        },
        created(){
            this.$axios.get('/network').then((response) => {
                this.networks = response.data;
            })
        },
        mounted() {
            setTimeout(() => {
                this.canvasBlockWidth = this.$refs.canvas.offsetWidth
            },100)
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
