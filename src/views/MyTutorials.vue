<template>
    <div>
        <NavBar />
        <div data-page="my-tutorials">
            <CerquilhaLoading v-if="!isLoaded" />
            <div v-else>
                <div
                    v-if="hasTutorials"
                    class="my-tutorials-container"
                >
                    <h1 class="page-title">Meus tutoriais</h1>
                    <div class="tutorial-grid">
                        <div v-for="tutorial in tutorials" :key="tutorial.tutorialId">
                            <router-link :to="{name: 'edit-tutorial', params: {id: tutorial.tutorialId}}">
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
                <div v-else class="empty-page">
                    <CerquilhaText
                        textPortuguese="Você ainda não criou um tutorial"
                        textEnglish="You haven't created a tutorial yet"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import NavBar from '@/components/NavBar.vue'
import Card from '@/components/Card.vue'
import Footer from '@/components/Footer.vue'

export default {

    components: {
        NavBar,
        Card,
        Footer,
    },

    data() {
        return {
            userId: '',
            tutorials: [],
            isLoaded: false
        }
    },

    computed: {
        hasTutorials() {
            return this.tutorials.length > 0
        }
    },

    methods: {
        getTutorialFromUser (userId) {
            this.$http.get(`tutorials/user/${userId}`)
            .then((res) => res.json())
            .then((tutorials) => {
                this.tutorials = tutorials
                this.isLoaded = true
            })
        }
    },

    created () {
        this.userId = localStorage.getItem("id")
        this.getTutorialFromUser (this.userId)
    }
}
</script>

<style lang="scss">
@import '../sass/global.scss';

div [data-page="my-tutorials"] {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;

    .my-tutorials-container {
        max-width: 800px;
        width: 100%;
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
    }

    #search-input {
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

    .empty-page {
        height: 50vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;

        span {
            font-size: 18px;
            color: #ccc;
            text-align: center;
        }
    }
}
</style>
