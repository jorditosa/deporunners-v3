import { IonButton, IonSpinner } from "@ionic/react";
import React from "react";
import { Eraser } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { listsActions } from "../../actions/listsActions";
import { toast } from "react-toastify";

interface Props {
  id: number,
  list: string;
}

const DeleteToList: React.FC<Props> = ({ id, list }) => {

  const { mutate: deleteTraining, isPending: isPendingDeletingFromTraining } = useMutation({
    mutationFn: listsActions.deleteTraining,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.success("Borrat/da del proper Entreno 🐔")
    }
  })
  const { mutate: deleteTrekking, isPending: isPendingDeletingFromTrekking } = useMutation({
    mutationFn: listsActions.deleteTrekking,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.success("Borrat/da del proper CaCo 🐔")
    }
  })


  const handleOut = (id: number) => {
    if (list === 'TRAINING_LIST') {
      deleteTraining(id.toString())
    }

    if (list === 'TREKKING_LIST') {
      deleteTrekking(id.toString())
    }
  }

  return (
    <>
      {
        isPendingDeletingFromTraining || isPendingDeletingFromTrekking ?
          <IonSpinner name="lines" color='primary'></IonSpinner>
          :
          <IonButton
            fill="clear"
            className="px-1"
            onClick={() => handleOut(id)}>
            <Eraser className="text-primary siz-6" />
          </IonButton>
      }
    </>

  )
}
export default DeleteToList