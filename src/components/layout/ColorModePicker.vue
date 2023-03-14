<script setup lang="ts">
  import { useColorStore } from '../../stores/color'
  import Dark from '../icons/Dark.vue'
  import Light from '../icons/Light.vue'

  const store = useColorStore()

  function handleChange() {
    store.change()
  }
</script>

<template>
  <button type="button" :title="store.isDark ? 'Light mode' : 'Dark mode'" @click="handleChange">
    <Light v-if="store.isDark" />
    <Dark v-else />
  </button>
</template>

<style scoped>
  button {
    background: var(--normal-color);
    border: none;
    border-radius: 50%;
    box-shadow: 0 0 0.7vh var(--transparent99-font-color);
    cursor: pointer;
    display: var(--display, flex);
    height: 3.6vh;
    padding: 0.7vh;
    transition: box-shadow 0.2s ease 0s;
    width: 3.6vh;
    z-index: 1;
  }
  button:hover {
    background: var(--dark-color);
    box-shadow: 0 0 1vh var(--transparentcc-font-color);
  }
  button :global(svg) {
    display: block;
    fill: var(--font-color);
    height: 80%;
    margin: auto;
    width: auto;
  }
</style>