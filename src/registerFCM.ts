// src/registerFCM.ts
import { getToken } from 'firebase/messaging';
import { messaging } from './firebase';

export const registerFCM = async (): Promise<string | undefined> => {
    try {
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') {
            console.log('🔕 알림 권한이 거부되었습니다.');
            return undefined;
        }

        const fcmToken = await getToken(messaging, {
            vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY ,
        });

        if (fcmToken) {
            console.log('✅ FCM Token:', fcmToken);
            return fcmToken;
        } else {
            console.log('❌ FCM 토큰을 받아오지 못했습니다.');
            return undefined;
        }
    } catch (error) {
        console.error('🚨 FCM 등록 오류:', error);
        return undefined;
    }
};
