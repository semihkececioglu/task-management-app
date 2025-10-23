import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import TagInput from "../UI/TagInput";
import ConfirmModal from "../UI/ConfirmModal";
import { PRIORITY } from "../../utils/constants";
import { Flag, Calendar, Trash2 } from "lucide-react";

const CardModal = ({ isOpen, onClose, card = null, onSave, onDelete }) => {
  const isEdit = !!card;
  const [tags, setTags] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Update form when modal opens or card changes
  useEffect(() => {
    if (isOpen) {
      if (card) {
        // Edit mode - fill form with card data
        reset({
          title: card.title || "",
          description: card.description || "",
          priority: card.priority || PRIORITY.LOW,
          dueDate: card.dueDate || "",
        });
        setTags(card.tags || []);
      } else {
        // Create mode - empty form
        reset({
          title: "",
          description: "",
          priority: PRIORITY.LOW,
          dueDate: "",
        });
        setTags([]);
      }
    }
  }, [isOpen, card, reset]);

  const onSubmit = (data) => {
    onSave({
      ...data,
      tags,
      id: card?.id,
    });
    handleClose();
  };

  const handleClose = () => {
    reset();
    setTags([]);
    onClose();
  };

  const handleDeleteConfirm = () => {
    onDelete(card.id);
    setShowDeleteConfirm(false);
    handleClose();
  };

  const priorityOptions = [
    { value: PRIORITY.LOW, label: "Low Priority", color: "bg-green-500" },
    {
      value: PRIORITY.MEDIUM,
      label: "Medium Priority",
      color: "bg-yellow-500",
    },
    { value: PRIORITY.HIGH, label: "High Priority", color: "bg-red-500" },
  ];

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        title={isEdit ? "Edit Card" : "Create New Card"}
        size="lg"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Title
            </label>
            <input
              {...register("title", { required: "Title is required" })}
              className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
              placeholder="Enter task title..."
            />
            {errors.title && (
              <p className="mt-1.5 text-sm text-red-500">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              {...register("description")}
              rows={3}
              className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all resize-none"
              placeholder="Add a description..."
            />
          </div>

          {/* Priority & Due Date - Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Priority */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                <Flag size={14} className="text-indigo-500" />
                Priority
              </label>
              <div className="relative">
                <select
                  {...register("priority")}
                  className="w-full px-4 py-2.5 pr-10 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 hover:border-indigo-400 dark:hover:border-indigo-600 transition-all appearance-none cursor-pointer"
                >
                  {priorityOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <Flag
                  size={16}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>
            </div>

            {/* Due Date */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                <Calendar size={14} className="text-indigo-500" />
                Due Date
              </label>
              <input
                type="date"
                {...register("dueDate")}
                className="w-full px-4 py-2.5 pr-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 hover:border-indigo-400 dark:hover:border-indigo-600 transition-all cursor-pointer"
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Tags
            </label>
            <TagInput tags={tags} onTagsChange={setTags} />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 pt-2">
            {/* Delete Button - Full width on mobile, left on desktop */}
            {isEdit && (
              <Button
                type="button"
                variant="danger"
                onClick={() => setShowDeleteConfirm(true)}
                className="w-full sm:w-auto order-3 sm:order-1 sm:mr-auto"
              >
                <Trash2 size={16} />
                <span className="sm:inline">Delete</span>
              </Button>
            )}

            {/* Cancel & Save - Stack on mobile, inline on desktop */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto order-1 sm:order-2">
              <Button
                type="button"
                variant="secondary"
                onClick={handleClose}
                className="w-full sm:w-auto sm:min-w-[100px]"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                className="w-full sm:w-auto sm:min-w-[100px]"
              >
                {isEdit ? "Update" : "Create"}
              </Button>
            </div>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Card"
        message={`Are you sure you want to delete "${card?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
      />
    </>
  );
};

export default CardModal;
