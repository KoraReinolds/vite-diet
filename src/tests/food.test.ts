import { Food } from '@/classes/Food'
import type { IFoodParams } from '@/interfaces/IFoodParams'
import { expect, test } from 'vitest'

function foodCheck(
  food: Food,
  params: IFoodParams,
  testName: string
) {
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
const foodParams = {
  name: 'poridge',
  proteins: 12,
  carbohydrates: 63,
  fats: 2,
  chunks: 10,
}
const food = new Food(foodParams) 

foodCheck(food, foodParams, food.name+food.chunks) 

// with default chunks
const food2Params = {
  name: 'poridge',
  proteins: 12,
  carbohydrates: 63,
  fats: 2,
}
const food2 = new Food(food2Params) 

foodCheck(food2, {
  ...food2Params,
  chunks: 100,
}, food2.name+'default chunks')

// changing chunks
const food3Params = {
  name: 'poridge',
  proteins: 12,
  carbohydrates: 63,
  fats: 2,
}

const newValue = 25
const food3 = new Food(food3Params) 
food3.set(newValue)

foodCheck(food3, {
  ...food3Params,
  chunks: newValue,
  proteins: food3Params.proteins / 4,
  fats: food3Params.fats / 4,
  carbohydrates: food3Params.carbohydrates / 4,
}, food3.name+food3.chunks)

// not default chunkSize
const food4Params = {
  name: 'poridge',
  proteins: 12,
  carbohydrates: 63,
  fats: 2,
  chunkSize: 50,
}
const food4 = new Food(food4Params) 

foodCheck(food4, {
  ...food4Params,
  chunks: 2,
}, food4.name+'default chunks')
