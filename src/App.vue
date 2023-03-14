<script setup lang="ts">
  import Header from './components/layout/Header.vue'
  import Theme  from './components/layout/Theme.vue'
</script>

<template>
  <Theme>
    <Header />
    <main>
      <router-view v-slot="{ Component, route }">
        <transition name="fade">
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </main>
  </Theme>
</template>

<style scoped>
  main {
    background-color: var(--light-color);
    bottom: 0;
    display: flex;
    filter: blur(var(--blur-overlay, 0));
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    overflow: hidden;
    transition: background-color 0.7s, filter 0.9s;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
