<script setup lang="ts">
  import { Error, useGameStore } from '../stores/game'

  defineProps<{
    boardFences: number[],
    error: Error[],
    handleHover: (position: number) => void,
    handleLeave: () => void,
    moveFenceTo: (position: number) => void,
    position: number
  }>()

  const store = useGameStore()
</script>

<template>
  <div
    v-if="boardFences.includes(position)"
    class="Fence"
  ></div>
  <div
    v-else-if="store.game.fences.available[store.game.activePlayer] > 0 && error.some(el => el.position === position)"
    class="Fence marked"
    @mouseover="handleHover(position)"
    @mouseleave="handleLeave()"
  ></div>
  <div
    v-else-if="store.game.fences.available[store.game.activePlayer] > 0"
    class="PlaceableFence"
    @click="moveFenceTo(position)"
  ></div>
</template>

<style scoped>
  .Fence {
    background-color: var(--font-color);
    box-shadow: 0.4vh 0.4vh 0.6vh var(--opposite-font-color);
    height: 100%;
    outline: 2px solid var(--font-color);
    position: relative;
    transition: opacity 0.4s, background-color 0.4s, box-shadow 0.4s, outline 0.4s;
    width: 100%;
    z-index: 2;
  }
  .Fence.marked {
    background-color: transparent;
    border-left: 6px dashed red;
    box-shadow: none;
    cursor: not-allowed;
    opacity: 0;
    outline: none;
  }
  .Space-bottom .Fence.marked {
    border-bottom: 6px dashed red;
    border-left: none;
  }
  .Fence.marked:hover {
    opacity: 1;
  }
  .PlaceableFence {
    cursor: pointer;
    height: 100%;
    position: relative;
    width: 100%;
    z-index: 2;
  }
  .PlaceableFence:hover {
    background-color: rgb(50 160 20);
    outline: 1px solid var(--font-color);
  }
  .PlaceableFence:hover::before {
    border: 1px black solid;
    box-sizing: border-box;
    content: '';
    position: absolute;
    width: 100%;
  }
  .PlaceableFence:hover::after {
    bottom: 0;
    border: 1px black solid;
    box-sizing: border-box;
    content: '';
    height: 2px;
    position: absolute;
    width: 100%;
  }
  .Space-bottom .PlaceableFence:hover::before {
    height: 100%;
    width: 2px;
  }
  .Space-bottom .PlaceableFence:hover::after {
    height: 100%;
    right: 0;
    width: 2px;
  }
  .Board.player1 .PlaceableFence:hover {
    background-color: rgb(40 40 190 / 40%);
  }
  .Board.player2 .PlaceableFence:hover {
    background-color: rgb(190 40 40 / 40%);
  }
  .Board.player3 .PlaceableFence:hover {
    background-color: rgb(190 160 40 / 40%);
  }
  .Board.player4 .PlaceableFence:hover {
    background-color: rgb(40 160 40 / 40%);
  }

  .Space-bottom .PlaceableFence:hover {
    transform: scaleY(2) translateY(12%);
  }
  .Space-right .PlaceableFence:hover {
    transform: scaleX(2);
  }
</style>