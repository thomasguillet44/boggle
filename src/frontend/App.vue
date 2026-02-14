<template>
  <p>
    <Layout>
      <template #header>
        <Header></Header>
      </template>
      <template #timer>
        
      </template>
      <template #main>
        <Main></Main>
      </template>

      <template #footer>
      </template>     
    </Layout>
  </p>
</template>
<script setup>
import Layout from './views/Layout.vue';
import Main from './views/Main.vue';
import Header from './componants/Header.vue';
</script>
