# cointracker-assessment

## Getting Started

Create a .env file in /server folder with the following variable

```
DATABASE_URL="postgresql://postgres:password@localhost:5432/cointracker?schema=public"
```

### Setup backend

Navigate to /server

```bash
cd server
```

Install dependencies

```bash
npm i
```

Start database

```bash
npm run db:start
```

Initialize db

```bash
npx prisma db push
```

Build & start server

```bash
npm run start
```

### Setup frontend

In a separate window navigate to /frontend

```bash
cd frontend
```

Install dependencies

```bash
npm i
```

Start webapp

```bash
npm run dev
```

Go to http://localhost:3000/

### Screenshot
![Recorded_screen_1_V1](https://github.com/user-attachments/assets/570fa270-7c06-445b-9083-8e808e8f8a70)

