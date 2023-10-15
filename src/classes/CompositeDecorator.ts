import { AComposite } from "./Composite";

function MutableValue<T extends { new(...args: any[]): AComposite<any> }>(constructor: T, context = {}) {
  return class extends constructor {

    set(value: number): void {
      this.chunks = value
    }

  }
};

function MutableChilds<Childs extends AComposite<any>, T extends { new(...args: any[]): AComposite<Childs> }>(constructor: T, context = {}) {
  return class extends constructor {

    add(component: Childs): Childs {
      const name = component.name
      this._components.set(name, component)
      return component
    }

    remove(name: string): boolean {
      return this._components.delete(name)
    }

  }
};

export { MutableChilds, MutableValue }
