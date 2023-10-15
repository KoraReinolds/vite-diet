import { expect, test } from 'vitest'
import { Meal } from '@/classes/Meal'
import { chicken, poridge, egg } from './food.test'
import type { IDietPlanParams } from '@/interfaces/IDietPlanParams'
import { DietPlan } from '@/classes/DietPlan'
import { MockMeal } from './meal.test'

interface IMockDietPlanParams extends IDietPlanParams {
  all: MockMeal[]
}

class MockDietPlan implements DietPlan {
  params: IMockDietPlanParams
  constructor(params: IMockDietPlanParams) {
    this.params = params
  }
  get leftKcal(): number {
    return this.kcal - this.getEnergy() 
  }
  get kcal(): number {
    return this.params.kcal
  }
  getAllList(): Meal[] {
    return this.params.all as unknown as Meal[]
  }
  getEnergy(): number {
    return this.getAllList().reduce((sum, cur) => {
      return sum + cur.getEnergy()
    }, 0)
  }
  getEnergyChunk(): number {
    return this.getEnergy()
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
    return 'DietPlan'
  }
}

const dietPlanCheck = (testName: string, dp: DietPlan, mock: MockDietPlan) => {

  test(testName + 'getNewMeal return smth', () => {
    expect(!!dp.getNewMeal()).toBe(true)
  })

  test(testName + 'leftKcal', () => {
    expect(dp.leftKcal).toBeCloseTo(mock.leftKcal)
  })

  test(testName + 'kcal', () => {
    expect(dp.kcal).toBe(mock.kcal)
  })

  test(testName + 'getEnergy', () => {
    expect(dp.getEnergy()).toBeCloseTo(mock.getEnergy())
  })

  test(testName + 'getEnergyChunk', () => {
    expect(dp.getEnergyChunk()).toBeCloseTo(mock.getEnergyChunk())
  })

  test(testName + 'proteins', () => {
    expect(dp.proteins).toBeCloseTo(mock.proteins)
  })
  
  test(testName + 'carbohydrates', () => {
    expect(dp.carbohydrates).toBeCloseTo(mock.carbohydrates)
  })

  test(testName + 'fats', () => {
    expect(dp.fats).toBeCloseTo(mock.fats)
  })
  
  test(testName + 'proteinsChunk', () => {
    expect(dp.proteinsChunk).toBeCloseTo(mock.proteinsChunk)
  })

  test(testName + 'carbohydratesChunk', () => {
    expect(dp.carbohydratesChunk).toBeCloseTo(mock.carbohydratesChunk)
  })

  test(testName + 'fatsChunk', () => {
    expect(dp.fatsChunk).toBeCloseTo(mock.fatsChunk)
  })

  test(testName + 'chunks', () => {
    expect(dp.chunks).toBe(mock.chunks)
  })

  test(testName + 'chunkSize', () => {
    expect(dp.chunkSize).toBe(mock.chunkSize)
  })

  test(testName + 'value', () => {
    expect(dp.value).toBe(mock.value)
  })

  test(testName + 'name', () => {
    expect(dp.name).toBe(mock.name)
  })
}

const dietPlanParams: IDietPlanParams = {
  pfcRatio: { carbohydrates: 60, proteins: 25, fats: 15 },
  kcal: 1000,
  childs: [],
}
dietPlanCheck(
  'Init DietPlan (empty) ',
  new DietPlan(dietPlanParams),
  new MockDietPlan({
    ...dietPlanParams,
    all: [],
 })
)

const dp = new DietPlan({
  ...dietPlanParams,
  childs: [chicken],
})
dp.add(new Meal({ childs: [chicken, poridge, egg] }))
dietPlanCheck(
  'Init DietPlan (empty) ',
  dp,
  new MockDietPlan({
    ...dietPlanParams,
    all: [new MockMeal().addChicken(), new MockMeal().addChicken().addPoridge().addEgg()],
 })
)
