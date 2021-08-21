<template>
    <div>
        <SearchNavBar
            @searchEvent="searchFromApiByTitle"
        /> 
        <SearchFilter @hasFilter="filterTutorials" />
        <div class="search-container">
            <SpinningCircle
                    v-if="!isLoaded"
                    class="loading-circle"
                />
            <div class="search-grid-container">
                <div class="filter-container">
                </div>
                <div>
                    <div v-for="tutorial in tutorials" :key="tutorial.id">
                        <Card
                            :title="tutorial.title"
                            :user_id="tutorial.user_id"
                            :description="tutorial.content"
                        >
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import Card from "../components/Card.vue"
import SpinningCircle from "../components/SpinningCircle.vue"
import SearchNavBar from "../components/SearchNavBar.vue"
import SearchFilter from "../components/SearchFilter.vue"

export default {
    
    components: {
        Card,
        SpinningCircle,
        SearchNavBar,
        SearchFilter
    },

    data() {
        return {
            tutorials: [],
            term: this.$route.params.term,
            isLoaded: false,
            search: ''
        }
    },

    methods: {
        getSearchTerm(term) {
            this.search = term;
        },

        searchFromApiByTitle(title) {
            console.log(title);
            this.$http.get(`https://api-cerquilha.herokuapp.com/tutorials/title/${title}`)
            .then((res) => res.json())
            .then((tutorials) => {
                this.isLoaded = true
                this.tutorials = tutorials
            })
        },
        
        filterTutorials(filter){
            console.log(filter);
        }

    },

    created () {
        this.searchFromApiByTitle(this.term)
    },

    beforeRouteUpdate(to, from, next) {
        this.term = to.params.term
        next()
    },

    watch: {
        search(newValue, oldValue) {
            this.searchFromApi();
        }
    },
}
</script>

<style lang="scss">

@import '../sass/global.scss';

.search-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f6f6f6;
    padding: 20px;
    min-height: 100vh;
}

.form-search {
    display: flex;
}

#search-input {
    display: block;
    height: 48px;
    width: 100%;
    border-color: $color-primary;
    border-style: solid;
    border-width: 1px 0 1px 1px;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
}


#search-button {
    display: flex;
    width: 40px;
    height: 48px;
    background-color: #fff;
    border-color: $color-primary;
    border-style: solid;
    border-width: 1px 1px 1px 0;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    padding: 0;
    cursor: pointer;

    &::before {
        display: block;
        content: '';
        background: url('../assets/search-icon.svg') no-repeat center;
        height: 48px;
        width: 40px;            
    }
}

.loading-circle {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.tutorial-card {
    max-width: 700px;
}

@include for-laptop-up {
    .search-grid-container {
        display: grid;
        grid-template-columns: 200px 1fr;
        max-width: 1200px;
    }
}

</style>