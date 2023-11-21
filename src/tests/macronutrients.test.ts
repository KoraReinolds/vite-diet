import { Fats, Proteins, type MacroNutrient, Carbohydrates } from '@/classes/MacroNutrient'
import type { PFC } from '@/interfaces/PFC'
import { expect, test } from 'vitest'


abstract class MockMacronutient {

  chunks: number
  abstract _energy: number
  abstract _name: string

  constructor(chunks: number) {
    this.chunks = chunks
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
    return this.chunks * this._energy 
  }

  getEnergyChunk(): number {
    return this._energy
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
    return this._energy * 100 
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
  
}

class MockFats extends MockMacronutient {
  _name: string = 'fats'
  _energy: number = 9.3
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
  _energy: number = 4.2
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
  _energy: number = 4.2
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

  test(testName + 'getAllList', () => {
    expect(mn.getAllList()).toStrictEqual(mock.getAllList())
  })

  test(testName + 'get', () => {
    expect(mn.get('any')).toBe(mock.get('any'))
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

macronutrientCheck('Init Fats ', new Fats(10), new MockFats(10))
macronutrientCheck('Init Proteins ', new Proteins(10), new MockProteins(10))
macronutrientCheck('Init Carbohydrates ', new Carbohydrates(10), new MockCarbohydrates(10))

export { MockFats, MockCarbohydrates, MockProteins, MockMacronutient }
