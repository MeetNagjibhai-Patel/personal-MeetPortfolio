// Importing functions from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCIQOhzMZiMBT8BRTigR6rOVSBij2ZDhgI",
    authDomain: "techedge-portfolio.firebaseapp.com",
    projectId: "techedge-portfolio",
    storageBucket: "techedge-portfolio.appspot.com",
    messagingSenderId: "904821630719",
    appId: "1:904821630719:web:8fc843c1c51b9ded688eca",
    measurementId: "G-6D7JV5K06E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

// alert to indicate successful connection
// alert("Firebase connected successfully!");

export { auth, db };
