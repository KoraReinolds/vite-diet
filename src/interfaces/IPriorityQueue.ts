import type { Comparable } from "@/classes/Comparable"

interface IPriorityQueue<T> {
  queue: Comparable<T>[]
  enqueue(elem: T, priority: number): void
  dequeue(): (T | undefined)
  less(op1: Comparable<T>, op2: Comparable<T>): boolean
  length: number
}

export type { IPriorityQueue }