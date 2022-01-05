<template>
    <form @submit.prevent="teste()" class="search-input-container">
        <input @input="search = $event.target.value" id="search-input" type="search" autocomplete="off" :placeholder="placeholder">
        <router-link :to="{name: 'search', params: { term: search }}">
            <button id="search-button" type="submit"/>
        </router-link>
    </form>
</template>

<script>

export default {  
    props: {
        placeholderEnglish: {
            type: String,
            required: false,
            default: 'Search for a tutorial'

        },
        placeholderPortuguese: {
            type: String,
            required: false,
            default: 'Busque por um tutorial'
        }
    },

    data() {
        return {
            search: '',
        }
    },


    computed: {
        placeholder() {
            return localStorage.getItem("lang") === "en" ? this.placeholderEnglish : this.placeholderPortuguese
        }
    },
}
</script>

<style>

</style>