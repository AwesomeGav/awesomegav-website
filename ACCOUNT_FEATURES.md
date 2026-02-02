# Account Features Documentation

This document describes the new account management features added to the AwesomeGav website.

## Overview

The account settings page (`/account.html`) now includes:
- Discord account linking via OAuth2
- Profile picture upload
- Display name updates
- Secure data storage in Firebase Firestore and Storage

## Features

### 1. Discord Account Linking

Users can link their Discord account to their AwesomeGav website account.

#### How it works:
1. Click the "🎮 Link Discord Account" button
2. A popup window opens for Discord OAuth2 authentication
3. Authorize the application
4. Discord account information is saved to your profile

#### Stored information:
- Discord User ID
- Discord Username
- Discord Avatar URL

#### Security:
- Uses Firebase's OAuthProvider with OpenID Connect
- Only the authenticated user can link to their own account
- Discord credentials are never stored

### 2. Profile Picture Upload

Users can upload a custom profile picture.

#### Supported formats:
- JPEG (`.jpg`, `.jpeg`)
- PNG (`.png`)
- GIF (`.gif`)
- WebP (`.webp`)

#### Restrictions:
- Maximum file size: 5MB
- Only image files are accepted
- Files are validated on both client and server side

#### How it works:
1. Click "📷 Upload New Picture"
2. Select an image file from your device
3. File is validated for type and size
4. Image is uploaded to Firebase Storage
5. Profile picture is updated automatically

#### Storage:
- Images are stored in Firebase Storage at `/profile-pictures/{userId}/`
- Each user can only access their own images
- Older images are retained (not automatically deleted)

### 3. Display Name Updates

Users can customize their display name.

#### Restrictions:
- Maximum 50 characters
- Cannot be empty
- Input is sanitized to prevent XSS attacks

#### How it works:
1. Enter a new display name in the text field
2. Click "Save Changes"
3. Name is validated
4. Updated in both Firebase Auth and Firestore
5. Displayed throughout the site

## Data Structure

### Firestore User Profile Document
```
/users/{userId}
  - displayName: string (max 50 chars)
  - email: string (must match auth email)
  - photoURL: string (URL to profile picture)
  - discordId: string (optional)
  - discordUsername: string (optional)
  - discordAvatar: string (optional)
  - updatedAt: timestamp
```

## Security Considerations

### Input Validation
- All user inputs are validated on the client side
- Firestore security rules provide server-side validation
- Display names are sanitized using `escapeHtml()` function
- File uploads are validated for type and size

### Access Control
- Users can only read/write their own profile data
- Firestore rules enforce authentication requirements
- Storage rules prevent unauthorized access

### XSS Prevention
```javascript
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}
```

### File Upload Security
- File type validation (MIME type checking)
- File size limits (5MB maximum)
- Storage rules enforce restrictions
- Files are stored in user-specific directories

## Error Handling

The implementation includes error handling for:
- Network failures
- Permission denied errors
- Invalid file types/sizes
- Authentication failures
- Firestore/Storage errors

Users receive appropriate error messages for each scenario.

## Browser Compatibility

Tested and working on:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

Requires:
- JavaScript enabled
- Support for ES6+ features
- LocalStorage enabled
- Cookies enabled (for Firebase Auth)

## Setup Requirements

To enable these features:

1. **Firebase Authentication**
   - Enable Google sign-in
   - Configure Discord OAuth2 (OpenID Connect)
   - Add authorized domains

2. **Firestore Database**
   - Deploy `firestore.rules`
   - Ensure user profiles collection exists

3. **Firebase Storage**
   - Enable Storage
   - Deploy `storage.rules`
   - Configure CORS if needed

4. **Discord Application**
   - Create Discord app
   - Get Client ID and Client Secret
   - Configure redirect URLs

See `FIREBASE_SETUP.md` for detailed setup instructions.

## Troubleshooting

### Discord Linking Fails
- Verify OpenID Connect provider is configured in Firebase
- Check Discord app redirect URLs
- Ensure user is signed in to Google first
- Check browser console for errors

### Profile Picture Upload Fails
- Verify file is under 5MB
- Check file type is supported
- Ensure Firebase Storage is enabled
- Check storage rules are deployed

### Display Name Not Saving
- Verify name is under 50 characters
- Check Firestore rules are deployed
- Ensure user is authenticated
- Check browser console for errors

## Future Enhancements

Potential improvements:
- Image cropping/resizing before upload
- Unlinking Discord account
- Multiple OAuth providers (GitHub, Twitter, etc.)
- Profile privacy settings
- Avatar selection from preset images
- Dark mode theme support (already has UI)
