# Habit Tracker App

This is a habit tracker application built using Vue 3 and Vite.

## Project Setup

To get started, install the dependencies:

```sh
npm install
```

### To run the development server with hot-reload:

```sh
npm run dev
```

### To build the project for production:

```sh
npm run build
```

### After building the project, you can preview it with:

```sh
npm run preview
```

## Project desciption

The application is intuitive to use. There is a navigation element at the bottom with 3 buttons for navigation to different views. On click, the application loads the selected page using Vue Router.
Each view consists of top and bottom container components. Based on user interactions, content inside these containers is loaded reactively.

### HomeView

HomeView is the main page of the application. Daily habits are displayed here. The user can toggle to activate or deactivate each habit to mark it as complete. At the top of the app, the user can navigate between days of the current week. Alternatively, the user can type /day/:date as the date property, formatted yyyy-mm-dd, e.g., /day/2024-11-11.

### HabitView

HabitView at the top container contains a title for the page and a button toggle to switch the content of the bottom container between the HabitList and HabitForm components.

#### HabitList

This component contains a selection for habit grouping by category and a habit list below.
Each habit in the list has buttons to toggle the habit, edit the habit using the EditHabitForm, and delete the habit.

#### HabitForm

This component is a form for adding a new habit and adding or removing categories.

### CalendarView

The CalendarView top container contains a title, selected month and year, and navigation between months. Alternatively, upon selection of a specific day, the top container shows the full date of the selected day and a back button. The main container contains either day elements, which are filled with an increasing amount of green color based on how many habits were completed on that specific day. Alternatively, on the selection of a specific day, the bottom container contains the HabitList component, identical to HomeView. Also, like in HomeView, the user can type a date into the URL, this time, however, prefixing the day with /calendar, e.g., /calendar/day/2024-11-11.

## Project structure

The project follows the standard Vue recommended structure and naming conventions for components.
All components and views are placed in the /src folders. dateStore.js contains all state tracked by the Pinia module. /src/utils contains dateUtils.js for helper functions for manipulating Date objects, and category.js, day.js, habits.js for working with the corresponding objects.
