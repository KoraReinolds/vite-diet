import { Composite } from "./Composite";
import type { IDishParams } from "@/interfaces/IDishParams";
import type { Food } from "./Food";

class Dish
extends Composite<Food> {
  name: string
  chunk: number = 1
  
  constructor({ name, food }: IDishParams) {
    super()
    this.name = name
    food.forEach((f) => this.add(f))
  }

  getName(): string {
    return this.name
  }
}

export { Dish }