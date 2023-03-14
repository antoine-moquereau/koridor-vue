<script setup lang="ts">
  import { computed } from 'vue'

  import { SIZE } from '../constants'
  import Fence from './Fence.vue'
  import Pawn from './Pawn.vue'

  import { useGameStore } from '../stores/game'

  const store = useGameStore()

  const props = defineProps<{
    error: { index: number; marked: boolean; player: number; shortestPath: string; },
    handleFenceHover: (orientation: 'horizontal' | 'vertical') => (position: number) => void,
    handleFenceLeave: () => void,
    position: number
  }>()

  const marked = computed(() => props.error.marked)
  const player = computed(() => props.error.player)
  const shortestPath = computed(() => props.error.shortestPath)

  const accessible = computed(() => 
    store.activePlayerPointOfView.graph[store.game.playerPositions[store.game.activePlayer]].includes(props.position)
  )
</script>

<template>
  <div class="Space-wrapper">
    
    <button
      v-if="accessible"
      type="button"
      :class="['Space accessible player' + (player + 1), { marked, shortestPath }]"
      @click="store.move(position)"
    >
      <div>
        {{shortestPath}}
      </div>
    </button>

    <div
      v-else
      :class="['Space player' + (player + 1), { marked, shortestPath }]"
    >
      <div>
        {{shortestPath}}
      </div>
    </div>

    <Pawn
      v-if="store.game.playerPositions.includes(position)"
      :player="store.game.playerPositions.indexOf(position) + 1"
    />
 
    <div
      v-if="
        !store.game.fences.positions.horizontal.includes(position) &&
        !store.game.fences.positions.vertical.includes(position - SIZE) &&
        !store.game.fences.positions.vertical.includes(position + SIZE)
      "
      class="Space-right"
    >
      <Fence
        :boardFences="store.game.fences.positions.vertical"
        :position="position"
        :error="store.activePlayerPointOfView.error.vertical"
        :handleHover="handleFenceHover('vertical')"
        :handleLeave="handleFenceLeave"
        :moveFenceTo="store.placeVerticalFence"
      />
    </div>

    <div
      v-if="
        !store.game.fences.positions.vertical.includes(position) &&
        !store.game.fences.positions.horizontal.includes(position - 1) &&
        !store.game.fences.positions.horizontal.includes(position + 1)
      "
      class="Space-bottom"
    >
      <Fence
        :boardFences="store.game.fences.positions.horizontal"
        :position="position"
        :error="store.activePlayerPointOfView.error.horizontal"
        :handleHover="handleFenceHover('horizontal')"
        :handleLeave="handleFenceLeave"
        :moveFenceTo="store.placeHorizontalFence"
      />
    </div>
  </div>
</template>

<style scoped>
  .Space-wrapper {
    height: 11%;
    position: relative;
    width: 11%;
  }
  .Space {
    align-items: center;
    background-color: rgb(255 255 255 / 42%);
    border: 1px solid #0006;
    border-radius: 20%;
    box-sizing: border-box;
    color: var(--transparent99-font-color);
    display: flex;
    font-size: 3vh;
    height: 86%;
    justify-content: center;
    position: absolute;
    right: 8%;
    top: 8%;
    transition: background-color 0.3s var(--delay), border-color 0.3s var(--delay);
    width: 86%;
  }
  .Space.marked {
    background-color: rgba(255 0 0 / 40%);
    transition: background-color 0.9s;
  }
  .Space.shortestPath.player1:not(.marked) {
    background-color: rgba(80 80 190 / 60%);
    border-color: rgba(80 80 255 / 60%);
  }
  .Space.shortestPath.player2:not(.marked) {
    background-color: rgba(190 80 80 / 60%);
    border-color: rgba(255 80 80 / 60%);
  }
  .Space.shortestPath.player3:not(.marked) {
    background-color: rgba(190 160 80 / 60%);
    border-color: rgba(255 160 80 / 60%);
  }
  .Space.shortestPath.player4:not(.marked) {
    background-color: rgba(80 160 80 / 60%);
    border-color: rgba(80 255 80 / 60%);
  }
  .Space-right {
    height: 184%;
    left: 92%;
    position: absolute;
    top: 8%;
    width: 14%;
    z-index: 2;
  }
  .Space-wrapper:nth-child(9n) .Space-right,
  .Space-wrapper:nth-last-child(1) .Space-right,
  .Space-wrapper:nth-last-child(2) .Space-right,
  .Space-wrapper:nth-last-child(3) .Space-right,
  .Space-wrapper:nth-last-child(4) .Space-right,
  .Space-wrapper:nth-last-child(5) .Space-right,
  .Space-wrapper:nth-last-child(6) .Space-right,
  .Space-wrapper:nth-last-child(7) .Space-right,
  .Space-wrapper:nth-last-child(8) .Space-right,
  .Space-wrapper:nth-last-child(9) .Space-right {
    display: none;
  }
  .Space-bottom {
    display: none;
    z-index: 2;
  }
  .Space-wrapper:nth-last-child(n + 10) .Space-bottom {
    display: block;
    height: 14%;
    left: 8%;
    position: absolute;
    top: 92%;
    width: 184%;
  }
  .Space-wrapper:nth-child(9n) .Space-bottom {
    display: none;
  }
  .Space.accessible:hover {
    border: 2px solid var(--font-color);
    cursor: pointer;
  }
  .Board.player1 .Space.accessible:hover {
    background-color: rgb(40 40 190 / 40%);
  }
  .Board.player2 .Space.accessible:hover {
    background-color: rgb(190 40 40 / 40%);
  }
  .Board.player3 .Space.accessible:hover {
    background-color: rgb(190 160 40 / 40%);
  }
  .Board.player4 .Space.accessible:hover {
    background-color: rgb(40 160 40 / 40%);
  }

  @media (max-aspect-ratio: 3/4) {
    .Space {
      font-size: 4vw;
    }
  }
</style>
