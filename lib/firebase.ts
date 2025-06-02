import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

// Firebase configuration - Replace with your actual config
const firebaseConfig = {
  apiKey: "demo-api-key",
  authDomain: "saasstart-pro.firebaseapp.com",
  projectId: "saasstart-pro",
  storageBucket: "saasstart-pro.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)

export default app
