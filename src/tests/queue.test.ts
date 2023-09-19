
import { PriorityQueue } from '@/classes/PriorityQueue'
import { PriorityQueueMin } from '@/classes/PriorityQueueMin'
import { expect, test } from 'vitest'

test('empty queue', () => {
  const pq = new PriorityQueue<number>()
  expect(pq.length).toBe(0)
})

test('add one item', () => {
  const pq = new PriorityQueue<number>()
  pq.enqueue(1, 1)
  expect(pq.length).toBe(1)
})

test('remove from empty', () => {
  const pq = new PriorityQueue<number>()
  const res = pq.dequeue()
  expect(pq.length).toBe(0)
  expect(res).toBe(undefined)
})

test('add one and remove one', () => {
  const pq = new PriorityQueue<number>()
  pq.enqueue(1, 1)
  const res = pq.dequeue()
  expect(res).toBe(1)
})

type SortFunction = (a: number, b: number) => number
const checkPriority = (n: number, name: string, sort: SortFunction, pq: PriorityQueue<number>) => {
  test(name, () => {
    const res = [];
    const checkArr = [...new Array(n).keys()]
    for (let i=0; i<n; i++) {
      const j = Math.floor(Math.random() * (i + 1));
      [checkArr[i], checkArr[j]] = [checkArr[j], checkArr[i]]; 
    }
    checkArr.forEach(el => pq.enqueue(el, el))
    for (let i=0; i<n; i++) {
      res.push(pq.dequeue())
    }
    expect(res.toString()).toBe(checkArr.sort(sort).toString())
  })
}

for (let i=0; i<20; i++) {
  checkPriority(
    i, 'check priority max ' + i,
    (a: number, b: number) => b - a,
    new PriorityQueue()
  )
  checkPriority(
    i, 'check priority min ' + i,
    (a: number, b: number) => a - b,
    new PriorityQueueMin()
  )
}




