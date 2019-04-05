<template>
    <div class="content">

        <div class="header-block">

            <div class="title title-settings">
                <h1>Порт 1</h1>
                <router-link to="/" class="close">
                    <span>Закрыть х</span>
                </router-link>
            </div>
            <p>Задайте количество пикселей (светодиодов) в ленте и выберите область, под которой будет размещена
                ячейка. Редактор позволяет изменять полодение блоков, менять их размеры, задавать цвет подстветки и
                добавлять описание ячейки.</p>

        </div>

        <div class="body">
            <div class="settings">

                <h3>Количество пикселей (светодиодов) в ленте:</h3>

                <div class="pixel-count">
                    <p>100</p>
                </div>

                <p class="warning">ВНИМАНИЕ! При изменении количества пикселей в ленте все установленные
                    настройки будут удалены.</p>

                <div class="card">
                    <div class="canvas">
                        Canvas
                    </div>
                </div>


            <div class="pixel-settings">
                <div class="pixel-settings-name">
                    <p>Название:</p>
                    <input type="text">
                </div>

                <div class="color-picker">
                    <p>RGB:</p>
                    <input type="number" max="255">
                    <input type="number">
                    <input type="number">
                    <div class="color-result">Color</div>
                </div>

                <p>Delete</p>
            </div>
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
