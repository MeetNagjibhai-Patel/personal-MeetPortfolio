import { auth } from './firebaseConfig.js';
import { signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

signOut(auth)
  .then(() => {
    alert("Logged out successfully");
    window.location.href = "index.html";  // Redirect to home page after logout
  })
  .catch((error) => {
    console.error("Error logging out: ", error);
  });
