<template>
    <div class="card-container">
        <div class="card-thumbnail">
            <img class="tutorial-image" :src="imageUrl" alt="Thumbnail image" :title="title">
        </div>
        <div class="card-description">
            <div class="tutorial-title">
                <span>{{title}}</span>
            </div>
            <div class="tutorial-author">
                <span>@{{author}}</span>
            </div>
            <div class="tutorial-description">
                <span>{{description}}</span>
            </div>
            <div class="tutorial-date">
                <span>{{date}}</span>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    
    props: {
        title: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        imageUrl: {
            type: String,
            required: false
        },
        date: {
            type: String,
            required: true
        },
        favorite: {
            type: Boolean,
            required: false
        }
    },
}
</script>

<style>
</style>