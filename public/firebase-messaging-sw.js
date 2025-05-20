// public/firebase-messaging-sw.js

importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "${VITE_FIREBASE_API_KEY}",
    authDomain: "${VITE_FIREBASE_AUTH_DOMAIN}",
    projectId: "${VITE_FIREBASE_PROJECT_ID}",
    storageBucket: "${VITE_FIREBASE_STORAGE_BUCKET}",
    messagingSenderId: "${VITE_FIREBASE_MESSAGING_SENDER_ID}",
    appId: "${VITE_FIREBASE_APP_ID}",
    measurementId: "${VITE_FIREBASE_MEASUREMENT_ID}"

});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/icon.png' // 원하는 아이콘 경로
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
