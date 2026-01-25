# awesomegav-website

https://awesomegav.github.io/awesomegav-website

## Features

- **Home Page**: Main landing page with channel information
- **Videos**: Automatically updated from YouTube channel
- **Games**: Showcase of games featured on the channel
- **Guides**: Gaming guides and tutorials (with admin CRUD functionality)
- **Google Authentication**: Sign in with Google for admin features

## Guides Page

The Guides page allows admins to create, edit, and delete gaming guides while all visitors can read them.

### Demo Mode
The Guides page includes a **localStorage fallback** that works immediately without Firebase configuration. This is perfect for:
- Testing the functionality locally
- Demonstrating features
- Development without backend setup

### Production Mode (Firebase)
For full production use with Google Authentication and cloud storage, see [FIREBASE_SETUP.md](FIREBASE_SETUP.md) for detailed setup instructions.

### Admin Access
- Admin email: `zoomzamgamer@gmail.com`
- Only the admin can create, edit, and delete guides
- All users can view guides without authentication

## Local Development

```bash
# Start a local server
python3 -m http.server 8000

# Or use any other HTTP server
# Then navigate to http://localhost:8000
```

## Technologies Used

- HTML5, CSS3, JavaScript
- Firebase Authentication (Google OAuth 2.0)
- Firebase Firestore (NoSQL database)
- Responsive design with CSS Grid
- Modern ES6+ JavaScript