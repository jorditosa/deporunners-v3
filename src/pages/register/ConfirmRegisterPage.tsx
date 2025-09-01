import { useForm } from 'react-hook-form'
import PublicLayout from '../PublicLayout'
import { IonRow, IonCol, IonCard, IonCardHeader, IonCardContent, IonInput, IonButton, IonSpinner } from '@ionic/react'
import { Link } from 'react-router-dom'
import { RegisterFormData } from '../../interfaces/auth.interface'
import Heading from '../../components/ui/Heading'
import { CheckCheck } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { authActions } from '../../actions/authActions'

export default function ConfirmRegisterPage() {
    const { handleSubmit, register, formState: { errors }, reset } = useForm<RegisterFormData>({
        defaultValues: {
            confirmCode: 0
        }
    })
    const { mutate, isPending } = useMutation({
        mutationFn: authActions.confirmAccount,
        onError: (error) => {
            console.log(error.message)
        },
        onSuccess: (response) => {
            console.log(response)
            reset()
        }
    })

    const submitForm = (formData: RegisterFormData) => {
        console.log(formData)
        mutate(formData)

    }
    return (
        <PublicLayout>
            <IonRow>
                <IonCol size="12" className="p-4">
                    <IonRow className="block m-auto max-w-lg">
                        <IonCard color={"light"} className="block shadow-md shadow-slate-600 rounded-xl bg-white">
                            <IonCardHeader className='container'>
                                <Heading
                                    title="confirmar Alta"
                                    variant="h1"
                                    icon={CheckCheck}
                                    iconSize={12}
                                />
                            </IonCardHeader>

                            <IonCardContent>
                                <form onSubmit={handleSubmit(submitForm)} noValidate>
                                    <div className="form-group mb-2">
                                        <IonInput
                                            color={"secondary"}
                                            label="Codi Alta"
                                            type="number"
                                            {...register("confirmCode", {
                                                required: "El codi de confirmació és obligatori",
                                                minLength: {
                                                    value: 6,
                                                    message: "El Codi ha de tenir 4 caràcters"
                                                }
                                            })}
                                            required
                                        />
                                        {errors.confirmCode && (
                                            <span className="text-red-500">
                                                Ups, el codi no és correcte.
                                            </span>
                                        )}
                                    </div>


                                    <IonRow>
                                        <IonButton color="secondary" expand='full' type="submit" className='w-full'>
                                            {
                                                isPending
                                                    ? <IonSpinner color='light' />
                                                    : <span className='text-white'>Confirmar Alta</span>
                                            }
                                        </IonButton>
                                    </IonRow>

                                </form>
                            </IonCardContent>
                        </IonCard>
                    </IonRow>
                    <IonRow>
                        <Link to={'/forgot-landing'} className='w-full my-4'>
                            <IonButton expand='full' color='light' fill='clear'>
                                No tens el Codi de confirmació?
                            </IonButton>
                        </Link>
                    </IonRow>
                </IonCol>
            </IonRow>
        </PublicLayout>
    )
}
