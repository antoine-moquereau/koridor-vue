<script setup lang="ts">
  import { useRoute } from 'vue-router'
  
  import ActivePlayer from '../ActivePlayer.vue'
  import Board from '../Board.vue'
  import Button from '../Button.vue'
  import Confetti from '../Confetti.vue'
  import { useGameStore } from '../../stores/game'

  const route = useRoute()
  const store = useGameStore()

  const players = route.params.players === '4' ? 4 : 2

  store.set(players)

  function handleReturnMatch() {
    store.set(players)
  }
</script>

<template>
  <div v-if="!store.winner">
    <ActivePlayer />
    <Board />
  </div>
  <div v-else class="Congratulations">
    <Confetti />
    <section>
      <h1>Congratulations</h1>
      <p :class="'player' + store.winner">Player {{store.winner}} won</p>
      <nav>
        <Button class="Button" @click="handleReturnMatch">Return match</Button>
        <router-link to="/"> Home </router-link>
      </nav>
    </section>
  </div>
</template>

<style scoped>
  .Congratulations {
    display: flex;
    height: 100vh;
    left: 0;
    position: fixed;
    top: 0;
    width: 100vw;
  }
  section {
    align-items: center;
    background: var(--light-color);
    border: 1px solid var(--normal-color);
    border-radius: 5vh;
    box-shadow: 0 0 1vh var(--dark-color);
    color: var(--font-color);
    display: flex;
    flex-direction: column;
    height: 58vh;
    justify-content: space-evenly;
    margin: auto;
    padding: 0 15%;
    z-index: 2;
  }
  h1 {
    font-size: 4vh;
    margin-top: 2vh;
  }
  p {
    font-size: 2.5vh;
    padding: 1.7vh;
  }
  p.player1 {
    border-bottom: 2px solid rgb(40, 40, 190);
  }
  p.player2 {
    border-bottom: 2px solid rgb(190, 40, 40);
  }
  p.player3 {
    border-bottom: 2px solid rgb(190, 160, 40);
  }
  p.player4 {
    border-bottom: 2px solid rgb(40, 160, 40);
  }
  nav {
    text-align: center;
  }
  nav :deep(.Button) {
    display: block;
    margin: 3vh 0;
  }
  a {
    font-size: 1.7vh;
    margin-top: 4vh;
  }
</style>
