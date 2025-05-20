importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyDRd4ljjjveLkvLEwczMxjJp2a0ov4wdSA",
  authDomain: "bkartstasktracker.firebaseapp.com",
  projectId: "bkartstasktracker",
  storageBucket: "bkartstasktracker.firebasestorage.app",
  messagingSenderId: "195500920867",
  appId: "1:195500920867:web:4a669915d7cd770d97a196"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  
  const notificationTitle = payload.notification?.title || 'New Notification';
  const notificationOptions = {
    body: payload.notification?.body || 'You have a new message',
    icon: payload.notification?.image || '/logo192.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Optional: Add event listener for foreground messages
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'FCM_MSG') {
    console.log('Foreground message received', event.data);
  }
});