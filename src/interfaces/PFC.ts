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

export { type PFC, PFCRatio }