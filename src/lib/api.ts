import { db, isFirebaseConfigured } from "./firebase";
import { ref, push, set, serverTimestamp } from "firebase/database";

export const submitContactForm = async (data: any) => {
  // If Firebase is configured, save to Realtime Database
  if (isFirebaseConfigured()) {
    try {
      const messagesRef = ref(db, 'submissions');
      const newMessageRef = push(messagesRef);
      await set(newMessageRef, {
        ...data,
        status: "unread",
        submittedAt: serverTimestamp(),
        type: "contact_booking",
      });
      console.log("Submission saved to Realtime DB");
      return { success: true, id: newMessageRef.key };
    } catch (error) {
      console.error("Error adding document: ", error);
      throw new Error("Failed to save submission to database");
    }
  }

  // Local development fallback if Firebase is NOT configured
  if (import.meta.env.DEV) {
    console.log("Development Mode (No Firebase): Saving message to local storage:", data);
    
    const existingMessages = JSON.parse(localStorage.getItem("contact-messages") || "[]");
    const newMessage = {
      ...data,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      status: "unread",
      type: "contact_booking"
    };
    
    existingMessages.unshift(newMessage);
    localStorage.setItem("contact-messages", JSON.stringify(existingMessages));

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: "Message saved locally" });
      }, 1000);
    });
  }

  // Production fallback if API is not available
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to send message');
  }

  return response.json();
};

export const fetchPageContent = async (page: string) => {
  if (isFirebaseConfigured()) {
    try {
      const contentRef = ref(db, `content/${page}`);
      const snapshot = await get(contentRef);
      return snapshot.val();
    } catch (error) {
      console.error(`Error fetching ${page} content:`, error);
      return null;
    }
  }
  return null;
};

export const updatePageContent = async (page: string, data: any) => {
  if (isFirebaseConfigured()) {
    try {
      const contentRef = ref(db, `content/${page}`);
      await set(contentRef, data);
      return { success: true };
    } catch (error) {
      console.error(`Error updating ${page} content:`, error);
      throw new Error(`Failed to update ${page} content`);
    }
  }
  throw new Error("Firebase not configured");
};
