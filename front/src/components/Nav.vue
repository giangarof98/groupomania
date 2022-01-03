<template>

<nav>
    <ul>
        <li><router-link to="/signup"> SignUp </router-link></li>
        <li><router-link to="/login"> LogIn </router-link></li>
    </ul>
</nav>
    
</template>

<script>
export default {
    name: 'Nav'
    
}
</script>

<style scoped>

    *{
        text-decoration: none;
        color: inherit;
    }
    nav{
        display: flex;
        justify-content: center;
    }
    nav ul{
        display: flex;
        justify-content: space-around;
        list-style-type: none;
    }

    ul{
        display: flex;
        justify-content: center;
        width: 40%;

    }

    ul li{
        text-align: center;
        padding: 20px;
    }
</style>