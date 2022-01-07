FROM node:lts-alpine AS builder
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ./src/ ./src/
COPY package.json package-lock.json* tsconfig.json* tslint.json* .eslintrc.js* .eslintignore ./
RUN npm i --include=dev
RUN npm run build

FROM node:lts-alpine
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/dist/ /usr/src/app/package.json* /usr/src/app/package-lock.json* ./
RUN npm i --include=prod 
CMD ["node", "index.js"]