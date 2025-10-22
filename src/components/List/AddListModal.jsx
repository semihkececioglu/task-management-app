import { useForm } from "react-hook-form";
import Modal from "../UI/Modal";
import Input from "../UI/Input";
import Button from "../UI/Button";

const AddListModal = ({ isOpen, onClose, onSave }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    onSave(data.title);
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add New List" size="sm">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="List Title *"
          placeholder="e.g., To Do, In Progress, Done"
          {...register("title", {
            required: "Title is required",
            minLength: {
              value: 2,
              message: "Title must be at least 2 characters",
            },
          })}
          error={errors.title?.message}
          autoFocus
        />

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Add List
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddListModal;
