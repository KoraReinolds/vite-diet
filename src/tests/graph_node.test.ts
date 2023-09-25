
import { GraphNode } from '@/classes/GraphNode'
import { expect, test } from 'vitest'
import { DietPlanChecker } from './dietplan.test'
import type { GraphState } from '@/interfaces/IGraphNode'
import { DietPlan } from '@/classes/DietPlan'
import { createCandy, createPoridge, createSugar } from './food.test'

class GraphNodeChecker extends DietPlanChecker {
  state: GraphState = {}
  constructor(dp: DietPlan) {
    super()
    this.dp = dp
  }
  getGraphNode(): GraphNode {
    return new GraphNode(this.dp)
  }
  getNeighbors(): GraphState[] {
    const state = this.getGraphNode().state
    const neighbors: GraphState[] = []
    Object.keys(state).forEach(key => {
      const newState = { ...state }
      newState[key] += 1
      neighbors.push(newState)
    })
    return neighbors 
  }
  addSugar() {
    super.addSugar()
    this.state.sugar = 1 + (this.state.sugar || 0)
  }
}

test('clone node', () => {
  const dpc = new DietPlanChecker()
  dpc.addEgg()
  dpc.addPoridge()
  const gnc = new GraphNodeChecker(dpc.dp)
  const node = gnc.getGraphNode()
  const clone = node.clone()
  expect(clone).toStrictEqual(node)
  const poridgeChunks = node.state.egg
  clone.state.poridge = 10
  expect(node.state.egg).toBe(poridgeChunks)
})

test('node neighbors', () => {
  const dpc = new DietPlanChecker()
  dpc.addEgg()
  dpc.addPoridge()
  dpc.addSugar()
  const gnc = new GraphNodeChecker(dpc.dp)
  const stateSet = new Set()
  gnc.getNeighbors().forEach(n => {
    stateSet.add(JSON.stringify(n)) 
  })
  expect(stateSet.size).toBe(dpc.dp.getAllList().length)
  const neighbors = gnc.getGraphNode().getNeighbors()
  neighbors.forEach((n) => {
    stateSet.delete(JSON.stringify(n.state))
  })
  expect(stateSet.size).toBe(0)
})

test('node heuristic without food', () => {
  const dpc = new DietPlanChecker()
  const gn = new GraphNodeChecker(dpc.dp).getGraphNode()
  expect(gn.heuristic()).toBe(1)
})

test('node heuristic with food', () => {
  const dpc = new DietPlanChecker()
  dpc.addSugar()
  const state = { sugar: 1 }
  const gn = new GraphNode(dpc.dp, state)
  expect(gn.heuristic()).lessThan(dpc.dp.kkal)
})

test('node zero heuristic', () => {
  const poridge = createPoridge()
  const { name, ...pfcRatio } = poridge.params 
  const dp = new DietPlan({
    pfcRatio,
    kkal: poridge.food.getEnergyChunk() * 6,
    childs: [poridge.food]
  })
  const gn = new GraphNode(dp, { poridge: 6 })
  expect(gn.heuristic()).toBeCloseTo(0)
})

test('node heuristic with difference macronutrients', () => {
  const sugar = createSugar()
  const candy = createCandy()
  const { sugarName, ...pfcRatioSugar } = sugar.params
  const { candyName, ...pfcRatioCandy } = candy.params
  const dpSugar = new DietPlan({
    pfcRatio: pfcRatioSugar,
    kkal: sugar.food.getEnergyChunk(),
    childs: [sugar.food]
  })
  const dpCandy = new DietPlan({
    pfcRatio: pfcRatioSugar,
    kkal: candy.food.getEnergyChunk(),
    childs: [candy.food]
  })
  const gnCandy = new GraphNode(dpCandy, { candy: 1 })
  const gnSugar = new GraphNode(dpSugar, { sugar: 1 })
  expect(gnCandy.heuristic()).greaterThan(gnSugar.heuristic())
})

