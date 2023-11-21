# [DietPlanner](https://diet-planer.vercel.app/) App

*DietPlanner* is an application designed to control nutrition, helping users monitor the caloric content of their food and the ratio of proteins, fats, and carbohydrates. It's distinctive feature is the automatic recalculation of necessary products from a manually created list.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### Description

The application allows users to:

- Customize diet parameters: consumed calories and macronutrient ratios (proteins, fats, and carbohydrates).
- Create a list of product items.
- Select products from the list and adjust the range within which product recalculation occurs.
- Save the results and create a list from multiple calculations.

The project was developed as a practice in OOP patterns for creating a web application.

The Composition pattern was chosen as the main, providing a structure for the application:

`macronutrients` ⇒ `foods` ⇒ `meals`

The calculation of necessary product items are implemented using a greedy search algorithm. The heuristic function in the greedy search algorithm returns a numerical value indicating how closely a specific list of products aligns with the caloric and macronutrient ratio settings. The algorithm is also implemented as classes.

The application has two layers:

- Logic layer providing an API consisting of several functions and hiding implementation details.
- UI layer with access to the API, utilizing the Vue framework for reactivity.

Advantages of this separation:

- The logic layer is abstracted from the UI and can even be separated into a third party library for use in projects with other frameworks or pure js.
- Two developers can work on the project simultaneously without conflicts when merging branches.

Drawbacks of this separation:

- Requires more control and effort to ensure reactivity.

[Link to the application](https://diet-planer.vercel.app/)