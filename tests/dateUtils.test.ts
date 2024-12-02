import {
  getCurrentDayString,
  adjustDayIndex,
  isSameDay,
  validateDate,
  formatDate,
  getMonthDates,
  getWeekDay,
} from '../src/utils/dateUtils'
import { describe, expect, it } from 'vitest'

const testDate1 = new Date('2023-12-12')
const testDate2 = new Date('2024-01-11')
const testDate3 = new Date('2011-10-20')
const testDate4 = new Date('2015-05-01')
const testDate5 = new Date('2024-12-02')
const testDate6 = new Date('2024-12-01')
const testSameDate = new Date('2024-12-01')

describe('Tests utility functions which manipulate Date objects', () => {
  it('returns formated string of provided Date e.g. "Sunday, December 1"', () => {
    const string1 = getCurrentDayString(testDate1)
    const string2 = getCurrentDayString(testDate2)
    const string3 = getCurrentDayString(testDate5)
    const string4 = getCurrentDayString(testDate6)
    expect(string1).toBe('Tuesday, December 12')
    expect(string2).toBe('Thursday, January 11')
    expect(string3).toBe('Monday, December 2')
    expect(string4).toBe('Sunday, December 1')
  })
  it('Returns weekday index of Day object Monday being = 0', () => {
    const adjustedIndex1 = adjustDayIndex(testDate3)
    const adjustedIndex2 = adjustDayIndex(testDate4)
    const adjustedIndex3 = adjustDayIndex(testDate5)
    const adjustedIndex4 = adjustDayIndex(testDate6)
    expect(adjustedIndex1).toBe(3)
    expect(adjustedIndex2).toBe(4)
    expect(adjustedIndex3).toBe(0)
    expect(adjustedIndex4).toBe(6)
  })
  it('Returns true if both Date objects belong to the same Day', () => {
    const sameDay = isSameDay(testDate6, testSameDate)
    const notSameDay = isSameDay(testDate1, testDate2)
    expect(sameDay).toBe(true)
    expect(notSameDay).toBe(false)
  })
  it('Returns bool if date parameter passes expected format of yyyy-mm-dd', () => {
    const isValid1 = validateDate('2000-12-01')
    const isValid2 = validateDate('2024-01-01')
    const isInvalid1 = validateDate('24-01-2000')
    const isInvalid2 = validateDate('2024-13-01')
    const isInvalid3 = validateDate('2022-02-30')
  })
  it('Returns string in format yyyy-mm-dd of provided Date object', () => {
    const dateString1 = formatDate(testDate4)
    const dateString2 = formatDate(testDate5)
    expect(dateString1).toBe('2015-05-01')
    expect(dateString2).toBe('2024-12-02')
  })
  it('Returns an array of date objects of provided year and month', () => {
    const monthDates1 = getMonthDates(2024, 11)
    const monthDates2 = getMonthDates(2024, 1)
    expect(monthDates1.length).toBe(31)
    expect(monthDates2.length).toBe(29)
  })
  it('Returns short weekday name of provided Date object', () => {
    const shortWeekDay1 = getWeekDay(testDate1)
    const shortWeekDay2 = getWeekDay(testDate5)
    const shortWeekDay3 = getWeekDay(testDate6)
    expect(shortWeekDay1).toBe('Tue')
    expect(shortWeekDay2).toBe('Mon')
    expect(shortWeekDay3).toBe('Sun')
  })
})
