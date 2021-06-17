# VAS boilerplate 

# Quick Setup
1) Mass replace `appName` with your desired project name.
2) Install dependencies for better DX: `yarn`
3) Either run the project with docker-compose: `docker-compose up` or locally with `yarn dev` (must have mongo-server running and listening to the default port 27017)


# Commands
```bash
yarn  # installs both api and web dependencies
yarn dev # starts api and web in development mode
yarn cleanup # removes node_modules and yarn.lock
```

