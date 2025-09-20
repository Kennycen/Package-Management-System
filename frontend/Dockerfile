ARG NODE_VERSION=20.16.0

FROM node:${NODE_VERSION}-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN --mount=type=cache,target=/root/.npm \
    npm ci

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]




#ARG NODE_VERSION=20.16.0

#FROM node:${NODE_VERSION}-alpine

#ENV NODE_ENV development


#WORKDIR /usr/src/app

#RUN --mount=type=bind,source=package.json,target=package.json \
#    --mount=type=bind,source=package-lock.json,target=package-lock.json \
#    --mount=type=cache,target=/root/.npm \
#    npm ci 

#COPY . .

#EXPOSE 5173

#CMD npm run dev
