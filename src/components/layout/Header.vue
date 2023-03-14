<script setup lang="ts">
  import Koridor from '../icons/Koridor.vue'
  import GitHub from '../icons/GitHub.vue'
  import ColorModePicker from './ColorModePicker.vue'
</script>

<template>
  <header>
    <div class="Side" />
    <router-link class="Koridor" to="/">
      <h1>
        <span>
          <Koridor />
        </span>
        Koridor
      </h1>
    </router-link>
    <div class="Side">
      <ColorModePicker />
      <a
        class="GitHub"
        href="https://github.com/antoine-moquereau/koridor"
        rel="external"
        title="GitHub Repo"
      >
        <GitHub />
      </a>
    </div>
  </header>
</template>

<style scoped>
  header {
    align-items: center;
    display: flex;
    height: 6vh;
    justify-content: space-between;
    margin: 2vh;
    position: relative;
    z-index: 9;
  }
  .Side {
    align-items: center;
    display: flex;
    justify-content: space-between;
    width: 9.2vh;
  }
  .Koridor {
    color: var(--font-color);
    transition: color 0.3s;
  }
  a::after {
    content: none;
  }
  h1 {
    align-items: center;
    display: flex;
    font-size: 3.3vh;
    font-weight: 900;
    line-height: 3.3vh;
    margin: 0;
  }
  span {
    height: 6vh;
    margin-left: -9vh;
    padding-right: 3vh;
    position: absolute;
  }
  span svg {
    backface-visibility: hidden;
    display: block;
    height: 100%;
    scale: 1 1 1;
    transition: scale 0.7s;
    width: auto;
  }
  .Koridor:hover span svg {
    scale: -1 1 1;
  }
  .GitHub svg {
    display: flex;
    fill: var(--font-color);
    height: 3.3vh;
    transition: fill 0.3s;
    width: 3.3vh;
  }
  .GitHub:hover svg {
    fill: var(--transparent99-font-color);
  }
</style>
