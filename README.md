# Preco

## Installation
First copy `example.env` to `.env` and modify the relevant details.

Then:
```shell
# Install dependencies
yarn;

# Migrate the database
yarn run migrate;

# Seed the database
knex seed:run;
```

## Running
```shell
yarn run start
```

## Renew SSL
```shell
/opt/letsencrypt/letsencrypt-auto --no-bootstrap renew
```
