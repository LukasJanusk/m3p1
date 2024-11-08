export default class Habit {
  constructor(id, name, userId, category, description, weekdays) {
    this.id = id
    this.name = name
    this.description = description || ''
    this.category = category
    this.userId = userId
    this.active = false
    this.weekdays = weekdays // Array of week days that is active e.g [0, 1, 2, 6]
    this.stopped = false
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
  // Loads habits from local storage and creates instances of it
  static getHabits() {
    const habitsParsed = JSON.parse(localStorage.getItem('habits')) || []
    const habits = habitsParsed.map(habitData => {
      return new Habit(
        habitData.id,
        habitData.name,
        habitData.userId,
        habitData.category,
        habitData.description,
        habitData.weekdays,
      )
    })
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
  // If matching ID is found it updates habit values with pased Habit object values
  updateInPlace(habit) {
    if (this.id === habit.id) {
      this.name = habit.name
      this.description = habit.description
      this.category = habit.category
      this.userId = habit.userId
      this.active = habit.active
      this.weekdays = habit.weekdays
      this.stopped = habit.stopped
    }
  }
}
