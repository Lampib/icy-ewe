# Preco

## Installation
```shell
# Install dependencies
yarn;

# Migrate the database
yarn run migrate;

# Seed the database
knex seed:run;
```

Then copy `example.env` to `.env` and modify the relevant details.

## Running
```shell
# With debug
DEBUG=preco:* yarn run start;

# Withough debug
yarn run start;
```

## Renew SSL
```shell
/opt/letsencrypt/letsencrypt-auto --no-bootstrap renew
```
