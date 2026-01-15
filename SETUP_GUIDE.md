# Quick Start Guide - Portfolio Backend Setup

## ⚠️ Prerequisites Check

Before you can use the contact form backend, you need to have **Node.js** installed on your computer.

### Check if Node.js is Installed

Open PowerShell and run:
```powershell
node --version
```

If you see a version number (like `v18.x.x`), you're good to go! Skip to **Step 2**.

If you get an error, continue to **Step 1**.

---

## Step 1: Install Node.js

1. **Download Node.js**
   - Go to: https://nodejs.org/
   - Download the **LTS (Long Term Support)** version for Windows
   - The installer is usually named something like `node-v18.x.x-x64.msi`

2. **Run the Installer**
   - Double-click the downloaded file
   - Follow the installation wizard
   - Accept the default settings (make sure "Add to PATH" is checked)
   - Click "Install"

3. **Verify Installation**
   - Close and reopen PowerShell
   - Run: `node --version`
   - You should see the version number

---

## Step 2: Install Project Dependencies

Open PowerShell in the `RK` folder and run:

```powershell
cd C:\Users\Li\Desktop\RK
npm install
```

This will install all required packages (Express, Nodemailer, etc.)

---

## Step 3: Configure Email Settings

You need to create a Gmail App Password to send emails.

### Create Gmail App Password

1. **Go to Google Account Security**
   - Visit: https://myaccount.google.com/security

2. **Enable 2-Step Verification** (if not already enabled)
   - Click on "2-Step Verification"
   - Follow the setup process

3. **Create App Password**
   - Visit: https://myaccount.google.com/apppasswords
   - Select "Mail" as the app
   - Select "Windows Computer" as the device
   - Click "Generate"
   - **Copy the 16-character password** (it looks like: `xxxx xxxx xxxx xxxx`)

### Update .env File

1. **Copy the template file**
   ```powershell
   copy .env.example .env
   ```

2. **Edit the .env file**
   - Open `.env` file in Notepad or any text editor
   - Replace `your_app_password_here` with the 16-character password you just created
   - Remove any spaces from the password
   
   Example:
   ```
   EMAIL_USER=ronaldlimo23@gmail.com
   EMAIL_PASS=abcdabcdabcdabcd
   RECIPIENT_EMAIL=ronaldlimo23@gmail.com
   ```

3. **Save the file**

---

## Step 4: Run the Backend Server

In PowerShell (in the RK folder), run:

```powershell
npm start
```

You should see:
```
==================================================
🚀 Backend server is running on port 3000
📧 Contact form endpoint: http://localhost:3000/api/contact
💚 Health check: http://localhost:3000/api/health
==================================================
✅ Email server is ready to send messages
```

**Keep this terminal window open!** The server needs to stay running.

---

## Step 5: Run the Frontend Server

1. **Open a NEW PowerShell window**
2. **Navigate to the RK folder**
   ```powershell
   cd C:\Users\Li\Desktop\RK
   ```
3. **Run the frontend server**
   ```powershell
   .\run_server.ps1
   ```

Your portfolio website will open automatically in your browser!

---

## Step 6: Test the Contact Form

1. **Scroll down to the Contact section**
2. **Fill out the form** with test data
3. **Click "Send Message"**
4. **You should see:**
   - A loading spinner while sending
   - A green success message when done
   - An email in your inbox (ronaldlimo23@gmail.com)

---

## Troubleshooting

### "npm is not recognized"
- Node.js is not installed or not in PATH
- Reinstall Node.js and make sure "Add to PATH" is checked
- Restart PowerShell after installation

### "Email configuration error"
- Check your `.env` file
- Make sure you're using an App Password, not your regular Gmail password
- Remove any spaces from the password
- Ensure 2-Step Verification is enabled on your Google account

### "Unable to connect to the server"
- Make sure the backend server is running (`npm start`)
- Check that it's running on port 3000
- Look for error messages in the terminal

### "Too many requests"
- The form has rate limiting (5 submissions per 15 minutes)
- Wait 15 minutes and try again
- This is a security feature to prevent spam

### Port 3000 already in use
- Another application is using port 3000
- Edit `.env` file and change `PORT=3000` to `PORT=3001`
- Update the fetch URL in `Ronald Portfolio.html` line 1039 to match the new port

---

## Quick Commands Reference

```powershell
# Install dependencies (run once)
npm install

# Start backend server (keep running)
npm start

# Start frontend server (in a new terminal, keep running)
.\run_server.ps1

# Check if Node.js is installed
node --version

# Check if npm is installed
npm --version
```

---

## What's Running?

When everything is set up correctly, you should have:

1. **Backend Server** (Terminal 1)
   - Running on: http://localhost:3000
   - Handles form submissions
   - Sends emails

2. **Frontend Server** (Terminal 2)
   - Running on: http://localhost:8000
   - Serves your portfolio website
   - Opens automatically in browser

---

## Need Help?

If you encounter any issues:

1. Check the error messages in both terminal windows
2. Verify your `.env` file is configured correctly
3. Make sure both servers are running
4. Try restarting both servers

For direct contact: ronaldlimo23@gmail.com
