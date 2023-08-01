import { Composite } from "./Composite";
import type { Food } from "./Food";
import type { IResultParams } from "@/interfaces/IResultParams";

class Result
  extends Composite<Food> {

  constructor({ results, foods }: IResultParams) {
    super()

    foods.forEach(f => this.add(f))
  }

  getName(): string {
    return 'Result'
  }
}

export { Result }