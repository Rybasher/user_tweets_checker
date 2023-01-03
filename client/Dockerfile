FROM node:16.14

WORKDIR /usr/client
RUN ls
COPY package.json tsconfig.json ./

RUN npm install

COPY . ./

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
