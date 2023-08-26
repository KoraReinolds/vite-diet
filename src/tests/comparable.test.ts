
import { Comparable } from '@/classes/Comparable'
import { expect, test } from 'vitest'

const comparableA = new Comparable('', 50)
const comparableB = new Comparable('string', 500)
const comparableC = new Comparable('foo', 10)
const comparableD = new Comparable('bar', 50)

test('A < B', () => {
  expect(comparableA.compareTo(comparableB)).lessThan(0)
})

test('B > A', () => {
  expect(comparableB.compareTo(comparableA)).greaterThan(0)
})

test('A > C', () => {
  expect(comparableA.compareTo(comparableC)).greaterThan(0)
})

test('B > C', () => {
  expect(comparableB.compareTo(comparableC)).greaterThan(0)
})

test('A = D', () => {
  expect(comparableA.compareTo(comparableD)).toBe(0)
})