<template>
    <div>
        <NavBar/>
        <div data-page="tutorial-page">
            <CerquilhaLoading v-if="!isLoaded" />
            <div v-else class="tutorial-container">
                <Tutorial
                    @openModal="openModal()"
                    @toggleFavorite="toggleFavorite()"
                    :title="tutorial.title"
                    :description="tutorial.description"
                    :content="tutorial.content"
                    :imageUrl="tutorial.image.url"
                    :imageDescription="tutorial.image.description"
                    :date="tutorial.date"
                    :author="tutorial.author"
                    :hasFavoriteButton="hasUser"
                    :isFavoriteFrom="isFavoriteFrom"
                />
                <FavoriteModal
                    @click.self.native="closeModal()"
                    @closeModal="closeModal()"
                    :isOpen="isModalOpen"
                    :tutorialId="id"
                    :userId="userId"
                    :isFavoriteFrom="isFavoriteFrom"
                >
                </FavoriteModal>
            </div>
        </div>
        <Footer/>
    </div>
</template>

<script>

import NavBar from "@/components/NavBar.vue"
import Footer from "@/components/Footer.vue"
import Tutorial from '@/components/Tutorial.vue'
import FavoriteModal from '@/components/FavoriteModal.vue'

export default {

    components: {
        NavBar,
        Footer,
        Tutorial,
        FavoriteModal
    },

    data() {
        return {
            id: Number(this.$route.params.id),
            userId: '',
            tutorial: {
                userId: '',
                author: '',
                title: '',
                description: '',
                content: '',
                image: {
                    url: '',
                    description: ''
                },
                date: ''
            },
            isFavoriteFrom: [],
            isLoaded: false,
            isModalOpen: false,
        }
    },

    computed: {
        hasUser() {
            return this.$hasUser()
        }
    },

    methods: {
        openModal() {
            this.isModalOpen = true
        },

        closeModal() {
            this.isModalOpen = false
        },

        getTutorialFromApi(tutorialId) {
            this.$http.get(`tutorials/id/${tutorialId}`)
                .then((res) => res.json())
                .then((tutorial) => {
                    this.tutorial.userId = tutorial.userId
                    this.tutorial.author = tutorial.username
                    this.tutorial.title = tutorial.title
                    this.tutorial.description = tutorial.description
                    this.tutorial.content = tutorial.content
                    this.tutorial.image.url = tutorial.imageUrl
                    this.tutorial.image.description = tutorial.imageDescription
                    this.tutorial.date = tutorial.tutorialDate
                    this.tutorial.totalFavorite = tutorial.totalFavorite
                    this.isLoaded = true

                }, err => this.$router.push({name: 'page-not-found'}))

        },

        isTutorialFavoriteFrom () {
            this.$http.get(`tutorials/${this.id}/favorites/${this.userId}`)
                .then((res) => res.json())
                .then((isFavoriteFrom) => {
                    this.isFavoriteFrom = isFavoriteFrom || []
                })
        }                 
    },

    created () {
        this.userId = Number(this.$userId());
        if (this.userId) {
            this.isTutorialFavoriteFrom ();
        }
        this.getTutorialFromApi(this.id)
    }

}
</script>

<style lang="scss">
@import "../sass/global.scss";

[data-page="tutorial-page"] {
    display: flex;
    justify-content: center;
    padding: 20px;
    min-height: calc(100vh - 72px - 144px);


    .tutorial-container {
        max-width: 800px;
        width: 100%;
    }
}

</style>