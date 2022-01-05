<template>
        <input @input="$emit('input', ($event))" :type="type" :value="value" :checked="checked">
</template>

<script>
export default {

    props: {
        type: {
            type: String,
            required: true,
            validator: function (value) {

                return ['button', 'checkbox', 'color',
                'date', 'email', 'file', 'number',
                'password', 'radio', 'search',
                'submit', 'tel', 'text', 'time', 'url'].includes(value)
            }
        },
        value: {
            required: false
        },
        checked: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            types: [
                'button',
                'checkbox',
                'color',
                'date',
                'email',
                'file',
                'number',
                'password',
                'radio',
                'search',
                'submit',
                'tel',
                'text',
                'time',
                'url'
            ]
        }
    },
}
</script>

<style>

</style>