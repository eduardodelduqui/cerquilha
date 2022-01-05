<template>
    <div @click="isFilterOpen = false">
        <NavBar/>
        <div data-page="favorite-list">
            <CerquilhaLoading v-if="!isLoaded" />
            <div v-else>
                <div
                    v-if="hasFavoriteLists && isLoaded"
                    class="favorite-list-container"
                >
                    <div class="filter-list-wrapper">
                        <Button
                            @click.stop.native="isFilterOpen = !isFilterOpen"
                            type="button"
                            class="favorite-list-button">
                            <CerquilhaText
                                textPortuguese="Minhas listas"
                                textEnglish="My lists"
                            />
                            <b-icon icon="filter"/>
                        </Button>
                        <Dropdown
                            class="dropdown-filter-menu"
                            :isOpen="isFilterOpen"
                        >
                            <CerquilhaList>
                                <li
                                    @click="activeListName = favoriteList"
                                    v-for="favoriteList in favoriteLists"
                                    :key="favoriteList"
                                    class="dropdown-filter-item"
                                    :class="{'active': isActive(favoriteList)}"
                                >
                                    <Button
                                        type="button"
                                    >
                                        <b-icon v-if="isActive(favoriteList)" icon="circle-fill" />
                                        <b-icon v-else icon="circle" />
                                        <CerquilhaText 
                                            :textPortuguese="favoriteList"
                                            :textEnglish="favoriteList"
                                        />
                                    </Button>
                                </li>
                            </CerquilhaList>
                        </Dropdown>
                    </div>
                    <ul class="tutorial-list">
                        <li 
                            v-for="tutorial in activeList"
                            :key="tutorial.tutorialId"
                            class="tutorial-list-item"
                        >
                            <router-link
                                :to="{name: 'tutorial', params: {id: tutorial.tutorialId}}">
                                <Card 
                                    class="tutorial-card"
                                    :title="tutorial.title"
                                    :author="tutorial.username"
                                    :description="tutorial.description"
                                    :imageUrl="tutorial.imageUrl"
                                    :date="tutorial.tutorialDate"
                                />
                            </router-link>
                        </li>
                    </ul>
                </div>
                <div v-else class="empty-page">
                    <CerquilhaText 
                        textPortuguese="Você ainda não possui uma lista de favoritos"
                        textEnglish="You don't have any favorites list yet" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import NavBar from "@/components/NavBar.vue"
import Card from "@/components/Card.vue"
import Dropdown from "@/components/ui/AppDropdown.vue"

export default {
    components: {
        NavBar,
        Card,
        Dropdown
    },

    data() {
        return {
            tutorials: [],
            favoriteLists: [],
            isFilterOpen: false,
            activeListName: '',
            isLoaded: false
        }
    },

    computed: {
        activeList() {
            if (this.activeListName) {
                return this.tutorials.filter((tutorial) => {
                    return tutorial.listName === this.activeListName
                })
            }
        },

        hasFavoriteLists () {
            return this.favoriteLists.length > 0
        }
    },

    methods: {
        isActive(item) {
            return item === this.activeListName
        }
    },

    created () {
        this.userId = this.$userId()
        this.$http.get(`users/id/${this.userId}/favorites`, {params: {token: localStorage.getItem("token")}})
            .then((res) => res.json())
            .then((tutorials) => {
                this.tutorials = tutorials
                this.isLoaded = true

                this.tutorials.filter((tutorial) => {
                    if(!this.favoriteLists.includes(tutorial.listName)) {
                        this.favoriteLists.push(tutorial.listName)
                    }
                    this.activeListName = this.favoriteLists[0]
                })
            })
    }

}
</script>

<style lang="scss">

@import '../sass/global.scss';

[data-page="favorite-list"] {
    padding: 10px;
    background-color: #F3F3F3;
    min-height: 100vh;

    .favorite-list-container {
        max-width: 1024px;
        margin: 0 auto;
    }

    .filter-list-wrapper {
        position: relative;
    }

    .dropdown-filter-menu {
        left: 0;
        max-width: 340px;
        width: 100%;
        background-color: $color-black;
        padding: 8px 10px;
        border-radius: 0px 10px 10px 10px;

    .dropdown-filter-item {
        display: flex;
        align-items: center;
        color: #f3f3f3;
        cursor: pointer;
        height: 30px;

        button {
            display: flex;
            color: #fff;
            gap: 8px;
        }

        span {
            font-size: 16px;
        };

        &:hover {
            background-color: #373b3d;
        }

        &.active {
            margin-left: 10px;
        }
    };
}

    .favorite-list-button {
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 16px;
        font-weight: 500;
        border: 1px solid $color-black;
        max-width: max-content;
        border-radius: 8px;
        padding: 4px 8px;
    }
    
    .tutorial-list {
        display: grid;
        gap: 20px;

        .tutorial-list-item {
            border-bottom: 1px solid rgba(116, 116, 116, 0.212);
        }
    }

    .tutorial-card {
        display: grid;
        grid-template-columns: minmax(auto, 3fr) 6fr;
        min-height: 120px;
        gap: 10px;
    }

    .tutorial-image {
        max-width: 120px;
        max-height: 120px;
        object-fit: cover;

    }

    .tutorial-title {
        font-size: 14px;
        height: 35px;
        overflow: hidden;
    }

    .tutorial-description {
        font-size: 12px;
        height: 28px;
        overflow: hidden;
    }

    .tutorial-title,
    .tutorial-description {
        span {
            display: block;
        }
    }

    .tutorial-author {
        font-size: 14px;
    }

    .tutorial-date {
        font-size: 12px;
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

    @include for-tablet-up {
        .tutorial-card {
            grid-template-columns: minmax(auto, 120px) 1fr;
        }
    }
    
}

</style>