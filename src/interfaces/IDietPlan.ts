import type { Meal } from "@/classes/Meal"
import type { IDietPlanParams } from "./IDietPlanParams"
import type { IImmutableComposite } from "./IComposite"

interface IDietPlan
extends Omit<IDietPlanParams, 'childs'>, IImmutableComposite<Meal> {
  leftKcal: number
  getNewMeal(): Meal
}

export type { IDietPlan }