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

  getSelected(): Food[] {
    const selected: Food[] = []
    this._selected.forEach((name) => {
      const food = this.get(name)
      if (food) selected.push(food)
    })
    return selected
  }
  
  setSelected(list: string[]) {
    this._selected = list
  }

  selectAll() {
    return this._selected = [...this.getAllList().map(food => food.name)]
  }

  getName(): string {
    return 'SelectableDietPlan'
  }
}

export { SelectableDietPlan }