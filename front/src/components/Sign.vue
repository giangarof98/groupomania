<template>
<Nav />
    <div id="box">
        <div class="right">
            <h1>Groupomania</h1>
            <img src="../assets/icon.png" alt="">
            <h3>By Connect-E</h3>
        </div>
        <div class="left">
            <form @submit.prevent='submited'>

            <label for="name">Name:</label>
            <input v-model="name" name="name" type="text" placeholder="Your name" required> <br>
            
            <label for="email">Email:</label>
            <input v-model="email" name="email" type="text" placeholder="Your email" required> <br>
            
            <label for="password">Password:</label>
            <input v-model="password" type="password" placeholder="Secure password" required> <br>
            
            <button type="submit">Create Account</button>
            <h3>If you have an account, please log in <router-link to="/login"> Here </router-link></h3>
        </form>
        </div>
    </div>
</template>

<script>
import Nav from './Nav.vue'
import axios from 'axios'

export default{
    name: 'Sign',
    components: {
        Nav
    },
    data(){
        return {
            name: '',
            email: '',
            password: ''
        }
    },
    methods: {
        async submited(){
            const data = {
                name: this.name,
                email: this.email,
                password: this.password,
            }            
                axios.post('http://localhost:3000/api/user/signup', data)
                    .then(res =>{ console.log(res)})
                    .catch(err => {console.log(err)})
                    console.log(data)
    
                    this.$router.push('/login')
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

    #box{
       display: flex;
       flex-direction: row;
       justify-content: space-evenly;
       text-align: center;
       align-items: center;
       padding-top: 5vh;
    }

    img{
        width: 300px;
    }

    form{
        padding-top: 2vh;
        line-height: 50px;
        background: rgba(235, 235, 235, 0.5);
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

        background-color: rgb(223, 217, 217);
        box-shadow:11px 6px 16px 0px rgb(128, 121, 121);
    }

    button{
        height: 30px;
        width: 130px;
        border-radius: 16px;

        background-color: #fff;
        border: none;
        font-size: 15px;
        font-weight: bold;
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