export default class Habit {
  constructor(id, name, userId, category, description, weekdays) {
    this.id = id
    this.name = name
    this.description = description || ''
    this.category = category
    this.userId = userId
    this.active = false
    this.weekdays = weekdays // Array of week days that is active e.g [0, 1, 2, 6]
  }
  // Save habits to local storage
  static save() {
    const habits = JSON.parse(localStorage.getItem('habits')) || []
    const existingIndex = habits.findIndex(habit => habit.id === this.id)
    if (existingIndex !== -1) {
      habits[existingIndex] = this
    } else {
      habits.push(this)
    }
    localStorage.setItem('habits', JSON.stringify(habits))
  }
  static getHabits() {
    const habits = JSON.parse(localStorage.getItem('habits')) || []
    return habits
  }
  // Create a new Habit instance with the same properties
  clone() {
    return new Habit(
      this.id,
      this.name,
      this.userId,
      this.category,
      this.description,
      [...this.weekdays],
    )
  }
}