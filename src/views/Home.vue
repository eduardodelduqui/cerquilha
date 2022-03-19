<template>
  <div data-page="home">
        <NavBar/>
        <div class="banner-search">
            <div class="banner-search-container">
                <h1 class="title">
                    <CerquilhaText
                        textPortuguese="O que você"
                        textEnglish="What are you"
                    />
                    <br>
                    <CerquilhaText
                        textPortuguese="Quer aprender hoje?"
                        textEnglish="going to learn today?"
                    />
                </h1>
                <CerquilhaText class="short-slogan" textPortuguese="tem sempre alguém ensinando ;)" textEnglish="there's always someone teaching ;)" />
                <SearchBar/>
                <ul class="tag-list">
                    <li class="tag-item"><Button class="tag-button" type="button" routeName="search" routeParam="Javascript" text="Javascript" /></li>
                    <li class="tag-item"><Button class="tag-button" type="button" routeName="search" routeParam="HTML" text="HTML" /></li>
                    <li class="tag-item"><Button class="tag-button" type="button" routeName="search" routeParam="CSS" text="CSS" /></li>
                </ul>
            </div>
        </div>
        <section class="section-about section-1">
            <div class="section-grid">
                <div class="content">
                    <CerquilhaText 
                        tag="h2"
                        class="subtitle-about"
                        :class="isPortuguese ? 'em-breve' : 'coming-soon'"
                        textPortuguese="Aprenda com quem tem experiência"
                        textEnglish="Learn from those with experience"
                    />
                    <CerquilhaText
                        tag="p"
                        class="text-about"
                        textPortuguese="Busque por uma tecnologia de seu interesse e encontre aquela dica valiosa de quem entende do assunto"
                        textEnglish="Search for a technology that interests you and find that valuable tip from someone who understands the subject"
                    />
                    <Button type="button" disabled>
                        <CerquilhaText textPortuguese="Saiba mais >>>" textEnglish="Know more >>>" />
                    </Button>
                </div>
                <img src="@/assets/section-1-img.png" alt="">
            </div>
        </section>
        <section class="section-about section-2">
            <div class="section-grid">
                <div class="content">
                    <CerquilhaText 
                        tag="h2"
                        class="subtitle-about"
                        textPortuguese="Compartilhe o conhecimento"
                        textEnglish="Share your knowledge"
                    />
                    <CerquilhaText
                        tag="p"
                        class="text-about"
                        textPortuguese="Crie aquele tutorial incrível, compartilhe com quem busca conhecimento e ganhe o reconhecimento da comunidade, mostrando que você é de outro planeta"
                        textEnglish="Create that awesome tutorial, share it with knowledge seekers, and earn community recognition, showing you're from another planet"
                    />
                    <Button class="sign-up-button" type="button" routeName="signup">
                        <CerquilhaText textPortuguese="Cadastre-se gratuitamente" textEnglish="Sign up for free" />
                    </Button>
                </div>
                <img src="@/assets/section-2-img.png" alt="">
            </div>
        </section>
        <section class="section-about section-3">
            <div class="section-grid">
                <div class="content">
                    <CerquilhaText 
                        tag="h2"
                        class="subtitle-about"
                        textPortuguese="Crie sua lista de favoritos"
                        textEnglish="Create your favorites list"
                    />
                    <CerquilhaText
                        tag="p"
                        class="text-about"
                        textPortuguese="Adicione os seus tutoriais favoritos em uma lista, dessa forma você poderá acessar aquela dica valiosa de forma rápida e fácil, sempre que quiser"
                        textEnglish="Add your favorite tutorials to a list so you can access that valuable tip quickly and easily whenever you want."
                    />
                </div>
                <img src="@/assets/section-3-img.png" alt="">
            </div>
        </section>
        <section class="section-about section-4">
            <div class="section-grid">
                <div class="content">
                    <CerquilhaText 
                        tag="h2"
                        class="subtitle-about"
                        :class="isPortuguese ? 'em-breve' : 'coming-soon'"
                        textPortuguese="Torne-se o Capitão da tripulação"
                        textEnglish="Become the Captain of the crew"
                    />
                    <CerquilhaText 
                        tag="p"
                        class="text-about"
                        textPortuguese="Entre no nosso sistema de ranqueamento, ganhe pontos a cada dica compartilhada e atinja o ponto mais alto"
                        textEnglish="Join our ranking system, earn points for every shared tip and reach the highest point"
                    />                               
                    <Button type="button" disabled>
                        <CerquilhaText textPortuguese="Tripulação" textEnglish="The Crew" />
                    </Button>
                    
                </div>
                <img src="@/assets/section-4-img.png" alt="">
            </div>
        </section>
        <Footer/>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue"
import Button from "@/components/Button.vue"
import Footer from "@/components/Footer.vue"
import SearchBar from "@/components/SearchBar.vue"

export default {
    components: {
        NavBar,
        Button,
        Footer,
        SearchBar
    },
    
    data() {
        return {
            search: '',
        }
    },

    computed: {
        isPortuguese () {
            return localStorage.getItem("lang") === "en" ? false : true
        }
    }
}
</script>

<style lang="scss">
@import '../sass/global.scss';

body {
    margin: 0;
}

[data-page="home"] {
    
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
    
        .short-slogan {
            display: block;
            color: #fff;
            font-size: 16px;
            margin: 12px 0;
        }
    
        .search-input-container {
            display: flex;
            background: #fff;
            border: 1px solid transparent;
            border-radius: 4px;
            overflow: hidden;
            
            &.error-message {
                border: 1px solid #cc0000;

                .search-input {
                    animation: shake-input 500ms both;
                    
                    &::placeholder {
                    color: #cc0000;
                    }
                }
            }
        }
    
        .search-input {
            display: block;
            height: 48px;
            width: 100%;
            border: none;
            padding: 15px;
            outline: none;
        }
    
        #search-button {
            display: flex;
            width: 40px;
            height: 48px;
            border: none;
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
            gap: 10px;
        }
        
        .tag-button {
            @include button-green;
            color: #fff;
            border-radius: 20px;
            height: 32px;

            .button {
                color: #fff;
            }
        }
    }
    
    .section-about {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: $color-black;
        padding: 24px 0;
    
        img {
            width: 100%;
            max-width: 240px;
            margin: 0 auto;
        }
    }
    
    .text-about {
        margin: 20px 0;
        line-height: 30px;
    }
    
    .section-grid {
        display: grid;
        width: 100%;
        max-width: 280px;
        grid-template-rows: 1fr auto;
        gap: 24px;
    }
    
    .subtitle-about {
        font-size: 32px;
        font-weight: 700;

        &.em-breve,
        &.coming-soon {
            position: relative;

            &::after {
                content: "Em Breve";
                font-size: 8px;
                color: $color-primary;
                border: 1px solid $color-primary;
                width: max-content;
                height: max-content;
                padding: 2px;
                border-radius: 12px;
                position: absolute;
            }
        }

        &.coming-soon::after {
            content: "Coming Soon"
        }
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
    
    @include for-tablet-up {
        .banner-search {
            .banner-search-container {
                width: 80%;
                max-width: none;
            }
    
            .title {
                font-size: 55px;
            }
        }
    }
    
    @include for-laptop-up {
        .banner-search {
            .banner-search-container {
                max-width: 648px;
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
}
</style>