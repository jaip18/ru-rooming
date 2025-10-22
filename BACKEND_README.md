# RU Rooming - Backend Setup Guide

## 🚀 Backend Architecture

The backend is built with:
- **Next.js API Routes** - Serverless API endpoints
- **Weaviate Vector Database** - For user profiles and matching
- **Auth0** - User authentication and authorization
- **TypeScript** - Type-safe development

## 📊 Database Schema

### UserProfile Class
- Stores user profiles with vector embeddings
- Includes preferences, location, budget, lifestyle data
- Uses OpenAI embeddings for semantic search

### Match Class
- Tracks swipe actions and compatibility scores
- Manages match status (pending, matched, rejected)
- Records mutual likes for matching

### Message Class
- Stores chat messages between matched users
- Tracks read status and timestamps
- Enables real-time messaging

## 🔧 Setup Instructions

### 1. Install Dependencies
```bash
cd /Users/jaipatel/status/RURooming/ru-rooming
npm install
```

### 2. Weaviate Setup & AWS Bedrock Setup

#### Option A: Weaviate Cloud (Recommended)
1. Sign up at [Weaviate Cloud](https://console.weaviate.cloud/)
2. Configure the cluster to use an AWS Bedrock embedding model (or an alternative, like OpenAI) for vectorization.
3. Get your cluster URL and API key
4. Add to `.env.local`:
```bash
WEAVIATE_URL=your-cluster-url
WEAVIATE_API_KEY=your-api-key
OPENAI_API_KEY=your-openai-key
```

5. (Optional) AWS Credentials: If your Weaviate instance is running in a location that requires direct AWS authentication to access Bedrock models, you will need to configure your AWS Access Key ID and Secret Access Key.

#### Option B: Local Weaviate
1. Install Docker
2. Run Weaviate locally:
```bash
docker run -p 8080:8080 -p 50051:50051 \
  -e QUERY_DEFAULTS_LIMIT=25 \
  -e AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED=true \
  -e PERSISTENCE_DATA_PATH='/var/lib/weaviate' \
  -e DEFAULT_VECTORIZER_MODULE='none' \
  -e ENABLE_MODULES='text2vec-openai' \
  -e CLUSTER_HOSTNAME='node1' \
  semitechnologies/weaviate:latest
```

### 3. Initialize Database
```bash
npm run init-db
```

### 4. Environment Variables
Create `.env.local` with:
```bash
# Auth0 Configuration
AUTH0_SECRET=your-auth0-secret
AUTH0_BASE_URL=http://localhost:3000
AUTH0_ISSUER_BASE_URL=https://your-domain.auth0.com
AUTH0_CLIENT_ID=your-auth0-client-id
AUTH0_CLIENT_SECRET=your-auth0-client-secret

# Weaviate Configuration
WEAVIATE_URL=your-weaviate-url
WEAVIATE_API_KEY=your-weaviate-api-key
OPENAI_API_KEY=your-openai-api-key
```

## 🔌 API Endpoints

### Authentication
- `GET /api/auth/login` - Auth0 login
- `GET /api/auth/logout` - Auth0 logout
- `GET /api/auth/callback` - Auth0 callback

### User Profiles
- `GET /api/profile` - Get current user's profile
- `POST /api/profile` - Create/update profile
- `DELETE /api/profile` - Deactivate profile

### Matching
- `GET /api/discover` - Get potential matches
- `POST /api/swipe` - Record swipe action
- `GET /api/matches` - Get user's matches

### Chat
- `GET /api/chat/conversations` - Get all conversations
- `GET /api/chat/messages?userId=xxx` - Get messages with user
- `POST /api/chat/messages` - Send message

## 🧠 Matching Algorithm

The matching algorithm considers:

1. **Budget Compatibility (30%)**
   - Overlapping budget ranges
   - Higher overlap = higher score

2. **Location Compatibility (25%)**
   - Same neighborhood = 100%
   - Same city = 80%
   - Distance-based scoring

3. **Lifestyle Compatibility (20%)**
   - Common lifestyle preferences
   - Quiet, social, party, work-focused

4. **Interests Compatibility (15%)**
   - Shared interests and hobbies
   - Fitness, music, cooking, travel, etc.

5. **Habits Compatibility (10%)**
   - Living habits alignment
   - Smoking, pets, guests, cleaning

## 🚀 Deployment

### Vercel Deployment
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production
```bash
AUTH0_BASE_URL=https://your-app.vercel.app
WEAVIATE_URL=your-production-weaviate-url
WEAVIATE_API_KEY=your-production-api-key
```

## 🔍 Testing the API

### Test Profile Creation
```bash
curl -X POST http://localhost:3000/api/profile \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "age": 25,
    "bio": "Looking for a roommate",
    "location": {
      "city": "San Francisco",
      "neighborhood": "Mission District",
      "coordinates": [37.7749, -122.4194]
    },
    "preferences": {
      "budget": {"min": 1500, "max": 2200},
      "moveInDate": "2024-02-01",
      "duration": "long",
      "lifestyle": ["quiet", "work-focused"],
      "habits": ["cleaning"],
      "interests": ["fitness", "cooking"]
    }
  }'
```

### Test Discovery
```bash
curl http://localhost:3000/api/discover?limit=5
```

## 🛠️ Development

### Running the Development Server
```bash
npm run dev
```

### Database Management
```bash
# Initialize schemas
npm run init-db

# View Weaviate console (if running locally)
open http://localhost:8080
```

## 📈 Performance Considerations

- **Vector Search**: Optimized for semantic similarity
- **Pagination**: All endpoints support limit/offset
- **Caching**: Consider Redis for production
- **Rate Limiting**: Implement for production use

## 🔒 Security

- **Authentication**: Auth0 handles user auth
- **Authorization**: API routes check user sessions
- **Data Validation**: Input validation on all endpoints
- **CORS**: Configured for frontend domain

## 🐛 Troubleshooting

### Common Issues

1. **Weaviate Connection Error**
   - Check WEAVIATE_URL and WEAVIATE_API_KEY
   - Ensure cluster is running

2. **Auth0 Errors**
   - Verify callback URLs in Auth0 dashboard
   - Check AUTH0_SECRET is set

3. **OpenAI API Errors**
   - Ensure OPENAI_API_KEY is valid
   - Check API usage limits

### Debug Mode
Set `NODE_ENV=development` for detailed error messages.

## 📚 Next Steps

1. **Real-time Features**: Add WebSocket support for live chat
2. **Advanced Matching**: Implement ML-based recommendations
3. **Image Upload**: Add profile photo functionality
4. **Push Notifications**: Notify users of new matches/messages
5. **Analytics**: Track user engagement and matching success

## 🤝 Contributing

This is a portfolio project. Feel free to fork and enhance for your own use!
