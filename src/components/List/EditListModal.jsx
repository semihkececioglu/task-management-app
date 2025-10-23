import { useForm } from "react-hook-form";
import { useEffect } from "react";
import Modal from "../UI/Modal";
import Input from "../UI/Input";
import Button from "../UI/Button";

const EditListModal = ({ isOpen, onClose, list, onSave }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (isOpen && list) {
      reset({ title: list.title });
    }
  }, [isOpen, list, reset]);

  const onSubmit = (data) => {
    onSave(list.id, data.title);
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Edit List" size="sm">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="List Title *"
          placeholder="Enter list title"
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

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
          <Button
            type="button"
            variant="secondary"
            onClick={handleClose}
            className="w-full sm:w-auto sm:min-w-[100px] order-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="w-full sm:w-auto sm:min-w-[100px] order-2"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditListModal;
