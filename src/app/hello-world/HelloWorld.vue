<template>
  <v-container fluid>
    <v-layout>
      <div class="title">{{ message }}</div>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  metaInfo: {
    title: 'Hello World | opol6-fstest',
    meta: [
      { property: 'og:title', content: 'Hello World | opol6-fstest' },
    ],
  },
  data() {
    return {
      message: 'Hello, World!',
    };
  },
};
</script>

<style scoped>
</style>
