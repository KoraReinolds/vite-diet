import type { AComposite } from "@/classes/Composite";
import { Carbohydrates, Fats, Proteins } from "@/classes/MacroNutrient";

type PFC = { proteins: number, carbohydrates: number, fats: number }

class PFCRatio {
  pfc: PFC
  
  constructor(pfc: PFC) {
    this.pfc = pfc
  }
  
  normilize(): PFC {
    const carbohydrates = this.pfc.carbohydrates
    const proteins = this.pfc.proteins
    const fats = this.pfc.fats
    const total = carbohydrates + fats + proteins
    return {
      proteins: (Math.floor(proteins / total * 1000) / 1000) || 0,
      fats: (Math.floor(fats / total * 1000) / 1000) || 0,
      carbohydrates: (Math.floor(carbohydrates / total * 1000) / 1000) || 0,
    }
  }
}

class PFCEnergyRatio extends PFCRatio {
  constructor(pfc: PFC) {
    super(pfc)
    this.pfc = {
      proteins: pfc.proteins * new Proteins(0).getEnergyChunk(),
      fats: pfc.fats * new Fats(0).getEnergyChunk(),
      carbohydrates: pfc.carbohydrates * new Carbohydrates(0).getEnergyChunk(),
    }
  }
}

export { type PFC, PFCRatio, PFCEnergyRatio }