<template>
    <div class="tutorial">
        <h1 class="tutorial-title">{{title}}</h1>
        <div class="tutorial-description">
            <span>{{description}}</span>
        </div>
        <div class="tutorial-about-wrapper">
            <router-link v-if="author && date" class="tutorial-about" :to="{name: 'user-tutorials', params: {username: author}}"> 
                <div class="user-thumbnail">
                    <img
                        src="@/assets/userphotoexample.png"
                        alt=""
                        class="user-img">
                </div>
                <div class="user-info">
                    <div class="author">
                        <span>@{{author}}</span>
                    </div>
                    <div class="creation-date">
                        <span>{{date}}</span>
                    </div>
                </div>
            </router-link>
                <Button
                    v-if="hasFavoriteButton"
                    @click.native="openModal()"
                    type="Button"
                    class="favorite-button"
                    :pointer=true
                >
                    <b-icon icon="plus-square"/>
                    <CerquilhaText 
                        class="button-text" 
                        textPortuguese="Salvar" 
                        textEnglish="Save"
                    />
                </Button>
        </div>
        <div class="thumbnail">
            <img
                class="tutorial-image"
                :src="imageUrl"
                :alt="imageDescription"
            >
            <p
                class="tutorial-image-description"
            >
            {{imageDescription}}
            </p>
        </div>
        <div
            class="tutorial-content"
            v-html="content"
        />
    </div>
</template>

<script>

export default {

    props: {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        imageUrl: {
            type: String,
            required: true
        },
        imageDescription: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: false
        },
        date: {
            type: String,
            required: false
        },
        hasFavoriteButton: {
            type: Boolean,
            default: false,
            required: false,
        },
        isFavoriteFrom: {
            type: Array,
            required: true
        }
    },

    data() {
        return {
            isModalOpen: false
        }
    },

    methods: {
        openModal () {
            this.$emit('openModal')
        }
    },
}
</script>

<style lang="scss">
@import '../sass/global.scss';

/* Tutorial Format Style */

.tutorial {
    h1 {
        &.tutorial-title {
            font-size: 48px;
            font-weight: 600;
            color: #292929;
            text-transform: capitalize;
            border: none;
            padding: 0;
            width: 100%;
            outline: none;
            margin: 15px 0;
        }
    }
    .tutorial-about-wrapper {
        display: flex;
        justify-content: space-between;
    }
    
    .tutorial-about {
        display: flex;
        position: relative;
        font-size: 14px;
        gap: 8px;
    
        .user-img {
            max-width: 30px;
        }
    
        .author {
            color: $color-black;
        }
    
        .creation-date {
            color: #888;
        }
    }
    
    .favorite-button {
        display: flex;
        align-items: center;
        gap: 6px;
        cursor: pointer;
        padding: 6px;
        border: 1px solid #c4c4c4;
        border-radius: 4px;
        max-width: 78px;
        width: 100%;
    
        svg {
            color: #c9c95c;
        }
    
        .button-text {
            font-size: 14px;
        }
    }
    
    .tutorial-description {
        margin: 20px 0;
    }
    
    .thumbnail {
        padding: 30px 0;
        user-select: none;
    
        .tutorial-image {
            display: block;
            max-height: 540px;
            max-width: 100%;
            margin: 0 auto;
        }
    
        .tutorial-image-description {
            font-size: 14px;
            text-align: center;
        }
    }
    
    
    .tutorial-content {
        word-break: break-word;
    
        h1 {
            border-bottom: 1px solid #eaecef;
            padding-bottom: 8px;
        }
    
        h2 {
            font-size: 30px;
        }
        
        h1, h2, h3, h4, h5, h6, p {
            color: #292929;
        }
    
        p {
            margin: 16px 0;
        }
        
        blockquote {
            border-left: 4px solid #CCC;
            margin: 5px 0;
            padding-left: 16px;
        }
        
        pre {
            background-color: #23241f;
            color: #ffe9bb;
            font-size: 14px;
            font-weight: 400;
            overflow: visible;
            padding: 20px 10px;
            max-width: 600px;
            margin: 20px auto;
            border-radius: 3px;
            white-space: pre-wrap;
            word-wrap: break-word;
        }
        
        ul {
            list-style: disc;
            padding-left: 40px;
        }
        
        .ql-align-center {
            text-align: center;
        }
        
        .ql-align-left {
            text-align: left;
        }
        
        .ql-align-right {
            text-align: right;
        }
        
        .ql-align-justify {
            text-align: justify;
        }
    }
}

</style>