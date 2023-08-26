class Comparable<T> {
  value: T
  priority: number
  
  constructor(value: T, priority: number) {
    this.priority = priority
    this.value = value 
  }
  
  compareTo(comp: Comparable<T>) {
    return this.priority - comp.priority 
  }
}

export { Comparable }