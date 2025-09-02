import { IonButton, IonSpinner } from "@ionic/react";
import React from "react";
import { Eraser } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { listsActions } from "../../actions/listsActions";
import { toast } from "react-toastify";

interface Props {
  id: number,
}

const DeleteToList: React.FC<Props> = ({ id }) => {
  const queryClient = useQueryClient();
  const { mutate: deleteList, isPending } = useMutation({
    mutationFn: listsActions.deleteFromList,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.success("Esborrat/da 🐔!")
      queryClient.invalidateQueries({ queryKey: ['list'] });
    }
  })


  const handleOut = (id: number) => {
      deleteList(id.toString())
  }

  return (
    <>
      {
        isPending ?
          <IonSpinner color='primary' />
          :
          <IonButton
            size="small"
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