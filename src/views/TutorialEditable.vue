<template>
    <div>
        <NavBar/>
        <Message @closeMessage="hideSuccessMessage" v-if="successMessage" text="Tutorial criado com sucesso" variant="success" />
        <Message @closeMessage="hideErrorMessage" v-if="errorMessage" text="Todos os campos devem ser preenchidos" variant="error" />
        <div class="tutorial-page">
            <div class="create-tutorial-form">
                <div class='create-tutorial-header'>
                    <input v-model="tutorial.title" class="tutorial-title-input" type="text" placeholder="Novo Tutorial" required>
                </div>
                <div class="tutorial-form-group">
                    <label for="">
                        <CerquilhaText
                            textPortuguese="Descrição"
                            textEnglish="Description"
                        /> 
                    </label>
                    <input class="tutorial-input" v-model="tutorial.description" type="text" placeholder="Insira uma breve descrição do seu tutorial" required>
                </div>
                <div class="tutorial-form-group">
                    <label for="">
                        <CerquilhaText
                            textPortuguese="Imagem"
                            textEnglish="Image"
                        />
                    </label>
                    <div class="input-group-wrapper">
                        <div class="input-group">
                            <CerquilhaText
                                class="prepend"
                                textPortuguese="URL"
                                textEnglish="URL"
                            />
                            <input class="tutorial-input" v-model="tutorial.imageUrl" type="url" placeholder="Insira a URL da imagem">
                        </div>
                        <div class="input-group">
                            <CerquilhaText
                                class="prepend"
                                textPortuguese="Descrição"
                                textEnglish="Description"
                            />
                            <input class="tutorial-input" v-model="tutorial.imageDescription" type="text" placeholder="Insira a descrição da imagem">
                        </div>
                    </div>
                </div>
                <div class="tutorial-form-group">
                    <label for="">
                        <CerquilhaText
                            textPortuguese="Conteúdo"
                            textEnglish="Content"
                        />
                    </label>
                    <vue-editor class="tutorial-content" v-model="tutorial.content" :editorToolbar="customToolbar"></vue-editor>
                </div>
                <CerquilhaText
                    v-if="!isTutorialValid"
                    class="tutorial-disclaimer"
                    textPortuguese="**Todos os campos devem ser preenchidos"
                    textEnglish="**All fields must be filled"
                />
                <div class="create-tutorial-footer">
                    <Button
                        v-if="isEditable"
                        @confirm="deleteTutorial()"
                        class="create-tutorial-button delete-button"
                        type="button"
                        confirmText="Tem certeza que deseja excluir o tutorial? Uma vez excluído, o tutorial não poderá ser recuperado"
                    >
                        <CerquilhaText
                            textPortuguese="Excluir"
                            textEnglish="Delete"
                        />
                    </Button>
                    <Button
                        @click.native="livePreview = !livePreview"
                        class="create-tutorial-button preview-button"
                        :class="{'active' : livePreview}"
                        type="button"
                    >
                        <CerquilhaText
                            textPortuguese="Ver prévia"
                            textEnglish="Preview"
                        />
                    </Button>
                    <Button
                        v-if="isEditable"
                        class="create-tutorial-button save-button"
                        type="button"
                        confirmText="Deseja salvar e publicar as alterações?"
                        @confirm="editTutorial()"
                    >
                        <CerquilhaText
                            textPortuguese="Salvar"
                            textEnglish="Save"
                        />
                    </Button>
                    <Button
                        v-else
                        class="create-tutorial-button save-button"
                        type="button"
                        :disabled="!isTutorialValid"
                        confirmText="Deseja salvar e publicar o tutorial?"
                        @confirm="addTutorial()"
                    >
                        <CerquilhaText
                            textPortuguese="Publicar"
                            textEnglish="Post"
                        />
                    </Button>
                </div>
                <div v-if="livePreview" class="live-preview">
                    <TutorialComponent
                        :title="tutorial.title"
                        :description="tutorial.description"
                        :content="tutorial.content"
                        :imageUrl="tutorial.imageUrl"
                        :imageDescription="tutorial.imageDescription"
                    />
                </div>
            </div>
        </div>
        <Footer/>
    </div>
</template>

<script>

import NavBar from "@/components/NavBar.vue"
import Footer from "@/components/Footer.vue"
import Button from "@/components/Button.vue"
import TutorialComponent from "@/components/Tutorial.vue"
import { VueEditor } from 'vue2-quill-editor'
import Tutorial from '@/models/Tutorial'
import Message from '@/components/ui/AppMessage.vue'

export default {
    components: {
        NavBar,
        Footer,
        Button,
        TutorialComponent,
        VueEditor,
        Message
    },

    data() {
        return {
            userId: localStorage.getItem("id"),
            tutorialId: this.$route.params.id,
            tutorial: new Tutorial(),
            customToolbar: [
                ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                ['blockquote', 'code-block'],

                [{ 'header': 1 }, { 'header': 2 }],               // custom button values
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],

                [{ 'header': [2, 3, 4, 5, 6, false] }],

                [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                [{ 'align': [] }],

                ['clean']  
            ],
            livePreview: false,
            successMessage: false,
            errorMessage: false
        }
    },


    methods: {
        addTutorial() {
            const validTutorial = {
                title: this.tutorial.title,
                description: this.tutorial.description,
                content: this.tutorial.content,
                imageUrl: this.tutorial.imageUrl,
                imageDescription: this.tutorial.imageDescription,
                totalFavorite: 0,
                userId: this.userId
            }
            if (this.isTutorialValid) {
                this.$http.post(`tutorials`, validTutorial, {params: {token: localStorage.getItem("token")}})
                    .then(() => {
                        this.showSuccessMessage()
                        this.clearForm()
                    })
            } else {
                this.showErrorMessage()
            }
        },
        editTutorial() {
            const validTutorial = {
                title: this.tutorial.title,
                description: this.tutorial.description,
                content: this.tutorial.content,
                imageUrl: this.tutorial.imageUrl,
                imageDescription: this.tutorial.imageDescription,
                userId: this.userId
            }
            this.$http.patch(`tutorials/id/${this.tutorialId}`, validTutorial, {params: {token: localStorage.getItem("token")}})
                .then(() => {
                    this.clearForm()
                }, err => console.log(err))
        },
        deleteTutorial() {
            this.$http.delete(`tutorials/id/${this.tutorialId}}`, {params: {token: localStorage.getItem("token")}})
                .then(() => {
                    this.$router.push({name: 'my-tutorials'})
                }, err => console.log(err))
        },
        getTutorialFromApi(tutorialId) {
            this.$http.get(`tutorials/id/${tutorialId}`)
                .then((res) => res.json())
                .then((tutorial) => {
                    this.tutorial.userId = tutorial.userId
                    this.tutorial.title = tutorial.title
                    this.tutorial.description = tutorial.description
                    this.tutorial.content = tutorial.content
                    this.tutorial.imageUrl = tutorial.imageUrl
                    this.tutorial.imageDescription = tutorial.imageDescription
                    this.tutorial.date = tutorial.tutorialDate
                    this.tutorial.totalFavorite = tutorial.totalFavorite
                })
        },
        clearForm() {
            this.tutorial= new Tutorial()
        },
        showSuccessMessage() {
            this.successMessage = true
        },
        hideSuccessMessage() {
            this.successMessage = false
        },
        showErrorMessage() {
            this.errorMessage = true
        },
        hideErrorMessage() {
            this.errorMessage = false
        },
    },

    computed: {
        isEditable() {
            return this.tutorialId ? true : false 
        },
        isTutorialValid() {
            const tutorial = {
                title: this.tutorial.title,
                description: this.tutorial.description,
                content: this.tutorial.content,
                imageUrl: this.tutorial.imageUrl,
                imageDescription: this.tutorial.imageDescription,
                totalFavorite: 0,
                userId: this.userId
            }      
            if ((Object.values(tutorial)).some((value) => {
                return value === ''
            })) {
                return false
            } else {
                return true
            }
        }
    },

    created () {
        if (this.tutorialId) {
            this.getTutorialFromApi(this.tutorialId)
        }
    },
}
</script>

<style lang="scss">
@import '../sass/global.scss';

.tutorial-page {
    display: flex;
    justify-content: center;
    padding: 20px;
    min-height: calc(100vh - 72px - 144px);
}

.create-tutorial-form {
    max-width: 800px;
    width: 100%;
}

.create-tutorial-header {
    display: flex;
    align-items: center;
    margin-bottom: 40px;
}

.tutorial-title-input {
    border: none;
    font-size: 20px;
    width: 100%;
}

.create-tutorial-input {
    max-width: 600px;
    padding: 10px;
}

.tutorial-form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;

    label {
        color: $color-black;
        margin-bottom: 8px;
    }

    .input-group-wrapper {
        display: grid;
        gap: 16px;
    }
}

.tutorial-input {
    height: 40px;
    border: 1px solid #CCC;
    padding: 10px;
    width: 100%;
}

.create-tutorial-footer {
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    gap: 10px;
}

.create-tutorial-button {

    &.preview-button,
    &.save-button {
        @include button-white;
        
        &.active {
            @include button-green;
        }

        &:hover {
            @include button-green;
        }
    }

    &.delete-button {
        @include default-button;
        border: 1px solid #DC3545;
        color: #DC3545;

        &:hover {
            background-color: #DC3545;
            color: #fff;
        }
    }
}

.input-group {
    display: flex;
    align-items: center;

    .prepend {
        display: flex;
        align-items: center;
        background-color: #CCC;
        padding: 0 10px;
        height: 100%;
        border-bottom-left-radius: 4px;
        border-top-left-radius: 4px;
        color: $color-black;
    }
}

.live-preview {
    margin: 30px 0;
    padding: 12px 15px;
    border: 1px solid #CCC;
    border-radius: 8px;
}

.tutorial-disclaimer {
    display: block;
    color: #DC3545;
    font-size: 12px;
    margin: 10px 0;
}

@include for-laptop-up {
    .input-group-wrapper {
        grid-template-columns: 1fr 1fr;
    }
}

</style>