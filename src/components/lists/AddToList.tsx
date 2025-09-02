import { IonButton } from "@ionic/react";
import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { FilePen } from "lucide-react";
import { hashNames } from "../../helpers/hashNames";
import { listsActions } from "../../actions/listsActions";
import Spinner from "../ui/Spinner";
import { Event } from "../../interfaces/events.interface";
import { useForm } from "react-hook-form";
import { ListAddingForm } from "../../interfaces/lists.interface";


interface Props {
  list: string;
  event: Event;
}

const AddToList: React.FC<Props> = ({ list, event }) => {
  const { data: user } = useAuth()
  const { id } = event
  const { handleSubmit } = useForm<ListAddingForm>({
    defaultValues: {
      data: {
        username: user.username,
        avatar: user.avatar,
        date: new Date().toISOString(),
        entreno_id: id.toString(),
        hash_id: hashNames(user?.username + id.toString()),
      }
    }
  })

  const { mutate: addTraining, isPending: isPendingAddTraining, isError: isErrorAddingTraining } = useMutation({
    mutationFn: listsActions.addTraining,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.success("Apuntat/da al proper Entreno ✌️!")
    }
  })
  const { mutate: addTrekking, isPending: isPendingAddTreking, isError: isErrorAddingTreking } = useMutation({
    mutationFn: listsActions.addTrekking,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.success("Apuntat/da al proper CaCo ✌️!")
    }
  })


  const handleIn = async (formData: ListAddingForm) => {

    if (list === 'TRAINING_LIST') {
      addTraining(formData)
    }

    if (list === 'TREKKING_LIST') {
      addTrekking(formData)
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit(handleIn)} className="w-full">
      <IonButton
        color="secondary"
        expand="block"
        type='submit'
      >
        {isPendingAddTraining || isPendingAddTreking
          ? (
            <Spinner />
          ) : (
            <>
              <span className="me-1 text-white">M'hi apunto!</span>
              <FilePen className="size-6 text-white" />
            </>
          )}
      </IonButton>
      {(isErrorAddingTraining || isErrorAddingTreking) && (
        <p className="ion-text-center text-red-500 text-lg">Ei!, ja estàs apuntat/da</p>
      )}
    </form>

  )
}
export default AddToList