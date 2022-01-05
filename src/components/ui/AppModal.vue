<template>
    <div v-if="isOpen">
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
    },

    methods: {
        disableScroll() {
            document.body.style.overflow = 'hidden'
        },

        ableScroll () {
            document.body.style.overflow = 'auto'
        }
    },

    watch: {
        isOpen(newValue, oldValue) {
            if (newValue === true) {
                this.disableScroll()
            } else {
                this.ableScroll()
            }
        }
    },

    created () {
        if (this.isOpen) {
            this.disableScroll ()
        };
    },

    
}
</script>

<style>

</style>