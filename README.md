# Patient Registration App
Light it patient registration app challenge


## Requirements
- Docker Desktop (Windows)
- Node.js 18+
- MySQL (via Docker)

## Setup & Run

1. **Clone the repository:**

2. **Start the application:*
   docker-compose up --build

3. **Access the application:**
   - Frontend: [http://localhost:3001](http://localhost:3000)
   - Backend: [http://localhost:5001](http://localhost:5000)

4. **Stop the application:**
   docker-compose down

## Environment Variables
.env:
```
PORT=5000
DB_HOST=db
DB_PORT=3306
DB_USER=root
DB_PASSWORD=root
DB_NAME=patient_db
MAILTRAP_HOST=sandbox.smtp.mailtrap.io
MAILTRAP_PORT=2525
MAILTRAP_USER=your_mailtrap_user
MAILTRAP_PASS=your_mailtrap_pass
```



