import Day from '../src/utils/day'
import Habit from '../src/utils/habits'
import { describe, expect, it } from 'vitest'
const getWeek = (): Date[] => {
  const weekDates: Date[] = []
  const startDate = new Date('2023-05-20')
  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + i)
    weekDates.push(date)
  }
  return weekDates
}
const week = getWeek()
const habits = [
  new Habit(
    1,
    'Dance',
    1,
    'lifestyle',
    'I love dancing!',
    [0, 1, 2, 3, 4, 5, 6],
    false,
    false,
  ),
  new Habit(
    2,
    'Running',
    1,
    'fitness',
    'Sport is good',
    [0, 3, 5],
    false,
    false,
  ),
]
describe('Tests functionality of Day class', () => {
  const dayWeek = Day.getWeekdays(week, habits)
  const monthDays1 = Day.getMonthDays(2024, 11, habits)
  const monthDays2 = Day.getMonthDays(2024, 10, habits)
  it('Returns Day objects of provided Date object week', () => {
    expect(dayWeek.length).toBe(7)
    expect(dayWeek[0].habits.length).toBe(2)
  })
  it('Returns Day objects of provided year and month', () => {
    expect(monthDays1.length).toBe(31)
    expect(monthDays2.length).toBe(30)
  })
})
