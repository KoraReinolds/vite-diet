import type { Food } from "./Food";
import type { ISelected } from "@/interfaces/ISelected";
import { DietPlan } from "./DietPlan";

class SelectableDietPlan
extends DietPlan
implements ISelected<Food> {
  private _selected: string[] = []

  get selected(): string[] {
    return this._selected 
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
    return 'SelectableDietPlan'
  }
}

export { SelectableDietPlan }