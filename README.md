# React Quickstart Tic-Tac-Toe

Project startup with React and Docker.

By leveraging the power of Docker you don't need to install Node JS or Npx in your computer. You just run everything from a Docker container.

## Requirements

* Git;

* Docker;

* Docker Compose.

## Installation

1. Clone the repository:

```
git clone git@github.com:fernandohu/quickstart-react-tictactoe.git
```

2. Use Docker to run `npm install` on the react source code at src/ folder:

```
docker-compose run --rm react npm install
```

3. Run `docker compose` to start up the development environment:

```
docker-compose up
```

After running `docker-compose` up the application should be accessible at http://localhost:3000.


## Developing

The source code resides at `/src`. Every time you change a file inside this folder, the browser will be automatically updated with the new content (thanks to Webpack). 

The files were generated with `ng create`. If you wish, you can remove everything in this folder and regenerate it by your way.

## Executing ng or npm 

You can execute `npx` or `npm` commands by calling the `react` service:

```
docker-compose run --rm react npx XXX
```

or

```
docker-compose run --rm react npm XXX
```

The commands will be always executed in the `src` folder.

## Connect to the container

```
docker exec -it react bash
```
