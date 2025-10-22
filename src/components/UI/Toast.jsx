import { useEffect } from "react";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";

const Toast = ({ type = "info", message, onClose, duration = 3000 }) => {
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const types = {
    success: {
      icon: CheckCircle,
      bg: "bg-green-50 dark:bg-green-900/20",
      border: "border-green-200 dark:border-green-800",
      text: "text-green-800 dark:text-green-200",
      iconColor: "text-green-500 dark:text-green-400",
    },
    error: {
      icon: AlertCircle,
      bg: "bg-red-50 dark:bg-red-900/20",
      border: "border-red-200 dark:border-red-800",
      text: "text-red-800 dark:text-red-200",
      iconColor: "text-red-500 dark:text-red-400",
    },
    info: {
      icon: Info,
      bg: "bg-blue-50 dark:bg-blue-900/20",
      border: "border-blue-200 dark:border-blue-800",
      text: "text-blue-800 dark:text-blue-200",
      iconColor: "text-blue-500 dark:text-blue-400",
    },
  };

  const config = types[type];
  const Icon = config.icon;

  return (
    <div
      className={`
      fixed bottom-4 right-4 z-50
      flex items-center gap-3
      px-4 py-3 rounded-lg
      border ${config.border} ${config.bg}
      shadow-lg
      animate-slide-up
      max-w-md
    `}
    >
      <Icon size={20} className={config.iconColor} />
      <p className={`flex-1 text-sm font-medium ${config.text}`}>{message}</p>
      <button
        onClick={onClose}
        className={`${config.text} hover:opacity-70 transition-opacity`}
      >
        <X size={18} />
      </button>
    </div>
  );
};

export default Toast;
