# RentalCar

Frontend for a car rental service. Browse the catalog, filter cars by brand, price and mileage, open
car details in a new tab and send a booking request.

**Live demo:** <вставте посилання з Vercel>

## Features

- Home page with a hero banner and a "View Catalog" call to action
- Catalog with backend filtering by brand, price (up to a chosen value) and mileage range (from /
  to)
- "Load more" pagination built on `useInfiniteQuery`, which respects active filters
- Car details page (opens in a new tab) with specifications, rental conditions and features
- Booking form with validation and a success notification
- Loading, empty and error states

## Tech stack

Next.js (App Router), TypeScript, TanStack Query, Axios, React Hook Form, React Hot Toast, React
Icons, CSS Modules.

## Getting started

```bash
git clone https://github.com/Art-Pasha/rental-car.git
cd rental-car
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command          | Description                   |
| ---------------- | ----------------------------- |
| `npm run dev`    | Start the dev server          |
| `npm run build`  | Create a production build     |
| `npm run start`  | Run the production build      |
| `npm run lint`   | Run ESLint                    |
| `npm run format` | Format the code with Prettier |

## API

Backend: <https://car-rental-api.goit.study/api-docs/>

| Method | Endpoint                         | Usage                         |
| ------ | -------------------------------- | ----------------------------- |
| GET    | `/cars`                          | Cars list with filters, pages |
| GET    | `/cars/filters`                  | Brands and price range        |
| GET    | `/cars/{id}`                     | Car details                   |
| POST   | `/cars/{carId}/booking-requests` | Booking request               |

## Author

Pavlo Artemenko — [GitHub](https://github.com/Art-Pasha)
