import type { IDietPlan } from "@/interfaces/IDietPlan";
import { CompositeWithFixedValue } from "./Composite";
import type { IDietPlanParams } from "@/interfaces/IDietPlanParams";
import { PFCRatio, type PFC } from "@/interfaces/PFC";
import { Meal } from "./Meal";

class DietPlan
extends CompositeWithFixedValue<Meal>
implements IDietPlan {
  static NEW_MEAL_NAME = 'newMeal'
  private _kcal: number
  private _pfc: PFC
  protected _chunks: number = 1
  protected _defaultSize: number = 1
  _counter: number = 0

  constructor(params: IDietPlanParams) {
    const { pfcRatio, kcal } = params
    super({
      ...params,
      chunks: 1,
      name: 'DietPlan',
      childs: [],
    })
    if (params.childs.length) {
      params.childs.forEach(meal => this.add(meal))
    }
    this._kcal = kcal
    this._pfc = new PFCRatio(pfcRatio).normilize()
  }
  
  _getName(): string {
    return `Meal-${this._counter++}`
  }

  addMeal(): void {
    const newName = this._getName()
    const newMeal = this.getNewMeal()
    const foodList = newMeal.getAllList()
    foodList.forEach(food => {
      newMeal.remove(food.name)
      newMeal.add(food.clone())
    })
    this.remove(DietPlan.NEW_MEAL_NAME)
    newMeal.rename(newName)
    this.add(newMeal)
  }
  
  getNewMeal(): Meal {
    return this.get(DietPlan.NEW_MEAL_NAME) || this.add(new Meal())
  }

  get leftKcal() {
    return this.kcal - this.getEnergy()
  }

  get pfcRatio() {
    return this._pfc 
  }
  
  set pfcRatio(val: PFC) {
    this._pfc = val
  }
  
  get kcal() {
    return this._kcal
  }
  
  set kcal(val: number) {
    this._kcal = val
  }
  
}

export { DietPlan }