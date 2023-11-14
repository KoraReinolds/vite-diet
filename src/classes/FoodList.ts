import type { Food } from "./Food";
import type { ISelected } from "@/interfaces/ISelected";
import { CompositeWithFixedValue } from "./Composite";

class FoodList
extends CompositeWithFixedValue<Food>
implements ISelected<Food> {

  selected: Record<string, boolean> = {}

  constructor(list: Food[]) {
    super({ childs: list, chunks: 1, name: 'FoodList' })
    list.forEach(food => this.selected[food.name] = false)
  }

  togleSelect(name: string): void {
    if (name in this.selected) {
      this.selected[name] = !this.selected[name]
    }
  }

  setSelected(obj: Record<string, boolean>): void {
    this.selected = obj
  }
  
  select(name: string) {
    this.selected[name] = true
  }

  getSelected(): Food[] {
    const selected: Food[] = []
    return Object.entries(this.selected)
      .filter(([item, val]) => !val)
      .reduce((arr, [name]) => {
        const food = this.get(name)
        if (food) arr.push(food)
        return arr
      }, selected)
  }
  
  selectAll() {
    this.getAllList()
      .map(food => food.name)
      .reduce((sel, name) => {
        sel[name] = true
        return sel
      }, this.selected)
  }

}

export { FoodList }