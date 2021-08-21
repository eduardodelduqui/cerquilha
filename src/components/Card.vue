<template>
    <div class="tutorial-card">
        <div class="card-header">
            <h3 class="card-title">{{title}}</h3>
        </div>
        <span class="owner">{{this.user.name}}</span>
        <p class="card-description">{{description}}</p>
        <div class="card-footer">
            <span class="rating">{{rating}}</span>
            <button 
                v-if="false"
                class="card-button">
            </button>
        </div>
    </div>
</template>

<script>
export default {

    props: {
        title: {
            type: String,
            required: false
        },
        user_id: {
            type: Number,
            required: false
        },
        description: {
            type: String,
            required: false
        },
        rating: {
            type: String,
            required: false
        }
    },

    data() {
        return {
            user: {
                name: '',
                nickname: ''
            }
        }
    },

    created () {
        this.$http.get(`https://api-cerquilha.herokuapp.com/users/${this.user_id}`)
        .then((res) => res.json())
        .then((user) => {
            this.user.name = user.username;
            this.user.nickname = user.nickname;
        })
    }
}
</script>

<style lang="scss">
@import '../sass/global.scss';

.tutorial-card {
    padding: 10px;
    background-color: #fff;
    margin: 20px 0;
    color: $color-black;
}

.card-title {
    margin: 0;
    height: 46px;
    overflow: hidden;
}

.owner {
    height: 20px;
}

.card-description {
    height: 38px;
    overflow: hidden;
}

.card-footer {
    margin-top: 10px;
}

</style>