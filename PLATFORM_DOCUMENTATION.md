# Platform Documentation

## Architecture
The platform follows a classic Client-Server architecture:
- **Frontend**: A Single Page Application (SPA) built with React.
- **Backend**: A Node.js Express server handling API requests and database operations.
- **Database**: SQLite for local persistence of tweets, media, and analytics.

## Data Models
### Tweets
- `id`: Unique identifier.
- `content`: The text of the tweet.
- `status`: draft, scheduled, or published.
- `scheduled_at`: ISO timestamp for scheduling.
- `media_ids`: JSON array of associated media.

### Media
- `id`: Unique identifier.
- `url`: Public URL of the asset.
- `type`: image, video, or gif.

### Analytics
- `impressions`, `likes`, `retweets`, `replies` tracked per day.

## AI Integration
We use Gemini 3 Flash for:
- Content generation based on topics.
- Rewriting content for specific tones.
- Thread generation.
- Trend analysis and suggestions.
