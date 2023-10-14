import type { IDietPlan } from "@/interfaces/IDietPlan";
import { CompositeWithFixedValue } from "./Composite";
import type { IDietPlanParams } from "@/interfaces/IDietPlanParams";
import { PFCRatio, type PFC } from "@/interfaces/PFC";
import { Meal } from "./Meal";

class DietPlan
extends CompositeWithFixedValue<Meal>
implements IDietPlan {
  private _percise: number = 2
  private _kcal: number
  private _pfc: PFC
  protected _chunks: number = 1
  protected _defaultSize: number = 1

  constructor(params: IDietPlanParams) {
    const { pfcRatio, kcal } = params
    super({
      ...params,
      chunks: 1,
      name: 'DietPlan',
      childs: [new Meal({ childs: params.childs })],
    })
    this._kcal = kcal
    this._pfc = new PFCRatio(pfcRatio).normilize()
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
  
  get percise() {
    return this._percise
  }
  
  get kcal() {
    return this._kcal
  }
  
}

export { DietPlan }