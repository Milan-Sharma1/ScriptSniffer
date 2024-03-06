import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js"; 

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDhSQvrgPGcOQb3Xgps1SA6eeKEP-Zb8bM",
    authDomain: "scriptsniffer.firebaseapp.com",
    databaseURL: "https://scriptsniffer-default-rtdb.firebaseio.com",
    projectId: "scriptsniffer",
    storageBucket: "scriptsniffer.appspot.com",
    messagingSenderId: "391187224490",
    appId: "1:391187224490:web:49834c44677c6015f57dd3",
    measurementId: "G-1FFYGSNNNX"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const messagesRef = ref(db, 'messages');

// Get a reference to your contact form 
const contactForm = document.querySelector('#contactForm'); // Assuming your form has the ID 'contactForm'

// Attach an event listener for form submission
contactForm.addEventListener('submit', (event) => { 
  event.preventDefault(); 

  // Get form values
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;

  // Save message to Firebase Realtime Database
  saveMessage(name, email, subject, message); 
});

submit.addEventListener('click', (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;
  // ... add checks for other required fields

  if (name && email && subject && message) { // Check if at least name and email are filled
    saveMessage(name, email, subject, message); // Send data to Firebase if valid
  } else {
    alert('Please fill all the required fields!'); // Display an error message
  }
});

// Function to save the message
function saveMessage(name, email, subject, message) { 
  const newMessageRef = push(messagesRef); // Create a new reference with a unique key
  set(newMessageRef, { 
    name: name,
    email: email,
    subject: subject,
    message: message
  });

  // Optional - Success / Error Handling
  console.log('Message Send Successfully!');
  alert('Message Send Successfully!'); 
  contactForm.reset(); 
  // You could display a success message to the user or clear the form
}
