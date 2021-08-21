<template>
    <nav class="navbar">
        <div class="nav-container">
            <router-link :to="{name: 'home'}" class="logo">Logo</router-link>
            <form class="form-search">
                <input @input="search = $event.target.value" id="search-input" type="text">
                <router-link :to="{name: 'search', params: {term: search}}">
                    <button @click="emitSearchEvent()" id="search-button" type="submit"></button>
                </router-link>
            </form>  
            <div class="toggle-container">
                <button @click="toggleMenu()" id="nav-toggle-button">
                    <span class="toggle-button-icon"></span>
                    <span class="toggle-button-icon"></span>
                    <span class="toggle-button-icon"></span>
                </button>
                <div v-if="isOpen" id="menu-container">
                    <router-link :to="{name: 'login'}">     
                        <button class="menu-item">Entrar</button>
                    </router-link>
                    <router-link :to="{name: 'signup'}">
                        <button class="menu-item">Cadastre-se gratuitamente</button>                        
                    </router-link>
                </div>
            </div>
            <div class="buttons-container">
                <button class="login-button">
                    <router-link :to="{name: 'login'}">Entrar</router-link>
                </button>
                <button class="sign-up-button">
                    <router-link :to="{name: 'signup'}">Cadastre-se gratuitamente</router-link>
                </button>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            search: '',
            isOpen: false
        }
    },

    methods: {
        emitSearchEvent() {
            this.$emit('searchEvent', this.search)
        },
        toggleMenu() {
            this.isOpen = !this.isOpen
            console.log(this.isOpen);
        }
    },
}
</script>

<style lang="scss">

@import '../sass/global.scss';

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
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
}

.logo {
    color: #fff;
}

#menu-container {
    position: absolute;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    right: -20px;
    width: 100vw;
    margin-top: 5px;
    padding: 20px 0;
    background-color: $color-primary;

    .menu-item {
        display: block;
        margin-bottom: 10px;
        background-color: $color-primary;
        border: none;
        width: 100%;
        max-width: 256px;
        line-height: 40px;
        height: 40px;
        border: 1px solid #fff;
        border-radius: 4px;
        color: #fff;
        font-weight: 700;
        text-transform: uppercase;
    }

    &.toggle-active {
        display: flex;
    }
}

#nav-toggle-button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    border: 1px solid #fff;
    border-radius: 4px;
    height: 35px;
    width: 40px;
    padding: 8px;

}

.toggle-button-icon {
    display: block;
    width: 100%;
    border-style: solid;
    border-color: #fff;
    border-width: 2px 0 0 0;
    margin-bottom: 5px;

    &:last-child {
        margin: 0;
    }
}

.toggle-container {
    position: relative;
}


.buttons-container {
    display: none;

    .login-button {
        @include button-green;
        margin-right: 56px;
    }

    .sign-up-button {
        @include button-white;
    }
}

@include for-laptop-up {
    .nav-container {
        max-width: 1200px;
    }

    .toggle-container {
        display: none;
    }

    .buttons-container {
        display: flex;
    }
}

</style>