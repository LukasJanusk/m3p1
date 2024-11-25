export default class Habit {
  id: number
  name: string
  userId: number
  category: string
  description: string
  weekdays: number[]
  active: boolean
  stopped: boolean
  constructor(
    id: number,
    name: string,
    userId: number,
    category: string,
    description: string = '',
    weekdays: number[],
    active: boolean = false,
    stopped: boolean = false,
  ) {
    this.id = id
    this.name = name
    this.description = description
    this.category = category
    this.userId = userId
    this.weekdays = weekdays
    this.active = active
    this.stopped = stopped
  }

  // Loads habits from local storage and creates instances of it
  static getHabits(): Habit[] {
    const habitsParsed = JSON.parse(localStorage.getItem('habits')) || []
    const habits: Habit[] = habitsParsed.map((habitData: any) => {
      return new Habit(
        habitData.id,
        habitData.name,
        habitData.userId,
        habitData.category,
        habitData.description,
        habitData.weekdays,
        habitData.active,
        habitData.stopped,
      )
    })
    return habits
  }
  // Create a new Habit instance with the same properties
  clone(): Habit {
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
  updateInPlace(habit: Habit) {
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
