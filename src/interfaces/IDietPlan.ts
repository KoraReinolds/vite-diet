import type { Meal } from "@/classes/Meal"
import type { IDietPlanParams } from "./IDietPlanParams"
import type { CompositeWithFixedValue } from "@/classes/Composite"

interface IDietPlan
extends Omit<IDietPlanParams, 'childs'>, CompositeWithFixedValue<Meal> {
  leftKcal: number
  getNewMeal(): Meal
  addMeal(): void
}

export type { IDietPlan }