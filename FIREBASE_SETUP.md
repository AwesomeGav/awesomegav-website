# Firebase Setup Guide for AwesomeGav Website

This guide will help you set up Firebase for the Guides page, Google Authentication, Discord OAuth2, and profile features.

## Prerequisites

- A Google account
- Firebase CLI installed (`npm install -g firebase-tools`)
- A Discord application (for OAuth2)

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

## Step 3: Enable Discord OAuth2 Authentication

### 3.1: Create a Discord Application

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click **New Application**
3. Enter a name (e.g., "AwesomeGav Website")
4. Go to **OAuth2** section
5. Add redirect URLs:
   - `https://awesomegav-website.firebaseapp.com/__/auth/handler`
   - `https://YOUR-DOMAIN/__/auth/handler` (if using custom domain)
6. Copy your **Client ID** and **Client Secret**

### 3.2: Add Discord Provider to Firebase

1. In Firebase Console, go to **Authentication** → **Sign-in method**
2. Click **Add new provider**
3. Select **OpenID Connect** (Discord uses OIDC)
4. Configure with these settings:
   - **Name**: `discord`
   - **Client ID**: Your Discord Client ID
   - **Issuer**: `https://discord.com`
   - **Client Secret**: Your Discord Client Secret
5. Save the configuration

## Step 4: Create Firestore Database

1. In Firebase Console, go to **Firestore Database**
2. Click **Create database**
3. Start in **production mode**
4. Choose a location (e.g., `us-central`)
5. Click **Enable**

## Step 5: Enable Firebase Storage

1. In Firebase Console, go to **Storage**
2. Click **Get started**
3. Start in **production mode**
4. Choose the same location as Firestore
5. Click **Done**

## Step 6: Deploy Firestore and Storage Rules

The security rules are already defined in `firestore.rules` and `storage.rules`. Deploy them:

```bash
firebase login
firebase use --add
# Select your project
firebase deploy --only firestore:rules,storage:rules
```

## Step 7: Get Firebase Configuration

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Scroll down to **Your apps**
3. Click **Web** icon (</>) to add a web app
4. Register app with nickname: `awesomegav-website`
5. Copy the `firebaseConfig` object

## Step 8: Update firebase-config.js

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

## Step 9: Test Locally

You can test the website locally using:

```bash
# Simple HTTP server
python3 -m http.server 8000

# Or use Firebase hosting emulator
firebase serve
```

Then open `http://localhost:8000/account.html` in your browser.

## Step 10: Deploy (Optional - if using Firebase Hosting)

```bash
firebase deploy --only hosting
```

Or continue using GitHub Pages as currently configured.

## Security Notes

- The Firebase configuration in `firebase-config.js` is intentionally public (it's client-side code)
- Security is enforced through **Firestore Security Rules** and **Storage Rules**, not by hiding the config
- Only `zoomzamgamer@gmail.com` can create, edit, or delete guides
- Users can only read/update their own profile data
- Profile pictures are limited to 5MB and specific image formats
- Display names are limited to 50 characters with input sanitization

## Features

### Account Settings Page (`/account.html`)

1. **Profile Management**:
   - Update display name (max 50 characters)
   - Upload profile picture (JPEG, PNG, GIF, WebP - max 5MB)
   - View email address

2. **Discord Integration**:
   - Link Discord account using OAuth2
   - View linked Discord username
   - Relink if needed

3. **Settings**:
   - Email preferences (placeholder)
   - Theme preference (coming soon)
   - Sign out functionality

### Security Features

- **Input Validation**: Display names are validated for length and sanitized for XSS
- **File Validation**: Profile pictures are validated for type and size
- **Access Control**: Users can only modify their own profile data
- **XSS Prevention**: HTML escaping for user-generated content

## Troubleshooting

### "Firebase not loaded" error
Make sure you have internet connection and Firebase scripts can load from CDN.

### "Permission denied" error
1. Check that Firestore rules are deployed correctly
2. Verify you're signed in
3. Check browser console for detailed error messages

### Authentication not working
1. Verify Google sign-in is enabled in Firebase Console
2. Check that your domain is in the authorized domains list
3. Clear browser cache and try again

### Discord linking fails
1. Verify Discord OAuth is configured in Firebase Console as OpenID Connect
2. Check that redirect URLs are correct in Discord Developer Portal
3. Ensure Client ID and Client Secret are correctly entered
4. Check browser console for detailed error messages

## Files Added/Modified

- `guides.html` - Guides page
- `account.html` - Account settings page with Discord OAuth and profile updates
- `firebase-config.js` - Firebase configuration
- `auth.js` - Authentication helper functions
- `firestore.rules` - Firestore security rules (includes user profiles)
- `storage.rules` - Firebase Storage security rules (for profile pictures)
- `firebase.json` - Firebase project configuration (includes storage)
- `.firebaserc` - Firebase project alias
- Navigation updated in: `index.html`, `videos.html`, `games.html`

