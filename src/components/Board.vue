<script setup lang="ts">
  import { computed, reactive } from 'vue'

  import { SIZE } from '../constants'
  import Fences from './Fences.vue'
  import Space from './Space.vue'
  import { useGameStore } from '../stores/game'

  const store = useGameStore()
  const fourPlayers = computed(() => store.game.playerPositions?.length === 4)

  type Orientation = 'horizontal' | 'vertical'

  const fenceHover: {
    orientation: Orientation | undefined;
    position: number | undefined;
  } = reactive({ orientation: undefined, position: undefined })
  
  function handleFenceHover(orientation: Orientation) {
    return (position: number) => {
      fenceHover.orientation = orientation
      fenceHover.position = position
    }
  }

  function handleFenceLeave() {
    fenceHover.orientation = undefined
    fenceHover.position = undefined
  }

  function error(position: number): { index: number; marked: boolean; player: number; shortestPath: string; } {
    const blockedPaths = fenceHover.orientation
      ? store.activePlayerPointOfView.error[fenceHover.orientation].filter(
          el => el.position === fenceHover.position
        )
      : []
    const forbiddenFence = blockedPaths.length > 0 && blockedPaths[0]
    if (forbiddenFence) {
      const { path, player, shortestPath: sP } = forbiddenFence
      const marked = !path.includes(position)
      let index = sP.indexOf(position)
      let shortestPath = ''
      if (index !== -1) {
        if (index === sP.length - 1) shortestPath = '×'
        else if (sP[index] === sP[index + 1] - 1) shortestPath = marked ? '⇢' : '→'
        else if (sP[index] === sP[index + 1] + 1) shortestPath = marked ? '⇠' : '←'
        else if (sP[index] === sP[index + 1] + SIZE) shortestPath = marked ? '⇡' : '↑'
        else if (sP[index] === sP[index + 1] - SIZE) shortestPath = marked ? '⇣' : '↓'
      } else {
        index = 0
      }
      return { index, marked, player, shortestPath }
    }
    return { index: 0, marked: false, player: -1, shortestPath: '' }
  }
</script>

<template>
 <div :class="['Board player' + (store.game.activePlayer + 1), { fourPlayers }]">
    <Fences v-if="fourPlayers" :player=3 />

    <Fences :player=0 />

    <Fences v-if="fourPlayers" :player=1 />

    <div class="Spaces">
      <Space
        v-for="(_, position) in new Array(SIZE * SIZE).fill(false)"
        :position="position"
        :error="error(position)"
        :handleFenceHover="handleFenceHover"
        :handleFenceLeave="handleFenceLeave"
      />
    </div>

    <Fences :player="fourPlayers ? 2 : 1" />
  </div>
</template>

<style scoped>
  .Board {
    align-items: center;
    background-color: var(--normal-color);
    border-radius: 2%;
    box-shadow: 0 0 2px var(--transparent99-font-color);
    display: flex;
    flex-wrap: wrap;
    height: 82vh;
    justify-content: center;
    margin: 14vh calc((100vw - 66vh) / 2) 0;
    padding: 0.4vh 0;
    position: fixed;
    top: 0;
    transition: background-color 0.4s, box-shadow 0.5s;
    width: 66vh;
  }
  .Board.fourPlayers {
    margin: 14vh calc((100vw - 82vh) / 2) 0;
    width: 82vh;
  }
  .Spaces {
    align-items: center;
    border-bottom-color: rgb(40, 40, 190, 18%);
    border-bottom-style: solid;
    border-top-color: rgb(190, 40, 40, 18%);
    border-top-style: solid;
    border-width: 0.5vh;
    display: flex;
    flex-wrap: wrap;
    height: 66%;
    justify-content: center;
    transition: 0.4s;
    width: 82%;
  }
  .Board.fourPlayers .Spaces {
    border-left-color: rgb(190, 40, 40, 18%);
    border-left-style: solid;
    border-right-color: rgb(40, 160, 40, 18%);
    border-right-style: solid;
    border-top-color: rgb(190, 160, 40, 18%);
    width: 66%;
  }
  .Board.player1 .Spaces {
    border-bottom-color: rgb(40, 40, 190, 67%);
  }
  .Board.player2 .Spaces {
    border-top-color: rgb(190, 40, 40, 67%);
  }
  .Board.fourPlayers.player2 .Spaces {
    border-left-color: rgb(190, 40, 40, 67%);
    border-top-color: rgb(190, 160, 40, 18%);
  }
  .Board.player3 .Spaces {
    border-top-color: rgb(190, 160, 40, 67%);
  }
  .Board.player4 .Spaces {
    border-right-color: rgb(40, 160, 40, 67%);
  }
  @media (max-aspect-ratio: 3/4) {
    .Board {
      height: 112.75vw;
      margin: max(calc((100vh - 112.75vw) / 2), 14vh) 4.625vw 0;
      padding: 0.5vw 0;
      width: 90.75vw;
    }
    .Board.fourPlayers {
      height: 90.75vw;
      margin: max(calc((100vh - 112.75vw) / 2), 14vh) 4.625vw 0;
      width: 90.75vw;
    }
    .Spaces {
      border-width: 0.8vw;
    }
  }
</style>
