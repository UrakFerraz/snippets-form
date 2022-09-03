<template>
    <div class="snippets-form">
        <SnippetForm msg="Snippets Form" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SnippetForm from '@/components/snippets/SnippetForm.vue' // @ is an alias to /src

export default defineComponent({
    name: 'SnippetFormView',
    components: {
        SnippetForm,
    },
})
</script>
