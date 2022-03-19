<template>
    <div>
        <NavBar />
        <div data-page="search">
            <SearchBar />
            <CerquilhaLoading v-if="!isLoaded" />
            <div v-else class="search-container">
                <CerquilhaText
                    class="query-results"
                    :textPortuguese='`Resultados para "${term}"`'
                    :textEnglish='`Results for "${term}"`'
                />
                <CerquilhaText
                    v-if="!hasResults"
                    class="found-error"
                    textPortuguese="Nenhum tutorial foi encontrado"
                    textEnglish="No tutorial found"

                />
                <div class="tutorial-grid">
                    <div v-for="tutorial in tutorials" :key="tutorial.tutorialId">
                        <router-link :to="{name: 'tutorial', params: {id: tutorial.tutorialId}}">
                            <Card 
                                class="tutorial-card"
                                :title="tutorial.title"
                                :author="tutorial.username"
                                :description="tutorial.description"
                                :imageUrl="tutorial.imageUrl"
                                :date="tutorial.tutorialDate"
                            />
                        </router-link>
                    </div>
                </div>   
            </div>        
        </div>
    </div>
</template>

<script>

import NavBar from '@/components/NavBar.vue'
import Card from '@/components/Card.vue'
import Footer from '@/components/Footer.vue'
import SearchBar from '@/components/SearchBar.vue'

export default {

    components: {
        NavBar,
        Card,
        Footer,
        SearchBar
    },

    data() {
        return {
            term: this.$route.params.term,
            tutorials: [],
            isLoaded: false
        }
    },

    created () {
        this.getTutorialFromTitle (this.term)
    },

    methods: {
        getTutorialFromTitle (title) {
            this.$http.get(`tutorials/title/${title}`)
            .then((res) => res.json())
            .then((tutorials) => {
                this.tutorials = tutorials
                this.isLoaded = true
            })
        }
    },

    computed: {
        hasResults() {
            return this.tutorials.length > 0
        }
    },

    watch: {
        $route(newValue, oldValue) {
            this.getTutorialFromTitle (this.$route.params.term)
            this.term = this.$route.params.term
        }
    },
}
</script>

<style lang="scss">
@import '../sass/global.scss';

div [data-page="search"] {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;

    .search-container {
        max-width: 800px;
        width: 100%;
    }

    .query-results {
        display: block;
        font-size: 18px;
        margin: 0 0 16px 0;
    }

    .found-error {
        display: block;
        text-align: center;
        padding-top: 30px;
    }

    .tutorial-grid {
        display: grid;
        gap: 10px;
        width: 100%;
    }

    .tutorial-card {
        position: relative;
        display: grid;
        gap: 10px;
        padding: 10px;
        color: $color-black;
        border-bottom: 1px solid $color-primary;
        width: 100%;
    }

    .card-container {
        display: grid;
        justify-items: center;

        @include for-tablet-up {
            grid-template-columns: minmax(100px, 150px) 1fr;
            justify-items: normal;
        }
    }

    .card-description {
        position: relative;
        display: grid;
        gap: 10px;
    }
    
    .tutorial-image {
        width: 100%;
        max-width: 300px;
    }

    .tutorial-title {
        font-weight: 600;
    }

    .tutorial-description {
        @include line-clamp(3);
        height: 56px;
    }

    .tutorial-date {
        display: flex;
        justify-content: flex-end;
        font-size: 14px;
    }

    .search-input-container {
        display: flex;
        width: 100%;
        max-width: 800px;
        margin: 30px auto;
        border: 1px solid $color-primary;
        border-radius: 8px;
        overflow: hidden;
                    
        &.error-message {
            border: 1px solid #cc0000;

            .search-input {
                animation: shake-input 500ms both;
                
                &::placeholder {
                color: #cc0000;
                }
            }
        }
    }

    .search-input {
        display: block;
        height: 48px;
        width: 100%;
        padding: 15px;
        border: none;
        outline: none;
    }

    #search-button {
        display: flex;
        width: 40px;
        height: 48px;
        background-color: #fff;
        border: none;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        cursor: pointer;

        &::before {
            display: block;
            content: '';
            background: url('../assets/search-icon.svg') no-repeat center;
            height: 48px;
            width: 40px;            
        }
    }
}
</style>
