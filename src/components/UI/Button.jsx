const Button = ({
  children,
  variant = "primary",
  size = "md",
  onClick,
  disabled = false,
  className = "",
  type = "button",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed tracking-tight";

  const variants = {
    primary:
      "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg hover:shadow-indigo-200/50 dark:hover:shadow-indigo-900/30 hover:scale-[1.02]",
    secondary:
      "bg-gray-100 hover:bg-gray-200 dark:bg-gray-700/50 dark:hover:bg-gray-600/50 text-gray-700 dark:text-gray-200 border border-gray-200/50 dark:border-gray-600/30 hover:border-gray-300 dark:hover:border-gray-500/50",
    danger:
      "bg-red-500 hover:bg-red-600 text-white shadow-md hover:shadow-lg hover:shadow-red-200/50 dark:hover:shadow-red-900/30 hover:scale-[1.02]",
    ghost:
      "hover:bg-gray-100/80 dark:hover:bg-gray-800/50 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white",
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2.5 text-[15px]",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
