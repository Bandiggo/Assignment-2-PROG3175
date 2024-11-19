# Assignment 2 PROG3175

## URL
[http://localhost:4040](http://localhost:4040)

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