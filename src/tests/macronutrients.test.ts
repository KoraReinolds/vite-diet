import { Fats, Proteins, type MacroNutrient, Carbohydrates } from '@/classes/MacroNutrient'
import type { PFC } from '@/interfaces/PFC'
import { expect, test } from 'vitest'


class MockMacronutient implements MacroNutrient {

  chunks: number
  energy: number

  constructor(chunks: number, energy: number) {
    this.chunks = chunks
    this.energy = energy
  }

  get fats(): number {
    return 0
  }

  get proteins(): number {
    return 0
  }

  get carbohydrates(): number {
    return 0
  }

  getEnergy(): number {
    return this.chunks * this.energy 
  }

  getEnergyChunk(): number {
    return this.energy
  }

  normilizePFC(pfc?: PFC | undefined): PFC {
    return {
      proteins: Math.min(1, this.proteins),
      carbohydrates: Math.min(1, this.carbohydrates),
      fats: Math.min(1, this.fats),
    }
  }

  getAllList(): MacroNutrient[] {
    return []
  }

  getEnergyPer100(): number {
    return this.energy * 100 
  }

  get(name: string): MacroNutrient | undefined {
    return undefined
  }

  get proteinsChunkPer100(): number {
    return 0
  }

  get carbohydratesChunkPer100(): number {
    return 0
  }

  get fatsChunkPer100(): number {
    return 0
  }

  get proteinsChunk(): number {
    return 0
  }

  get carbohydratesChunk(): number {
    return 0
  }

  get fatsChunk(): number {
    return 0
  }

  get chunkSize(): number {
    return 1
  }

  get value(): number {
    return this.chunks
  }

  get name(): string {
    return this._name
  }
  
  protected _name: string | undefined;

}

class MockFats extends MockMacronutient {
  _name: string = 'fats'
  get fatsChunk(): number {
    return 1
  }
  get fatsChunkPer100(): number {
    return 100
  }
  get fats(): number {
    return this.chunks
  }
}

class MockCarbohydrates extends MockMacronutient {
  _name: string = 'carbohydrates'
  get carbohydratesChunk(): number {
    return 1
  }
  get carbohydratesChunkPer100(): number {
    return 100
  }
  get carbohydrates(): number {
    return this.chunks
  }
}

class MockProteins extends MockMacronutient {
  _name: string = 'proteins'
  get proteinsChunk(): number {
    return 1
  }
  get proteinsChunkPer100(): number {
    return 100
  }
  get proteins(): number {
    return this.chunks
  }
}

const macronutrientCheck = (testName: string, mn: MacroNutrient, mock: MockMacronutient) => {
  
  test(testName + 'fats', () => {
    expect(mn.fats).toBe(mock.fats)
  })

  test(testName + 'proteins', () => {
    expect(mn.proteins).toBe(mock.proteins)
  })

  test(testName + 'carbohydrates', () => {
    expect(mn.carbohydrates).toBe(mock.carbohydrates)
  })

  test(testName + 'getEnergy', () => {
    expect(mn.getEnergy()).toBe(mock.getEnergy())
  })

  test(testName + 'getEnergyChunk', () => {
    expect(mn.getEnergyChunk()).toBe(mock.getEnergyChunk())
  })

  test(testName + 'normilizePFC', () => {
    expect(mn.normilizePFC()).toStrictEqual(mock.normilizePFC())
  })

  test(testName + 'getAllList', () => {
    expect(mn.getAllList()).toStrictEqual(mock.getAllList())
  })

  test(testName + 'getEnergyPer100', () => {
    expect(mn.getEnergyPer100()).toBe(mock.getEnergyPer100())
  })

  test(testName + 'get', () => {
    expect(mn.get('any')).toBe(mock.get('any'))
  })

  test(testName + 'proteinsChunkPer100', () => {
    expect(mn.proteinsChunkPer100).toBe(mock.proteinsChunkPer100)
  })

  test(testName + 'carbohydratesChunkPer100', () => {
    expect(mn.carbohydratesChunkPer100).toBe(mock.carbohydratesChunkPer100)
  })

  test(testName + 'fatsChunkPer100', () => {
    expect(mn.fatsChunkPer100).toBe(mock.fatsChunkPer100)
  })

  test(testName + 'proteinsChunk', () => {
    expect(mn.proteinsChunk).toBe(mock.proteinsChunk)
  })
  
  test(testName + 'carbohydratesChunk', () => {
    expect(mn.carbohydratesChunk).toBe(mock.carbohydratesChunk)
  })
 
  test(testName + 'chunkSize', () => {
    expect(mn.chunkSize).toBe(mock.chunkSize)
  })
  
  test(testName + 'fatsChunk', () => {
    expect(mn.fatsChunk).toBe(mock.fatsChunk)
  })

  test(testName + 'name', () => {
    expect(mn.name).toBe(mock.name)
  })
  
  test(testName + 'chunks', () => {
    expect(mn.chunks).toBe(mock.chunks)
  })
  
  test(testName + 'value', () => {
    expect(mn.value).toBe(mock.value)
  })

}

macronutrientCheck('Init Fats ', new Fats(10), new MockFats(10, 9.3))
macronutrientCheck('Init Proteins ', new Proteins(10), new MockProteins(10, 4.2))
macronutrientCheck('Init Carbohydrates ', new Carbohydrates(10), new MockCarbohydrates(10, 4.2))

export { MockFats, MockCarbohydrates, MockProteins }
