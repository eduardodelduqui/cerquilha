<template>
    <div class="message-container" :class="variant">
        <span class="message">
            <slot></slot>
        </span>
        <b-icon @click="closeMessage()" class="close-button" icon="x-circle"></b-icon>
    </div>
</template>

<script>
export default {

    props: {
        variant: {
            type: String,
            required: true
        }
    },

    methods: {
        closeMessage() {
            this.$emit('closeMessage')
        }
    },

    

}
</script>

<style lang="scss" scoped>

.message-container {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    width: 100%;
    font-size: 18px;
    padding: 10px 20px;

    &.error {
        background-color: #f89595;
        color: #730000;
    }

    &.success {
        background-color: #bdffbf;
        color: #4f7050
    }

    .message {
        justify-self: center;
    }

    .close-button {
        font-size: 30px;
    }
}

</style>