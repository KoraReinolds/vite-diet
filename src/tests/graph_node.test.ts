
// import { GraphNode } from '@/classes/GraphNode'
// import { expect, test } from 'vitest'
// import { DietPlanChecker } from './dietplan.test'
// import type { GraphState } from '@/interfaces/IGraphNode'
// import { DietPlan } from '@/classes/DietPlan'
// import { createCandy, createPoridge, createSugar } from './food.test'
// import type { Meal } from '@/classes/Meal'
// import { MealChecker } from './meal.test'

// class GraphNodeChecker extends DietPlanChecker {
//   state: GraphState = {}
//   meal: Meal
//   constructor(meal: Meal) {
//     super()
//     this.meal = meal
//   }
//   getGraphNode(): GraphNode {
//     return new GraphNode(this.meal)
//   }
//   getNeighbors(): GraphState[] {
//     const state = this.getGraphNode().state
//     const neighbors: GraphState[] = []
//     Object.keys(state).forEach(key => {
//       const newState = { ...state }
//       newState[key] += 1
//       neighbors.push(newState)
//     })
//     return neighbors 
//   }
//   addSugar() {
//     super.addSugar()
//     this.state.sugar = 1 + (this.state.sugar || 0)
//   }
// }

// test('clone node', () => {
//   const mealChecker = new MealChecker()
//   mealChecker.addEgg()
//   mealChecker.addPoridge()
//   const gnc = new GraphNodeChecker(mealChecker.meal)
//   const node = gnc.getGraphNode()
//   const clone = node.clone()
//   expect(clone).toStrictEqual(node)
//   const poridgeChunks = node.state.egg
//   clone.state.poridge = 10
//   expect(node.state.egg).toBe(poridgeChunks)
// })

// test('node neighbors', () => {
//   const mealChecker = new MealChecker()
//   mealChecker.addEgg()
//   mealChecker.addPoridge()
//   mealChecker.addSugar()
//   const gnc = new GraphNodeChecker(mealChecker.meal)
//   const stateSet = new Set()
//   gnc.getNeighbors().forEach(n => {
//     stateSet.add(JSON.stringify(n)) 
//   })
//   expect(stateSet.size).toBe(mealChecker.meal.getAllList().length)
// })

// test('node heuristic without food', () => {
//   const mealChecker = new MealChecker()
//   const gn = new GraphNodeChecker(mealChecker.meal).getGraphNode()
//   expect(gn.heuristic()).greaterThan(0)
// })

// test('node heuristic with food', () => {
//   const mealChecker = new MealChecker()
//   mealChecker.addSugar()
//   const state = { sugar: 1 }
//   const gn = new GraphNode(mealChecker.meal, state)
//   expect(gn.heuristic()).lessThan(mealChecker.meal.dp.kcal)
// })

// // test('node zero heuristic', () => {
// //   const poridge = createPoridge()
// //   const { name, ...pfcRatio } = poridge.params 
// //   const dp = new DietPlan({
// //     pfcRatio,
// //     kcal: poridge.food.getEnergyChunk() * 6,
// //     childs: [poridge.food]
// //   })
// //   const gn = new GraphNode(dp, { poridge: 6 })
// //   expect(gn.heuristic()).toBeCloseTo(0)
// // })

// // test('node heuristic with difference macronutrients', () => {
// //   const sugar = createSugar()
// //   const candy = createCandy()
// //   const { sugarName, ...pfcRatioSugar } = sugar.params
// //   const { candyName, ...pfcRatioCandy } = candy.params
// //   const dpSugar = new DietPlan({
// //     pfcRatio: pfcRatioSugar,
// //     kcal: sugar.food.getEnergyChunk(),
// //     childs: [sugar.food]
// //   })
// //   const dpCandy = new DietPlan({
// //     pfcRatio: pfcRatioSugar,
// //     kcal: candy.food.getEnergyChunk(),
// //     childs: [candy.food]
// //   })
// //   const gnCandy = new GraphNode(dpCandy, { candy: 1 })
// //   const gnSugar = new GraphNode(dpSugar, { sugar: 1 })
// //   expect(gnCandy.heuristic()).greaterThan(gnSugar.heuristic())
// // })

