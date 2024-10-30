export default class Habit {
  constructor(id, name, userId, category, description, weekdays) {
    this.id = id
    this.name = name
    this.description = description || ''
    this.category = category
    this.userId = userId
    this.active = true
    this.weekdays = weekdays // Array of week days that is active e.g [0, 1, 2, 6]
  }
  save() {
    const habits = JSON.parse(localStorage.getItem('Habits')) || []
    const existingIndex = habits.findIndex(habit => habit.id === this.id)
    if (existingIndex !== -1) {
      habits[existingIndex] = this
    } else {
      habits.push(this)
    }
    localStorage.setItem('Habits', JSON.stringify(habits))
  }
  static getHabits() {
    const habits = JSON.parse(localStorage.getItem('Habits')) || []
    console.log(habits)
    return habits
  }
}
