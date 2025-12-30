import { OnlineShoppingCart } from './OnlineShoppingCart.js';

console.log('=== ЛАБОРАТОРНАЯ РАБОТА 5: КЛАССЫ И МОДУЛИ ===\n');
const cart1 = new OnlineShoppingCart(
    [{ name: 'Ноутбук', price: 50000 }, { name: 'Мышка', price: 1500 }],
    51500,
    true,
    'ул. Пушкина, д. 10, кв. 5'
);
const cart2 = new OnlineShoppingCart(
    [{ name: 'Книга', price: 800 }],
    800,
    false,
    'ул. Ленина, д. 25'
);
console.log('Корзина 1:');
cart1.show();

console.log('Корзина 2:');
cart2.show();
console.log('=== ДЕМОНСТРАЦИЯ МЕТОДОВ ===');
cart2.addItem('Ручка', 50);
cart2.show();
cart1.applyDiscount(10);
cart1.show();

cart1.deliveryAddress = 'пр. Мира, д. 15';
console.log(`Новый адрес доставки cart1: ${cart1.deliveryAddress}\n`);

const clonedCart = OnlineShoppingCart.clone(cart1);
console.log('Клонированная корзина:');
clonedCart.show();

console.log('cart1 === clonedCart?', cart1 === clonedCart); // false

const cartReference = cart2.copy();
console.log('cart2 === cartReference?', cart2 === cartReference); // true

console.log('\nУдаляем корзину 2:');
cart2.delete();
cart2.show(); // покажет пустую корзину
