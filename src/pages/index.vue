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

                <div class="card">
                    <div class="header">
                        Порт 1
                    </div>

                    Canvas

                </div>
            </div>

            <div class="info">
                <h3>Сетевые интерфейсы:</h3>

                <ul>
                    <li v-for="(item, index) in networks">{{ item.name }}: {{ item.ip }}</li>
                </ul>
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

</style>