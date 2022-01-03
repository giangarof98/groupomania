<template>
    <Nav />
    <div id="box">
        <div class="right">
            <h1>Groupomania</h1>
            <img src="../assets/icon.png" alt="">
            <h3>By Connect-E</h3>
        </div>
        <div class="left">
            <form @submit.prevent="submited">
            <label for="email">Email:</label>
            <input v-model="email" name="email" type="text" placeholder="Your email" required> <br>
            <label for="password">Password:</label>
            <input v-model="password" type="password" placeholder="Secure password" required> <br>
            <button type="submit">LogIn</button>
            <h3>If you don't have an account, please sign up <router-link to="/signup"> Here </router-link></h3>
        </form>
        </div>
    </div>
    
</template>

<script>
import Nav from './Nav.vue'
import axios from 'axios'
import '../services/Api'

export default {
    components: {
        Nav
    },
    name:'Log',
    data(){
        return {
            email: '',
            password: ''
        }
    },
    methods:{
        async submited(){
            const res =  await axios.post('http://localhost:3000/api/user/login', {
                email: this.email,
                password: this.password,
            })
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('name', res.data.name)
            localStorage.setItem('id', res.data.id)
             console.log(res.data.name)
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
    }

    Nav{
        cursor: pointer;
    }

    img{
        width: 300px;
    }

    #box{
       display: flex;
       flex-direction: row;
       justify-content: space-evenly;
       text-align: center;
       align-items: center;
       padding-top: 5vh;
    }

    form{
        padding-top: 2vh;
        line-height: 50px;
        background: #d3cfcf65;
        padding: 20px;
        border-radius: 16px;
    }
    form input{
        margin-left: 10px;
    }
    input{
        width: 150px;
        height: 30px;
        border-radius: 30px;
        border: none;
        text-align: center;
        outline: none;

        background-color: rgb(219, 213, 213);
        box-shadow:11px 6px 16px 0px rgb(128, 121, 121);
    }

    button{
        height: 30px;
        width: 60px;
        border-radius: 16px;

        background-color: #fff;
        border: none;
        font-size: 15px;
        font-weight: bold;
        cursor: pointer;
    }

    @media screen and (max-width: 900px){
        #box{
            display: flex;
            flex-direction: column;
        }

        Nav {
            font-size: 22px;
            display: flex;
            justify-content: center;
            align-items: center;
            align-content: center;
        }

        img{
            display: none;
        }

        h1{
            font-size: 33px;
        }
        h3{
            font-size: 15px;
        }

        .left{
            margin-top: 25px;
        }
    }

</style>