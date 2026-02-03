<template>
    <div v-for="word in [...wordFound]" :key="word">
        {{ word }}
    </div>
</template>
<script setup>
const props = defineProps({
    wordFound: Set
})


</script>