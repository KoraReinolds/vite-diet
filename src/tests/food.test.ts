import { Food } from '@/classes/Food'
import type { IFoodParams } from '@/interfaces/IFoodParams'
import { expect, test } from 'vitest'

class FoodChecker {
  food: Food
  params: IFoodParams
  constructor(params: IFoodParams) {
    this.food = new Food(params)
    this.params = params
  }
}

const createPoridge = (params = {}) => new FoodChecker({
  name: 'poridge',
  proteins: 12,
  carbohydrates: 63,
  fats: 2,
  ...params,
})

const createEgg = (params = {}) => new FoodChecker({
  name: 'egg',
  proteins: 20,
  carbohydrates: 1,
  fats: 10,
  chunkSize: 60,
  chunks: 60,
  ...params,
})

const createSugar = (params = {}) => new FoodChecker({
  name: 'sugar',
  proteins: 0,
  carbohydrates: 98,
  fats: 0,
  ...params,
})

const createCandy = (params = {}) => new FoodChecker({
  name: 'candy',
  proteins: 8,
  carbohydrates: 90,
  fats: 0,
  ...params,
})

function foodCheck(
  checker: FoodChecker,
  testName: string
) {
  const params = checker.params
  const food = checker.food
  const chunks = params.chunks??100
  const chunkSize = params.chunkSize??1
  const ratio = 100 / (chunks * chunkSize)
  let proteins = params.proteins
  let fats = params.fats
  let carbohydrates = params.carbohydrates
  const kcalPer100 = proteins * 4.2 + fats * 9.3 + carbohydrates * 4.2
  if (ratio) {
    proteins /= ratio
    fats /= ratio
    carbohydrates /= ratio
  }
  const kcal = proteins * 4.2 + fats * 9.3 + carbohydrates * 4.2
  

  test(testName+' name', () => {
    expect(food.name).toBe(params.name)
  })

  test(testName+' proteins', () => {
    expect(food.proteins).toBe(chunks === 0 ? 0 : proteins)
  })

  test(testName+' fats', () => {
    expect(food.fats).toBe(chunks === 0 ? 0 : fats)
  })

  test(testName+' carbohydrates', () => {
    expect(food.carbohydrates).toBe(chunks === 0 ? 0 : carbohydrates)
  })

  test(testName+' proteinsPer100', () => {
    expect(food.proteinsChunkPer100).toBe(params.proteins)
  })

  test(testName+' fatsPer100', () => {
    expect(food.fatsChunkPer100).toBe(params.fats)
  })

  test(testName+' carbohydratesPer100', () => {
    expect(food.carbohydratesChunkPer100).toBe(params.carbohydrates)
  })

  test(testName+' energy', () => {
    expect(food.getEnergy()).toBe(chunks === 0 ? 0 : kcal)
  })

  test(testName+' energyPer100', () => {
    expect(food.getEnergyPer100()).toBe(kcalPer100)
  })

  test(testName+' getEnergyChunk', () => {
    expect(food.getEnergyChunk()).toBe(kcalPer100 / 100 * chunkSize)
  })

  test(testName+' chunks', () => {
    expect(food.chunks).toBe(chunks)
  })

  test(testName+' chunkSize', () => {
    expect(food.chunkSize).toBe(chunkSize)
  })
  
  test(testName+' proteins chunks', () => {
    expect(food.proteinsChunk).toBeCloseTo(
      chunks === 0
        ? params.proteins / 100
        : proteins / chunks
    )
  })

  test(testName+' fats chunks', () => {
    expect(food.fatsChunk).toBeCloseTo(
      chunks === 0
        ? params.fats / 100
        : fats / chunks
    )
  })

  test(testName+' carbohydrates chunks', () => {
    expect(food.carbohydratesChunk).toBeCloseTo(
      chunks === 0
        ? params.carbohydrates / 100
        : carbohydrates / chunks
    )
  })
 
  test(testName+' immutable', () => {
    expect(food.add).toBe(undefined)
    expect(food.remove).toBe(undefined)
  })
 
}

// not default chunks
const checker = createPoridge({ chunks: 10 })
checker.params.chunks = 10
foodCheck(checker, checker.food.name+checker.food.chunks) 

// with default chunks
const checker2 = createPoridge()
foodCheck(checker2, checker2.food.name+' default chunks') 

// changing chunks
const checker3 = createPoridge()
const newValue = 25
const food = checker3.food
food.set(newValue)
checker3.params.chunks = newValue
foodCheck(checker3, food.name+food.chunks) 

// not default chunkSize
const checker4 = createPoridge({
  chunkSize: 50,
  chunks: 2,
})
checker4.params.chunks = 2
checker4.params.chunkSize = 50
foodCheck(checker4, checker4.food.name+' not default chunkSize')

// default zero chunks
const checker5 = createPoridge({
  chunks: 0,
})
checker5.params.chunks = 0
foodCheck(checker5, checker5.food.name+' default zero chunks')

// set zero chunks
const checker6 = createPoridge()
checker6.food.set(0)
checker6.params.chunks = 0
foodCheck(checker6, checker6.food.name+' set zero chunks')

export { createPoridge, createEgg, createSugar, createCandy, foodCheck }
