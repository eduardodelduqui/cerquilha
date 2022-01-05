<template>
    <div data-page="signup-page">
        <NavBar/>
        <div class="signup-page">
            <div class="grid-container">
                <div class="headline">                        
                    <CerquilhaText
                        tag="h1"
                        class="headline-title"
                        textPortuguese="Faça parte da tripulação!"
                        textEnglish="Be part of the crew!"
                    />
                    <img src="@/assets/signup-img.png" alt="">
                </div>
                <div class="form-container">
                    <CerquilhaText
                        class="success-message"
                        :class="{'active': successMessage}"
                        textPortuguese="Cadastro realizado com sucesso!"
                        textEnglish="Successfully registered!"
                    />
                    <CerquilhaText
                        tag="h2"
                        class="form-title"
                        textPortuguese="CRIE O SEU CADASTRO"
                        textEnglish="SIGN UP TO CERQUILHA"
                    />
                    <form @submit.prevent="submitForm()">
                        <div class="form-group">
                            <label for="input-username" class="form-label">
                                <CerquilhaText
                                    textPortuguese="Usuário"
                                    textEnglish="Username"
                                />
                            </label>
                            <input v-model="form.username" id="input-username" class="form-input" type="text">
                            <CerquilhaText
                                class="username-disclaimer"
                                textPortuguese="*Esse será o seu nome público no Cerquilha"
                                textEnglish="*This will be your public name on Cerquilha"
                            />
                            <div class="error-container">
                                <CerquilhaText
                                    v-if="errorFields.username"
                                    textPortuguese="Insira o seu nome de usuário"
                                    textEnglish="Insert your username"
                                />
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="input-email" class="form-label">E-mail</label>
                            <input v-model="form.email" id="input-email" class="form-input" type="email">
                            <div class="error-container">
                                <CerquilhaText
                                    v-if="errorFields.email"
                                    textPortuguese="Insira um e-mail válido"
                                    textEnglish="Insert a valid e-mail"
                                />
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="input-password" class="form-label">
                                <CerquilhaText
                                    textPortuguese="Senha"
                                    textEnglish="Password"
                                />
                            </label>
                            <input v-model="form.password" id="input-password" class="form-input" type="password">
                            <div class="error-container">
                                <CerquilhaText
                                    v-if="errorFields.email"
                                    textPortuguese="Insira a sua senha"
                                    textEnglish="Insert your password"
                                />
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="input-confirm-password" class="form-label">
                                <CerquilhaText
                                    textPortuguese="Confirmar senha"
                                    textEnglish="Confirm password"
                                />
                            </label>
                            <input v-model="confirmPassword" id="input-confirm-password" class="form-input" type="password">
                            <div class="error-container">
                                <CerquilhaText
                                    v-if="errorFields.confirmPassword"
                                    textPortuguese="Repita corretamente a senha"
                                    textEnglish="Repeat password correctly"
                                />
                            </div>
                        </div>
                        <div class="form-group checkbox-group">
                            <input id="input-checkbox" type="checkbox" required>
                            <label for="input-checkbox">
                                <CerquilhaText
                                    textPortuguese="Li e aceito os termos de uso"
                                    textEnglish="I've read and accepted the terms of use"
                                />
                            </label>
                        </div>
                        <div class="button-container">
                            <Button 
                                type="submit"
                                class="form-button signup-button"
                            >
                                <CerquilhaText
                                    textPortuguese="Cadastrar"
                                    textEnglish="Sign up"
                                />
                            </Button>
                            <Button 
                                type="button"
                                class="form-button login-button"
                                routeName="login"
                            >
                                <CerquilhaText
                                    textPortuguese="Já tenho um perfil"
                                    textEnglish="I already have an account"
                                />
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
</template>

<script>

import NavBar from "@/components/NavBar.vue"
import Button from "@/components/Button.vue"
import Footer from "@/components/Footer.vue"
import User from "@/models/User"

export default {
    components: {
        NavBar,
        Button,
        Footer
    },

    data() {
        return {
            form: new User(),
            errorFields: {
                username: '',
                email: '',
                password: '',
                confirmPassword: ''
            },
            confirmPassword: '',
            successMessage: false
        }
    },

    methods: {
        submitForm () {
            this.updateErrorFields()
            if (this.isFormValid()) {
                this.addUser()
            }
        },
        isUsernameValid () {
            return this.form.username ? true : false
        },
        isEmailValid () {
            const re = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
            return re.test(String(this.form.email).toLowerCase());
        },
        isPasswordValid () {
            return this.form.password ? true : false
        },
        isPasswordConfirmed () {
            return this.form.password == this.confirmPassword 
        },
        isFormValid () {
            return this.isUsernameValid() && this.isEmailValid() && this.isPasswordValid() && this.isPasswordConfirmed()
        },
        updateErrorFields () {
            this.errorFields.username = !this.isUsernameValid()
            this.errorFields.email = !this.isEmailValid()
            this.errorFields.password = !this.isPasswordValid()
            this.errorFields.confirmPassword = !this.isPasswordConfirmed()
        },
        clearForm() {
            this.form = new User()
            this.confirmPassword = ''
        },
        showSuccessMessage() {
            this.successMessage = true
        },
        addUser() {
            this.$http.post(`users`, this.form)
            .then(() => {
                this.clearForm()
                this.showSuccessMessage()
            }, err => console.log(err))
        }
    }
}
</script>

<style lang="scss">
@import '../sass/global.scss';

[data-page="signup-page"] {

    .signup-page {
        display: flex;
        justify-content: center;
        min-height: calc(100vh - 72px - 144px);
    }
    
    .headline {
        display: none;
    }
    
    .headline-title {
        font-size: 72px;
        color: $color-black;
        margin: 0;
    }
    
    .grid-container {
        display: grid;
        grid-template-columns: 1fr;
        max-width: 1200px;
        width: 100%;
        justify-items: center;
        align-items: center;
    }
    
    .form-container {
        display: flex;
        flex-direction: column;
        padding: 40px;
        max-width: 500px;
        width: 100%;
        border-radius: 8px;
    }
    
    .form-title {
        color: #4C4C4C;
        text-align: center;
        font-size: 24px;
        font-weight: 400;
        margin-bottom: 16px;
    }
    
    .form-group {
        display: flex;
        flex-direction: column;
        margin-bottom: 12px;
    
        .form-label {
            font-size: 14px;
            font-weight: 700;
            color: #4C4C4C;
            margin-bottom: 8px;
        }
    
        .form-input {
            height: 40px;
            border: 1px solid #4C4C4C;
        }
    
        &:last-child {
            margin-bottom: 30px;
        }
    }
    
    .checkbox-group {
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
    
        #input-checkbox {
            height: 20px;
            width: 20px;
            margin-right: 5px;
        }
    }
    
    .form-button {
        display: block;
        width: 100%;
    
        &.signup-button {
            @include button-green;
            font-weight: 700;
        }
    
        &.login-button {
            @include button-white;
            margin-top: 16px;
    
            .button {
                font-size: 14px;
                font-weight: 700;
                color: $color-primary;
            }
        }
    }
    
    .username-disclaimer {
        font-size: 12px;
        color: $color-black;
    }
    
    .success-message {
        display: none;
        position: absolute;
        transform: translateX(-50%);
        left: 50%;
        top: 100px;
        background-color: $color-primary;
        color: #fff;
        padding: 20px;
        border-radius: 8px;
        opacity: 0;
    
        &.active {
            display: block;
            animation: fade-in 8s both;
        }
    }
    
    .error-container {
        color: #ec2626;
        height: 20px;
    }
    
    @include for-tablet-up {
        .signup-page {
            padding: 100px 0;
        }
    
        .form-container {
            box-shadow: 0 0 8px 4px rgba(0, 0, 0, 0.1);
            padding: 40px 86px;
        }
    
        .form-button {
            height: 56px;
        }
    
        .success-message {
            width: 200px;
        }
    }
    
    @include for-laptop-up {
        .form-container {
            padding: 40px 86px;
        }
    }
    
    @include for-desktop-up {
        .headline {
            display: block;
        }
    
        .grid-container {
            grid-template-columns: 1fr 1fr;
        }
    
        .form-container {
            grid-column-start: 2;
        }
    }
    
    @keyframes fade-in {
        0% {
            display: block;
            opacity: 0
        } 20% {
            opacity: 1
        } 80% {
            opacity: 1
        }100% {
            opacity: 0
        }
    }
}

</style>