<template>
    <div>
        <NavBar/>
        <Message @closeMessage="hideSuccessMessage" v-if="successMessage" text="Perfil alterado com sucesso" variant="success" />
        <div data-page="profile">
            <CerquilhaLoading v-if="!isLoaded" />
            <div v-else class="profile-container">
                <div class="user-details">
                    <img class="user-img" src="@/assets/userphotoexample.png" alt="">
                    <CerquilhaText
                        tag="h1"
                        class="page-title"
                        textPortuguese="Meu Perfil"
                        textEnglish="My Profile"
                    />

                    <div class="profile-info profile-username">
                        <span>@{{user.username}}</span>
                    </div>
                    <div class="profile-info profile-date">
                        <CerquilhaText
                            :textPortuguese="`Membro desde: ${user.userDate}`"
                            :textEnglish="`Member since: ${user.userDate}`"
                        />
                    </div>
                    <div class="profile-info profile-email">
                        <span>{{user.email}}</span>
                    </div>
                </div>

                <div class="address-info">
                    <div class="address-info-group">
                        <label class="address-info-label" for="">CEP</label>
                        <input v-model="user.cep" class="address-info-input" type="text">
                    </div>
                    <div class="address-info-group">
                        <label class="address-info-label" for="">Estado</label>
                        <input v-model="user.state" class="address-info-input" type="text">
                    </div>
                    <div class="address-info-group">
                        <label class="address-info-label" for="">Cidade</label>
                        <input v-model="user.city" class="address-info-input" type="text">
                    </div>
                    <div class="address-info-group">
                        <label class="address-info-label" for="">Rua</label>
                        <input v-model="user.street" class="address-info-input" type="text">
                    </div>
                    <div class="address-info-group">
                        <label class="address-info-label" for="">Complemento</label>
                        <input v-model="user.complement" class="address-info-input" type="text">
                    </div>
                </div>
                <div class="buttons-container">
                    <Button
                        class="delete-button"
                        type="button"
                        confirmText="Tem certeza que deseja excluir a sua conta? Uma vez excluída, sua conta nunca mais poderá ser acessada ou recuperada"
                        @confirm="deleteProfile()"
                    >
                        <CerquilhaText
                            textPortuguese="Excluir conta"
                            textEnglish="Delete account"
                        />
                    </Button>
                    <Button
                        @click.native="updateProfile()"
                        type="button"
                        class="save-button"
                    >
                        <CerquilhaText
                            textPortuguese="Salvar"
                            textEnglish="Save"
                        />
                    </Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import NavBar from '@/components/NavBar.vue'
import Button from '@/components/Button.vue'
import User from '@/models/User'
import Message from '@/components/ui/AppMessage.vue'

export default {

    components: {
        NavBar,
        Button,
        Message
    },

    data() {
        return {
            id: '',
            user: new User(),
            isLoaded: false,
            successMessage: false
        }
    },

    methods: {
        updateProfile() {
            const userForm = {
                cep: this.user.cep,
                state: this.user.state,
                city: this.user.city,
                street: this.user.street,
                complement: this.user.complement
            }
            this.$http.patch(`users/${this.id}}`, userForm,{params: {token: localStorage.getItem("token")}})
                .then(() => {
                    this.showSuccessMessage()
                }, err => console.log(err))
        },
        deleteProfile() {
            this.$http.delete(`users/${this.id}}`, {params: {token: localStorage.getItem("token")}})
                .then(() => {
                    localStorage.clear()
                    this.$router.push({name: 'home'})
                }, err => console.log(err))
        },
        getUserFromId (id) {
            this.$http.get(`users/id/${id}`, {params: {token: localStorage.getItem("token")}})
            .then((res) => res.json())
            .then((user) => {
                this.user.username = user.username
                this.user.email = user.email
                this.user.userDate = user.userDate
                this.user.cep = user.cep
                this.user.state = user.state
                this.user.city = user.city
                this.user.street = user.street
                this.user.complement = user.complement
                this.isLoaded = true
            })
        },
        showSuccessMessage() {
            this.successMessage = true
        },
        hideSuccessMessage() {
            this.successMessage = false
        },
    },

    created() {
        this.id = localStorage.getItem("id")
        this.getUserFromId (this.id)
    },

}
</script>

<style lang="scss">
@import '../sass/global.scss';

[data-page="profile"] {
    padding: 20px;

    .profile-container {
        max-width: 800px;
        margin: 0 auto;
    }

    .page-title {
        text-align: center;
        color: $color-black;
    }
    
    .user-details {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 40px;
    }

    .user-img {
        max-width: 100px;
    }

    .profile-info {
        text-align: center;
        margin-bottom: 8px;
    }

    .profile-date {
        font-size: 14px;
    }

    .address-info {
        display: grid;
        gap: 10px;
    }

    .address-info-group {
        display: grid;
        gap: 8px;
        color: $color-black;

        .address-info-input {
            height: 32px;
            padding: 8px;
        }
    }

    .buttons-container {
        display: flex;
        flex-wrap: wrap;
        margin-top: 20px;
        gap: 10px;

        .delete-button {
            @include default-button;
            border: 1px solid #DC3545;
            color: #DC3545;
        }
    
        .save-button {
            @include button-white;
        }
    }


}


</style>