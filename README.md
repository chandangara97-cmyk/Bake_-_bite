# Bake & Bite

A responsive, static clone of the "Bake & Bite" online bakery/cakes/pizza ordering site and its mobile view, matching the provided mockup. Pure HTML/CSS/JS — no build step, no backend. Cart, checkout, payment and order history are simulated with `localStorage`, so it can be opened directly in a browser or hosted on any static host (GitHub Pages, Netlify, etc.).

## Pages
- `index.html` — Home
- `bakery.html` — Bakery Products (sidebar categories: Bread, Bun & Rolls, Cookies, Pastries, Muffins, Snacks)
- `cakes.html` — Cakes (filters: Birthday, Anniversary, Chocolate, Fresh Cream)
- `pizza.html` — Pizza (filters: Veg, Non-Veg, Special)
- `product.html?id=` — Product detail (ratings, size options, quantity)
- `cart.html` — Cart
- `checkout.html` — Delivery address + payment method
- `payment.html` — Online payment (UPI, Card, Net Banking, Wallet)
- `confirmation.html` — Order placed success page
- `orders.html` — My Orders / tracking, with status filters
- `offers.html` — Special offers
- `contact.html` — Contact + embedded map
- `admin.html` — Admin panel (order management)

## Notes
- Product photos are stock images from Unsplash.
- To reset the demo data (cart, saved order, order history), clear the site's local storage in your browser's dev tools.
