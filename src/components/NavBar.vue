<template>
    <nav class="navbar">
        <div class="nav-container" :class="{'has-user': hasUser}">
            
            <router-link :to="{name: 'home'}" class="logo">
                <img src="@/assets/logo.png" alt="">
            </router-link>
            <div class="lang-buttons">
                <button @click="changeToPortuguese()">
                    <img class="lang-flag" src="@/assets/portuguese-flag.png" title="Versão Português">
                </button>
                <button @click="changeToEnglish()">
                    <img class="lang-flag" src="@/assets/english-flag.png" title="English Version">
                </button>
            </div>
            <div
                @mouseover="isOpen = true"
                @mouseout="isOpen = false"
                class="dropdown-wrapper"
            >
                <button
                    class="dropdown-button"
                />
                <Dropdown
                    class="dropdown-menu"
                    :isOpen="isOpen"
                >
                    <ul>
                        <li
                            class="dropdown-menu-item"
                            v-for="item in dropdownMenuList"
                            :key="item.route"
                        >
                            <Button
                                type="button"
                                :routeName="item.route"
                            >
                                <CerquilhaText 
                                    :textPortuguese="item.portuguese"
                                    :textEnglish="item.english"
                                />
                            </Button>
                        </li>
                        <li 
                            @click="logout()"
                            v-if="hasUser"
                            class="dropdown-menu-item"
                        >
                            <Button
                                type="button"
                            >
                                <CerquilhaText 
                                    textPortuguese="Sair"
                                    textEnglish="Log Out"
                                />
                            </Button>
                        </li>
                    </ul>
                </Dropdown>
            </div>
            <div class="button-container">
                <Button class="login-button" type="button" routeName='login'>
                    <CerquilhaText textPortuguese="Entrar" textEnglish="Log in" />
                </Button>
                <Button class="signup-button" type="button" routeName='signup'>
                    <CerquilhaText textPortuguese="Cadastre-se Gratuitamente" textEnglish="Sign up for free" />
                </Button>
            </div>
        </div>
    </nav>
</template>

<script>

import Dropdown from "./ui/AppDropdown.vue"
import Button from "./Button.vue"

export default {

    components: {
        Dropdown,
        Button
    },

    props: {
        hasSearch: {
            type: true,
            default: false
        },
    },

    data() {
        return {
            isOpen: false,
            menu: {
                loggedIn: [
                    {
                        route: 'profile',
                        portuguese: 'Meu Perfil',
                        english: 'My Profile',
                    },
                    {
                        route: 'create-tutorial',
                        portuguese: 'Criar Tutorial',
                        english: 'Create Tutorial',
                    },
                    {
                        route: 'my-tutorials',
                        portuguese: 'Meus Tutoriais',
                        english: 'My Tutorials',
                    },
                    {
                        route: 'favorite-list',
                        portuguese: 'Meus Favoritos',
                        english: 'My Favorites',
                    }
                ],
                loggedOut: [
                    {
                        route: 'login',
                        portuguese: 'Entrar',
                        english: 'Log In',
                    },
                    {
                        route: 'signup',
                        portuguese: 'Cadastre-se Gratuitamente',
                        english: 'Sign Up For Free',
                    }
                ]
            }
        }
    },

    computed: {
        dropdownMenuList () {
            return this.hasUser ? this.menu.loggedIn : this.menu.loggedOut
        },

        hasUser () {
            return this.$hasUser()
        },
    },

    methods: {
        logout() {
            localStorage.clear()   
            this.$router.push({name: 'login'})
        },
        changeToEnglish() {
            document.cookie ="lang=en"
            localStorage.setItem("lang", 'en')
            this.$router.go(0)
        },
        changeToPortuguese() {
            document.cookie ="lang="
            localStorage.removeItem("lang")
            this.$router.go(0)
        }
    },
}
</script>

<style lang="scss" scoped>
@import "../sass/global.scss";

.navbar {
    display: flex;
    flex-direction: column;
    height: 72px;
    background-color: $color-primary;
    padding: 0 20px;
    align-items: center;
    text-transform: uppercase;
}

.nav-container {
    display: grid;
    grid-template-columns: 1fr auto auto;
    align-items: center;
    width: 100%;
    height: 100%;
    max-width: 1200px;
    gap: 10px;

    .button-container {
        display: none;
    }

    @include for-desktop-up {          
        &:not(.has-user) {
            .button-container {
                display: flex;
            }

            .dropdown-wrapper {
                display: none;
            }
        }
    }
}

.dropdown-wrapper {
    position: relative;
    padding: 0 12px;
}

.dropdown-button {
    background: url('../assets/usericon.png') no-repeat center;
    background-size: contain;
    height: 30px;
    width: 30px;
    cursor: pointer;
}

.button-container {
    gap: 20px;
}

.lang-buttons {
    display: flex;
    align-items: center;
}

.lang-flag {
    max-width:  22px;
    padding: 0;
    margin: 0;
    cursor: pointer;
}

.login-button {
    @include button-green;
}

.signup-button {
    @include button-white;
}

.dropdown-menu {
    right: 0;
    width: 220px;
    background-color: $color-black;
    padding: 8px 0;
    border-radius: 10px 0 10px 10px;

    .dropdown-menu-item {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        color: #f3f3f3;
        cursor: pointer;
        height: 36px;

        button {
            font-size: 16px;
            width: 100%;
            color: #fff;
        }

        &:hover {
            background-color: #373b3d;
        }

        @include for-desktop-up {
            height: 30px;
        }
    };
}

</style>