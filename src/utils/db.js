import initSqlJs from 'sql.js'

let db

export async function initDb() {
  const SQL = await initSqlJs()
  db = new SQL.Database()

  const createUserTable = `
    CREATE TABLE User (
      Id INTEGER PRIMARY KEY AUTOINCREMENT,
      Name TEXT NOT NULL,
      Birth DATE NOT NULL
    );
  `

  const createCategoryTable = `
    CREATE TABLE Category (
      Id INTEGER PRIMARY KEY AUTOINCREMENT,
      Name TEXT NOT NULL,
      Description TEXT
    );
  `

  const createHabitTable = `
    CREATE TABLE Habit (
      Id INTEGER PRIMARY KEY AUTOINCREMENT,
      Name TEXT NOT NULL,
      Description TEXT,
      UserId INTEGER,
      CategoryId INTEGER,
      FOREIGN KEY (UserId) REFERENCES User(Id),
      FOREIGN KEY (CategoryId) REFERENCES Category(Id)
    );
  `

  const createDateTable = `
    CREATE TABLE Date (
      Id INTEGER PRIMARY KEY AUTOINCREMENT,
      Date DATE NOT NULL,
      Weekday TEXT
    );
  `

  const createActivityTable = `
    CREATE TABLE Activity (
      Id INTEGER PRIMARY KEY AUTOINCREMENT,
      DateId INTEGER,
      HabitId INTEGER,
      FOREIGN KEY (DateId) REFERENCES Date(Id),
      FOREIGN KEY (HabitId) REFERENCES Habit(Id)
    );
  `

  // Execute the create table statements
  db.run(createUserTable)
  db.run(createCategoryTable)
  db.run(createHabitTable)
  db.run(createDateTable)
  db.run(createActivityTable)
}

export function getDb() {
  return db
}
