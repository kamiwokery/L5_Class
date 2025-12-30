import { ShoppingCart } from './ShoppingCart.js';
export class OnlineShoppingCart extends ShoppingCart {
    #deliveryAddress;  

    constructor(items = [], totalPrice = 0, isSaved = false, deliveryAddress = 'Не указан') {
        super(items, totalPrice, isSaved);
        this.#deliveryAddress = deliveryAddress;
    }


    get deliveryAddress() {
        return this.#deliveryAddress;
    }

    set deliveryAddress(address) {
        if (typeof address === 'string' && address.trim().length > 0) {
            this.#deliveryAddress = address.trim();
        } else {
            console.error('Ошибка: адрес должен быть непустой строкой');
        }
    }

    show() {
        console.log('=== ОНЛАЙН-КОРЗИНА ===');
        console.log(`Товаров: ${this.items.length}`);
        console.log(`Общая стоимость: ${this.totalPrice} руб.`);
        console.log(`Сохранена: ${this.isSaved ? 'Да' : 'Нет'}`);
        console.log(`Адрес доставки: ${this.#deliveryAddress}`);
        
        if (this.items.length > 0) {
            console.log('Список товаров:');
            this.items.forEach((item, index) => {
                console.log(`  ${index + 1}. ${item.name} - ${item.price} руб.`);
            });
        } else {
            console.log('Корзина пуста');
        }
        console.log('=====================\n');
    }

    delete() {
        super.delete(); 
        this.#deliveryAddress = 'Сброшен';
        console.log('Адрес доставки сброшен');
    }

    copy() {
        console.log('Создана ссылка на онлайн-корзину');
        return this;
    }

    applyDiscount(percent) {
        if (percent > 0 && percent <= 100) {
            const discount = this.totalPrice * (percent / 100);
            this.totalPrice = this.totalPrice - discount;
            console.log(`Применена скидка ${percent}%. Новая сумма: ${this.totalPrice} руб.`);
        } else {
            console.error('Ошибка: скидка должна быть от 1 до 100%');
        }
    }

    static clone(originalCart) {
        const clonedItems = originalCart.items.map(item => ({
            name: item.name,
            price: item.price
        }));
        
        return new OnlineShoppingCart(
            clonedItems,
            originalCart.totalPrice,
            originalCart.isSaved,
            originalCart.deliveryAddress
        );
    }
}
