import { Composite } from "./Composite";
import type { Dish } from "./Dish";
import type { Food } from "./Food";
import type { IDietPlanParams } from "@/interfaces/IDietPlanParams";
import LPSolver from 'javascript-lp-solver/src/solver';
import { Carbohydrates, Fats, Proteins } from "./MacroNutrient";

class DietPlan
  extends Composite<Food | Dish> {
  private _proteins: Proteins = new Proteins(0)
  private _fats: Fats = new Fats(0)
  private _carbohydrates: Carbohydrates = new Carbohydrates(0)
  private _percise: number = 1
  private _kkal: number
  private _selected: string[] = []

  constructor({ food, pfcRatio, kkal }: IDietPlanParams) {
    super()
    food.forEach((f) => this.add(f))
    this._kkal = kkal
    const sum = pfcRatio.proteins + pfcRatio.carbohydrates + pfcRatio.fats
    const scale = kkal / sum
    this._proteins.setEnergy(scale * pfcRatio.proteins)
    this._fats.setEnergy(scale * pfcRatio.fats)
    this._carbohydrates.setEnergy(scale * pfcRatio.carbohydrates)
  }

  _getConstraints() {
    const gap = [100 - this._percise, 100 + this._percise]
    const [prots, fats, carbs] = [
      this._proteins.value,
      this._fats.value,
      this._carbohydrates.value,
    ].map(v => gap.map(i => v * i / 100))

    const constraints: Record<string, Object> = {
      protein_min: { min: prots[0] },
      protein_max: { max: prots[1] },
      fats_min: { min: fats[0] },
      fats_max: { max: fats[1] },
      carbohydrates_min: { min: carbs[0] },
      carbohydrates_max: { max: carbs[1] },
      kkal: { min: this._kkal }
    }

    return constraints
  }

  _getVariables() {
    const vars: Record<string, Object> = {}

    return this.getSelected().reduce((prev, cur) => {
      if (!cur) return prev

      const proteins = cur.proteinsChunk
      const fats = cur.fatsChunk
      const carbohydrates = cur.carbohydratesChunk
      const kkal = cur.getEnergyChunk()

      prev[cur.getName()] = {
        protein_min: proteins,
        carbohydrates_min: carbohydrates,
        fats_min: fats,
        protein_max: proteins,
        carbohydrates_max: carbohydrates,
        fats_max: fats,
        kkal,
      }

      return prev
    }, vars)
  }

  _getInts() {
    const init: Record<string, number> = {}

    return this.getSelected().reduce((prev, cur) => {
      if (!cur) return prev

      prev[cur.getName()] = 1

      return prev
    }, init)
  }

  getSelected(): (Food | Dish | undefined)[] {
    const all = this.getAll()

    return this._selected.map((name) => {
      return all.get(name)
    })
  }

  selectAll() {
    return this._selected = [...this.getAll().keys()]
  }

  calculate(): void {
    const { bounded, result, feasible, isIntegral, ...rest } = LPSolver.Solve({
      constraints: this._getConstraints(),
      variables: this._getVariables(),
      ints: this._getInts(),
    });
    return rest
  }

  getName(): string {
    return 'DietPlan'
  }
}

export { DietPlan }