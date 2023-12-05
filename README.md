# [`DietPlanner`](https://diet-planer.vercel.app/) App

*DietPlanner* is an application designed to control nutrition, helping users monitor the caloric content of their food and the ratio of proteins, fats, and carbohydrates. It's distinctive feature is the automatic recalculation of necessary products from a manually created list.

## Description

The application allows users to:

- Customize diet parameters: consumed calories and macronutrient ratios (proteins, fats, and carbohydrates).
- Create a list of product items.
- Select products from the list and adjust the range within which product recalculation occurs.
- Save the results and create a list from multiple calculations.

The project was developed as a practice in OOP patterns for creating a web application.


## Structure details
The `Composite` pattern was chosen as the main, providing a structure for the application:
`macronutrients` ⇒ `foods` ⇒ `meals`

___
### `AComposite` class
Represents a unified interface for working with a tree-like structure of objects.
___
### `Decorators`
Complements the immutable class `AComposite` with methods allowing state modifications:
- `MutableValue` - enables changing the value after initialization
- `MutableChilds` - allows changing the structure after initialization
This results in 4 composite classes with different behaviors: `Composite`, `ImmutableComposite`, `CompositeWithFixedValue`, `ImmutableCompositeWithMutableValue`
___
### `AMacroNutrient` class
##### extends `ImmutableComposite`
Is a leaf node in the composite hierarchy.
Ddefines the structure for macronutrient classes: `Fats`, `Carbohydrates`, `Proteins`
___
### `Food` class
##### extends `ImmutableCompositeWithMutableValue`<`AMacroNutrient`>
Composite class containing a single macronutrient each and does not allow changes to this structure after creation.
Also implements the `clone()` method following the `Prototype` pattern.
___
### `FoodList` class
##### extends `CompositeWithFixedValue`<`Food`>
Composite class containing a list of products used in the application.
Also implements methods for selecting products.
___
### `Meal` class
##### extends `CompositeWithFixedValue`<`Food`>
Composite class representing a meal containing multiple food items.
___
### `DietPlan` class
##### extends `CompositeWithFixedValue`<`Meal`>
Composite class representing a list containing multiple meals.
Contains information necessary for calculating an optimal meal plan.

## Algorythm details
The calculation of necessary product items are implemented using a greedy search algorithm. The heuristic function in the greedy search algorithm returns a numerical value indicating how closely a specific list of products aligns with the caloric and macronutrient ratio settings. The algorithm is also implemented as classes.

___
### `GreedySearch` class
Class implementing a greedy search algorithm. It has a search() method for finding solutions.
Encapsulates implementation details and can be replaced by another class implementing a different algorithm with the same interface.

___
### `GraphNode` class
Class encapsulating logic related to the search. Contains methods:
- `getNeighbors()` for obtaining neighboring `GraphNodes`
- `heuristic()` for calculating how close the state in the `GraphNode` is to the optimal state.
___
### `PriorityQueue`, `PriorityQueueMin`, `Comparable` classes
Auxiliary classes implementing data structures necessary for the `GreedySearch`.

## Application structure
The application has several layers:

- `layerUtils` - contains pure functions for working with data and instances of the `Composite` pattern.
- `layerInstances` - includes code for initializing classes.
- `layerClasses` - contains functions that extract data from the classes and modify it.
- `layerData` - creates reactive data from functions from the layers above.
- `layerUI` - includes data for view and functions for interacting with the interface.

Advantages of this separation:

- The logic layer is abstracted from the UI and can even be separated into a third party library for use in projects with other frameworks or pure js.
- Two developers can work on the project simultaneously without conflicts when merging branches.

Drawbacks of this separation:

- Requires more control and effort to ensure reactivity with classes.

# [`Link` to the application](https://diet-planer.vercel.app/)

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
