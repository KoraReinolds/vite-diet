import type { IDietPlan } from "@/interfaces/IDietPlan";
import { CompositeWithFixedValue } from "./Composite";
import type { IDietPlanParams } from "@/interfaces/IDietPlanParams";
import { PFCRatio, type PFC } from "@/interfaces/PFC";
import { Meal } from "./Meal";

class DietPlan
extends CompositeWithFixedValue<Meal>
implements IDietPlan {
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
    this.add(new Meal({ childs: params.childs, name: this._getName() }))
    this._kcal = kcal
    this._pfc = new PFCRatio(pfcRatio).normilize()
  }
  
  _getName(): string {
    return `Meal-${this._counter++}`
  }

  addMeal(): void {
    this.getNewMeal().rename(this._getName())
  }
  
  getNewMeal(): Meal {
    return this.get('newMeal') || this.add(new Meal())
  }

  get leftKcal() {
    return this.kcal - this.getEnergy()
  };

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