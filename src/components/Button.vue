<template>
        <router-link
            v-if="routeName"
            class="button"
            :disabled="disabled"
            :class="{
                'disabled': disabled,
                'pointer': pointer
                }"
            :type="type"
            tag="button"
            :to="{name: routeName, params: { term: routeParam}}"
        >
            {{text}}
            <slot></slot>
        </router-link>
        <button
            v-else 
            @click="confirm()"
            class="button"
            :disabled="disabled"
            :class="{
                'disabled': disabled,
                'pointer': pointer
                }"
            :type="type"
        >
            {{text}}
            <slot></slot>
        </button>
</template>

<script>
export default {

    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        text: {
            type: String,
            required: false
        },
        type: {
            type: String,
            required: true
        },
        routeName: {
            type: String,
            required: false
        },
        routeParam: {
            required: false
        },
        confirmText: {
            type: String
        },
        pointer: {
            type: Boolean,
            default: false,
            required: false
        }
    },

    methods: {
        confirm() {
            if (this.confirmText && window.confirm(this.confirmText)) {
                this.$emit('confirm')
            }
        }
    },
}
</script>

<style lang="scss" scoped>
@import '../sass/global.scss';

.button {
    display: flex;
    cursor: pointer;
    justify-content: center;
    align-items: center;

    a {
        display: flex;
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: center;
    }

    &.disabled {
        opacity: 0.6;
        pointer-events: none;
    }

    &.pointer {
        cursor: pointer;
    }
}

</style>