# Infrastructure as Code ... Vegan-style - DEMO - Webapp

> This repository contains the Webapp source code of the Demo project for "Infrastructure as Code ... Vegan-style" presentation

## Details

This project is built using the following technologies:

1. Frontend:

   - HTML, CSS, and JavaScript for the user interface
   - [Tailwind CSS](https://tailwindcss.com/) for styling and responsive design
   - [Vite](https://vitejs.dev/) as the build tool and development server

2. Backend:

   - [Cloudflare Pages](https://www.cloudflare.com/developer-platform/pages/) for hosting and serverless server-side logic
   - [Cloudflare D1](https://www.cloudflare.com/developer-platform/d1/) as the database

3. Security:

   - [Cloudflare Turnstile](https://www.cloudflare.com/products/turnstile/) for CAPTCHA protection

4. Development Tools:
   - [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/) for local development and deployment
   - [pnpm](https://pnpm.io/) as the package manager

This stack allows for a serverless, edge-computing approach, leveraging Cloudflare's infrastructure for high performance and scalability.

## Getting Started

- Pull remote project configuration from Cloudflare

  ```sh
  pnpx wrangler pages download config <PROJECT_NAME>
  ```

- Create `votes` table in remote database

  ```sh
  pnpx wrangler d1 execute DB --remote --file=database/01_add_table_votes.sql
  ```

### Local Development

- Install dependencies

  ```sh
  pnpm install
  ```

- Build frontend UI

  ```sh
  pnpm build
  ```

- Create `votes` table in local database

  ```sh
  pnpx wrangler d1 execute DB --local --file=database/01_add_table_votes.sql
  ```

- Start local development server

  ```sh
  pnpx wrangler pages dev
  ```
