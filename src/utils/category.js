export default class Category {
  constructor(id, name, description) {
    this.id = id
    this.name = name
    this.description = description || ''
    this.active = true
  }
  // Save habits to local storage
  static save(categories) {
    localStorage.setItem('categories', JSON.stringify(categories))
  }
  // Load categories from local storage and return array of found ones
  static load() {
    const storedCategories = localStorage.getItem('categories')
    const categories = storedCategories ? JSON.parse(storedCategories) : []

    // If no categories are found, create default ones
    if (categories.length === 0) {
      const defaultCategories = [
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
      // Save the default categories to local storage
      Category.save(defaultCategories)
      return defaultCategories
    }

    return categories
  }
}
