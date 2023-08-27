import type { IPriorityQueue } from "@/interfaces/IPriorityQueue";
import { Comparable } from "./Comparable";

class PriorityQueue<T extends any>
implements IPriorityQueue<T> {
  private _queue: [null, ...Comparable<T>[]] = [null];
  
  get queue() {
    return this._queue as Comparable<T>[]
  }
  
  get length() {
    return this.queue.length - 1
  }

  private _sink() {
    let cur = 1
    const getNext = () => {
      const left = this.queue[cur * 2]
      const right = this.queue[cur * 2 + 1]
      if (left && right) {
        return left.compareTo(right) > 0 
          ? cur * 2
          : cur * 2 + 1
      }
      return cur * 2
    }
    let next = getNext()
    while (next <= this.length && this.queue[cur].compareTo(this.queue[next]) < 0) {
      [this.queue[cur], this.queue[next]] = [this.queue[next], this.queue[cur]]
      cur = next
      next = getNext()
    }
  }

  private _popup() {
    let cur = this.length
    let next = Math.floor(cur / 2)
    while (next > 0 && this.queue[cur].compareTo(this.queue[next]) > 0) {
      [this.queue[cur], this.queue[next]] = [this.queue[next], this.queue[cur]]
      cur = next
      next = Math.floor(cur / 2)
    }
  }

  enqueue(elem: T, priority: number) {
    this.queue.push(new Comparable(elem, priority))
    this._popup()
  };

  dequeue() {
    if (this.length < 1) {
      return undefined
    }

    [this.queue[1], this.queue[this.length]] = [this.queue[this.length], this.queue[1]]
    const res = this.queue.pop()
    this._sink()
    return res?.value
  };

}

export { PriorityQueue }