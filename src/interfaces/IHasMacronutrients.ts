import type { PFC } from "./PFC"

interface IHasMacronutrients {
  proteins: number
  fats: number
  carbohydrates: number
  normilizePFC(pfc?: PFC): PFC
}

export type { IHasMacronutrients }