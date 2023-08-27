
import { PriorityQueue } from '@/classes/PriorityQueue'
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

const checkPriority = (n: number) => {
  test('check priority ' + n, () => {
    const pq = new PriorityQueue<number>()
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
    expect(res.toString()).toBe(checkArr.sort((a, b) => b - a).toString())

  })
}

for (let i=0; i<20; i++) {
  checkPriority(i)
}




