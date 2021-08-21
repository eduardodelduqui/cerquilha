<template>
        <router-link 
            v-if="routeName"
            :to="{name: routeName, params: { term: routeParam}}"
            >
            <button 
                :class="['button-default', computedColor, {'button-border': borderRadius}]"
                :type="type"
                >
                {{text}}
                <slot/>
                </button>
        </router-link>
        <button
            v-else 
            class="button-default"
            :class="computedColor"
            :type="type"
            >
            {{text}}
            <slot/>
            </button>
</template>

<script>
export default {

    props: {
        color: {
            type: String,
            required: false,
        },
        text: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        borderRadius: {
            type: Boolean,
            default: false
        },
        routeName: {
            type: String,
            required: false
        },
        routeParam: {
            required: false
        }
    },

    computed: {
        computedColor() {
            if (this.color === 'white') {
                return 'button-white'
            } else {
                return 'button-green'
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../sass/global.scss';

.button-default {
    font-size: 14px;
    padding: 0 25px;
    height: 40px;
    text-transform: uppercase;
    border: 1px solid $color-primary;
    border-radius: 4px;
    cursor: pointer;
}

.button-white {
    background-color: #fff;
    color: $color-primary;
    border: 1px solid $color-primary;
}

.button-green {
    background-color: $color-primary;
    border: 1px solid #fff;
    color: #fff;
}

.button-border {
    border-radius: 20px
}

</style>