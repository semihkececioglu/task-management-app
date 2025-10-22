const SkeletonCard = () => {
  return (
    <div
      className="
      bg-white dark:bg-gray-800 
      border border-gray-200 dark:border-gray-700
      rounded-lg p-3
      animate-pulse
    "
    >
      {/* Title */}
      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3" />

      {/* Description */}
      <div className="space-y-2 mb-3">
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20" />
      </div>
    </div>
  );
};

export default SkeletonCard;
