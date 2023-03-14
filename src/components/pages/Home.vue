<script setup lang="ts">
  import Button from '../Button.vue'
  import Local2 from '../icons/Local2.vue'
  import Local4 from '../icons/Local4.vue'
</script>

<template>
  <section>
    <nav>
      <Button class="Button" href="/game">
        <Local2 />2 Players
      </Button>
      <Button class="Button" href="/game/4">
        <Local4 />4 Players
      </Button>
    </nav>
    <router-link to="/rules">
      Rules
    </router-link>
  </section>
</template>

<style scoped>
  section {
    flex-direction: column;
    bottom: 0;
    display: flex;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
  }
  nav {
    align-items: center;
    display: flex;
    justify-content: center;
    margin: auto auto 0;
    max-width: 100%;
  }
  a {
    font-size: 1.125rem;
    margin: 0 auto auto;
  }
  nav .Button {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 12vh 3vh;
  }
  nav svg {
    height: 22vh;
    margin-top: -22vh;
    position: absolute;
    width: 22vh;
  }
  nav :global(.p1),
  nav :global(.p2),
  nav :global(.p3),
  nav :global(.p4) {
    fill: var(--font-color);
    transition: fill 0.4s;
  }
  nav :global(.Button:hover .p1) {
    fill: #3465a4;
  }
  nav :global(.Button:hover .p2) {
    fill: #cc0000;
  }
  nav :global(.Button:hover .p3) {
    fill: #c4a000;
  }
  nav :global(.Button:hover .p4) {
    fill: #4e9a06;
  }

  @media (max-aspect-ratio: 3/4) {
    nav {
      flex-direction: column;
      padding-top: 13vh;
    }
  }
</style>
