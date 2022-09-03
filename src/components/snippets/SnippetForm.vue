<template>
    <div class="smippets-form">
        <h1>{{ props.msg }}</h1>
        <SnippetTextarea />
        <ActionsForm />
        <div class="edited-snippet">
            <EditedSnippet />
        </div>
    </div>
</template>

<script setup lang="ts">
import ActionsForm from './ActionsForm.vue'
import SnippetTextarea from './SnippetTextarea.vue'
import EditedSnippet from './EditedSnippet.vue'

const props = defineProps({ msg: String })
</script>
<style scoped lang="scss">
.edited-snippet {
    margin-inline: 10vw;
}
</style>
