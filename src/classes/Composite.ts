import type { IImmutableComposite, IMutableChilds } from "@/interfaces/IComposite";
import type { ICompositeParams } from "@/interfaces/ICompositeParams";
import type { MN } from "@/interfaces/IMacroNutrientValues";
import { MutableChilds, MutableValue } from "./CompositeDecorator";
import type { IMutable } from "@/interfaces/IMutable";

abstract class AComposite<T extends AComposite<any>>
implements IImmutableComposite<T> {

  constructor({ childs = [], chunks = 100, chunkSize = 1, name }: ICompositeParams<T>) {
    childs.forEach(child => this._add(child))
    this._chunks = chunks
    this._chunkSize = chunkSize
    this._name = name
  }

  getAllList(): T[] {
    return [...this._components.values()]
  }
  
  private _getEnergy(): number {
    let energy = 0
    for (const component of this._components.values()) {
      energy += component.getEnergy()
    }
    return energy / this._defaultSize 
  }

  getEnergy(): number {
    return this._getEnergy() * this.value
  }

  getEnergyChunk(): number {
    return this._getEnergy() * this._chunkSize
  }

  protected _add(component: T): void {
    const name = component.name
    this._components.set(name, component)
  }

  get(name: string): T | undefined {
    return this._components.get(name)
  }

  private _getMacronutrient(mn: MN): number {
    let val = 0
    for (const component of this._components.values()) {
      val += component[mn]
    }
    return val / this._defaultSize
  }

  get proteins(): number {
    return this._getMacronutrient('proteins') * this.value
  }

  get carbohydrates(): number {
    return this._getMacronutrient('carbohydrates') * this.value
  }

  get fats(): number {
    return this._getMacronutrient('fats') * this.value
  }

  get proteinsChunk(): number {
    return this._getMacronutrient('proteins') * this._chunkSize
  }

  get carbohydratesChunk(): number {
    return this._getMacronutrient('carbohydrates') * this._chunkSize
  }

  get fatsChunk(): number {
    return this._getMacronutrient('fats') * this._chunkSize
  }

  get chunks(): number {
    return this._chunks
  }

  get chunkSize(): number {
    return this._chunkSize
  }

  get value(): number {
    return this.chunks * this.chunkSize
  }

  protected set chunks(val: number) {
    this._chunks = val
  }

  get name(): string {
    return this._name || this.constructor.name
  }

  protected _defaultSize: number = 100
  protected _chunkSize: number = 1
  protected _chunks: number = 100
  protected _components: Map<string, T> = new Map()
  protected _name: string | undefined

}

class ImmutableComposite<T extends AComposite<any>>
extends AComposite<T> {}

@MutableValue
class ImmutableCompositeWithMutableValue<T extends AComposite<any>>
extends AComposite<T> implements IMutable<number> {
  set(value: number): void {
    this.set(value)
  }
}

@MutableChilds
@MutableValue
class Composite<T extends AComposite<any>>
extends AComposite<T> implements IMutable<number> {
  set(value: number): void {
    this.set(value)
  }
  add(component: T): T {
    this.add(component)
    return component
  }
  remove(name: string): boolean {
    return this.remove(name)
  }
}

@MutableChilds
class CompositeWithFixedValue<T extends AComposite<any>>
extends AComposite<T> implements IMutableChilds<T> {
  add(component: T): T {
    this.add(component)
    return component
  }
  remove(name: string): boolean {
    return this.remove(name)
  }
}

export {
  AComposite,
  Composite,
  ImmutableComposite,
  CompositeWithFixedValue,
  ImmutableCompositeWithMutableValue,
}