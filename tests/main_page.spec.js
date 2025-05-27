import {test, expect} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { MainPage } from '../pages/MainPage';
import { STANDARD_USER, PASSWORD } from '../config/env';

const PRODUCTS = [
    {
        name: 'Sauce Labs Backpack',
        price: '$29.99',
        index : 4
    },
    {
        name: 'Sauce Labs Bike Light',
        price: '$9.99',
        index : 0
    },
    {
        name: 'Sauce Labs Bolt T-Shirt',
        price: '$15.99',
        index : 1
    },
    {
        name: 'Sauce Labs Fleece Jacket',
        price: '$49.99',
        index : 5
    },
    {
        name: 'Sauce Labs Onesie',
        price: '$7.99',
        index : 2
    },
    {
        name: 'Test.allTheThings() T-Shirt (Red)',
        price: '$15.99',
        index : 3
    }

]

test.describe('Main Page Test Suite', () => {
    test.beforeEach(async ({page}) => {
        await page.goto("/");
        const loginPage = new LoginPage(page);
        await loginPage.login(STANDARD_USER, PASSWORD);
    });

    test('User can add items to cart and get the total items in the cart badge', async ({page}) => {
        const mainPage = new MainPage(page);

        // Add all products
        for(const product of PRODUCTS){
            await mainPage.cartAction("add", product.name);
        }
        // Scroll to the top of the page
        await mainPage.scrollToTop();

        // Remove some products
        const removedProduct = 3;
        for(let i = 0; i < removedProduct; i++){
            await mainPage.cartAction("remove", PRODUCTS[i].name);
        }


        // Assert the cart badge value
        expect(await mainPage.getCartBadgeValue()).toEqual(PRODUCTS.length - removedProduct);
    });

    test.afterEach(async ({page}) => {
        await page.close();
    });
});