# Ronald Portfolio Backend

Backend API for the portfolio contact form.

## Deployment to Render

### Step 1: Create a GitHub Repository

1. Create a new repository on GitHub for the backend
2. Push only the `backend/` folder contents:

```bash
cd backend
git init
git add .
git commit -m "Initial backend setup"
git remote add origin https://github.com/YOUR_USERNAME/ronald-portfolio-backend.git
git push -u origin main
```

### Step 2: Deploy to Render

1. Go to [render.com](https://render.com) and sign up/login
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure the service:
   - **Name:** `ronald-portfolio-backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   
### Step 3: Set Environment Variables

In Render dashboard, go to **Environment** and add:

| Key | Value |
|-----|-------|
| `EMAIL_USER` | `ronaldlimo23@gmail.com` |
| `EMAIL_PASS` | `dgzn xkhv uwjh bypm` |
| `RECIPIENT_EMAIL` | `ronaldlimo23@gmail.com` |

### Step 4: Get Your Backend URL

After deployment, Render will give you a URL like:
```
https://ronald-portfolio-backend.onrender.com
```

### Step 5: Update Frontend

Edit `Ronald Portfolio.html` and replace:
```javascript
const BACKEND_URL = 'https://YOUR_RENDER_URL.onrender.com';
```

With your actual Render URL:
```javascript
const BACKEND_URL = 'https://ronald-portfolio-backend.onrender.com';
```

## Local Development

```bash
npm install
npm start
```

Server runs on `http://localhost:3000`

## API Endpoints

- `GET /` - API info
- `GET /api/health` - Health check
- `POST /api/contact` - Submit contact form
