import { DietPlan } from "./DietPlan"
import type { Food } from "./Food"
import { Composite } from "./Composite"
import type { IResult } from "@/interfaces/IResult"
import LPSolver from 'javascript-lp-solver/src/solver';
import { Carbohydrates, Fats, Proteins } from "./MacroNutrient";

class LPSolverResult extends Composite<Food> implements IResult {

  proteinsBoundaries: number[] = []
  fatsBoundaries: number[] = []
  carbohydratesBoundaries: number[] = []
  private _proteins: Proteins = new Proteins(0)
  private _fats: Fats = new Fats(0)
  private _carbohydrates: Carbohydrates = new Carbohydrates(0)
  private _dp: DietPlan

  getName(): string {
    return 'LPSolverResult'
  }
  
  constructor(dp: DietPlan) {
    super()
    this._dp = dp
    this.carbohydratesBoundaries = this._getBoundaries(this._dp.pfc.carbohydrates)
    this.fatsBoundaries = this._getBoundaries(this._dp.pfc.fats)
    this.proteinsBoundaries = this._getBoundaries(this._dp.pfc.proteins)
    const pfc = this._dp.pfc
    const sum = pfc.proteins + pfc.carbohydrates + pfc.fats
    const scale = this._dp.kkal / sum
    this._proteins.setEnergy(scale * pfc.proteins)
    this._fats.setEnergy(scale * pfc.fats)
    this._carbohydrates.setEnergy(scale * pfc.carbohydrates)
  }
  
  _getBoundaries(value: number) {
    return [100 - this._dp.percise, 100 + this._dp.percise].map(i => Math.floor(value * i) / 100)
  }

  _getConstraints() {
    const constraints: Record<string, Object> = {
      protein_min: { min: this.proteinsBoundaries[0] },
      protein_max: { max: this.proteinsBoundaries[1] },
      fats_min: { min: this.fatsBoundaries[0] },
      fats_max: { max: this.fatsBoundaries[1] },
      carbohydrates_min: { min: this.carbohydratesBoundaries[0] },
      carbohydrates_max: { max: this.carbohydratesBoundaries[1] },
      kkal: { max: this._dp.kkal }
    }

    return constraints
  }

  _getVariables() {
    const vars: Record<string, Object> = {}

    return this._dp.getSelected().reduce((prev, cur) => {
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

    return this._dp.getSelected().reduce((prev, cur) => {
      if (!cur) return prev

      prev[cur.getName()] = 1

      return prev
    }, init)
  }

  calculate() {
    console.log(this._getConstraints(), this._getVariables(), this._getInts())
    const results: Record<string, number> = LPSolver.Solve({
      optimize: "kkal",
      opType: "min",
      constraints: this._getConstraints(),
      variables: this._getVariables(),
      ints: this._getInts(),
    });
    console.log(results)
   
    Object.entries(results)
      .map(([key, val]) => {
        const f = this._dp.get(key)
        if (f) {
          f.set(val)
          this.add(f)
        }
      })
  }

}

export { LPSolverResult }