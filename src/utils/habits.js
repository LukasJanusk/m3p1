export default class Habit {
  constructor(id, name, userId, categoryId, description) {
    this.id = id
    this.name = name
    this.description = description || ''
    this.categoryId = categoryId
    this.userId = userId
  }
}
