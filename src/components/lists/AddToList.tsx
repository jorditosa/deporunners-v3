import { IonButton, IonSpinner } from "@ionic/react";
import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PenLine } from "reicon";
import Icon from "../ui/Icon";
import { hashNames } from "../../helpers/hashNames";
import { listsActions } from "../../actions/listsActions";
import { Event } from "../../interfaces/events.interface";
import { useForm } from "react-hook-form";
import { ListAddingForm } from "../../interfaces/lists.interface";


interface Props {
  event: Event;
}

const AddToList: React.FC<Props> = ({ event }) => {
  const { data: user } = useAuth()
  const queryClient = useQueryClient();
  const { id } = event
  const { handleSubmit } = useForm<ListAddingForm>({
    defaultValues: {
      data: {
        name: user.username,
        avatar: user.avatar,
        date: event.start_date,
        cursa_id: id.toString(),
        hash_id: hashNames(user?.username + id.toString()),
      }
    }
  })

  const { mutate: addToList, isPending, isError, error } = useMutation({
    mutationFn: listsActions.addToList,
    onSuccess: () => {
      toast.success("Apuntat/da ✌️!")
      queryClient.invalidateQueries({ queryKey: ['list'] });

    }
  })

  const handleIn = async (formData: ListAddingForm) => {
      addToList(formData)
  }

  return (
    <form noValidate onSubmit={handleSubmit(handleIn)} className="w-full">
      <IonButton
        color="secondary"
        expand="block"
        type='submit'
        fill="solid"
        className='flex w-full items-center gap-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300'
      >
        {isPending
          ? (
              <IonSpinner color='light' />
          ) : (
            <>
              <Icon icon={PenLine} className={isError ? "size-6 text-red-200" : "size-6 text-white"} />
              <span className="ms-2 text-white">M'hi apunto!</span>
            </>
          )}
      </IonButton>
      {(isError) && (
        <p className="text-red-500 text-base text-center">{error.message || "No s'ha pogut completar la inscripció"}</p>
      )}
    </form>

  )
}
export default AddToList