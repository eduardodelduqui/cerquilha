<template>
    <div
        :class="{dropdown: true,'is-open': isOpen}"
        :style="{transition: transition+'ms'}"
    >
        <slot></slot>
    </div>
</template>

<script>
export default {

    props: {
        isOpen: {
            type: Boolean,
            default: false
        },
        transition: {
            type: Number,
            default: 0
        }
    }
}
</script>

<style lang="scss" scoped>

.dropdown {
    position: absolute;
    display: none;
    z-index: 99;

    &.is-open {
        display: block;
    }
}

</style>