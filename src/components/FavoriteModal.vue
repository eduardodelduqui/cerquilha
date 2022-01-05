<template>
    <Modal
        @click.self.native="isModalOpen = false" 
        class="modal"
        :isOpen="isOpen"
    >
        <div class="modal-wrapper">
            <div class="modal-header">
                <div class="modal-title">
                    <CerquilhaText 
                        textPortuguese="Salvar em..."
                        textEnglish="Save to..."
                    />
                </div>
                <div class="close-button">
                    <b-icon @click="closeModal()" icon="x-circle" scale="2"></b-icon>
                </div>
            </div>
            <div class="modal-body">
                <CerquilhaList>
                    <li 
                        v-for="favoriteList in userFavoritesList"
                        :key="favoriteList"
                    >
                        <label class="fav-input-group">
                            <Input
                                @input="toggleToFavorite"
                                type="checkbox"
                                :value="favoriteList"
                                :checked="isChecked(favoriteList)" />
                            <CerquilhaText 
                                :textPortuguese="favoriteList"
                                :textEnglish="favoriteList"
                            />
                        </label>
                    </li>
                </CerquilhaList>
            </div>
            <div @click="openCreateFavoriteModal()" class="modal-footer">
                <div
                    v-if="!isCreatingFavorite"
                    class="create-favorite-list"
                >
                    <b-icon @click="closeModal()" icon="x-circle" scale="2" rotate="45"></b-icon>
                    <CerquilhaText
                        textPortuguese="Criar nova lista de favoritos" 
                        textEnglish="Create new favorite list"
                    />
                </div>
                <div
                    v-else
                    class="create-favorite-list-form"
                >
                    <form @submit.prevent="addToFavoriteList(newFavoriteForm.name)">
                        <label>
                            <CerquilhaText textPortuguese="Nome: " textEnglish="Name: " />
                        </label>
                        <input v-model="newFavoriteForm.name" type="text">
                        <Button 
                            class="create-favorite-button"
                            type="submit"
                        >
                            <CerquilhaText
                                textPortuguese="Criar" 
                                textEnglish="Create"
                            />
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    </Modal>
</template>

<script>

import AppModal from '@/components/ui/AppModal.vue'
import AppInput from '@/components/ui/AppInput.vue'

export default {
    components: {
        'Modal': AppModal,
        'Input': AppInput
    },
    props: {
        isOpen: {
            type: Boolean,
            default: false
        },
        tutorialId: {
            type: Number,
            required: true
        },
        userId: {
            type: Number,
            required: true
        },
        isFavoriteFrom: {
            type: Array,
            required: true
        }
    },

    data() {
        return {
            userFavoritesList: [],
            favoriteCheckbox: [],
            newFavoriteForm: {
                name: ''
            },
            isCreatingFavorite: false,
            isCreated: false
        }
    },

    methods: {
        toggleToFavorite(event) {
            event.target.checked ?  this.addToFavoriteList(event.target.value) :  this.removeFromFavoriteList(event.target.value)
        },

        isChecked (name) {
            return this.isFavoriteFrom.includes(name)
        },

        closeModal () {
            this.$emit('closeModal')
            this.closeCreateFavoriteModal()
        },

        openCreateFavoriteModal () {
            this.isCreatingFavorite = true
        },

        closeCreateFavoriteModal () {
            this.isCreatingFavorite = false
        },

        getUserFavoritesList (id) {
            this.$http.get(`users/id/${id}/favorites/lists`, {params: {token: localStorage.getItem("token")}})
                .then((res) => res.json())
                .then((userFavoritesList) => this.userFavoritesList = userFavoritesList)
        },

        addToFavoriteList (listName) {
            const values = {
                tutorialId: this.tutorialId,
                listName: listName
            }
            this.$http.post(`users/id/${this.userId}/favorites`, values)
                .then(() => {
                    this.closeModal();
                }, err => console.log(err))
        },

        removeFromFavoriteList (listName) {
            console.log('chamando remove');
            this.$http.delete(`users/id/${this.userId}/tutorials/${this.tutorialId}/favorites/${listName}`)
                .then(() => {
                    this.$emit('removedFromFavorite')
                }, err => console.log(err))
        }
    },

    created() {
        this.getUserFavoritesList(this.userId)
    }
}
</script>

<style lang="scss" scoped>
@import "../sass/global.scss";

.modal {
    position: fixed;
    width: 100%;
    height: 100%;
    color: white;
    background-color: rgba(0, 0, 0, 0.30);
    z-index: 100;
    top: 0;
    left: 0;
}

.modal-wrapper {
    display: grid;
    grid-template-rows: 55px auto minmax(55px, auto);
    position: absolute;
    max-width: 450px;
    width: 80%;
    background-color: $color-black;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
}

.modal-header, .modal-footer {
    height: 100%;
    display: flex;
    align-items: center;
    padding: 10px 30px;
}

.modal-header {
    border-bottom: 1px solid rgba(112, 111, 111, 0.25);
    
    .modal-title {
        flex-grow: 1;
    }

    svg {
        cursor: pointer;
    }

}

.modal-body {
    padding: 10px 30px;
}

.modal-footer {
    .create-favorite-list {
        display: flex;
        align-items: center;
        gap: 10px;
        cursor: pointer;
    }

    .create-favorite-list-form {
        width: 100%;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 4px;

        label {
            font-size: 12px;
        }

        input {
            outline: 0;
            color: #fff;
            font-size: 14px;
            background-color: transparent;
            border: none;
            border-bottom: 1px solid rgba(150, 150, 150, 0.5);
            width: 100%;
            caret-color: #fff;
            margin-bottom: 20px;

            &:focus {
                border-color: #fff;
            }
        }
    }

    .create-favorite-button {
        font-size: 14px;
        padding: 6px 10px;
        margin-left: auto;
        color: #fff;
        border: 1px solid rgba(112, 111, 111, 0.25);
        border-radius: 4px;
    }

}

</style>