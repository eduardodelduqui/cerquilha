<template>
    <div>
        <NavBar/>
        <Message
            v-if="showLoginError"
            @closeMessage="hideLoginErrorMessage()"
            variant="error"
        >
        <CerquilhaText 
            textPortuguese="Usuário ou senha incorretos"
            textEnglish="Incorrect username or password"
        />
        </Message>
        <div class="login-page">
            <div class="form-container">
                <CerquilhaText
                    tag="h1"
                    class="form-title"
                    textPortuguese="ENTRE NO CERQUILHA"
                    textEnglish="LOG IN TO CERQUILHA"
                />
                <span v-if="showFormError" class="form-error">E-mail ou senha inválidos. Tente novamente.</span>
                <form @submit.prevent="submitForm()">
                    <div class="form-group">
                        <label for="" class="form-label">E-mail</label>
                        <input v-model="form.email" class="form-input" type="email">
                        <div class="error-container">
                            <CerquilhaText
                                v-if="errorFields.email"
                                textPortuguese="Insira o seu e-mail"
                                textEnglish="Insert your e-mail"
                            />
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="" class="form-label">
                            <CerquilhaText
                                textPortuguese="Senha"
                                textEnglish="Password"
                            />
                        </label>
                        <input v-model="form.password" class="form-input" type="password">
                        <div class="error-container">
                            <CerquilhaText
                                v-if="errorFields.password"
                                textPortuguese="Insira a sua senha"
                                textEnglish="Insert your password"
                            />
                        </div>
                    </div>
                    <div class="buttons-container">
                        <Button type="submit" class="form-button login-button">
                            <CerquilhaText 
                                textPortuguese="Entrar" 
                                textEnglish="Log in"
                            />
                        </Button>
                        <router-link
                            class="form-button signup-button"
                            tag="button"
                            :to="{name: 'signup'}"
                        >
                            <CerquilhaText 
                                textPortuguese="Criar nova conta" 
                                textEnglish="Create new account"
                            />
                        </router-link>
                    </div>
                </form>
            </div>
        </div>
        <Footer/>
    </div>
</template>

<script>

import NavBar from "@/components/NavBar.vue"
import Button from "@/components/Button.vue"
import Footer from "@/components/Footer.vue"
import Message from "@/components/ui/AppMessage.vue"

export default {
    components: {
        NavBar,
        Button,
        Footer,
        Message
    },

    data() {
        return {
            form: {
                email: '',
                password: ''
            },
            errorFields: {
                email: '',
                password: ''
            },
            showFormError: false,
            showLoginError: false
        }
    },

    methods: {  
        submitForm() {
            this.updateErrorFields()
            if (this.isFormValid()) {
                this.$http.post(`login`, this.form)
                    .then((res) => {
                        localStorage.setItem("id", res.body.id);
                        localStorage.setItem("auth", res.body.auth);
                        localStorage.setItem("token", res.body.token);
                        this.$router.push({name: 'home'})
                    }, err => {
                        if (err.status === 401) {
                            this.showLoginErrorMessage()
                        }
                    })
            }
        },
        isFormValid() {
            return !Object.values(this.errorFields).includes(true)
        },
        isEmailValid() {
            return this.form.email ? true : false
        },
        isPasswordValid() {
            return this.form.password ? true : false
        },        
        updateErrorFields() {
            this.errorFields.email = !this.isEmailValid()
            this.errorFields.password = !this.isPasswordValid()
        },
        showLoginErrorMessage() {
            this.showLoginError = true
        },
        hideLoginErrorMessage() {
            this.showLoginError = false
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../sass/global.scss';

.login-page {
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 25px 0;
    min-height: calc(100vh - 72px - 144px);
}

.form-container {
    display: flex;
    flex-direction: column;
    padding: 40px;
    width: 100%;
    max-width: 500px;
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
    margin-bottom: 10px;

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
    align-items: center;

    .checkbox-input {
        height: 20px;
        width: 20px;
        margin-right: 5px;
    }
}

.buttons-container {
    display: grid;
    gap: 15px;
}

.form-button {
    font-weight: 700;
    width: 100%;

    &.login-button {
        @include button-green;
    }

    &.signup-button {
        @include button-white;
        cursor: pointer;
    }
}

.form-error {
    padding: 10px 20px;
    background-color: #ffdddd;
    border: 1px solid #ec2626;
    color:#ec2626;
    margin-bottom: 10px;
}

.error-container {
    color: #ec2626;
    height: 20px;
}

.forget-password-link {
    color: #4363D2;
}

@include for-tablet-up {
    .login-page {
        padding: 100px 0;
    }

    .form-container {
        padding: 70px 86px 120px;
        box-shadow: 0 0 8px 4px rgba(0, 0 , 0, 0.1);
        border-radius: 8px;
    }

    .form-title {
        font-size: 32px;
    }

    .form-button {
        &.login-button,
        &.signup-button {
            height: 56px;
        }
    }
}

</style>