# Assignment 2 PROG3175

## URL
[Vercel app](https://assignment-2-prog-3175.vercel.app/)

## GITHUB
[Assignment-2-PROG3175](https://github.com/Bandiggo/Assignment-2-PROG3175)

## Endpoints
### POST /greet
- **Description**: Returns a complete greeting message
- **Request Body**:
  ```json
  {
    "timeOfDay": "Morning",
    "language": "English",
    "tone": "Formal"
  }

## Response
- **Response Message**:
  ```json
    {
    "greetingMessage": "Good Morning"
    }

### GET /timesOfDay
- **Description**: Time of day list
- **Request Body**:
  ```json
  {
    "timeOfDay": "Morning"
  }

### GET /languages
- **Description**: Language list
- **Request Body**:
  ```json
  {
    "language": "English"
  }

### How to run console app:
- Navigate to Assignment-2-PROG3175\Assignment 1 PROG3175 Console App AK from terminal
- Run the following code: dotnet run
- Follow the steps to get your greeting