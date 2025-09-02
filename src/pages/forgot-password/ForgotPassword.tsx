import { useForm } from 'react-hook-form'
import PublicLayout from '../PublicLayout'
import { IonRow, IonCol, IonCard, IonCardHeader, IonCardContent, IonInput, IonButton, IonSpinner, useIonRouter } from '@ionic/react'
import { Link } from 'react-router-dom'
import { ForgotFormData } from '../../interfaces/auth.interface'
import Heading from '../../components/ui/Heading'
import { useMutation } from '@tanstack/react-query'
import { authActions } from '../../actions/authActions'
import { toast } from 'react-toastify'
import { APP_ROUTES } from '../../constants/endpoints'

export default function ForgotPassword() {
    const router = useIonRouter();
    const { handleSubmit, register, formState: { errors }, reset } = useForm<ForgotFormData>({
        defaultValues: {
            email: '',
        }
    })
    const { mutate, isPending } = useMutation({
        mutationFn: authActions.forgotPassword,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            toast.success("Email amb les instruccions enviat")
            reset()
            router.push(APP_ROUTES.RESET_PASSWORD)
        }
    })

    const submitForm = (formData: ForgotFormData) => {
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
                                    title="recuperar Contrasenya"
                                    variant="h1"
                                    iconSize={12}
                                />
                            </IonCardHeader>

                            <IonCardContent>
                                <form onSubmit={handleSubmit(submitForm)} noValidate>
                                    <div className="form-group mb-2 text-base">
                                        <IonInput
                                            color={"secondary"}
                                            label="Email"
                                            type="email"
                                            className='border-b-2 border-secondary mb-1'
                                            {...register("email", { 
                                                required: "L'email és obligatori",
                                             })}
                                            required
                                        />
                                        {errors.email && (
                                            <span className="text-red-500">
                                                Ups, l'email no és correcte.
                                            </span>
                                        )}
                                    </div>
                                

                                    <IonRow>
                                        <IonButton color="secondary" expand='full' type="submit" className='w-full'>
                                            {
                                                isPending
                                                    ? <IonSpinner color='light' />
                                                    : <span className='text-white'>Dona'm indicacions</span>
                                            }
                                        </IonButton>
                                    </IonRow>

                                </form>
                            </IonCardContent>
                        </IonCard>
                    </IonRow>
                    <IonRow>
                        <Link to={APP_ROUTES.REGISTER} className='w-full my-4'>
                            <IonButton expand='full' color='light' fill='clear'>
                                No estàs d'alta?
                            </IonButton>
                        </Link>
                    </IonRow>
                </IonCol>
            </IonRow>
        </PublicLayout>
    )
}
