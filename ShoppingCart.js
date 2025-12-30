
export class ShoppingCart {
    #items;         
    #totalPrice;   
    #isSaved;      

    constructor(items = [], totalPrice = 0, isSaved = false) {
        this.#items = items;
        this.#totalPrice = totalPrice;
        this.#isSaved = isSaved;
    }

    get items() {
        return [...this.#items]
    }

    get totalPrice() {
        return this.#totalPrice;
    }

    get isSaved() {
        return this.#isSaved;
    }

    set items(newItems) {
        if (Array.isArray(newItems)) {
            this.#items = newItems;
            this.#calculateTotalPrice(); 
        } else {
            console.error('Ошибка: items должен быть массивом');
        }
    }

    set totalPrice(price) {
        if (typeof price === 'number' && price >= 0) {
            this.#totalPrice = price;
        } else {
            console.error('Ошибка: totalPrice должен быть числом ≥ 0');
        }
    }

    set isSaved(saved) {
        this.#isSaved = Boolean(saved);
    }

    addItem(itemName, price) {
        this.#items.push({ name: itemName, price });
        this.#totalPrice += price;
        console.log(`Добавлен товар: "${itemName}" за ${price} руб.`);
    }

    removeItem(itemName) {
        const index = this.#items.findIndex(item => item.name === itemName);
        if (index !== -1) {
            const removedItem = this.#items.splice(index, 1)[0];
            this.#totalPrice -= removedItem.price;
            console.log(`Удален товар: "${itemName}"`);
        } else {
            console.log(`Товар "${itemName}" не найден в корзине`);
        }
    }


    show() {
        console.log('=== СОДЕРЖИМОЕ КОРЗИНЫ ===');
        console.log(`Товаров: ${this.#items.length}`);
        console.log(`Общая стоимость: ${this.#totalPrice} руб.`);
        console.log(`Сохранена: ${this.#isSaved ? 'Да' : 'Нет'}`);
        
        if (this.#items.length > 0) {
            console.log('Список товаров:');
            this.#items.forEach((item, index) => {
                console.log(`  ${index + 1}. ${item.name} - ${item.price} руб.`);
            });
        } else {
            console.log('Корзина пуста');
        }
        console.log('========================\n');
    }
    delete() {
        this.#items = [];
        this.#totalPrice = 0;
        this.#isSaved = false;
        console.log('Корзина полностью очищена');
        // Делаем объект "пустым"
        Object.keys(this).forEach(key => {
            if (key.startsWith('#')) {
                this[key] = null;
            }
        });
    }
    copy() {
        console.log('Создана ссылка на текущую корзину');
        return this;
    }
    #calculateTotalPrice() {
        this.#totalPrice = this.#items.reduce((sum, item) => sum + item.price, 0);
    }
    static clone(originalCart) {
        const clonedItems = originalCart.items.map(item => ({
            name: item.name,
            price: item.price
        }));
        return new ShoppingCart(
            clonedItems,
            originalCart.totalPrice,
            originalCart.isSaved
        );
    }
}
