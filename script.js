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
        const hasVegetarianDish = dishes.some(dish => {
          return dish.ingredients.some(ingredient => 
            ingredient !== 'meat' && 
            ingredient !== 'dough' && 
            ingredient !== 'cheese'
          );
        });

        if (hasVegetarianDish) {
          console.log("в меню есть хотя бы одно вегетарианское блюдо.");
        } else {
          console.log("в меню нет вегетарианских блюд.");
        }

        const isFullyVegetarianMenu = dishes.every(dish => {
          return dish.ingredients.every(ingredient => ingredient !== 'meat');
        });

        if (isFullyVegetarianMenu) {
          console.log("полностью вегетарианское меню.");
        } else {
          console.log("не полностью вегетарианское меню.");
        }

        const vegetarianDishes = dishes.filter(dish => {
          return dish.ingredients.every(ingredient => ingredient !== 'meat');
        });

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
