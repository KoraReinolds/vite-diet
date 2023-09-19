import type { Comparable } from "./Comparable";
import { PriorityQueue } from "./PriorityQueue";

class PriorityQueueMin<T extends any> extends PriorityQueue<T> {
 
  less(op1: Comparable<T>, op2: Comparable<T>): boolean {
    return op1.compareTo(op2) >= 0
  }
 
}

export { PriorityQueueMin }