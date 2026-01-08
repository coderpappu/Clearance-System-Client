# Environment Configuration Guide

## Overview

This application uses environment variables to manage configuration across different environments (development, production, etc.).

## Setup Instructions

### 1. Create Environment Files

Copy the example files to create your environment configuration:

```bash
# For development
cp .env.example .env

# For production
cp .env.production.example .env.production
```

### 2. Configure Variables

Edit the `.env` file with your local configuration:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

For production, edit `.env.production`:

```env
VITE_API_BASE_URL=https://your-domain.com/api
```

## Available Variables

### VITE_API_BASE_URL

- **Type**: String (URL)
- **Required**: Yes
- **Description**: The base URL for your backend API
- **Development**: `http://localhost:3000/api`
- **Production**: `https://ctgpolyclearance.com/api`

## Usage in Code

### RTK Query (Recommended)

All API calls should use RTK Query hooks defined in `src/api/apiSlice.js`:

```javascript
import { useGetStudentListQuery } from "../api/apiSlice";

const { data, isLoading } = useGetStudentListQuery();
```

### Direct API Calls (For Special Cases)

If you need to make direct API calls (e.g., file downloads), use the config utility:

```javascript
import { config, getApiUrl } from "../utils/config";

// Get base URL
const baseUrl = config.apiBaseUrl;

// Get full URL for an endpoint
const url = getApiUrl("/endpoint");
```

### Image URLs

For displaying images from the API:

```javascript
import { config } from "../utils/config";

<img src={`${config.apiBaseUrl}${imagePath}`} />;
```

## Best Practices

1. **Never hardcode URLs** - Always use environment variables
2. **Use RTK Query** - All API calls should go through RTK Query
3. **Centralize configuration** - Use `src/utils/config.js` for all config access
4. **Don't commit .env files** - Only commit .env.example files
5. **Document new variables** - Update this file when adding new environment variables

## Building for Production

The application automatically uses `.env.production` when building:

```bash
npm run build
```

## Troubleshooting

### API calls failing

- Check that `VITE_API_BASE_URL` is set correctly
- Ensure the URL doesn't have a trailing slash
- Verify the backend server is running

### Environment variables not updating

- Restart the development server after changing `.env` files
- Clear browser cache if necessary
- Rebuild the application for production

## Security Notes

- Never commit sensitive data to `.env` files
- Use different values for development and production
- Ensure `.env` files are in `.gitignore`
- Rotate API keys and secrets regularly
