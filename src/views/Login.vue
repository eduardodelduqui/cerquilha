<template>
    <div>
        <NavBar/>
        <div class="login-page">
            <div class="form-container">
                <h1 class="form-title">FAÇA O LOGIN</h1>
                <form action="">
                    <div class="form-group">
                        <label for="" class="form-label">E-mail</label>
                        <input class="form-input" type="email" required>
                    </div>
                    <div class="form-group">
                        <label for="" class="form-label">Senha</label>
                        <input class="form-input" type="password" required>
                    </div>
                    <div class="form-group checkbox-group">
                        <input class="checkbox-input" type="checkbox">
                        <label for="">Lembrar de mim</label>
                    </div>
                    <Button 
                        text="ENTRAR"
                        color="green"
                        type="submit"
                        class="form-button"
                    />
                    <router-link
                        :to="{name: 'home'}"
                    ><span class="forget-password-link">Esqueci a senha</span></router-link>
                </form>
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
}
</script>

<style lang="scss" scoped>
@import '../sass/global.scss';

.login-page {
    display: flex;
    justify-content: center;
    width: 100%;
}

.form-container {
    display: flex;
    flex-direction: column;
    padding: 40px;
    width: 100%;
    max-width: 520px;
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
    align-items: center;

    .checkbox-input {
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

.forget-password-link {
    color: #4363D2;
}

</style>