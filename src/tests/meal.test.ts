import { Food } from '@/classes/Food'
import { expect, test } from 'vitest'
import { Meal } from '@/classes/Meal'
import { mockChicken, mockEgg, mockPoridge, type MockFood, chicken, poridge, egg } from './food.test'

class MockMeal {
  _all: MockFood[] = []
  getAllList(): Food[] {
    return this._all as unknown as Food[]
  }
  _getEnergy(): number {
    return this.getAllList().reduce((sum, cur) => {
      return sum + cur.getEnergy()
    }, 0)
  }
  getEnergy(): number {
    return this._getEnergy()
  }
  getEnergyChunk(): number {
    return this._getEnergy()
  }
  get proteins(): number {
    return this.getAllList().reduce((sum, cur) => {
      return sum + cur.proteins
    }, 0)
  }
  get carbohydrates(): number {
    return this.getAllList().reduce((sum, cur) => {
      return sum + cur.carbohydrates
    }, 0)
  }
  get fats(): number {
    return this.getAllList().reduce((sum, cur) => {
      return sum + cur.fats
    }, 0)
  }
  get proteinsChunk(): number {
    return this.proteins
  }
  get carbohydratesChunk(): number {
    return this.carbohydrates
  }
  get fatsChunk(): number {
    return this.fats
  }
  get chunks(): number {
    return 1
  }
  get chunkSize(): number {
    return 1
  }
  get value(): number {
    return 1
  }
  get name(): string {
    return 'newMeal'
  }
  addChicken() { 
    this._all.push(mockChicken)
    return this
  }
  addPoridge() {
    this._all.push(mockPoridge)
    return this
  }
  addEgg() {
    this._all.push(mockEgg)
    return this
  }
}

const mealCheck = (testName: string, meal: Meal, mock: MockMeal) => {

  test(testName + 'getAllList', () => {
    expect(meal.getAllList().length).toBe(mock.getAllList().length)
  })

  test(testName + 'getEnergy', () => {
    expect(meal.getEnergy()).toBeCloseTo(mock.getEnergy())
  })

  test(testName + 'getEnergyChunk', () => {
    expect(meal.getEnergyChunk()).toBeCloseTo(mock.getEnergyChunk())
  })

  test(testName + 'proteins', () => {
    expect(meal.proteins).toBeCloseTo(mock.proteins)
  })
  
  test(testName + 'carbohydrates', () => {
    expect(meal.carbohydrates).toBeCloseTo(mock.carbohydrates)
  })

  test(testName + 'fats', () => {
    expect(meal.fats).toBeCloseTo(mock.fats)
  })
  
  test(testName + 'proteinsChunk', () => {
    expect(meal.proteinsChunk).toBeCloseTo(mock.proteinsChunk)
  })

  test(testName + 'carbohydratesChunk', () => {
    expect(meal.carbohydratesChunk).toBeCloseTo(mock.carbohydratesChunk)
  })

  test(testName + 'fatsChunk', () => {
    expect(meal.fatsChunk).toBeCloseTo(mock.fatsChunk)
  })

  test(testName + 'chunks', () => {
    expect(meal.chunks).toBe(mock.chunks)
  })

  test(testName + 'chunkSize', () => {
    expect(meal.chunkSize).toBe(mock.chunkSize)
  })

  test(testName + 'value', () => {
    expect(meal.value).toBe(mock.value)
  })

  test(testName + 'name', () => {
    expect(meal.name).toBe(mock.name)
  })
}

mealCheck('newMeal (empty) ', new Meal(), new MockMeal())

mealCheck('newMeal (empty) ', new Meal({
  childs: [chicken, egg, poridge] 
}), new MockMeal()
  .addChicken()
  .addEgg()
  .addPoridge()
)

export { MockMeal, chicken, egg, poridge }