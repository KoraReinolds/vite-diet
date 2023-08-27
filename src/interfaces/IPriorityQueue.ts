import type { Comparable } from "@/classes/Comparable"

interface IPriorityQueue<T> {
  queue: Comparable<T>[]
  enqueue: (elem: T, priority: number) => void
  dequeue: () => (T | undefined)
  length: number
}

export type { IPriorityQueue }