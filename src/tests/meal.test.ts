import { Food } from '@/classes/Food'
import { Meal } from '@/classes/Meal'
import type { IFoodParams } from '@/interfaces/IFoodParams'
import { expect, test } from 'vitest'
import { createEgg, createPoridge, createSugar } from './food.test'

// not default chunks
const poridge = createPoridge().food
const sugar = createSugar().food
const egg = createEgg().food
const meal = new Meal({ childs: [
  poridge,
  sugar,
  egg,
] })

const mealKcal = poridge.getEnergy() + sugar.getEnergy() + egg.getEnergy()
const mealChunks = 1
const proteins = poridge.proteins + sugar.proteins + egg.proteins
const fats = poridge.fats + sugar.fats + egg.fats
const carbohydrates = poridge.carbohydrates + sugar.carbohydrates + egg.carbohydrates

test('meal name', () => {
  expect(meal.name).toBe('Meal')
})

test('meal proteins', () => {
  expect(meal.proteins).toBe(proteins)
})

test('meal fats', () => {
  expect(meal.fats).toBe(fats)
})

test('meal carbohydrates', () => {
  expect(meal.carbohydrates).toBe(carbohydrates)
})

test('meal energy', () => {
  expect(meal.getEnergy()).toBe(mealKcal)
  expect(meal.getEnergyChunk()).toBeCloseTo((mealKcal / mealChunks) || 0)
})

test('meal chunks', () => {
  expect(meal.chunks).toBe(mealChunks)
})

test('meal chunk size', () => {
  expect(meal.chunkSize).toBe(1)
})

test('meal proteins chunks', () => {
  expect(meal.proteinsChunk).toBe((proteins / mealChunks) || 0)
})

test('meal fats chunks', () => {
  expect(meal.fatsChunk).toBe((fats / mealChunks) || 0)
})

test('meal carbohydrates chunks', () => {
  expect(meal.carbohydratesChunk).toBe((carbohydrates / mealChunks) || 0)
})

test('meal immutable', () => {
  expect(!!meal.add).toBe(true)
  expect(!!meal.remove).toBe(true)
})

// checker.params.chunks = 10
// checker.params.proteins /=  10
// checker.params.fats /= 10
// checker.params.carbohydrates /= 10
// foodCheck(checker, ' check meal') 

// // with default chunks
// const checker2 = createPoridge()
// foodCheck(checker2, checker2.meal.name+' default chunks') 

// // changing chunks
// const checker3 = createPoridge()
// const newValue = 25
// const food = checker3.food
// meal.set(newValue)
// checker3.params.chunks = newValue
// checker3.params.proteins /=  4
// checker3.params.fats /= 4
// checker3.params.carbohydrates /= 4
// foodCheck(checker3, meal.name+meal.chunks) 

// // not default chunkSize
// const checker4 = createPoridge({
//   chunkSize: 50,
//   chunks: 2,
// })
// checker4.params.chunks = 2
// foodCheck(checker4, checker4.meal.name+' default chunkSize')

// // default zero chunks
// const checker5 = createPoridge({
//   chunks: 0,
// })
// checker5.params.chunks = 0
// checker5.params.proteins = 0
// checker5.params.fats = 0
// checker5.params.carbohydrates = 0
// foodCheck(checker5, checker5.meal.name+' default zero chunks')

// // set zero chunks
// const checker6 = createPoridge()
// checker6.meal.set(0)
// checker6.params.chunks = 0
// checker6.params.proteins = 0
// checker6.params.fats = 0
// checker6.params.carbohydrates = 0
// foodCheck(checker6, checker6.meal.name+' set zero chunks')
