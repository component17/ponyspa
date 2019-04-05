<template>
    <div class="content">

        <div class="header-block">

            <div class="title title-settings">
                <h1>Порт 1</h1>
                <router-link to="/" class="close">
                    <p>Закрыть <span class="mdi mdi-close"></span></p>
                </router-link>
            </div>
            <p>Задайте количество пикселей (светодиодов) в ленте и выберите область, под которой будет размещена
                ячейка. Редактор позволяет изменять полодение блоков, менять их размеры, задавать цвет подстветки и
                добавлять описание ячейки.</p>

        </div>

        <div class="body">
            <div class="settings">

                <h3>Количество пикселей (светодиодов) в ленте:</h3>

                <input class="pixel-count" type="number" value="100">

                <p class="warning">ВНИМАНИЕ! При изменении количества пикселей в ленте все установленные
                    настройки будут удалены.</p>

                <div class="card">
                    <div class="canvas">
                        Canvas
                    </div>
                </div>

            <div class="pixel-settings" @click="changeActive" :class="{active : isActive}">
                <div class="pixel-settings-name">
                    <p>Название:</p>
                    <input type="text">
                </div>

                <div class="color-picker">
                    <p>RGB:</p>
                    <input type="number">
                    <input type="number">
                    <input type="number">
                    <div class="color-result"></div>
                </div>

                <span class="mdi mdi-delete"></span>
            </div>

            <div class="pixel-settings">
                <div class="pixel-settings-name">
                    <p>Название:</p>
                    <input type="text">
                </div>

                <div class="color-picker">
                    <p>RGB:</p>
                    <input type="number">
                    <input type="number">
                    <input type="number">
                    <div class="color-result"></div>
                </div>

                <span class="mdi mdi-delete"></span>
            </div>

            <div class="pixel-settings">
                <div class="pixel-settings-name">
                    <p>Название:</p>
                    <input type="text">
                </div>

                <div class="color-picker">
                    <p>RGB:</p>
                    <input type="number">
                    <input type="number">
                    <input type="number">
                    <div class="color-result"></div>
                </div>
                <span class="mdi mdi-delete"></span>
            </div>

            </div>

        </div>



    </div>
</template>

<script>
    export default {

    }
</script>

<style>
    #app {
        display: flex;
        flex-direction: column;
        flex-grow: 2;
    }
</style>
