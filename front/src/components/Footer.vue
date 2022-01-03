<template>
    <footer>
        <div class="one">
            <img src="../assets/icon.png" alt="">
            <p>Made by Connect-E 2022</p>
        </div>
        <div class="two">
            <p>Terms and conditions</p>
            <p>Help</p>
            <p>Assistance</p>
            <p>Positions Available</p>
            <p>About us</p>
        </div>
        
    </footer>
</template>

<script>
export default {
    name: 'Footer'
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

footer{
    margin-top: 30px;
    padding: 10px;
    display: flex;
    gap: 30px;
    justify-content: space-around;
    align-items: center;
}

img{
    width: 150px;
}

@media screen and (max-width: 900px){
    *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Nunito', sans-serif;
    color: inherit;
    text-decoration: none; 
}

footer{
    margin-top: 30px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-content: center;
}

.two{
    font-weight: bold;
    font-weight: 900;
}

}

</style>