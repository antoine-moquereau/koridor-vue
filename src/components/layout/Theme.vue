<script setup lang="ts">
  import { computed } from 'vue'
  import { useColorStore } from '../../stores/color'

  const store = useColorStore()
  const theme = computed(() => store.color)
</script>

<template>
  <div>
    <slot />
  </div>
</template>

<style scoped>
  div {
    --light-color: v-bind('theme.light');
    --normal-color: v-bind('theme.normal');
    --dark-color: v-bind('theme.dark');
    --font-color: v-bind('theme.font');
    --link-color: v-bind('theme.link');
    --opposite-font-color: v-bind('theme.fontOpposite');
    --transparent-light-color: v-bind('theme.transparentLight');
    --transparent33-font-color: v-bind('theme.transparentFont33');
    --transparent99-font-color: v-bind('theme.transparentFont99');
    --transparentcc-font-color: v-bind('theme.transparentFontcc');
  }
</style>
