import { Composite } from "./Composite";
import type { Food } from "./Food";
import type { IDietPlanParams } from "@/interfaces/IDietPlanParams";
import { Carbohydrates, Fats, Proteins } from "./MacroNutrient";
// import { Result } from "./Node";

class DietPlan
extends Composite<Food> {
  private _percise: number = 2
  private _kkal: number
  private _selected: string[] = []
  private _pfc: { proteins: number, carbohydrates: number, fats: number }

  constructor({ food, pfcRatio, kkal }: IDietPlanParams) {
    super()
    food.forEach((f) => this.add(f))
    this._kkal = kkal
    this._pfc = pfcRatio 
  }

  get selected(): string[] {
    return this._selected 
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

  getSelected(): (Food | undefined)[] {
    const all = this.getAll()

    return this._selected.map((name) => {
      return all.get(name)
    })
  }
  
  setSelected(list: string[]) {
    this._selected = list
  }

  selectAll() {
    return this._selected = [...this.getAll().keys()]
  }

  getName(): string {
    return 'DietPlan'
  }
}

export { DietPlan }