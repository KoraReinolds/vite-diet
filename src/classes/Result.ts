import { Composite } from "./Composite";
import type { Food } from "./Food";
import type { IResultParams } from "@/interfaces/IResultParams";

class Result
extends Composite<Food> {

  private _feasible: boolean
  private _results

  constructor({ results, foods }: IResultParams) {
    super()
    this._feasible = results.feasible || false
    this._results = results

    foods.forEach(f => this.add(f))
  }

  getName(): string {
    return 'Result'
  }

  get feasible(): boolean {
    return this._feasible
  }
}

export { Result }