fetch('dishes.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(dishes => {
    fetch('ingredientPrices.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(ingredientPrices => {
        const isVegetarian = dish => !dish.ingredients.includes('meat');

        const hasVegetarianDish = dishes.some(isVegetarian);

        if (hasVegetarianDish) {
          console.log("в меню есть хотя бы одно вегетарианское блюдо.");
        } else {
          console.log("в меню нет вегетарианских блюд.");
        }

        const isFullyVegetarianMenu = dishes.every(isVegetarian);

        if (isFullyVegetarianMenu) {
          console.log("полностью вегетарианское меню.");
        } else {
          console.log("не полностью вегетарианское меню.");
        }

        const vegetarianDishes = dishes.filter(isVegetarian);

        console.log("Вегетарианские блюда:", vegetarianDishes);

        dishes.forEach(dish => {
          let cost = 0;
          dish.ingredients.forEach(ingredient => {
            cost += ingredientPrices[ingredient] || 0;
          });
          console.log(`Стоимость ${dish.name}: ${cost}`);
        });
      })
      .catch(error => {
        console.error('Ошибка при выполнении fetch ingredientPrices.json:', error);
      });
  })
  .catch(error => {
    console.error('Ошибка при выполнении fetch dishes.json:', error);
  });
  
