const LoadingSpinner = ({ size = "md" }) => {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`
        ${sizes[size]}
        border-4 border-gray-200 dark:border-gray-700
        border-t-blue-500
        rounded-full
        animate-spin
      `}
      />
    </div>
  );
};

export default LoadingSpinner;
