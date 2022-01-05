<template>
    <component :is="tag">
        {{text}}
    </component>
</template>

<script>
export default {
    props: {
        textEnglish: {
            type: String,
            required: false
        },
        textPortuguese: {
            type: String,
            required: false
        },
        tag: {
            type: String,
            required: false,
            default: 'span'
        }
    },

    computed: {
        text() {
            return localStorage.getItem("lang") === "en" ? this.textEnglish : this.textPortuguese
        },
    },



}
</script>

<style>

</style>