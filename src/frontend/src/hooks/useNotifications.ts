import { useEffect, useRef } from 'react';

let notificationPermissionRequested = false;

export function useNotifications() {
  const hasRequestedPermission = useRef(false);

  useEffect(() => {
    if ('Notification' in window && !notificationPermissionRequested && !hasRequestedPermission.current) {
      notificationPermissionRequested = true;
      hasRequestedPermission.current = true;
      Notification.requestPermission();
    }
  }, []);
}

export function sendSignalNotification(asset: string, signal: 'BUY' | 'SELL', expiry: number): void {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification('Trade Signal', {
      body: `${asset}\n${signal} • ${expiry} min`,
      icon: '/favicon.ico'
    });
  }
}
