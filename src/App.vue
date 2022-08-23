<template>
    <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/snippets-form">Snippets Form</router-link> |
        <router-link to="/login">Login</router-link> |
        <router-link to="/register">Register</router-link> |
        <router-link to="/profile">Profile</router-link>
    </nav>
    <router-view />
</template>

<style lang="scss">
@import './assets/css/colors';

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: $gray;
        margin: 10px;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
