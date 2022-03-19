<template>
    <form
        @submit.prevent="submitSearchForm()"
        class="search-input-container"
        :class="{'error-message' : error}"
    >
        <input
            @input="search = $event.target.value"
            class="search-input"
            type="search"
            autocomplete="off"
            :placeholder="error ? placeholderError : placeholder"
        >
            <button id="search-button" type="submit"/>
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
        },
        placeholderEnglishError: {
            type: String,
            required: false,
            default: 'Type what you are looking for'
        },
        placeholderPortugueseError: {
            type: String,
            required: false,
            default: 'Digite o que você busca'
        },
    },

    data() {
        return {
            search: '',
            error: false
        }
    },


    computed: {
        placeholder() {
            return localStorage.getItem("lang") === "en" ? this.placeholderEnglish : this.placeholderPortuguese
        },
        placeholderError() {
            return localStorage.getItem("lang") === "en" ? this.placeholderEnglishError : this.placeholderPortugueseError
        }
    },

    methods: {
        submitSearchForm() {
            if (this.search) {
                this.$router.push({name: 'search', params: { term: this.search }})
            } else {
                this.error = true
            }
        }
    },
}
</script>

<style/>