import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDhpyf-nQRGfEPaoe2elXOwecF1csWMaoU",
  authDomain: "buatuas-a35ff.firebaseapp.com",
  projectId: "buatuas-a35ff",
  storageBucket: "buatuas-a35ff.firebasestorage.app",
  messagingSenderId: "355268034410",
  appId: "1:355268034410:web:5bd92d3fad5ce32ab96f13",
  measurementId: "G-9X2P44Y702"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);