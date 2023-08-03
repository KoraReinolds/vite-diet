import { Composite } from "./Composite";
import type { Food } from "./Food";
import type { IDietPlanParams } from "@/interfaces/IDietPlanParams";
import LPSolver from 'javascript-lp-solver/src/solver';
import { Carbohydrates, Fats, Proteins } from "./MacroNutrient";
import { Result } from "./Result";

class DietPlan
  extends Composite<Food> {
  private _proteins: Proteins = new Proteins(0)
  private _fats: Fats = new Fats(0)
  private _carbohydrates: Carbohydrates = new Carbohydrates(0)
  private _percise: number = 2
  private _kkal: number
  private _selected: string[] = []
  proteinsBoundaries: number[] = []
  fatsBoundaries: number[] = []
  carbohydratesBoundaries: number[] = []

  constructor({ food, pfcRatio, kkal }: IDietPlanParams) {
    super()
    food.forEach((f) => this.add(f))
    this._kkal = kkal
    const sum = pfcRatio.proteins + pfcRatio.carbohydrates + pfcRatio.fats
    const scale = kkal / sum
    this._proteins.setEnergy(scale * pfcRatio.proteins)
    this._fats.setEnergy(scale * pfcRatio.fats)
    this._carbohydrates.setEnergy(scale * pfcRatio.carbohydrates)
    this.carbohydratesBoundaries = this._getBoundaries(this._carbohydrates.value)
    this.fatsBoundaries = this._getBoundaries(this._fats.value)
    this.proteinsBoundaries = this._getBoundaries(this._proteins.value)
  }

  _getBoundaries(value: number) {
    return [100 - this._percise, 100 + this._percise].map(i => Math.floor(value * i) / 100)
  }

  _getConstraints() {
    const constraints: Record<string, Object> = {
      protein_min: { min: this.proteinsBoundaries[0] },
      protein_max: { max: this.proteinsBoundaries[1] },
      fats_min: { min: this.fatsBoundaries[0] },
      fats_max: { max: this.fatsBoundaries[1] },
      carbohydrates_min: { min: this.carbohydratesBoundaries[0] },
      carbohydrates_max: { max: this.carbohydratesBoundaries[1] },
      kkal: { max: this._kkal }
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

  calculate(): Result {
    // console.log(this._getConstraints(), this._getVariables(), this._getInts())
    const results: Record<string, number> = LPSolver.Solve({
      optimize: "kkal",
      opType: "min",
      constraints: this._getConstraints(),
      variables: this._getVariables(),
      ints: this._getInts(),
    });
    console.log(results)
   
    const foods: Food = []

    Object.entries(results)
      .map(([key, val]) => {
        const f = this.get(key)
        if (f) {
          f.set(val)
          foods.push(f)
        }
      })
    
    return new Result({ results, foods })
  }

  getName(): string {
    return 'DietPlan'
  }
}

export { DietPlan }