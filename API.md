# API Documentation

## Base URL
```
http://localhost:3000/api
```

## Endpoints

### Health Check
Get server status

**Request:**
```
GET /health
```

**Response:**
```json
{
  "status": "Server is running",
  "timestamp": "2024-07-23T12:34:56.789Z"
}
```

---

### Get Random Joke
Fetch a random joke from any category

**Request:**
```
GET /jokes/random
```

**Response:**
```json
{
  "success": true,
  "joke": {
    "id": 1,
    "type": "general",
    "setup": "Why did the chicken cross the road?",
    "punchline": "To get to the other side!",
    "categories": []
  },
  "source": "Official Joke API"
}
```

---

### Get Joke by Category
Fetch a joke from a specific category

**Request:**
```
GET /jokes/category/:category
```

**Parameters:**
- `category` (string, required): One of `general`, `programming`, `knock-knock`

**Example:**
```
GET /jokes/category/programming
```

**Response:**
```json
{
  "success": true,
  "joke": {
    "id": 42,
    "type": "programming",
    "setup": "Why do programmers prefer dark mode?",
    "punchline": "Because light attracts bugs!",
    "categories": ["programming"]
  },
  "category": "programming",
  "source": "Official Joke API"
}
```

---

### Get Multiple Jokes
Fetch multiple jokes at once (max 10)

**Request:**
```
GET /jokes/multiple/:count
```

**Parameters:**
- `count` (number, required): Number of jokes (1-10)

**Example:**
```
GET /jokes/multiple/3
```

**Response:**
```json
{
  "success": true,
  "jokes": [
    {
      "id": 1,
      "type": "general",
      "setup": "Why did the chicken cross the road?",
      "punchline": "To get to the other side!"
    },
    {
      "id": 2,
      "type": "programming",
      "setup": "Why do programmers prefer dark mode?",
      "punchline": "Because light attracts bugs!"
    },
    {
      "id": 3,
      "type": "knock-knock",
      "setup": "Knock knock",
      "punchline": "Who's there? Interrupting cow. Interrupting cow wh- MOOO!"
    }
  ],
  "count": 3,
  "source": "Official Joke API"
}
```

---

### Get Available Categories
List all available joke categories

**Request:**
```
GET /jokes/categories
```

**Response:**
```json
{
  "success": true,
  "categories": [
    "general",
    "programming",
    "knock-knock"
  ],
  "description": "Available joke categories"
}
```

---

## Error Handling

All endpoints return errors in the following format:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Error details"
}
```

**HTTP Status Codes:**
- `200` - Success
- `400` - Bad Request
- `500` - Server Error

---

## Example Usage

### Using cURL

```bash
# Random joke
curl http://localhost:3000/api/jokes/random

# Programming joke
curl http://localhost:3000/api/jokes/category/programming

# 5 multiple jokes
curl http://localhost:3000/api/jokes/multiple/5

# Categories
curl http://localhost:3000/api/jokes/categories
```

### Using JavaScript/Fetch

```javascript
// Random joke
fetch('/api/jokes/random')
  .then(res => res.json())
  .then(data => console.log(data.joke))
  .catch(err => console.error(err));

// Joke by category
fetch('/api/jokes/category/programming')
  .then(res => res.json())
  .then(data => console.log(data.joke))
  .catch(err => console.error(err));

// Multiple jokes
fetch('/api/jokes/multiple/3')
  .then(res => res.json())
  .then(data => console.log(data.jokes))
  .catch(err => console.error(err));
```

### Using Python

```python
import requests

# Random joke
response = requests.get('http://localhost:3000/api/jokes/random')
print(response.json())

# By category
response = requests.get('http://localhost:3000/api/jokes/category/programming')
print(response.json())

# Multiple
response = requests.get('http://localhost:3000/api/jokes/multiple/5')
print(response.json())
```

---

## Rate Limiting

Currently, there is no rate limiting. The underlying [Official Joke API](https://official-joke-api.appspot.com/) may have its own rate limits.

---

## External APIs Used

### Official Joke API
- **Base URL:** https://official-joke-api.appspot.com/
- **Documentation:** https://github.com/15Dkatz/official_joke_api
- **Categories:** general, programming, knock-knock
- **License:** Open Source

---

## Future Endpoints

- `POST /gemini/generate` - AI-powered content generation
- `GET /oauth2callback` - YouTube OAuth authentication
- `POST /content/save` - Save generated content
- `GET /content/list` - List saved content
