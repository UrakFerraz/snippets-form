<template>
    <div>
        <label>{{ label }}</label>
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'
const props = defineProps<{ label: string }>()
const { label } = toRefs(props)
</script>
