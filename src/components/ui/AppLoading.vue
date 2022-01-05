<template>
    <div class="loading">
        <div :style="{borderColor: color}" class="spinning-circle"></div>
        <span :style="{color: textColor}" class="loading-text">{{text}}</span>
    </div>
</template>

<script>
export default {

    props: {
        color: {
            type: String,
            default: '#42B983'
        },
        textColor: {
            type: String,
            default: '#23272A'
        }
    },

    computed: {
        text() {
            return localStorage.getItem("lang") === "en" ? 'Loading...' : 'Carregando...'
        }
    },
}
</script>

<style lang="scss">
@import '../../sass/global.scss';

.loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.spinning-circle {
    height: 30px;
    width: 30px;
    border-radius: 50%;
    border-style: solid;
    border-width: 2px 0 0 0;
    animation: ping 0.5s infinite;
    animation-timing-function: linear;
    margin: 0 auto;
}

.loading-text {
    display: block;
    margin-top: 10px;
}

@keyframes ping{
    from {
        transform: rotate(0deg);
    } to {
        transform: rotate(360deg);
    }
}
</style>