<template>
    <div class="actions-form">
        <LanguageSelector />
        <BaseButton :type="'filter'" />
        <BaseButton :type="'copy'" />
    </div>
</template>

<script setup lang="ts">
import LanguageSelector from './LanguageSelector.vue'
import BaseButton from './BaseButton.vue'
</script>

<style scoped lang="scss">
.actions-form {
    display: flex;
    flex-flow: row wrap;
    align-items: flex-end;
    justify-content: space-evenly;
    gap: 20px;
}
</style>
