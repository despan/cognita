# Cognita

Identity server.

## API

Check [API Blueprint](https://cognita.docs.apiary.io/) for details.

*Note: Blueprint defines the next stable release*

## Usage

Prerequisites:
- Git
- Docker
- docker-compose

Run from root directory

Clone this repo
```sh
git clone https://github.com/despan/cognita
cd cognita
```

Run
```sh
docker-compose up
```

On build completion open your browser at <http://localhost:8080/> to preview.

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

### Integration tests

Run http tests from root directory

```sh
npm test
```

## Tech. Stack

- MongoDB
- Node.js w/ Koa
- React + Redux
