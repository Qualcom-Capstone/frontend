import React, { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import { onMessage } from 'firebase/messaging';
import { messaging } from "../firebase";

interface Notification {
    id: number;
    message: string;
    type: 'violation';
    timestamp: string;
    read: boolean;
    plateNumber: string;
    speed: number;
    location: string;
}

const NotificationCenter: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const unreadCount = notifications.filter(n => !n.read).length;

    // 실시간 수신 알림 등록
    useEffect(() => {
        const unsubscribe = onMessage(messaging, (payload) => {
            console.log("📬 NotificationCenter 수신됨:", payload);

            const data = payload.data || {};

            const newNotification: Notification = {
                id: Number(data.id) || Date.now(),
                message: payload.notification?.body || '🚨 알 수 없는 알림',
                type: 'violation',
                timestamp: new Date(data.timestamp || Date.now()).toLocaleString(),
                read: false,
                plateNumber: data.car_number || '미확인 차량',
                speed: Number(data.car_speed) || 0,
                location: data.location || 'Seoul',
            };

            setNotifications(prev => [newNotification, ...prev]);
        });

        return () => {
            unsubscribe();
        };
    }, []);


    const handleNotificationClick = (id: number) => {
        setNotifications(prev =>
            prev.map(n =>
                n.id === id ? { ...n, read: true } : n
            )
        );
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`relative p-2 transition-colors rounded-full ${
                    unreadCount > 0
                        ? 'text-white bg-red-500/10 hover:bg-red-500/20'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
            >
                <Bell className={`w-5 h-5 ${unreadCount > 0 && 'animate-bounce'}`} />
                {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center text-white animate-pulse">
                        {unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-96 bg-gray-900 rounded-lg shadow-lg border border-gray-700 z-50 max-h-[80vh] overflow-y-auto">
                    <div className="p-3 border-b border-gray-700 flex justify-between items-center">
                        <h3 className="text-sm font-medium text-white">Notification Center</h3>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-gray-400 hover:text-white"
                        >
                            ✕
                        </button>
                    </div>

                    {notifications.length === 0 ? (
                        <div className="p-4 text-sm text-gray-400 text-center">
                            There are no new notifications.
                        </div>
                    ) : (
                        notifications.map(notification => (
                            <div
                                key={notification.id}
                                onClick={() => handleNotificationClick(notification.id)}
                                className={`p-4 border-b border-gray-800 hover:bg-gray-800 transition-colors cursor-pointer ${
                                    !notification.read ? 'bg-gray-800/50' : ''
                                }`}
                            >
                                <div className="flex items-start space-x-4">
                                    <div className={`w-2 h-2 mt-2 rounded-full flex-shrink-0 ${
                                        !notification.read ? 'bg-red-500 animate-pulse' : 'bg-gray-600'
                                    }`} />
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <p className="text-sm font-medium text-white">{notification.plateNumber}</p>
                                            <span className="text-xs text-gray-400">{notification.timestamp}</span>
                                        </div>
                                        <p className="text-sm text-gray-300 mt-1">{notification.message}</p>
                                        <div className="mt-2 text-sm">
                                            <p className="text-red-400 font-medium">{notification.speed} km/h</p>
                                            <p className="text-gray-400">{notification.location}</p>
                                        </div>
                                        {!notification.read && (
                                            <div className="mt-3 text-xs text-blue-400">
                                                Click to show read
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default NotificationCenter;
