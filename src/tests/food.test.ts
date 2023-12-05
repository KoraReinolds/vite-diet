import { Food } from '@/classes/Food'
import { type AMacroNutrient } from '@/classes/MacroNutrient'
import type { IFoodParams } from '@/interfaces/IFoodParams'
import type { PFC } from '@/interfaces/PFC'
import { expect, test } from 'vitest'
import { MockCarbohydrates, MockFats, MockMacronutient, MockProteins } from './macronutrients.test'

interface IMockFoodParams extends IFoodParams {
  ratio: number
  chunkRatio: number
  chunks: number
  chunkSize: number
}

class MockFood {
  pfcRatio: PFC
  _all: MockMacronutient[]  
  params: IMockFoodParams
  constructor(params: IMockFoodParams) {
    this.params = params
    this.pfcRatio = {
      carbohydrates: params.carbohydrates,
      proteins: params.proteins,
      fats: params.fats,
    }
    this._all = [
      new MockFats(this.pfcRatio.fats),
      new MockProteins(this.pfcRatio.proteins),
      new MockCarbohydrates(this.pfcRatio.carbohydrates)
    ]
  }
  getAllList(): AMacroNutrient[] {
    return this._all as unknown as AMacroNutrient[]
  }
  _getEnergy(): number {
    return this.getAllList().reduce((sum, cur) => {
      return sum + cur.getEnergy()
    }, 0) * this.params.ratio
  }
  getEnergy(): number {
    return this._getEnergy()
  }
  getEnergyChunk(): number {
    return this.params.chunkRatio * this._getEnergy() / this.params.ratio
  }
  getEnergyPer100(): number {
    return this._getEnergy() / this.params.ratio
  }
  get proteins(): number {
    return this.pfcRatio.proteins / 100 * this.value
  }
  get proteinsChunkPer100(): number {
    return this.pfcRatio.proteins
  }
  get carbohydrates(): number {
    return this.pfcRatio.carbohydrates / 100 * this.value
  }
  get carbohydratesChunkPer100(): number {
    return this.pfcRatio.carbohydrates
  }
  get fats(): number {
    return this.pfcRatio.fats / 100 * this.value
  }
  get fatsChunkPer100(): number {
    return this.pfcRatio.fats
  }
  get proteinsChunk(): number {
    return this.pfcRatio.proteins * this.params.chunkRatio
  }
  get carbohydratesChunk(): number {
    return this.pfcRatio.carbohydrates * this.params.chunkRatio
  }
  get fatsChunk(): number {
    return this.pfcRatio.fats * this.params.chunkRatio
  }
  get chunks(): number {
    return this.params.chunks
  }
  get chunkSize(): number {
    return this.params.chunkSize
  }
  get value(): number {
    return this.params.chunks * this.params.chunkSize
  }
  get name(): string {
    return this.params.name
  }
}

class MockFoodZeroChunks extends MockFood {
  getEnergy(): number {
    return 0
  }
  get chunks(): number {
    return 0
  }
  get value(): number {
    return 0
  }
}

const foodCheck = (testName: string, food: Food, mock: MockFood) => {

  test(testName + 'getAllList', () => {
    expect(food.getAllList().length).toBe(mock.getAllList().length)
  })

  test(testName + 'getEnergy', () => {
    expect(food.getEnergy()).toBeCloseTo(mock.getEnergy())
  })

  test(testName + 'getEnergyChunk', () => {
    expect(food.getEnergyChunk()).toBeCloseTo(mock.getEnergyChunk())
  })

  test(testName + 'getEnergyPer100', () => {
    expect(food.getEnergyPer100()).toBeCloseTo(mock.getEnergyPer100())
  })

  test(testName + 'get', () => {
    expect(food.get('proteins')?.name).toBe('proteins')
  })

  test(testName + 'get', () => {
    expect(food.get('fats')?.name).toBe('fats')
  })

  test(testName + 'get', () => {
    expect(food.get('carbohydrates')?.name).toBe('carbohydrates')
  })

  test(testName + 'proteins', () => {
    expect(food.proteins).toBeCloseTo(mock.proteins)
  })
  
  test(testName + 'proteinsChunkPer100', () => {
    expect(food.proteinsChunkPer100).toBeCloseTo(mock.proteinsChunkPer100)
  })
  
  test(testName + 'carbohydrates', () => {
    expect(food.carbohydrates).toBeCloseTo(mock.carbohydrates)
  })

  test(testName + 'carbohydratesChunkPer100', () => {
    expect(food.carbohydratesChunkPer100).toBeCloseTo(mock.carbohydratesChunkPer100)
  })
  
  test(testName + 'fats', () => {
    expect(food.fats).toBeCloseTo(mock.fats)
  })
  
  test(testName + 'fatsChunkPer100', () => {
    expect(food.fatsChunkPer100).toBeCloseTo(mock.fatsChunkPer100)
  })
  
  test(testName + 'proteinsChunk', () => {
    expect(food.proteinsChunk).toBeCloseTo(mock.proteinsChunk)
  })

  test(testName + 'carbohydratesChunk', () => {
    expect(food.carbohydratesChunk).toBeCloseTo(mock.carbohydratesChunk)
  })

  test(testName + 'fatsChunk', () => {
    expect(food.fatsChunk).toBeCloseTo(mock.fatsChunk)
  })

  test(testName + 'chunks', () => {
    expect(food.chunks).toBe(mock.chunks)
  })

  test(testName + 'chunkSize', () => {
    expect(food.chunkSize).toBe(mock.chunkSize)
  })

  test(testName + 'value', () => {
    expect(food.value).toBe(mock.value)
  })

  test(testName + 'name', () => {
    expect(food.name).toBe(mock.name)
  })
}

const poridgeParams = { name: 'poridge', carbohydrates: 60, proteins: 8, fats: 1 }
const mockPoridge = new MockFood({
  ...poridgeParams,
  ratio: 1,
  chunkRatio: 0.01,
  chunks: 100,
  chunkSize: 1,
}) 
const poridge = new Food(poridgeParams)
foodCheck('Poridge ',poridge , mockPoridge)

const poridge2 = new Food({ ...poridgeParams, chunks: 0 })
poridge2.set(100)
foodCheck('Poridge (zero to 100)', poridge2, mockPoridge)

const poridge3 = new Food({ ...poridgeParams, chunks: 50 })
poridge3.set(0)
poridge3.set(100)
foodCheck('Poridge (50 to zero to 100)', poridge3, mockPoridge)

const eggParams = { name: 'egg', carbohydrates: 1.1, proteins: 13, fats: 11, chunks: 2, chunkSize: 60 }
const mockEgg = new MockFood({
  ...eggParams,
  ratio: 1.2,
  chunkRatio: 0.6,
  chunks: 2,
  chunkSize: 60,
})
const egg = new Food(eggParams)
foodCheck('Egg ', egg, mockEgg)

const egg2 = new Food({
  ...eggParams,
  chunks: 10,
})
egg2.set(2)
foodCheck('Egg (10 to 2) ', new Food(eggParams), mockEgg)

const chickenParams = { name: 'chicken', carbohydrates: 0.5, proteins: 20, fats: 0.5, chunks: 0 }
const mockChicken = new MockFoodZeroChunks({
  ...chickenParams,
  ratio: 1,
  chunkRatio: 0.01,
  chunks: 100,
  chunkSize: 1,
})
const chicken = new Food(chickenParams)
foodCheck('Chicken (zero chunks) ', chicken, mockChicken)

export { mockEgg, mockChicken, mockPoridge, MockFood, chicken, poridge, egg }
