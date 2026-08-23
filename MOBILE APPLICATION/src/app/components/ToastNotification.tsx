import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, AlertTriangle, Info } from 'lucide-react';

export interface ToastNotification {
  id: string;
  type: 'success' | 'warning' | 'info';
  message: string;
  duration?: number;
}

interface Props {
  notification: ToastNotification | null;
  onRemove: (id: string) => void;
}

export function ToastNotification({ notification, onRemove }: Props) {
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        onRemove(notification.id);
      }, notification.duration || 3000); // Default 3 seconds

      return () => clearTimeout(timer);
    }
  }, [notification, onRemove]);

  const getIcon = () => {
    switch (notification?.type) {
      case 'success': return CheckCircle;
      case 'warning': return AlertTriangle;
      case 'info': return Info;
      default: return Info;
    }
  };

  const getColor = () => {
    switch (notification?.type) {
      case 'success': return 'bg-green-500/90 border-green-500/50';
      case 'warning': return 'bg-yellow-500/90 border-yellow-500/50';
      case 'info': return 'bg-blue-500/90 border-blue-500/50';
      default: return 'bg-zinc-500/90 border-zinc-500/50';
    }
  };

  const getTextColor = () => {
    switch (notification?.type) {
      case 'success': return 'text-green-100';
      case 'warning': return 'text-yellow-100';
      case 'info': return 'text-blue-100';
      default: return 'text-zinc-100';
    }
  };

  if (!notification) return null;

  return (
    <AnimatePresence>
      <motion.div
        key={notification.id}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-auto ${getColor()} rounded-xl px-4 py-3 shadow-xl z-50`}
      >
        <div className="flex items-center gap-3">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, duration: 0.2, type: "spring" }}
          >
            {(() => {
              const Icon = getIcon();
              return <Icon />;
            })()}
          </motion.div>
          <div className="flex-1">
            <p className={`text-sm font-medium ${getTextColor()}`}>
              {notification.message}
            </p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
