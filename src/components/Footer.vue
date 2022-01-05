<template>
    <footer>
        <CerquilhaText 
            tag="p"
            textPortuguese="Produzido por Eduardo Delduqui"
            textEnglish="Developed by Eduardo Delduqui"
        />
        <CerquilhaText
            tag="p"
            textPortuguese="Estamos em construção, acesse nosso github!" 
            textEnglish="We are under construction, check out our github!"
        />
        <ul class="social-media">
            <li class="social-media-item facebook" title="Facebook"></li>
            <li class="social-media-item instagram" title="Instagram"></li>
            <li class="social-media-item twitter" title="Twitter"></li>
            <li class="social-media-item github" title="Github"><a href="https://github.com/eduardodelduqui/project-cerquilha"></a></li>
        </ul>
    </footer>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import '../sass/global.scss';

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
        justify-content: center;
        gap: 20px;
    }

    .social-media-item {
        width: 24px;
        height: 24px;

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

</style>