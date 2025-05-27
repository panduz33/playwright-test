import { expect } from '@playwright/test';

class MainPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.pageTitle = page.getByTestId('title');
        this.productImageLink = page.getByTestId('item-$productIndex-title-link');
        this.shoppingCartBadge = page.getByTestId('shopping-cart-badge');
        this.footer = page.getByTestId('footer-copy');
    }

    /**
     * Adds a product to the cart by its name
     * @param {string} action - The action to perform (value : 'add', 'remove')
     * @param {string} productName - The name of the product (e.g., 'Sauce Labs Backpack')
     */
    async cartAction(action, productName) {
        const convertProductName = productName
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[.()]/g, '\\$&'); // Add double backslash to properly escape special characters
        const cartSelector = new RegExp(`^${action == "add" ? "add-to-cart" : "remove"}-${convertProductName}$`);
        await this.page.getByTestId(cartSelector).scrollIntoViewIfNeeded();
        await this.page.getByTestId(cartSelector).click();
    }

    async getCartBadgeValue() {
        const badgeText = await this.shoppingCartBadge.textContent();
        return parseInt(badgeText, 10);
    }

    /**
     * Scrolls to the top of the page smoothly
     */
    async scrollToTop() {
        await this.page.evaluate(() => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        // Wait for the scroll to complete
        await this.page.waitForTimeout(500);
    }
}

export {MainPage};