<template>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Bitcount+Single:wght@100..900&display=swap" rel="stylesheet">
  <p>
    <Layout>
      <template #header>
        <Header></Header>
      </template>
      <template #timer>
        <Timer @start="isStarted = true"></Timer>
      </template>
      <template #main>
        <Main :isStarted="isStarted"></Main>
      </template>

      <template #footer>
        FOOTER
      </template>     
    </Layout>
  </p>
</template>
<script setup>
import Layout from './views/Layout.vue';
import Main from './views/Main.vue';
import Header from './componants/Header.vue';
import Timer from './componants/Timer.vue';
import { ref } from 'vue';

const isStarted = ref(false);
</script>
