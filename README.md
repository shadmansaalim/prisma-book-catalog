# Prisma Book Catalog

### Live Link: https://prisma-book-catalog-iota.vercel.app/

### Application Routes:

#### User

- api/v1/auth/signup (POST)
- api/v1/auth/signin (POST)
- api/v1/users (GET)
- api/v1/users/76ead64f-7f32-4df6-8f01-77900896fff3 (Single GET)
- api/v1/users/76ead64f-7f32-4df6-8f01-77900896fff3 (PATCH)
- api/v1/users/76ead64f-7f32-4df6-8f01-77900896fff3 (DELETE)
- api/v1/profile (GET)

### Category

- api/v1/categories/create-category (POST)
- api/v1/categories (GET)
- api/v1/categories/51fb0389-a4be-4a4c-b544-5e748ca01509 (Single GET)
- api/v1/categories/51fb0389-a4be-4a4c-b544-5e748ca01509 (PATCH)
- api/v1/categories/51fb0389-a4be-4a4c-b544-5e748ca01509 (DELETE)

### Books

- api/v1/books/create-book (POST)
- api/v1/books (GET)
- api/v1/books/617f7140-ae05-4bf2-83f5-4b8d9bb81804/category (GET)
- api/v1/books/282428b2-7c06-4168-8d30-1756cbc638ce (GET)
- api/v1/books/282428b2-7c06-4168-8d30-1756cbc638ce (PATCH)
- api/v1/books/282428b2-7c06-4168-8d30-1756cbc638ce (DELETE)

### Orders

- api/v1/orders/create-order (POST)
- api/v1/orders (GET)
- api/v1/orders/2b45e1d7-b4a5-4c8c-ac70-f54875670235 (GET)
