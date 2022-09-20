FROM node:16

WORKDIR /backend

COPY package.json ./
COPY tsconfig.json ./

RUN npm install

COPY . .

EXPOSE 3030
CMD npm run dev