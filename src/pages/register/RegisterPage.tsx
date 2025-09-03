import { useForm } from 'react-hook-form'
import PublicLayout from '../PublicLayout'
import { IonRow, IonCol, IonCard, IonCardHeader, IonCardContent, IonInput, IonInputPasswordToggle, IonButton, IonSpinner, useIonRouter } from '@ionic/react'
import { Link } from 'react-router-dom'
import { RegisterFormData } from '../../interfaces/auth.interface'
import Heading from '../../components/ui/Heading'
import { FilePenLine } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { authActions } from '../../actions/authActions'
import { toast } from 'react-toastify'
import { APP_ROUTES } from '../../constants/endpoints'

export default function RegisterPage() {
    const router = useIonRouter()
    const { handleSubmit, register, formState: { errors }, reset } = useForm<RegisterFormData>({
        defaultValues: {
            email: '',
            password: '',
            repeatPassword: ''
        }
    })
    const { mutate, isPending } = useMutation({
        mutationFn: authActions.createAccount,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            toast.success("Alta feta correctament, ja pots iniciar sessió")
            reset()
            router.push(APP_ROUTES.LOGIN, 'forward')
        }
    })

    const submitForm = (formData: RegisterFormData) => {
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
                                    title="nova Alta a la App"
                                    variant="h1"
                                    icon={FilePenLine}
                                    iconSize={12}
                                />
                            </IonCardHeader>

                            <IonCardContent>
                                <form onSubmit={handleSubmit(submitForm)} noValidate>
                                    <div className="form-group mb-2 text-base">
                                        <label htmlFor="email" className='text-xs font-semibold uppercase text-secondary'>Email</label>
                                        <IonInput
                                            color={"secondary"}
                                            type="email"
                                            fill='outline'
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
                                                    : <span className='text-white'>Dona't d'Alta</span>
                                            }
                                        </IonButton>
                                    </IonRow>
                                    <IonRow>
                                        <Link to={APP_ROUTES.LOGIN} className='w-full my-4'>
                                            <IonButton expand='full' color='secondary' fill='clear'>
                                                Ja tens compte?
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
