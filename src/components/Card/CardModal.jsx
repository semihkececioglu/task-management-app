import { useForm } from "react-hook-form";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import Modal from "../UI/Modal";
import Input from "../UI/Input";
import Textarea from "../UI/Textarea";
import Dropdown from "../UI/Dropdown";
import Button from "../UI/Button";
import TagInput from "../UI/TagInput";
import { PRIORITY } from "../../utils/constants";

const CardModal = ({ isOpen, onClose, card = null, onSave, onDelete }) => {
  const isEdit = !!card;
  const [tags, setTags] = useState(card?.tags || []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: card?.title || "",
      description: card?.description || "",
      priority: card?.priority || PRIORITY.MEDIUM,
      dueDate: card?.dueDate
        ? new Date(card.dueDate).toISOString().split("T")[0]
        : "",
    },
  });

  const onSubmit = (data) => {
    const cardData = {
      ...data,
      tags,
      dueDate: data.dueDate ? new Date(data.dueDate).getTime() : null,
    };
    onSave(cardData);
    handleClose();
  };

  const handleClose = () => {
    reset();
    setTags([]);
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this card?")) {
      onDelete();
      handleClose();
    }
  };

  const priorityOptions = [
    { value: PRIORITY.LOW, label: "Low" },
    { value: PRIORITY.MEDIUM, label: "Medium" },
    { value: PRIORITY.HIGH, label: "High" },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={isEdit ? "Edit Card" : "Add New Card"}
      size="md"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <Input
          label="Title *"
          placeholder="Enter card title"
          {...register("title", {
            required: "Title is required",
            minLength: {
              value: 3,
              message: "Title must be at least 3 characters",
            },
          })}
          error={errors.title?.message}
        />

        {/* Description */}
        <Textarea
          label="Description"
          placeholder="Enter card description"
          rows={4}
          {...register("description")}
          error={errors.description?.message}
        />

        {/* Priority & Due Date in row */}
        <div className="grid grid-cols-2 gap-4">
          <Dropdown
            label="Priority"
            options={priorityOptions}
            {...register("priority")}
          />

          <Input label="Due Date" type="date" {...register("dueDate")} />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Tags
          </label>
          <TagInput
            tags={tags}
            onChange={setTags}
            placeholder="Add tags and press Enter"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <div>
            {isEdit && (
              <Button type="button" variant="danger" onClick={handleDelete}>
                <Trash2 size={16} className="mr-2" />
                Delete
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button type="button" variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {isEdit ? "Save Changes" : "Add Card"}
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default CardModal;
