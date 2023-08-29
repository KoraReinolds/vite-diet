
import { DietPlan } from '@/classes/DietPlan'
import type { Food } from '@/classes/Food'
import { expect, test } from 'vitest'
import { createEgg, createPoridge, createSugar } from './food.test'

class DietPlanChecker {
  dp: DietPlan
  constructor() {
    this.dp = new DietPlan({
      kkal: 2000,
      pfcRatio: { carbohydrates: 60, fats: 20, proteins: 20 },
      childs: []
    })
  }
  carbohydrates = 0
  proteins = 0
  fats = 0
  carbohydratesChunk = 0
  proteinsChunk = 0
  fatsChunk = 0
  chunks = 1
  all: Map<string, Food> = new Map([])
  energy = 0
  add(food: Food) {
    this.dp.add(food)
    this.carbohydrates += food.carbohydrates
    this.proteins += food.proteins
    this.fats += food.fats
    this.carbohydratesChunk += food.carbohydrates / this.chunks
    this.proteinsChunk += food.proteins / this.chunks
    this.fatsChunk += food.fats / this.chunks
    this.all.set(food.name, food)
    this.energy += food.getEnergy()
  }
  remove(name: string) {
    this.dp.remove(name)
    const food = this.all.get(name)
    if (!food) return
    this.all.delete(name)
    this.carbohydrates -= food.carbohydrates
    this.proteins -= food.proteins
    this.fats -= food.fats
    this.carbohydratesChunk -= food.carbohydrates / this.chunks
    this.proteinsChunk -= food.proteins / this.chunks
    this.fatsChunk -= food.fats / this.chunks
    this.energy -= food.getEnergy()
  }
}

const dietPlanCheck = (dpc: DietPlanChecker, name: string) => {
  test(name, () => {
    const dp = dpc.dp
    expect(dp.carbohydrates).toBe(dpc.carbohydrates)
    expect(dp.proteins).toBe(dpc.proteins)
    expect(dp.fats).toBe(dpc.fats)
    expect(dp.chunks).toBe(dpc.chunks)
    expect(dp.set).toBe(undefined)
    expect(dp.carbohydratesChunk).toBe(dpc.carbohydratesChunk)
    expect(dp.proteinsChunk).toBe(dpc.proteinsChunk)
    expect(dp.fatsChunk).toBe(dpc.fatsChunk)
    expect(dp.getAllList()).toStrictEqual([...dpc.all.values()])
    expect(dp.getEnergy()).toBe(dpc.energy)
    expect(dp.getEnergyChunk()).toBe(dpc.energy / dpc.chunks)
  })
}

dietPlanCheck(new DietPlanChecker(), 'init diet plan')

const dpc1 = new DietPlanChecker()
dpc1.add(createPoridge().food)
dietPlanCheck(dpc1, 'diet plan with one position')

const dpc2 = new DietPlanChecker()
dpc2.add(createPoridge().food)
dpc2.add(createEgg().food)
dpc2.add(createSugar().food)
dietPlanCheck(dpc2, 'diet plan with three position')

const dpc3 = new DietPlanChecker()
dpc3.add(createPoridge().food)
dpc3.add(createEgg().food)
dpc3.add(createSugar().food)
dpc3.remove('sugar')
dietPlanCheck(dpc3, 'diet plan add and remove')