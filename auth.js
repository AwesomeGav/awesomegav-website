// Authentication helper functions
let currentUser = null;
let auth = null;

// Initialize Firebase Auth
function initAuth() {
    if (!firebase || !firebase.auth) {
        console.error('Firebase not loaded');
        return;
    }
    
    auth = firebase.auth();
    
    // Listen for auth state changes
    auth.onAuthStateChanged((user) => {
        currentUser = user;
        updateUIForAuth(user);
    });
}

// Update UI based on authentication state
function updateUIForAuth(user) {
    const authButton = document.getElementById('auth-button');
    const userInfo = document.getElementById('user-info');
    
    if (!authButton) return;
    
    // Remove any existing event listeners by cloning the button
    const newAuthButton = authButton.cloneNode(true);
    authButton.parentNode.replaceChild(newAuthButton, authButton);
    const authBtn = document.getElementById('auth-button');
    
    if (user) {
        // User is signed in
        authBtn.innerHTML = `
            <img src="${user.photoURL || 'logo.jpg'}" alt="Profile" style="width: 24px; height: 24px; border-radius: 50%; object-fit: cover;">
            <span>${user.displayName || user.email}</span>
        `;
        authBtn.addEventListener('click', () => {
            window.location.href = 'account';
        });
        
        if (userInfo) {
            userInfo.textContent = `Signed in as: ${user.email}`;
        }
    } else {
        // User is signed out
        authBtn.innerHTML = '🔐 Sign In';
        authBtn.addEventListener('click', signIn);
        
        if (userInfo) {
            userInfo.textContent = '';
        }
    }
}

// Sign in with Google
async function signIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
        await auth.signInWithPopup(provider);
    } catch (error) {
        console.error('Sign-in error:', error);
        alert('Failed to sign in. Please try again.');
    }
}

// Sign out
async function signOut() {
    try {
        await auth.signOut();
    } catch (error) {
        console.error('Sign-out error:', error);
    }
}

// Check if current user is admin
function isAdmin() {
    return currentUser && currentUser.email && 
           currentUser.email.toLowerCase() === ADMIN_EMAIL.toLowerCase();
}

// Get current user
function getCurrentUser() {
    return currentUser;
}
