import { forwardRef } from "react";

const Input = forwardRef(({ label, error, className = "", ...props }, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 tracking-tight">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`
          w-full px-4 py-2.5
          bg-gray-50 dark:bg-gray-800/50
          border border-gray-200 dark:border-gray-700
          rounded-xl
          text-gray-900 dark:text-gray-100
          placeholder-gray-400 dark:placeholder-gray-500
          focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-300 dark:focus:border-indigo-600 focus:bg-white dark:focus:bg-gray-800
          disabled:opacity-40 disabled:cursor-not-allowed
          transition-all duration-300
          font-medium text-[15px]
          ${
            error
              ? "border-red-400 focus:ring-red-500/50 focus:border-red-300"
              : ""
          }
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-sm text-red-500 font-medium">{error}</p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
