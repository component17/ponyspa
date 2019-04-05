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

                <h3>Список портов</h3>

                <div class="card">
                    <div class="header">
                        <span>Порт 1</span>
                        <router-link to="/settings">
                            <div class="set-port">
                                <img src="" alt="">
                                <span>Настроить порт</span>
                            </div>
                        </router-link>
                    </div>
                    <div class="canvas">
                        Canvas
                        <span>Без названия</span>
                    </div>
                </div>

                <div class="card">
                    <div class="header">
                        <span>Порт 2</span>
                        <router-link to="/settings">
                            <div class="set-port">
                                <img src="" alt="">
                                <span>Настроить порт</span>
                            </div>
                        </router-link>
                    </div>
                    <div class="canvas">
                        Canvas
                        <span>Без названия</span>
                    </div>
                </div>

                <div class="card">
                    <div class="header">
                        <span>Порт 3</span>
                        <router-link to="/settings">
                            <div class="set-port">
                                <img src="" alt="">
                                <span>Настроить порт</span>
                            </div>
                        </router-link>
                    </div>
                    <div class="canvas">
                        Canvas
                        <span>Без названия</span>
                    </div>
                </div>

                <div class="card">
                    <div class="header">
                        <span>Порт 4</span>
                        <router-link to="/settings">
                            <div class="set-port">
                                <img src="" alt="">
                                <span>Настроить порт</span>
                            </div>
                        </router-link>
                    </div>
                    <div class="canvas">
                        Canvas
                        <span>Без названия</span>
                    </div>
                </div>
            </div>

            <div class="info">
                <h3>Сетевые интерфейсы:</h3>

                <div class="info__network" v-for="(item, index) in networks">
                    <img src="../../static/icons/light-bulb.svg" alt="" class="info__network-img">
                    <div>
                        <p class="info__network-name">{{ item.name }}</p>
                        <span class="info__network-ip">{{ item.ip }}</span>
                    </div>
                </div>

                <div class="info__network">
                    <img src="../../static/icons/light-bulb.svg" alt="" class="info__network-img">
                    <div>
                        <p class="info__network-name">abc</p>
                        <span class="info__network-ip">192.16.1.11</span>
                    </div>
                </div>
                <!--<ul>-->
                    <!--<li v-for="(item, index) in networks">{{ item.name }}: {{ item.ip }}</li>-->
                <!--</ul>-->
            </div>
        </div>



    </div>
</template>

<script>
    export default {
        data(){
            return {
                networks: []
            }
        },
        created(){
            this.$axios.get('/network').then((response) => {
                this.networks = response.data;
            })
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
