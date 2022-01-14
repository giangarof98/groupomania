<template>
    <nav>
        <ul>
            <img src="../assets/left.svg" alt="">
        </ul>
        <ul class="right">
            <li> <a href="/post">Add Post</a></li>
            <li> <a @click="logout">Logout</a></li>
            <li id="delete"> <a @click="removeAccount"> Remove Account</a></li>
        </ul>
    </nav>

    <section>
    <div class="info">
        <h3>Welcome, {{name}} </h3>
    </div>
    <!-- v-for="post in title.slice().reverse()" v-bind:key="post.id" -->
        <div class="content" v-for="post in title" v-bind:key="post.id">
            <!-- <a :href="`/post/${post.id}`"> -->
                <router-link :to="`/post/${post.id}`">
                    <div class="center">
                        <h2>{{ post.title}} </h2>
                        <h3>By: {{ post.user_id }}</h3>
                        <img id="img" :src='post.imageUrl' alt="">
                        <h4 class="comments">See Comments</h4>
                        <p>{{ post.content }}</p>
                    </div>
                </router-link>
            <!-- </a> -->
        </div>
    </section>

    <Footer />
</template>

<script>
import axios from 'axios'
import Footer from './Footer.vue'

export default {
    name: 'Home',
    components: {
        Footer
    },
    data() {
        return {
            name: localStorage.getItem('name'),
            id: localStorage.getItem('id'),
            title: '',
            imageUrl: '',
            content: '',
        }
    },
    computed: {
    
    },
    methods: {
        removeAccount(){
            const id = localStorage.getItem('id')
            console.log(id)
            axios.delete('http://localhost:3000/api/user/delete/' + id)
            alert('account deleted!')
            this.$router.push('/login')
        },
            logout(){
                localStorage.removeItem('token')
                localStorage.removeItem('name')
                localStorage.removeItem('id')
                this.$router.push('/login')
            },
    },
    async created(){
        axios.get('http://localhost:3000/api/post/')
            .then((res) => {
                this.title = res.data
                this.imageUrl = res.data
                console.log(res.data)
            })
    },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito&display=swap');

*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Nunito', sans-serif;
    color: black;
    font-weight: bold;
    text-decoration: none;
}

.comments{
    color: blue;
}

img{
    width: 150px;
}

#img{
    width: 300px;
}

nav{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
}

nav ul{
    display: flex;
    list-style-type: none;
}

ul li{
    width: 100px;
    font-weight: 600;
    cursor: pointer;
}

.info{
    padding: 20px;
}

section{
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10px;
}

.content{
    display: grid;
    justify-content: center;
    padding: 10px;

}

.center{
    padding: 20px;
    margin-bottom: 15px;
    border-radius: 16px;
    background-color: rgb(245, 239, 239);

}

h3{
    padding-bottom: 20px;
}

.content p{
    padding: 5px;
    margin-top: 10px;
    border-radius: 10px;
    background: #fff;
}

#delete{
    color: rgb(255, 0, 0);
    font-weight: bold;
}

@media screen and (max-width: 900px){
    nav{
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
    }

    img{
        width: 220px;
    }

    .info{
        padding-bottom: 20px;
        align-items: center;
        align-content: center;
        text-align: center;
    }

    nav ul{
        padding-bottom: 20px;
        align-items: center;
        align-content: center;
        text-align: center;
    }
}

</style>