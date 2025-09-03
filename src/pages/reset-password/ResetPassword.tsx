import { useForm } from 'react-hook-form'
import PublicLayout from '../PublicLayout'
import { IonRow, IonCol, IonCard, IonCardHeader, IonCardContent, IonInput, IonButton, IonSpinner, useIonRouter, IonInputPasswordToggle } from '@ionic/react'
import { Link } from 'react-router-dom'
import { ResetFormData } from '../../interfaces/auth.interface'
import Heading from '../../components/ui/Heading'
import { useMutation } from '@tanstack/react-query'
import { authActions } from '../../actions/authActions'
import { toast } from 'react-toastify'
import { APP_ROUTES } from '../../constants/endpoints'

export default function ResetPassword() {
    const router = useIonRouter();
    const { handleSubmit, register, formState: { errors }, reset } = useForm<ResetFormData>({
        defaultValues: {
            code: '',
            password: '',
            repeatPassword: ''
        }
    })
    const { mutate, isPending } = useMutation({
        mutationFn: authActions.resetPassword,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            toast.success("Contrasenya modificada correctament")
            reset()
            router.push(APP_ROUTES.LOGIN)
        }
    })

    const submitForm = (formData: ResetFormData) => {
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
                                        <label htmlFor="code" className='text-xs font-semibold uppercase text-secondary'>Codi recuperació</label>
                                        <IonInput
                                            color={"secondary"}
                                            type="text"
                                            fill='outline'
                                            {...register("code", {
                                                required: "El codi de recuperació és obligatori",
                                            })}
                                            required
                                        />
                                        {errors.code && (
                                            <span className="text-red-500">
                                                Ups, el codi no és el que t'hem enviat.
                                            </span>
                                        )}
                                    </div>

                                    <div className="form-group mb-2 text-base">
                                        <label htmlFor="password" className='text-xs font-semibold uppercase text-secondary'>Contrasenya</label>
                                        <IonInput
                                            color={"secondary"}
                                            type="password"
                                            fill='outline'
                                            {...register("password", {
                                                required: "El password és obligatori",
                                                minLength: {
                                                    value: 6,
                                                    message: "El password ha de tenir almenys 6 caràcters"
                                                }
                                            })}
                                            required
                                        >
                                            <IonInputPasswordToggle color={"secondary"} slot="end"></IonInputPasswordToggle>
                                        </IonInput>
                                        {errors.password && (
                                            <span className="text-red-500">
                                                Ups, el password és correcte.
                                            </span>
                                        )}
                                    </div>
                                    <div className="form-group mb-2 text-base">
                                        <label htmlFor="repeatPassword" className='text-xs font-semibold uppercase text-secondary'>Repetir Contrasenya</label>
                                        <IonInput
                                            color={"secondary"}
                                            type="text"
                                            fill='outline'
                                            {...register("repeatPassword", {
                                                required: "El password és obligatori",
                                                minLength: {
                                                    value: 6,
                                                    message: "El password ha de tenir almenys 6 caràcters"
                                                }
                                            })}
                                            required
                                        >
                                            <IonInputPasswordToggle color={"secondary"} slot="end"></IonInputPasswordToggle>
                                        </IonInput>
                                        {errors.repeatPassword && (
                                            <span className="text-red-500">
                                                Ups, les contrasenyes no coincideixen.
                                            </span>
                                        )}
                                    </div>


                                    <IonRow>
                                        <IonButton color="secondary" expand='full' type="submit" className='w-full'>
                                            {
                                                isPending
                                                    ? <IonSpinner color='light' />
                                                    : <span className='text-white'>Actualitzar contrasenya</span>
                                            }
                                        </IonButton>
                                    </IonRow>
                                    <IonRow>
                                        <Link to={APP_ROUTES.FORGOT_PASSWORD} className='w-full my-4'>
                                            <IonButton expand='full' color='secondary' fill='clear'>
                                                No has rebut el codi?
                                            </IonButton>
                                        </Link>
                                    </IonRow>
                                </form>
                            </IonCardContent>
                        </IonCard>
                    </IonRow>

                </IonCol>
            </IonRow>
        </PublicLayout>
    )
}
