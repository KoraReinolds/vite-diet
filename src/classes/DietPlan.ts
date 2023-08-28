import type { IDietPlan } from "@/interfaces/IDietPlan";
import { Composite } from "./Composite";
import type { Food } from "./Food";
import type { IDietPlanParams } from "@/interfaces/IDietPlanParams";
import type { PFC } from "@/interfaces/PFC";

class DietPlan
extends Composite<Food>
implements IDietPlan {
  private _percise: number = 2
  private _kkal: number
  private _pfc: PFC
  protected _chunks: number = 1

  constructor(params: IDietPlanParams) {
    const { pfcRatio, kkal } = params
    super(params)
    this._kkal = kkal
    this._pfc = pfcRatio
  }

  get pfc() {
    return this._pfc 
  }
  
  get percise() {
    return this._percise
  }
  
  get kkal() {
    return this._kkal
  }
  
}

export { DietPlan }