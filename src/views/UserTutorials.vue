<template>
    <div>
        <NavBar />
        <div data-page="user-tutorials">
            <div class="user-details">
                <img class="user-img" src="@/assets/userphotoexample.png" alt="">
                <h1 class="page-title">@{{user.username}}</h1>
                <CerquilhaText
                    class="member-since"
                    :textPortuguese="`Membro desde: ${user.date}`"
                    :textEnglish="`Member since: ${user.date}`"
                />
            </div>
            <div class="user-tutorials-container">
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

export default {

    components: {
        NavBar,
        Card,
        Footer,
    },

    data() {
        return {
            user: {
                username: this.$route.params.username,
                date: ''
            },
            tutorials: [],
        }
    },

    created () {
        this.getTutorialByUsername(this.user.username)
    },

    methods: {
        getTutorialByUsername(username) {
            this.$http.get(`users/username/${username}`)
                .then((res) => res.json())
                .then((user) => {
                    this.user.date = user.userDate
                    this.$http.get(`tutorials/user/${user.userId}`)
                        .then((res) => res.json())
                        .then((tutorials) => {
                            this.tutorials = tutorials
                        })
                })
        }
    }
}
</script>

<style lang="scss">
@import '../sass/global.scss';


[data-page="user-tutorials"] {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;

    .page-title {
        font-size: 18px;
        text-align: center;
        color: $color-black;
    }

    .user-img {
        max-width: 100px;
    }

    .user-details {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 40px;
    }

    .user-tutorials-container {
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

    .search-input {
        display: block;
        height: 48px;
        width: 100%;
        border: none;
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
