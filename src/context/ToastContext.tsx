import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, Info, X } from 'lucide-react';

type ToastType = 'success' | 'warning' | 'info';

interface ToastMessage {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  addToast: (message: string, type: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

const ToastIcons = {
  success: <CheckCircle className="h-6 w-6 text-green-500" />,
  warning: <AlertTriangle className="h-6 w-6 text-yellow-500" />,
  info: <Info className="h-6 w-6 text-blue-500" />,
};

const ToastStyles = {
    success: 'bg-green-50 border-green-200 text-green-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = (id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  const addToast = useCallback((message: string, type: ToastType) => {
    const id = Date.now();
    setToasts((prevToasts) => [...prevToasts, { id, message, type }]);
    setTimeout(() => removeToast(id), 5000);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[100] space-y-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className={`flex items-center justify-between w-full max-w-sm p-4 rounded-lg shadow-lg border ${ToastStyles[toast.type]}`}
            >
              <div className="flex items-center">
                {ToastIcons[toast.type]}
                <p className="mr-3 font-medium">{toast.message}</p>
              </div>
              <button onClick={() => removeToast(toast.id)} className="p-1 rounded-full hover:bg-black/10">
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
