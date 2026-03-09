# Backend API Specification

## Authentication
- `POST /api/auth/login`: Mock login.
- `POST /api/auth/connect-twitter`: Placeholder for OAuth.

## Tweets
- `GET /api/tweets`: Fetch all tweets.
- `POST /api/tweets`: Create a new tweet/draft.
- `DELETE /api/tweets/:id`: Remove a tweet.

## Media
- `GET /api/media`: Fetch media library.
- `POST /api/media`: Add new media asset.

## Analytics
- `GET /api/analytics`: Fetch performance data.

## AI (Proxied via Gemini Service)
- Handled client-side using the `@google/genai` SDK for low latency.
