import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'

import { FENCES, SIZE } from '../constants'
import * as graph from './graph'

interface Positions {
  horizontal: number[]
  vertical: number[]
}

interface Fences {
  positions: Positions
  available: number[]
}

interface Game {
  fences: Fences
  playerPositions: number[]
  activePlayer: number
  graph: number[][]
  playerWinningPositions: number[][]
}

export interface Error {
  position: number
  path: number[]
  shortestPath: number[]
  player: number
}

const defaultGame = (players: number): Game => ({
  fences: {
    positions: {
      horizontal: [],
      vertical: []
    },
    available: new Array(players).fill(FENCES / players)
  },
  playerPositions: players === 2 ? [4, 76] : [4, 44, 76, 36],
  activePlayer: 0,
  graph: graph.createGraph(SIZE),
  playerWinningPositions:
    players === 2
      ? [
          Array.from({ length: SIZE }, (_, i) => SIZE * SIZE - i - 1),
          Array.from({ length: SIZE }, (_, i) => i)
        ]
      : [
          Array.from({ length: SIZE }, (_, i) => SIZE * SIZE - i - 1),
          Array.from({ length: SIZE }, (_, i) => i * SIZE),
          Array.from({ length: SIZE }, (_, i) => i),
          Array.from({ length: SIZE }, (_, i) => i * SIZE + SIZE - 1)
        ]
})

export const useGameStore = defineStore('game', () => {

  const decrementActivePlayerAvailableFences = (game: Game) =>
    game.fences.available.map((el, i) => (i === game.activePlayer ? el - 1 : el))
  const nextActivePlayer = (game: Game): number =>
    game.activePlayer === game.playerPositions.length - 1 ? 0 : game.activePlayer + 1

  const game = reactive(defaultGame(2))

  function move(position: number) {
    game.playerPositions = game.playerPositions.map((el, i) =>
      i === game.activePlayer ? position : el
    ),
    game.activePlayer = nextActivePlayer(game)
  }

  function placeHorizontalFence (position: number) {
    game.fences = {
      positions: {
        horizontal: [...game.fences.positions.horizontal, position],
        vertical: game.fences.positions.vertical
      },
      available: decrementActivePlayerAvailableFences(game)
    },
    game.activePlayer = nextActivePlayer(game),
    game.graph = graph.placeHorizontalFence(game.graph, position)
  }

  function placeVerticalFence (position: number) {
    game.fences = {
      positions: {
        horizontal: game.fences.positions.horizontal,
        vertical: [...game.fences.positions.vertical, position]
      },
      available: decrementActivePlayerAvailableFences(game)
    },
    game.activePlayer = nextActivePlayer(game),
    game.graph = graph.placeVerticalFence(game.graph, position)
  }

  function set (players: number) {
    const newGame = defaultGame(players)
    game.fences = newGame.fences
    game.playerPositions = newGame.playerPositions
    game.activePlayer = newGame.activePlayer
    game.graph = newGame.graph
    game.playerWinningPositions = newGame.playerWinningPositions
  }

  const winner = computed(() => {
    let winner
    game.playerPositions.forEach((position, player) => {
      if (game.playerWinningPositions[player].includes(position)) {
        winner = player + 1
      }
    })
    return winner
  })

  const activePlayerPointOfView = computed(() => {
    const players = game.playerPositions.length
    const blockWinningCase = (explored: number[], i: number) => {
      switch ((i + game.activePlayer) % players) {
        case 0: return explored.every(el => el < SIZE * SIZE - SIZE)
        case 1: return players === 2 ? explored.every(el => el > SIZE - 1) : explored.every(el => el % SIZE !== 0)
        case 2: return explored.every(el => el > SIZE - 1)
        case 3: return explored.every(el => el % SIZE !== SIZE - 1)
        default: return false
      }
    }
    const horizontal: Error[] = []
    const vertical: Error[] = []
    game.playerPositions
      .slice(game.activePlayer)
      .concat(game.playerPositions.slice(0, game.activePlayer))
      .forEach((el, i) => {
        const player = (i + game.activePlayer) % players
        const sP = graph.shortestPath(game.graph, el, game.playerWinningPositions[player])
        for (let j = 0; j < SIZE * SIZE; j++) {
          const exploredH = graph.breadthFirstSearch(graph.placeHorizontalFence(game.graph, j), el)
          if (blockWinningCase(exploredH, i)) {
            horizontal.push({ position: j, path: exploredH, shortestPath: sP, player })
          }
          const exploredV = graph.breadthFirstSearch(graph.placeVerticalFence(game.graph, j), el)
          if (blockWinningCase(exploredV, i)) {
            vertical.push({ position: j, path: exploredV, shortestPath: sP, player })
          }
        }
      })
    const error = { horizontal, vertical }
    return { error, graph: graph.getActivePlayerPointOfViewGraph(
      game.graph,
      game.playerPositions,
      game.activePlayer
    )}
  })

  return { game, move, placeHorizontalFence, placeVerticalFence, set, winner, activePlayerPointOfView }

})
