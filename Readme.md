## **Technologies Used**
- **Node.js:** For creating the backend API and managing server operations.
- **Prisma:** For ORM-based interactions with the database.
- **MySQL:** For storing cinema and seat data.
- **Express:** To handle API routing and HTTP requests.

## **How to Run the Project**

### 1. **Clone the Repository**

```bash
git clone 
cd 
```

### 2. **Install Dependencies**
```bash
yarn
```
### 3. **Configure the Database**
- Set up your MySQL database and configure the connection in prisma/schema.prisma
- Run the following command to generate the Prisma client:
```bash
npx prisma generate
```

### 4. **Create the Database Schema**
- Run the Prisma migration command to create the necessary tables in your database
```bash
npx prisma migrate dev
```

### 5. **Start the Server**
- To start the server, run:
```bash
yarn run start
```

## **API Endpoints**

- Create Cinema - /api/v1/cinema/create
- Purchase Seat - api/v1/cinema/purchase/seat
- Purchase Consecutive Seat - api/v1/cinema/purchase/consecutive-seats