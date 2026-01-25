# awesomegav-website

https://awesomegav.github.io/awesomegav-website

## Features

- **Home Page**: Main landing page with channel information
- **Videos**: Automatically updated from YouTube channel
- **Games**: Showcase of games featured on the channel
- **Guides**: Gaming guides and tutorials (with admin CRUD functionality)
- **Account Page**: User profile and settings page (requires sign-in)
- **Google Authentication**: Sign in with Google for admin features
- **Clean URLs**: All pages use clean URLs without `.html` extensions

## Account Page

The Account page provides authenticated users with:
- Profile display (name, email, profile picture)
- Settings customization (display name, email preferences)
- Theme preferences (dark mode coming soon)
- Sign out functionality

Access your account by signing in and clicking your profile button in the navigation.

## Clean URLs

The site uses clean URLs without `.html` extensions:
- `https://awesomegav.github.io/awesomegav-website/videos` instead of `/videos.html`
- `https://awesomegav.github.io/awesomegav-website/games` instead of `/games.html`
- etc.

Both formats work for backward compatibility. Clean URLs are handled by Jekyll on GitHub Pages via `_config.yml`.

### Removing the `/awesomegav-website/` path from URLs

The `/awesomegav-website/` part appears in URLs because this is a GitHub Pages **project site**. To remove it and use just `awesomegav.github.io`:

**Option 1: Rename Repository (Recommended)**
- Rename the repository from `awesomegav-website` to `AwesomeGav.github.io`
- This makes it a **user site** instead of a project site
- URLs will be: `https://awesomegav.github.io/videos`

**Option 2: Custom Domain**
- Purchase and configure a custom domain (e.g., `awesomegav.com`)
- Configure DNS settings and GitHub Pages custom domain
- URLs will be: `https://awesomegav.com/videos`

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
- Jekyll for GitHub Pages (clean URLs)