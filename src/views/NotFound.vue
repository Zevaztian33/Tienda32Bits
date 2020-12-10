<template>
<div>
    <div class="notfound">
        <h1 class="p-4 text-left">Página ingresada incorrectamente, vuelve a intentarlo</h1>
        <p class="pl-4 text-left">Error 404</p>
    </div>
    <div class="footer text-center bg-info text-light p-4">
        <p>Página realizada por Sebastian Araos™</p>
    </div>
</div>  
</template>

<script>
    export default {
        name: 'NotFound'
    }
</script>

<style>
    .notfound{
        background-image: url('../assets/notfound.jpg');
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        height: 70vh;
        color: white;
    }
</style>