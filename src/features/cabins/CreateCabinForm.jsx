import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import { useForm } from "react-hook-form";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";


function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { createCabin, isCreating } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();
  const { id: editId, ...editValues } = cabinToEdit;

  const isWorking = isCreating || isEditing;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState, watch } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { errors } = formState;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0]
    if (isEditSession) editCabin({ newCabinData: { ...data, image }, id: editId }, {
      onSuccess: (data) => {
        reset();
        onCloseModal?.();
      }

    });
    else createCabin({ ...data, image: image }, {
      onSuccess: (data) => {
        reset(data);
        onCloseModal?.();
      }
    });
  }

  function onError(errors) {
    console.log(errors);
  }

  const regularPrice = parseFloat(watch('regularPrice')) || 0;


  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? 'modal' : 'regular'}>
      <FormRow label='Cabin name' error={errors?.name?.message}>
        <Input type="text"
          disabled={isWorking}
          id="name"
          {...register("name", {
            required: "This field is required"
          })} />
      </FormRow>


      <FormRow label='Maximum capacity' error={errors?.maxCapacity?.message}>
        <Input type="number" disabled={isWorking} id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: 'Capacity should be atleast one..'
            }
          })} />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input type="number" disabled={isWorking} id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: 'price should be atleast one..'
            }
          })} />
      </FormRow>
      {console.log(getValues().regularPrice, getValues().discount)}

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input type="number" id="discount" disabled={isWorking} {...register("discount", {
          required: "This field is required",
          validate: (value) => parseFloat(value) <= regularPrice || 'Discount should be less than the regular price',
        })} />
      </FormRow>


      <FormRow label="description for website" error={errors?.description?.message}>
        <Textarea type="number" id="description" defaultValue=""
          {...register("description", {
            required: "This field is required"
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput id="image" accept="image/*" disabled={isWorking}  {...register("image", {
          required: isEditSession ? false : "This field is required"
        })} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button $variation="secondary" type="reset" onClick={() => onCloseModal?.()}>
          Cancel
        </Button>
        <Button disabled={isWorking}>{isEditSession ? 'Edit cabin' : "Create new cabin"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;













/*

import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";


function CreateCabinForm({cabin}) {
  const { register, handleSubmit, reset, getValues, formState, watch } = useForm();
  const { errors } = formState;

  const queryClient = useQueryClient();

  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success('New Cabin Successfully Created');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      reset();
    },
    onError: err => toast.error(err.message)
  });

  function onSubmit(data) {
    mutate({ ...data, image: data.image[0] });
  }

  function onError(errors) {
    console.log(errors);
  }

  const regularPrice = parseFloat(watch('regularPrice')) || 0;


  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label='Cabin name' error={errors?.name?.message}>
        <Input type="text"
          disabled={isCreating}
          id="name"
          {...register("name", {
            required: "This field is required"
          })} />
      </FormRow>


      <FormRow label='Maximum capacity' error={errors?.maxCapacity?.message}>
        <Input type="number" disabled={isCreating} id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: 'Capacity should be atleast one..'
            }
          })} />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input type="number" disabled={isCreating} id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: 'price should be atleast one..'
            }
          })} />
      </FormRow>
      {console.log(getValues().regularPrice, getValues().discount)}

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input type="number" id="discount" disabled={isCreating} {...register("discount", {
          required: "This field is required",
          validate: (value) => parseFloat(value) <= regularPrice || 'Discount should be less than the regular price',
        })} />
      </FormRow>


      <FormRow label="description for website" error={errors?.description?.message}>
        <Textarea type="number" id="description" defaultValue=""
          {...register("description", {
            required: "This field is required"
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput id="image" accept="image/*" disabled={isCreating}  {...register("image", {
          required: "This field is required"
        })} />
      </FormRow>

      <FormRow>
        { type is an HTML attribute! }
        <Button $variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;

*/





























