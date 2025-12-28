# API Contract for AI Doctor

## Base URL
Backend Base URL: `http://localhost:3000` (Defined in `.env` as `EXPO_PUBLIC_BACKEND_URL`)

## Endpoints

### 1. Authentication

#### Login
- **Endpoint**: `POST /api/auth/login`
- **Request Body**:
  ```json
  {
    "email": "user@example.com", 
    "phone": "+1234567890",
    "method": "email" // or "phone"
  }
  ```
- **Response**:
  ```json
  {
    "token": "jwt_token_here",
    "user": {
      "id": "123",
      "name": "John Doe",
      "profile_completed": true
    }
  }
  ```

#### Register/Update Profile
- **Endpoint**: `POST /api/auth/profile`
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "age": 30,
    "gender": "Male",
    "height": 175,
    "weight": 70,
    "medical_history": ["Asthma"]
  }
  ```
- **Response**: `200 OK`

### 2. Symptom Checking

#### Analyze Symptoms
- **Endpoint**: `POST /api/symptoms/analyze`
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**:
  ```json
  {
    "symptoms": "Headache, Fever",
    "severity": "High",
    "duration": "2 days"
  }
  ```
- **Response**:
  ```json
  {
    "condition": "Migraine",
    "risk_level": "Medium",
    "advice": "Rest in a dark room...",
    "should_visit_doctor": true
  }
  ```

### 3. AI Chat

#### Send Message
- **Endpoint**: `POST /api/chat`
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**:
  ```json
  {
    "message": "I feel dizzy when I stand up",
    "context_id": "session_123"
  }
  ```
- **Response**:
  ```json
  {
    "reply": "This could be orthostatic hypotension. Are you hydrated?",
    "context_id": "session_123"
  }
  ```
