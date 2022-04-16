# Dockerfile and docker-compose.yml are based off of and extended from https://dev.to/karanpratapsingh/dockerize-your-react-app-4j2e

FROM node:14-alpine AS development
ENV NODE_ENV development

# Add a work directory
# WORKDIR is similar to cd. From now on "." will refer to this ./app directory because we have "CDd" into it
WORKDIR /app

# Cache and install dependencies
COPY package.json .
COPY package-lock.json .
RUN npm install

# Copies project files to container's ./app directory
# (First "." means this route path. Second "." means ./app because we "CDd" into that directoryw ith WORKDIR above.)
COPY . .
# Expose port on container - 3000 is the default port React apps listen on
EXPOSE 3000

# Start the app
CMD [ "npm", "start" ]