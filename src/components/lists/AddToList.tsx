import { IonButton, IonSpinner } from "@ionic/react";
import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FilePen } from "lucide-react";
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
        cursa_id: id.toString(),
        hash_id: hashNames(user?.username + id.toString()),
      }
    }
  })

  const { mutate: addToList, isPending, isError } = useMutation({
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
        fill="clear"
        className='flex w-full items-center gap-2 bg-gradient-to-br from-secondary bg-primary text-white rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl'
      >
        {isPending
          ? (
              <IonSpinner color='light' />
          ) : (
            <>
              <FilePen className={isError ? "size-6 text-red-500" : "size-6 text-white"} />
              <span className="ms-2 text-white">M'hi apunto!</span>
            </>
          )}
      </IonButton>
      {(isError) && (
        <p className="text-red-500 text-base text-center">Ei!, ja estàs apuntat/da</p>
      )}
    </form>

  )
}
export default AddToList