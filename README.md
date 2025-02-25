# Nexite

A fullstack website build with next.js

## Features

- next
- tailwindcss
- shadcn
- lucide icon
- better-auth
- prisma
- sqlite
- openrouter
- ai-sdk

## How to use

### 1. initiate and install dependences

```sh
git clone https://github.com/geoochi/nexite.git
pnpm install
```

### 2. set environment

```sh
cp .env.example .env
```

and then change the keys of

- [better-auth key](https://www.better-auth.com/docs/installation#set-environment-variables)
- this app url (in this demo is localhost)
- database url (in this demo is local sqlite)
- email name and address (for resend)
- [resend api key](https://resend.com/api-keys) (use to send email automatically if you have a domain)

### 3. generate database

```sh
pnpm prisma db push
```

and then you can find a database file in ./prisma/dev.db

### 4. local development

start server and moniter your database

terminal 1:

```sh
pnpm b
pnpm p
```

terminal 2:

```sh
pnpm q
```

### 5. production deploy (optional)

start server on localhost:3000 and database monitor on localhost:5556

```sh
chmod +x ./start
./start
```

stop server and monitor

```sh
chmod +x ./stop
./stop
```
