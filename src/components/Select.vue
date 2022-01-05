<template>
    <div class="select">
        <button @click="isOpen = !isOpen" class="toggle-select">Filtro</button>
        <div v-if="isOpen" class="options-wrapper">
            <button 
                v-for="option in options"
                class="option"
                :class="{'is-selected' : isSelected(option)}"
                :key="option"
                @click="optionSelected = option"    
            >
                {{option}}
            </button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        options: []
    },

    data () {
        return {
            optionSelected: '',
            isOpen: false
        }
    },

    methods: {
        isSelected (option) {
            return this.optionSelected === option
        }
    },
}
</script>

<style lang="scss" scoped>

.select {
    display: flex;
    flex-direction: row-reverse;
    font-size: 14px;
    min-height: 32px;
}

.toggle-select {
    font-size: 14px;
}

.options-wrapper {
    display: flex;
}

.option {
    padding: 8px;
    border-radius: 4px;
    margin-right: 10px;
    cursor: pointer;

    &.is-selected {
        background-color: #212121;
        color: #fff;
    }
}
</style>