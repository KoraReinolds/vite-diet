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
  ...params,
})

const createSugar = (params = {}) => new FoodChecker({
  name: 'sugar',
  proteins: 0,
  carbohydrates: 98,
  fats: 0,
  ...params,
})

function foodCheck(
  checker: FoodChecker,
  testName: string
) {
  const params = checker.params
  const food = checker.food
  if (!params.chunks) params.chunks = 100
  const { name, chunks, proteins, carbohydrates, fats } = params
  const kkal = proteins * 4.2 + fats * 9.3 + carbohydrates * 4.2

  test(testName+' name', () => {
    expect(food.name).toBe(name)
  })

  test(testName+' proteins', () => {
    expect(food.proteins).toBe(proteins)
  })

  test(testName+' fats', () => {
    expect(food.fats).toBe(fats)
  })

  test(testName+' carbohydrates', () => {
    expect(food.carbohydrates).toBe(carbohydrates)
  })

  test(testName+' energy', () => {
    expect(food.getEnergy()).toBe(kkal)
    expect(food.getEnergyChunk()).toBe(kkal / chunks)
  })

  test(testName+' chunks', () => {
    expect(food.chunks).toBe(chunks)
  })

  
  test(testName+' proteins chunks', () => {
    expect(food.proteinsChunk).toBe(proteins / chunks)
  })

  test(testName+' fats chunks', () => {
    expect(food.fatsChunk).toBe(fats / chunks)
  })

  test(testName+' carbohydrates chunks', () => {
    expect(food.carbohydratesChunk).toBe(carbohydrates / chunks)
  })
 
  test(testName+' immutable', () => {
    expect(food.add).toBe(undefined)
    expect(food.remove).toBe(undefined)
  })
 
}

// not default chunks
const checker = createPoridge({ chunks: 10 })
foodCheck(checker, checker.food.name+checker.food.chunks) 

// with default chunks
const checker2 = createPoridge()
foodCheck(checker2, checker2.food.name+'default chunks') 

// changing chunks
const checker3 = createPoridge()
const newValue = 25
const food = checker3.food
const params = checker3.params
food.set(newValue)
params.chunks = newValue
params.proteins /=  4
params.fats /= 4
params.carbohydrates /= 4
foodCheck(checker3, food.name+food.chunks) 

// not default chunkSize
const checker4 = createPoridge({
  chunkSize: 50
})
checker4.params.chunks = 2
foodCheck(checker4, checker4.food.name+'default chunkSize') 

export { createPoridge, createEgg, createSugar }
