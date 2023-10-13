import type { Meal } from "@/classes/Meal"

interface ITimeLine {
  meals: Meal[]
  addMeal(meal: Meal): void
  // createMeal()
}

export { type ITimeLine }