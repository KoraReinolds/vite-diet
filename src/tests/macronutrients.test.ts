import { Carbohydrates, Fats, MacroNutrient, Proteins } from '@/classes/MacroNutrient'
import { expect, test } from 'vitest'

interface Constructor {
  new (params: any): MacroNutrient;
}

function macronutrientCheck({ energy, name, constructor }: { constructor: Constructor, energy: number, name: string }) {
  const value = 30
  const mn = new constructor(value)

  test(name+' name', () => {
    expect(mn.name).toBe(name)
  })

  test(name+' mn value', () => {
    ['fats', 'carbohydrates', 'proteins'].forEach(v => {
      if (name === v) expect(mn[v]).toBe(value)
      else expect(mn[v]).toBe(0)
    })
  })

  test(name+' energy', () => {
    expect(mn.getEnergyChunk()).toBe(energy)
    expect(mn.getEnergy()).toBe(energy * value)
  })

  test(name+' chunks', () => {
    expect(mn.chunks).toBe(value)
  })

  test(name+' immutable', () => {
    expect(mn.add).toBe(undefined)
    expect(mn.remove).toBe(undefined)
    expect(mn.set).toBe(undefined)
  })
}

macronutrientCheck({ energy: 9.3, constructor: Fats, name: 'fats' })
macronutrientCheck({ energy: 4.2, constructor: Proteins, name: 'proteins' })
macronutrientCheck({ energy: 4.2, constructor: Carbohydrates, name: 'carbohydrates' })
 