FROM node:16.14

WORKDIR /usr/server
RUN ls
COPY package.json tsconfig.json ./

RUN npm install

COPY . ./

RUN npm run build

EXPOSE 5000

CMD ["npm", "run", "start"]
