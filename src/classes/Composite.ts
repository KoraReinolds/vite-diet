import type { IImmutableComposite } from "@/interfaces/IComposite";
import type { ICompositeParams } from "@/interfaces/ICompositeParams";
import type { MN } from "@/interfaces/IMacroNutrientValues";
import { MutableChilds, MutableValue } from "./CompositeDecorator";

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

  getEnergy(): number {
    let energy = 0
    for (const component of this._components.values()) {
      energy += component.getEnergy()
    }
    return energy / this._multiply
  }

  getEnergyChunk(): number {
    return this.getEnergy() / this.chunks
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
    return val / this._multiply
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

  get proteinsChunk(): number {
    return this.proteins / this.chunks
  }

  get carbohydratesChunk(): number {
    return this.carbohydrates / this.chunks
  }

  get fatsChunk(): number {
    return this.fats / this.chunks
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
    this._multiply *= this.value / val
    this._chunks = val
  }

  get name(): string {
    return this._name || this.constructor.name
  }

  protected _chunkSize: number = 1
  protected _chunks: number = 100
  private _multiply: number = 1
  protected _components: Map<string, T> = new Map()
  protected _name: string | undefined

}

class ImmutableComposite<T extends AComposite<any>>
extends AComposite<T> {}

@MutableValue
class ImmutableCompositeWithMutableValue<T extends AComposite<any>>
extends AComposite<T> {}

@MutableChilds
@MutableValue
class Composite<T extends AComposite<any>>
extends AComposite<T> {}

@MutableChilds
class CompositeWithFixedValue<T extends AComposite<any>>
extends AComposite<T> {}

export {
  AComposite,
  Composite,
  ImmutableComposite,
  CompositeWithFixedValue,
  ImmutableCompositeWithMutableValue,
}