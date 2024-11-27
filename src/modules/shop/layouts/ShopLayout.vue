<template>
  <!-- Header Navbar -->
  <top-menu />

  <router-view />

  <!-- Footer -->
  <FooterComponent />
</template>

<script lang="ts" setup>
import TopMenu from '../components/TopMenu.vue';
import FooterComponent from '../components/FooterComponent.vue';
</script>
