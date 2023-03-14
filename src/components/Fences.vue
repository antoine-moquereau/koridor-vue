<script setup lang="ts">
  import { computed } from 'vue'

  import { FENCES } from '../constants'
  import { useGameStore } from '../stores/game'

  const store = useGameStore()

  const props = defineProps<{
    player: number
  }>()

  const players = computed(() => store.game.playerPositions.length)
  const fourPlayers = computed(() => store.game.playerPositions.length === 4)
  const right = computed(() => store.game.playerPositions.length === 4 && props.player === 1)
  const left = props.player === 3
</script>

<template>
  <div :class="['Fences', { fourPlayers, left, right }]">
    <div v-for="(_, i) in new Array(FENCES / players).fill(false)" class="Fence-wrapper">
      <div v-if="store.game.fences.available[player] > i" class="Fence" />
    </div>
  </div>
</template>

<style scoped>
  .Fences {
    align-items: center;
    display: flex;
    height: 16%;
    justify-content: space-between;
    width: 82%;
  }
  .Fences.fourPlayers {
    margin: 0 33%;
    width: 33%;
  }
  .Fences.left.fourPlayers {
    align-items: center;
    flex-direction: column;
    height: 33%;
    justify-content: space-between;
    left: 0;
    margin: 33% 0;
    position: absolute;
    width: 16%;
  }
  .Fences.right.fourPlayers {
    align-items: center;
    flex-direction: column;
    height: 33%;
    justify-content: space-between;
    margin: 33% 0;
    position: absolute;
    right: 0;
    width: 16%;
  }
  .Fence-wrapper {
    height: 83.49%; /* (184% * 11%) * (66 / 16) */
    width: 1.54%; /* (14% * 11%) */
  }
  .Fences.fourPlayers .Fence-wrapper {
    width: 3.08%;
  }
  .Fences.left.fourPlayers .Fence-wrapper,
  .Fences.right.fourPlayers .Fence-wrapper {
    height: 3.08%;
    width: 83.49%;
  }
  .Fence {
    background: var(--font-color);
    box-shadow: 0 0 0.8vh var(--opposite-font-color);
    height: 100%;
    outline: 2px solid var(--font-color);
    position: relative;
    width: 100%;
    z-index: 2;
  }
</style>
