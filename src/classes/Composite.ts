import type { IComposite } from "@/interfaces/IComposite";
import type { IEnergy } from "@/interfaces/IEnergy";
import type { IHasMacronutrients } from "@/interfaces/IHasMacronutrients";
import type { MN } from "@/interfaces/IMacroNutrientValues";

abstract class Composite<T extends Composite<any>>
implements IEnergy, IHasMacronutrients, IComposite<T> {

  getEnergy(): number {
    let energy = 0
    for (const component of this._components.values()) {
      energy += component.getEnergy()
    }
    return energy
  }
  
  add(component: T): void {
    const name = component.getName()
    this._components.set(name, component)
  }

  get(name: string): T | undefined {
    return this._components.get(name)
  }
  
  getAll(): Map<string, T> {
    return this._components
  }
 
  _getMacronutrient(mn: MN): number {
    let val = 0
    for (const component of this._components.values()) {
      val += component[mn]
    }
    return val
  }

  get proteins(): number {
    return this._getMacronutrient('proteins')
  }

  get carbohydrates(): number {
    return this._getMacronutrient('carbohydrates')
  }

  get fats(): number {
    return this._getMacronutrient('fats')
  }

  remove(name: string): boolean {
    return this._components.delete(name)
  }

  abstract getName(): string
  private _components: Map<string, T> = new Map() 

}

export { Composite }