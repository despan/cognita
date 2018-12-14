# Cognita

## API

Check [API Blueprint](https://cognita.docs.apiary.io/) for details.

*Note: Blueprint defines the next stable release*

## Usage

Prerequisites:
- Docker
- docker-compose

Run from root directory

```sh
docker-compose up
```

### Development

Start MongoDB service

```sh
docker-compose up -d mongodb
```

Start dev. servers from container

```
cd containers/api-server
npm run dev
```
