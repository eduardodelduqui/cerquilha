<template>
  <div>
        <NavBar/>
        <div class="banner-search">
            <div class="banner-search-container">
                <h1 class="title">
                    O que você<br>Quer aprender hoje?
                </h1>
                <span>tem sempre alguém ensinando ;)</span>
                <form class="search-input-container">
                    <input @input="search = $event.target.value" id="search-input" type="search" autocomplete="off">
                    <router-link :to="{name: 'search', params: { term: search }}">
                        <button id="search-button" type="submit"/>
                    </router-link>
                </form>
                <!-- STATIC -->
                <ul class="tag-list">
                    <li class="tag-item"><Button class="tag-button" type="button" color="green" :borderRadius=true routeName="search" routeParam="Javascript" text="Javascript"/></li>
                    <li class="tag-item"><Button class="tag-button" type="button" color="green" :borderRadius=true routeName="search" routeParam="HTML" text="HTML" /></li>
                    <li class="tag-item"><Button class="tag-button" type="button" color="green" :borderRadius=true routeName="search" routeParam="CSS" text="CSS" /></li>
                </ul>
            </div>
        </div>
        <section class="section-about section-1">
            <div class="section-grid">
                <div class="content">
                    <h2 class="subtitle-about">Aprenda com quem tem experiência</h2>
                    <p class="text-about">Busque por uma tecnologia de seu interesse e encontre aquela dica valiosa de quem entende do assunto</p>
                    <button>Saiba mais >>></button>
                </div>
                <img src="../assets/section-1-img.png" alt="">
            </div>
        </section>
        <section class="section-about section-2">
            <div class="section-grid">
                <div class="content">
                    <h2 class="subtitle-about">Compartilhe o conhecimento</h2>
                    <p class="text-about">Crie aquele tutorial incrível, compartilhe com quem busca conhecimento e ganhe o reconhecimento da comunidade, mostrando que você é de outro planeta</p>
                    <button class="sign-up-button">Cadastre-se gratuitamente</button>
                </div>
                <img src="../assets/section-2-img.png" alt="">
            </div>
        </section>
        <section class="section-about section-3">
            <div class="section-grid">
                <div class="content">
                    <h2 class="subtitle-about">Crie sua lista de favoritos</h2>
                    <p class="text-about">Adicione os seus tutoriais favoritos em uma lista, dessa forma você poderá acessar aquela dica valiosa de forma rápida e fácil, sempre que quiser</p>
                </div>
                <img src="../assets/section-3-img.png" alt="">
            </div>
        </section>
        <section class="section-about section-4">
            <div class="section-grid">
                <div class="content">
                    <h2 class="subtitle-about">Torne-se o Capitão da tripulação</h2>
                    <p class="text-about">Entre no nosso sistema de ranqueamento, ganhe pontos a cada dica compartilhada e atinja o ponto mais alto</p>
                    <button>Tripulação</button>
                </div>
                <img src="../assets/section-4-img.png" alt="">
            </div>
        </section>
        <footer>
            <p>Produzido para fins educacionais</p>
            <p>Estamos em construção, acesse nosso github!</p>
            <ul class="social-media">
                <li class="social-media-item facebook"></li>
                <li class="social-media-item instagram"></li>
                <li class="social-media-item twitter"></li>
                <li class="social-media-item github"><a href="https://github.com/eduardodelduqui/projeto-cerquilha"></a></li>
            </ul>
        </footer>
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
            search: ''
        }
    },
}
</script>

<style lang="scss">
@import '../sass/global.scss';

body {
    margin: 0;
}

.banner-search {
    display: flex;
    justify-content: center;
    background-color: $color-primary;
    padding-top: 72px;

    .banner-search-container {
        width: 100%;
        max-width: 280px;
    }

    .title {
        margin: 0;
        color: #fff;
        font-size: 24px;
        font-weight: 400;
        text-transform: uppercase;
    }

    span {
        display: block;
        color: #fff;
        font-size: 16px;
        margin: 12px 0;
    }

    .search-input-container {
        display: flex;
    }

    #search-input {
        display: block;
        height: 48px;
        width: 100%;
        border: none;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
    }

    #search-button {
        display: flex;
        width: 40px;
        height: 48px;
        background-color: #fff;
        border: none;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        cursor: pointer;

        &::before {
            display: block;
            content: '';
            background: url('../assets/search-icon.svg') no-repeat center;
            height: 48px;
            width: 40px;            
        }
    }

    .tag-list {
        display: flex;
        flex-wrap: wrap;
        margin: 24px 0;
    }

    .tag-item {
        margin: 0 10px 10px 0;

        &:last-child {
            margin: 0;
        }
    }
    
    .tag-button {
        height: 32px;
        border-radius: 20px;
    }
}

.section-about {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: $color-black;
    padding: 24px 0;
}

.text-about {
    margin: 20px 0;
    line-height: 30px;
}

.section-grid {
    display: grid;
    width: 100%;
    max-width: 280px;
    grid-template-rows: 1fr 1fr;
    gap: 24px;
}

.subtitle-about {
    font-size: 32px;
    font-weight: 700;
}

img {
    width: 100%;
    max-width: 240px;
    margin: 0 auto;
}



.section-1, .section-4 {
    button {
        display: block;
        font-weight: 700;
        @include button-green;
        font-size: 16px;
        border-radius: 24px;
        margin: 0 auto;
        height: 48px;
    }
}

.section-2 {
    button {
        display: block;
        font-weight: 700;
        @include button-white;
        padding: 0 20px;
        font-size: 16px;
        border-radius: 24px;
        margin: 0 auto;
        height: 48px;
    }
}

.section-2, .section-4 {
    background-color: #F3F3F3;
}

footer {
    color: #fff;
    text-align: center;
    background-color: $color-black;
    padding: 20px 0;

    p {
        margin: 5px 0;
    }

    .social-media {
        display: flex;
        justify-content: center
    }

    .social-media-item {
        width: 24px;
        height: 24px;
        margin-right: 20px;

        &:last-child {
            margin: 0;
        }

        &.facebook {
            background: url('../assets/facebook-icon.png') no-repeat center;
        }
    
        &.instagram {
            background: url('../assets/instagram-icon.png') no-repeat center;
        }
    
        &.twitter {
            background: url('../assets/twitter-icon.png') no-repeat center;
        }
    
        &.github{
            background: url('../assets/github-icon.png') no-repeat center;
        }

        a {
            display: block;
            width: 100%;
            height: 100%;
        }
    }
}

@include for-tablet-up {
    .banner-search {
        .banner-search-container {
            width: 80%;
            max-width: none;
        }

        .title {
            font-size: 56px;
        }
    }
}

@include for-laptop-up {
    .banner-search {
        .banner-search-container {
            max-width: 648px;
        }

        .title {
            font-size: 56px;
        }
    }
}

@include for-desktop-up {
    .section-about {
        height: 680px;

        .section-grid {
            grid-template-rows: auto;
            grid-template-columns: 1fr 1fr;
            max-width: 1200px;
            height: 100%;
            align-items: center;
            justify-self: center
        }

        &.section-2, 
        &.section-4 {
            .content {
                grid-area: 1 / 2 / 1 / 2;
            }
        }

        .subtitle-about {
            font-size: 48px;
        }

        .text-about {
            font-size: 24px;
            line-height: 40px;
            margin-bottom: 40px;
        }

        .content {
            max-width: 424px;
            margin: 0 auto;
        }

        img {
            width: auto;
            max-width: none;
        }

        button {
            margin: 0;
        }
    }
}
</style>