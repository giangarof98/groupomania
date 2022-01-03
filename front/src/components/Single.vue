<template>
    <nav>
        <ul>
            <img src="../assets/left.svg" alt="">
        </ul>
        <ul class="right">
            <li> <a href="/"> <router-link to="/">Home</router-link> </a></li>
            <li> <a @click="logout">Logout</a></li>
        </ul>
    </nav>

    <section>
        <div class="content">
            <!-- v-if="postId == id" -->
            <div class="center">
                <h2> {{ post.title }}</h2>
                <h3 id="h3">By: {{ post.user_id }}</h3>
                <img id="img" :src='post.imageUrl' alt="">
                <h4 v-if="name == post.user_id" @click="remove">Delete Post</h4>
                <p id="post-content"> {{ post.content }}</p>
            </div>

            <aside>
                <div class="comment-area">
                    <form @submit.prevent="upload" class="comment-area">
                        <h3>Leave a comment</h3>
                        <textarea name="text_content" id="" cols="50" rows="3" v-model="text_content" required> </textarea>
                        <button type="submit">Comment</button>
                    </form>
                </div>
            

                <div class="comment-box" v-for="comments in textContent" v-bind:key="comments.postId">
                    <div v-if="post.id == comments.postId" class="comment">
                        <a v-if="name === comments.userId" id="delete" @click="deleteComment(comments.id)">X</a>
                        <h3>{{ comments.userId }}: </h3>
                        <p>{{ comments.text_content }}</p>
                    </div>
                </div>
            </aside>


        </div>
    </section>
</template>

<script>
import axios from 'axios'

export default {
    name: "Single",
    data(){
        return{
            name: localStorage.getItem('name'),
            user_id: '',
            post: {},

            textContent:'',
            text_content:'',
            postId: this.$route.params.id,
            userId: localStorage.getItem('name'),
            comments:{},
            id:''
        }
    },
    async created(){
        let resp = await axios.get('http://localhost:3000/api/post/' + this.$route.params.id)
        this.post = resp.data;
        console.log(resp.data)
    },
    async mounted(){
        await axios.get('http://localhost:3000/api/comment/')
        .then((res) => {
                this.textContent = res.data
                console.log(res.data)
            })
    },
    methods: {
        remove(){
            axios.delete('http://localhost:3000/api/post/' + this.$route.params.id)
            this.$router.push('/')
        },
        async deleteComment(idpost){
            axios.delete('http://localhost:3000/api/comment/' + idpost)
            this.$router.go()
            
        },
        logout(){
            localStorage.removeItem('token')
            this.$router.push('/login')
        },
        async upload(){
            const userId = localStorage.getItem('name');
            const postId = this.$route.params.id;
            const text_content = document.querySelector('textarea').value;
            
            const data = {
                userId: this.userId,
                postId: this.postId,
                text_content: this.text_content
            }
            
            console.log(userId)
            console.log(postId)
            console.log(text_content)

            await axios.post('http://localhost:3000/api/comment/', data)
                    .then(res =>{ console.log(res)})
                    .catch(err => {console.log(err)})
                    this.$router.go()
                    console.log(data)
            

            
        }
        
    }
 }
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Nunito&display=swap');

*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Nunito', sans-serif;
    color: inherit;
    text-decoration: none;
}

.comment-box{
    display: flex;
    align-items: center;
}

#delete{
    color: red;
    cursor: pointer;
    margin-right: 10px;
}

.comment-area{
    display: flex;
    flex-direction: column;
}

.comment-area button{
    margin-top: 10px;
    padding: 7px;
    border-radius: 16px;
    border: none;
}

.comment{
    display: flex;
    align-items: center;
    background-color: rgb(245, 239, 239);
    margin-top: 20px;
    padding: 10px;
    border-radius: 16px;
}

.comment p{
    margin-left: 10px;
}

img{
    width: 150px;
}

#img{
    width: 400px;
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

section{
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10px;
}

.content{
    display: flex;
    justify-content: space-evenly;
    padding: 10px;

}

.center{
    padding: 20px;
    margin-bottom: 15px;
    border-radius: 16px;
    background-color: rgb(245, 239, 239);
}

#h3{
    padding-bottom: 20px;
}

h4{
    cursor: pointer;
    font-weight: 900;
    color: red;
}

.content #post-content{
    padding: 5px;
    margin-top: 10px;
    border-radius: 10px;
    background: #fff;
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

    #img{
        width: 100%;
    }

    nav ul{
        padding-bottom: 20px;
        align-items: center;
        align-content: center;
        text-align: center;
    }

    .content{
        display: flex;
        flex-direction: column;
    }
}


</style>