# Preco

## Installation
```shell
# Install dependencies
yarn;

# Migrate the database
yarn run migrate;
```

Then copy `example.env` to `.env` and modify the relevant details.

## Running
```shell
# With debug
DEBUG=icy-ewe:* yarn run start;

# Withough debug
yarn run start;
```

## Renew SSL
```shell
/opt/letsencrypt/letsencrypt-auto --no-bootstrap renew
```
