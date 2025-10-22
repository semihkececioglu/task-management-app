import { useState, useRef, useEffect } from "react";
import { MoreVertical, Edit2, Trash2 } from "lucide-react";

const ListMenu = ({ onEdit, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
      >
        <MoreVertical size={16} className="text-gray-600 dark:text-gray-400" />
      </button>

      {isOpen && (
        <div
          className="
          absolute right-0 top-full mt-1
          w-48
          bg-white dark:bg-gray-800
          border border-gray-200 dark:border-gray-700
          rounded-lg shadow-lg
          py-1
          z-20
          animate-scale-in
        "
        >
          <button
            onClick={() => {
              onEdit();
              setIsOpen(false);
            }}
            className="
              w-full px-4 py-2
              flex items-center gap-2
              text-sm text-gray-700 dark:text-gray-300
              hover:bg-gray-100 dark:hover:bg-gray-700
              transition-colors
            "
          >
            <Edit2 size={16} />
            Edit List
          </button>
          <button
            onClick={() => {
              onDelete();
              setIsOpen(false);
            }}
            className="
              w-full px-4 py-2
              flex items-center gap-2
              text-sm text-red-600 dark:text-red-400
              hover:bg-red-50 dark:hover:bg-red-900/20
              transition-colors
            "
          >
            <Trash2 size={16} />
            Delete List
          </button>
        </div>
      )}
    </div>
  );
};

export default ListMenu;
