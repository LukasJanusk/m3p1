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

  static getHabits(): Habit[] {
    interface HabitData {
      id: number
      name: string
      userId: number
      category: string
      description: string
      weekdays: number[]
      active: boolean
      stopped: boolean
    }
    try {
      const storagedHabits = localStorage.getItem('habits')
      if (storagedHabits) {
        const habitsParsed = JSON.parse(storagedHabits)
        const habits: Habit[] = habitsParsed.map((habitData: HabitData) => {
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
      return []
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(
          `Unable to fetch habits from local storage: ${error.message}`,
        )
      } else {
        console.error(
          'Unknown error occured fetching habits from local storage',
        )
      }
      return []
    }
  }

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
}
