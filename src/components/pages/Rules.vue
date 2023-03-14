<script setup lang="ts">
</script>

<template>
  <section>
    <h1>Rules</h1>
    <ul>
      <li>Each player starts with 10 walls and their pawn on opposite sides</li>
      <li>On each turn, a player can move their pawn straight or place a wall</li>
      <li>Wall cannot block only path to opposite side</li>
      <li>Pawns can jump over other pawns, but not over walls</li>
      <li>The goal is to reach the opposite side with your pawn first</li>
    </ul>
    <nav>
      <router-link to="/">
        Play
      </router-link>
    </nav>
  </section>
</template>

<style scoped>
  section {
    align-items: center;
    background: var(--light-color);
    border: none;
    border-radius: 5vh;
    box-shadow: none;
    color: var(--font-color);
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    margin: auto;
    padding: 0 6vh;
    transition: border 0.7s, box-shadow 0.7s;
    z-index: 2;
  }
  h1 {
    font-size: 4vh;
    margin-top: 6vh;
    text-align: center;
  }
  li {
    list-style: auto;
    margin: 2vh;
    font-size: 1.4rem;
  }
  nav {
    margin: 3vh 0 0;
    text-align: center;
  }
  a {
    display: inline-block;
    font-size: 1.7vh;
    margin: 4vh;
  }

  @media (max-aspect-ratio: 1/1) {
    h1 {
      font-size: 2rem;
    }
    li {
      font-size: 1rem;
    }
  }
</style>
