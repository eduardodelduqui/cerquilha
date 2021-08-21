<template>
    <div>
        <NavBar/>
        <div class="signup-page">
            <div class="grid-container">
                <div class="headline">
                    <h1 class="headline-title">Faça parte da tripulação!</h1>
                    <img src="../assets/signup-img.png" alt="">
                </div>
                <div class="form-container">
                    <h2 class="form-title">CRIE O SEU CADASTRO</h2>
                    <form @submit.prevent="addUser()">
                        <div class="form-group">
                            <label for="input-email" class="form-label">E-mail</label>
                            <input v-model="form.email" id="input-email" class="form-input" type="email">
                            <span v-if="error.email" class="error-checkbox">E-mail inválido, insira um e-mail válido</span>
                        </div>
                        <div class="form-group">
                            <label for="input-password" class="form-label">Senha</label>
                            <input v-model="form.password" id="input-password" class="form-input" type="password">
                            <span v-if="isPasswordWrong" class="error-checkbox">Senha inválida, insira uma senha válida</span>
                        </div>
                        <div class="form-group">
                            <label for="input-confirm-password" class="form-label">Confirmar senha</label>
                            <input v-model="form.confirmPassword" id="input-confirm-password" class="form-input" type="password">
                            <span v-if="isConfirmPasswordWrong" class="error-checkbox">Senhas diferentes, repita corretamente a senha</span>
                        </div>
                        <div class="form-group checkbox-group">
                            <input v-model="form.acceptTerms"  id="input-checkbox" type="checkbox">
                            <label for="input-checkbox">Li e aceito os termos de uso</label>
                            <span v-if="isCheckboxWrong" class="error-checkbox">Por favor, leia e aceite os termos</span>
                        </div>
                        <div class="button-container">
                            <Button 
                                text="CADASTRAR"
                                color="green"
                                type="submit"
                                class="form-button"
                            />
                            <router-link :to="{name: 'login'}">
                                <Button 
                                    text="JÁ TENHO UM PERFIL"
                                    color="white"
                                    type="button"
                                    class="form-button"
                                />
                            </router-link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import NavBar from "../components/NavBar.vue"
import Button from "../components/Button.vue"

export default {
    components: {
        NavBar,
        Button
    },

    data() {
        return {
            form: {
                email: '',
                password: '',
                confirmPassword: '',
                acceptTerms: false
            },

            error: {
                email: false,
                password: false,
                confirmPassword: false,
                acceptTerms: false
            }
        }
    },

    methods: {
        isFormValid() {
            !this.form.email ? this.error.email = true : this.error.email = false
            !this.form.password ? this.error.password = true : this.error.password = false
            this.form.password !== this.form.confirmPassword ? this.error.confirmPassword = true : this.error.confirmPassword = false
            !this.form.acceptTerms ? this.error.acceptTerms = true : this.error.acceptTerms = false

            const error = (Object.values(this.error).some((field) => {
                return field
            }))
            
            return !error
        },

        addUser() {
            if(this.isFormValid()) {
                const validForm = {
                    username: this.form.email,
                    email: this.form.email,
                    nickname: this.form.email,
                    pw: this.form.password
                }
                this.$http.post(`https://api-cerquilha.herokuapp.com/users`, validForm)
                .then(() => this.clearForm(), err => console.log(err))
            }
        },

        clearForm() {
            this.form = {
                email: '',
                password: '',
                confirmPassword: '',
                acceptTerms: false
            }
        }
    },

    computed: {
        isEmailWrong() {
            return this.error.email
        },
        isPasswordWrong() {
            return this.error.password
        },
        isConfirmPasswordWrong() {
            return this.error.confirmPassword
        },
        isCheckboxWrong() {
            return this.error.acceptTerms
        }
    },
}
</script>

<style lang="scss" scoped>
@import '../sass/global.scss';

.signup-page {
    display: flex;
    justify-content: center;
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
    box-shadow: 0 0 8px 4px rgba(0, 0, 0, 0.1);

}

.form-title {
    color: #4C4C4C;
    text-align: center;
    font-size: 24px;
    font-weight: 400;
}

.form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;

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
    font-weight: 700;
    width: 100%;

    &:last-child {
        margin-top: 16px;
    }
}

.error-checkbox {
    color: #ff0000;
    display: block;
    width: 100%;
}

@include for-desktop-up {
    .headline {
        display: block;
    }

    .grid-container {
        padding: 100px 0;
        grid-template-columns: 1fr 1fr;
    }

    .form-container {
        grid-column-start: 2;
        padding: 40px 86px;
    }
}

</style>