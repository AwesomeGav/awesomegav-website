# Firebase Setup Guide for AwesomeGav Website

This guide will help you set up Firebase for the Guides page and Google Authentication.

## Prerequisites

- A Google account
- Firebase CLI installed (`npm install -g firebase-tools`)

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project" or select existing project
3. Enter project name: `awesomegav-website`
4. Follow the setup wizard
5. Enable Google Analytics (optional)

## Step 2: Enable Google Authentication

1. In Firebase Console, go to **Authentication** → **Sign-in method**
2. Click on **Google** provider
3. Enable it
4. Add your domain (e.g., `awesomegav.github.io`) to authorized domains
5. Save

## Step 3: Create Firestore Database

1. In Firebase Console, go to **Firestore Database**
2. Click **Create database**
3. Start in **production mode**
4. Choose a location (e.g., `us-central`)
5. Click **Enable**

## Step 4: Deploy Firestore Rules

The security rules are already defined in `firestore.rules`. Deploy them:

```bash
firebase login
firebase use --add
# Select your project
firebase deploy --only firestore:rules
```

## Step 5: Get Firebase Configuration

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Scroll down to **Your apps**
3. Click **Web** icon (</>) to add a web app
4. Register app with nickname: `awesomegav-website`
5. Copy the `firebaseConfig` object

## Step 6: Update firebase-config.js

Replace the placeholder values in `firebase-config.js` with your actual Firebase configuration:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

## Step 7: Test Locally

You can test the website locally using:

```bash
# Simple HTTP server
python3 -m http.server 8000

# Or use Firebase hosting emulator
firebase serve
```

Then open `http://localhost:8000/guides.html` in your browser.

## Step 8: Deploy (Optional - if using Firebase Hosting)

```bash
firebase deploy --only hosting
```

Or continue using GitHub Pages as currently configured.

## Security Notes

- The Firebase configuration in `firebase-config.js` is intentionally public (it's client-side code)
- Security is enforced through **Firestore Security Rules**, not by hiding the config
- Only `zoomzamgamer@gmail.com` can create, edit, or delete guides
- All users can read guides without authentication
- Authentication is required to create/edit guides

## Usage

1. Navigate to `/guides.html`
2. View guides (anyone can do this)
3. Click "Sign In" to authenticate with Google
4. If you're the admin (`zoomzamgamer@gmail.com`), you'll see "Create New Guide" button
5. Create, edit, or delete guides as needed

## Troubleshooting

### "Firebase not loaded" error
Make sure you have internet connection and Firebase scripts can load from CDN.

### "Permission denied" error
1. Check that Firestore rules are deployed correctly
2. Verify you're signed in with the admin email
3. Check browser console for detailed error messages

### Authentication not working
1. Verify Google sign-in is enabled in Firebase Console
2. Check that your domain is in the authorized domains list
3. Clear browser cache and try again

## Files Added/Modified

- `guides.html` - New Guides page
- `firebase-config.js` - Firebase configuration
- `auth.js` - Authentication helper functions
- `firestore.rules` - Firestore security rules
- `firebase.json` - Firebase project configuration
- `.firebaserc` - Firebase project alias
- Navigation updated in: `index.html`, `videos.html`, `games.html`
