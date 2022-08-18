<template>
    <div class="actions-form">
        <LanguageSelector />
        <ActionButton
            :type="'filter'"
            :title="'Remover tabulação e quebras de linha'"
        />
        <ActionButton :type="'undo'" :title="'Desfazer edição'" />
        <ActionButton :type="'copy'" :title="'copiar'" />
    </div>
</template>

<script setup lang="ts">
import LanguageSelector from './LanguageSelector.vue'
import ActionButton from './ActionButton.vue'
</script>

<style scoped lang="scss">
.actions-form {
    display: flex;
    flex-flow: row wrap;
    align-items: flex-end;
    justify-content: space-evenly;
    gap: 20px;
    margin-block: 20px;
}
</style>
