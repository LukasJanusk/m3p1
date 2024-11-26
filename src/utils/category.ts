export default class Category {
  id: number
  name: String
  description: String
  active: boolean

  constructor(id: number, name: String, description: String) {
    this.id = id
    this.name = name
    this.description = description || ''
    this.active = true
  }

  static save(categories: Category[]) {
    localStorage.setItem('categories', JSON.stringify(categories))
  }

  static load(): Category[] {
    const storedCategories = localStorage.getItem('categories')
    const categories = storedCategories ? JSON.parse(storedCategories) : []
    if (categories.length === 0) {
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
    }

    return categories
  }
}
