# Red & White Market — Task 2

A responsive demo e-commerce storefront built with HTML, CSS and vanilla JavaScript for the Datheon Full Stack Web Development Internship.

## Features
- Fetches products from FakeStoreAPI (`https://fakestoreapi.com/products`)
- Product cards with images, prices, ratings and badges
- Search, category filters and sorting
- Extended shop departments: Fashion, Electronics, Sports, Services, Books, Toys, Grocery, Beauty, Home & Decor, Kids, Mobiles, Gifting and Deal Zone
- Shopping cart drawer with add, remove, increment and decrement actions
- Live subtotal, 5% estimated tax, shipping (free above ₹2,000; otherwise ₹79) and total calculation
- Cart, customer demo profile, theme and order history stored in localStorage
- Address form and simulated order confirmation
- Responsive layout and light/dark mode

## Run locally
1. Open this folder in VS Code.
2. Start it with the Live Server extension, or open `index.html` in a browser.
3. An internet connection is required for FakeStoreAPI, Google Fonts and remote product images.

## Important implementation note
FakeStoreAPI provides a limited sample catalog with four API categories. This project maps its clothing, electronics and jewellery products into the storefront and supplements them with clearly illustrative demo products for the additional requested departments. The supplementary items are sample catalog content, not live inventory.

## Checkout note
Checkout is simulated for this internship project. No payment gateway, real account authentication, inventory reservation or delivery service is connected. Customer details and orders are stored only in the browser's localStorage.

## Tech stack
HTML5 · CSS3 · JavaScript · FakeStoreAPI · localStorage
