import type { Food } from "./Food";
import type { ISelected } from "@/interfaces/ISelected";
import { CompositeWithFixedValue } from "./Composite";

class FoodList
extends CompositeWithFixedValue<Food>
implements ISelected<Food> {

  selected: string[] = []

  constructor(list: Food[]) {
    super({ childs: list, chunks: 1, name: 'FoodList' })
  }

  getSelected(): Food[] {
    const selected: Food[] = []
    return this.selected.reduce((arr, name) => {
      const food = this.get(name)
      if (food) arr.push(food)
      return arr
    }, selected)
  }
  
  selectAll() {
    return this.selected = [...this.getAllList().map(food => food.name)]
  }

}

export { FoodList }