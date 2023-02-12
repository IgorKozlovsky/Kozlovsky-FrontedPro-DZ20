// 1) Створити клас Рецепт:

// властивості:
// назва
// список інгрідієнтів
// опис приготування
// час приготування
// методи:
// конструктор, який приймає 4 параметри і задає відповідні властивості
// чи валідний - метод, який повертає тру, якщо всі властивості валідні, інакше фолс

// 2) Створити клас Книга рецептів:

// Властивості:
// конструктор не потрібен;
// масив рецептів, який при створенні пустий.
// Методи:
// додати рецепт - метод повинен приймати екземпляр класу Рецепт, та додавати до масиву рецептів, якщо він валідний.
// знайти рецепти за часом - метод повинен приймати число час приготування і повертати список усіх рецептів, час приготування яких не перевищує вказаний
// знайти рецепти за інгрідієнтами - метод повинен приймати список інгрідієнтів для пошуку і повертати список усіх рецептів, список інгрідієнтів яких містить усі, які вказали

// 3) Далі програма повинна створити

// декілька екземплярів класу Рецепт (обов'язково мають бути щонайменше три валідні: з часом приготування 30хв, 60хв, 120хв. Також щонайменше три валідні: не містить ні картоплі, ні моркви; містить картоплю, не містить моркву; містить і картоплю, і моркву. І ще один невалідний рецепт)
// екземпляр класу Книга рецептів
// додати усі створені рецепти в книгу
// викликати метод знайти рецепти за часом з параметром 60. за отриманим списком згенерувати повідомлення, яке містить назви рецептів, і вивести його в консолі
// викликати метод знайти рецепти за інгрідієнтами з параметром ['картопля', 'морква']. за отриманим списком згенерувати повідомлення, яке містить назви рецептів, і вивести його в консолі

class Recipe {
  constructor(name, ingredientList, cookingDescription, cookingTime) {
    this.name = name;
    this.ingredientList = ingredientList.map((el) => `${el}`.toLowerCase());
    this.cookingDescription = cookingDescription;
    this.cookingTime = +cookingTime;
  }

  isValid() {
    const nameCheck = !this.name?.trim();
    const ingredientListCheck =
      !Array.isArray(this.ingredientList) ||
      this.ingredientList.length === 0 ||
      !this.ingredientList.every((current) => current && isNaN(current));

    const cookingDescriptionCheck = !this.cookingDescription?.trim();
    const cookingTimeCheck = !this.cookingTime || this.cookingTime <= 0;

    if (nameCheck || ingredientListCheck || cookingDescriptionCheck || cookingTimeCheck) {
      return false;
    }

    return true;
  }
}

class RecipeBook {
  #recipeList = [];
  addRecipe(recipe) {
    if (recipe instanceof Recipe && recipe.isValid()) this.#recipeList.push(recipe);
  }
  getRecipeList() {
    return this.#recipeList;
  }
  findRecipeByTime(inputNum) {
    if (Number.isFinite(inputNum) && inputNum > 0)
      return this.#recipeList.filter((recipe) => recipe.cookingTime <= inputNum);
  }

  findRecipeByIngredients(inputIngr) {
    if (!Array.isArray(inputIngr) || inputIngr.length === 0) {
      return [];
    }
    return this.#recipeList.filter((recipe) => inputIngr.every((e) => recipe.ingredientList.includes(e.toLowerCase())));
  }
}

const Pancakes = new Recipe("Pancakes", ["цукор"], "не містить ні картоплі, ні моркви", "30");
const StrawberryPie = new Recipe("Strawberry pie", ["Картопля", "сіль"], "містить картоплю, не містить моркву", "60");
const Soup = new Recipe("Soup", ["картопля", "морква"], "містить і картоплю, і моркву", "120");
const Bread = new Recipe("Bread", [], "невалідний", "30");
const Bun = new Recipe("Bun", ["картопля"], "невалідний", "0");
const Pie = new Recipe("Pie", ["картопля", "морква", "сіль"], "містить і картоплю, і моркву", "120");

const Book = new RecipeBook();

const recipeList = [Pancakes, StrawberryPie, Soup, Bread, Bun, Pie];
recipeList.forEach((recipe) => Book.addRecipe(recipe));

console.log(Book.getRecipeList());

console.log(
  Book.findRecipeByTime(60)
    .map((recipe) => recipe.name)
    .join(", ") + " - можна приготувати за цей час"
);

console.log(
  Book.findRecipeByIngredients(["картопля", "морква"])
    .map((recipe) => recipe.name)
    .join(", ") + " - рецепти які містять всі вказані інгрідієнти"
);
