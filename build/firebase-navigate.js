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
    icon: payload.notification?.image || '/logo192.png',
    data: {
      url: '/hot-properties-map' // Add the URL you want to navigate to
    }
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
  console.log('Notification click received.', event.notification);
  
  // Close the notification
  event.notification.close();
  
  // Get the URL from the notification data
  const urlToOpen = event.notification.data.url || '/';
  
  // Focus or open the client
  event.waitUntil(
    clients.matchAll({type: 'window'}).then((windowClients) => {
      // Check if there's already a window/tab open with the target URL
      for (let i = 0; i < windowClients.length; i++) {
        const client = windowClients[i];
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus();
        }
      }
      
      // If no matching window/tab is found, open a new one
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});