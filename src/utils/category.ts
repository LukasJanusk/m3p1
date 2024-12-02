export default class Category {
  id: number
  name: string
  description: string
  active: boolean

  constructor(id: number, name: string, description: string) {
    this.id = id
    this.name = name
    this.description = description || ''
    this.active = true
  }

  static save(categories: Category[]) {
    try {
      localStorage.setItem('categories', JSON.stringify(categories))
    } catch (error: any) {
      console.error(
        `Could not save categories to local storage: ${error.message}`,
      )
    }
  }

  static load(): Category[] {
    try {
      const storedCategories = localStorage.getItem('categories')
      if (storedCategories) {
        return JSON.parse(storedCategories)
      }
      const defaultCategories = [
        new Category(0, 'All habits', 'Show habits of all categories'),
        new Category(1, 'Fitness', 'Health and fitness related activities'),
        new Category(2, 'Productivity', 'Habits that improve productivity'),
        new Category(3, 'Social', 'Social interaction and relationships'),
        new Category(4, 'Financial', 'Habits related to money and finance'),
        new Category(
          5,
          'Lifestyle',
          'Habits related to lifestyle and wellness',
        ),
        new Category(6, 'Spiritual', 'Habits for spiritual growth'),
      ]
      Category.save(defaultCategories)
      return defaultCategories
    } catch (error: any) {
      console.error(
        `Could not load Categories from local storage: ${error.message}`,
      )
      return []
    }
  }
}
