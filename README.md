# Infrastructure as Code ... Vegan-style - DEMO - Webapp

> This repository contains the Webapp source code of the Demo project

## Details

## Local Development

- Pull remote project configuration from Cloudflare

  ```sh
  pnpx wrangler pages download config <PROJECT_NAME>
  ```

- Start local development server

  ```sh
  pnpx wrangler pages dev
  ```

### Setup Database

- Create `votes` table in local database

  ```sh
  pnpx wrangler d1 execute DB --local --file=database/01_add_table_votes.sql
  ```
