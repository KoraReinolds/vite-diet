import type { Food } from '@/classes/Food'
import { expect, test } from 'vitest'
import { createEgg, createPoridge, createSugar } from './food.test'
import { Meal } from '@/classes/Meal'
import { DietPlanChecker } from './dietplan.test'

class MealChecker {
  meal: Meal
  constructor() {
    this.meal = new Meal({
      childs: [],
      dp: new DietPlanChecker().dp
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
    this.meal.add(food)
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
    this.meal.remove(name)
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
  addPoridge() {
    this.add(createPoridge().food)
  }
  addEgg() {
    this.add(createEgg().food)
  }
  addSugar() {
    this.add(createSugar().food)
  }
}

const mealCheck = (mealChecker: MealChecker, name: string) => {
  test(name, () => {
    const meal = mealChecker.meal
    expect(meal.carbohydrates).toBeCloseTo(mealChecker.carbohydrates)
    expect(meal.proteins).toBeCloseTo(mealChecker.proteins)
    expect(meal.fats).toBeCloseTo(mealChecker.fats)
    expect(meal.chunks).toBe(mealChecker.chunks)
    expect(meal.set).toBe(undefined)
    expect(meal.carbohydratesChunk).toBeCloseTo(mealChecker.carbohydratesChunk)
    expect(meal.proteinsChunk).toBeCloseTo(mealChecker.proteinsChunk)
    expect(meal.fatsChunk).toBeCloseTo(mealChecker.fatsChunk)
    expect(meal.getAllList()).toStrictEqual([...mealChecker.all.values()])
    expect(meal.getEnergy()).toBe(mealChecker.energy)
    expect(meal.getEnergyChunk()).toBe(mealChecker.energy / mealChecker.chunks)
  })
}

mealCheck(new MealChecker(), 'init meal')

const mealChecker1 = new MealChecker()
mealChecker1.addPoridge()
mealCheck(mealChecker1, 'meal with one position')

const mealChecker2 = new MealChecker()
mealChecker2.addPoridge()
mealChecker2.addEgg()
mealChecker2.addSugar()
mealCheck(mealChecker2, 'meal with three position')

const mealChecker3 = new MealChecker()
mealChecker3.addPoridge()
mealChecker3.addEgg()
mealChecker3.addSugar()
mealChecker3.remove('sugar')
mealCheck(mealChecker3, 'meal add and remove')

export { MealChecker }