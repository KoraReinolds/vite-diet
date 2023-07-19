import type { IComposite } from "@/interfaces/IComposite";
import type { IEnergy } from "@/interfaces/IEnergy";
import type { IImmutable } from "@/interfaces/IImmutable";

abstract class Composite<T extends Composite<T>>
implements IEnergy, IComposite<T> {

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

  remove(name: string): boolean {
    return this._components.delete(name)
  }

  abstract getName(): string
  private _components: Map<string, T> = new Map() 

}

export { Composite }