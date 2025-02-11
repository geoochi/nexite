# Nexite

A fullstack website dev and build with next.js

## Features

- next
- tailwindcss
- shadcn
- lucide icon
- better-auth
- prisma
- sqlite

## How to use

1. initiate and install dependences

```sh
git clone https://github.com/geoochi/next-site.git
pnpm install
```

2. set environment

```sh
cp .env.example .env
```

and then change the keys of

- [better-auth key](https://www.better-auth.com/docs/installation#set-environment-variables)
- this app url (local or remote)
- database url (local or remote)
- email name and address
- [resend api key](https://resend.com/api-keys) (use to send email automatically if you have a domain)

3. generate database

```sh
pnpx prisma db push
```

and then you can find a database file in ./prisma/dev.db

4. start server and moniter your database

terminal 1:

```sh
pnpm next dev --turbopack
```

terminal 2:

```sh
pnpx prisma studio
```
