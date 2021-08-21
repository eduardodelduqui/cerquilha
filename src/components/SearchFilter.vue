<template>
    <div class="search-filter">
        <button @click="isOpen = !isOpen" class="filter-button">
            <b-icon icon="filter" class="filter-icon" font-scale="1.5"></b-icon>
        </button>
        <div v-if="isOpen" class="filter-container">
            <button 
                @click="filter = 'relevant'"
                class="filter-option"
                :class="{'selected': filterRelevant}"
            >
            Mais relevantes
            </button>
            <button 
                @click="filter = 'recent'"
                class="filter-option"
                :class="{'selected': filterRecent}"
            >
            Mais recentes
            </button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isOpen: false,
            filter: 'relevant'
        }
    },

    methods: {
        toggleSelect(button) {
            button.classList.toggle('selected')
        }
    },
    
    computed: {
        filterRelevant() {
            return this.filter === 'relevant'
        },

        filterRecent() {
            return this.filter === 'recent'
        }
    },

    watch: {
        filter(newValue, oldValue) {
            this.$emit('hasFilter', this.filter)
        }
    },

}
</script>

<style lang="scss">
@import '../sass/global.scss';

.search-filter {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    padding: 5px 20px;

    .filter {
        background: $color-black;
        color: #fff;
        padding: 0 20px;
        height: 40px;
        border-radius: 8px;
    }
}

.filter-button {
    display: block;
    background-color: transparent;
    border: 1px solid black;
    border-radius: 8px;
    height: 30px;
}

.filter-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5px;
    padding: 0 5px;
}

.filter-option {
    border: 1px solid black;
    height: 30px;
    border-radius: 8px;
    text-align: center;
    width: 120px;

    &.selected {
        background-color: rgb(46, 46, 46);
        color: #fff;
    }
}

</style>