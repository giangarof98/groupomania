<template>
    <nav>
        <ul>
            <img src="../assets/left.svg" alt="">
        </ul>
        <ul class="right">
            <li> <a href="/">Home</a></li>
            <li> <a @click="logout">Logout</a></li>
        </ul>
    </nav>

    <h1>Update Post</h1>
    <section>
        <form @submit.prevent="update" enctype="multipart/form-data" class="content">
            <div class="title">
                <h3>Add title:</h3>
                <input type="text" v-model="title" required>
            </div>

            <div class="description">
                <h3>Add Description:</h3>
                <textarea name="" id="" cols="30" rows="4" v-model="content" required></textarea>
            </div>

            <div class="file">
                <h3>Add image:</h3>
                <input type="file" ref="file" multiple @change="selectFile">
                <!-- <input type="file" multiple> -->
            </div>
            <button type="submit">Add Post</button>
        </form>
    </section>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            post:{},
            title:'',
            content: '',
            imageUrl:'',
        }
    },
    async created(){
        let resp = await axios.get('http://localhost:3000/api/post/' + this.$route.params.id)
        this.post = resp.data;
        this.title = resp.data.title
        this.content = resp.data.content
        this.imageUrl = resp.data.imageUrl
        console.log(resp.data.title)
    },
    methods: {
        logout(){
            localStorage.removeItem('token')
            localStorage.removeItem('name')
            localStorage.removeItem('id')
            this.$router.push('/login')
        },
        selectFile(){
            this.file = this.$refs.file.files[0]
            console.log(this.$refs.file.files[0])
        },
        async update(){
            // const data = {
            //     title: this.title,
            //     content: this.content,
            //     imageUrl: this.imageUrl,
            // }
            // console.log(data)
            const formData = new FormData()
            formData.append('images', this.file)
            formData.append('title', this.title)
            formData.append('content', this.content)
            await axios.put('http://localhost:3000/api/post/' + this.$route.params.id, formData)
                .then(res =>{ console.log(res)})
                .catch(err => {console.log(err)})
                this.$router.push('/')
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
    text-align: center;
}

img{
    width: 150px;
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
    justify-content: center;
}

form{
    background-color: rgb(245, 239, 239);
    border-radius: 16px;

    padding: 20px;

}

.title, .description, .file{
    padding-bottom: 20px;
}


button{
    margin-top: 10px;
    border: solid 1.5px;
    border-radius: 16px;
    padding: 6px;
    width: 150px;
    font-size: 18px;  
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

    nav ul{
        padding-bottom: 20px;
        align-items: center;
        align-content: center;
        text-align: center;
    }
}

</style>