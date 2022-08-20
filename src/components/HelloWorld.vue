<template>
    <div class="hello">
        <h1>{{ props.msg }}</h1>
        <p>
            Snippet Editor created with Vue.js + TypeScript,<br />
            check out the
            <a href="https://cli.vuejs.org" target="_blank" rel="noopener"
                >vue-cli documentation</a
            >.
        </p>
        <h3>Installed CLI Plugins</h3>
        <ul>
            <li v-for="link in InstalledCLIPlugins" :key="link.name">
                <a :href="link.href" target="_blank" rel="noopener">{{
                    link.name
                }}</a>
            </li>
        </ul>
        <h3>Essential Links To VueJS</h3>
        <ul>
            <li v-for="link in EssentialLinksToVueJS" :key="link.name">
                <a :href="link.href" target="_blank" rel="noopener">{{
                    link.name
                }}</a>
            </li>
        </ul>
        <h3>Ecosystem</h3>
        <ul>
            <li v-for="link in Ecosystem" :key="link.name">
                <a :href="link.href" target="_blank" rel="noopener">{{
                    link.name
                }}</a>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import {
    InstalledCLIPlugins,
    Ecosystem,
    EssentialLinksToVueJS,
} from '@/assets/links'

const props = defineProps<{ msg: string }>()
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
    margin: 40px 0 0;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 10px;
}
a {
    color: #42b983;
}
</style>
