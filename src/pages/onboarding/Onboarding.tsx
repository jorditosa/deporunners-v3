import { useState } from 'react'
import { Preferences } from '@capacitor/preferences'
import PublicLayout from '../PublicLayout'
import { IonButton, IonSpinner, useIonRouter } from '@ionic/react'
import { ChevronRight, ChevronLeft, Star, CheckCircle, LogIn, FilePenLine } from 'lucide-react'
import { APP_ROUTES } from '../../constants/endpoints'

interface OnboardingStep {
    id: number
    title: string
    description: string
    icon: React.ReactNode
    image?: string
}

const onboardingSteps: OnboardingStep[] = [
    {
        id: 1,
        title: "Benvingut a Deporunners",
        description: "Descobreix totes les funcionalitats que tenim preparades per a tu. Comença el teu viatge amb nosaltres tant si ets nou/va Soci, com si ja ho eres i tornes a usar la App en la nova actualització.",
        icon: <Star className="h-12 w-12 text-secondary" />
    },
    {
        id: 2,
        title: "Registra't",
        description: "T'hauràs de tornar a registrar si us plau. Tan fàcil com anar a la secció PRIMERA VEGADA i posar l'email que has utilitzat per donar-te d'alta al Club i una contrasenya.",
        icon: <FilePenLine className="h-12 w-12 text-secondary" />
    },
    {
        id: 3,
        title: "Accedir a la aplicació",
        description: "Un cop fet el registre correctament, ja podràs accedir per INICIAR SESSIÓ amb les teves credencials.",
        icon: <LogIn className="h-12 w-12 text-secondary" />
    },
    {
        id: 4,
        title: "Tot està preparat!",
        description: "Un cop dins, explora el calendari, apunta't a les llistes d'entrenaments, curses i actes socials que et proposem, i revisa notícies i avantatges que com a Deporunner tens al teu abast.",
        icon: <CheckCircle className="h-12 w-12 text-green-500" />
    }
]

export default function OnboardingPage() {
    const router = useIonRouter()
    const [currentStep, setCurrentStep] = useState(0)
    const [isCompleting, setIsCompleting] = useState(false)

    const handleNext = () => {
        if (currentStep < onboardingSteps.length - 1) {
            setCurrentStep(currentStep + 1)
        } else {
            completeOnboarding()
        }
    }

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1)
        }
    }

    const completeOnboarding = async () => {
        try {
            setIsCompleting(true)
            await Preferences.set({
                key: 'deporunner-onboarding-done',
                value: 'true'
            })
            router.push(APP_ROUTES.PUBLIC_HOME, 'forward')
        } catch (error) {
            console.error('Error saving onboarding preference:', error)
        } finally {
            setIsCompleting(false)
        }
    }

    const currentStepData = onboardingSteps[currentStep]
    const isLastStep = currentStep === onboardingSteps.length - 1

    return (
        <PublicLayout>
            <main className="min-h-full">
                <div className="container mx-auto px-4">
                    <div className="max-w-lg mx-auto">

                        {/* Onboarding Card */}
                        <div className="bg-white rounded shadow-xl px-4 py-5 mb-6">

                            {/* Progress Indicator */}
                            <div className="mb-8">
                                <div className="flex justify-center space-x-2 mb-4">
                                    {onboardingSteps.map((_, index) => (
                                        <div
                                            key={index}
                                            className={`h-3 w-8 rounded-full transition-all duration-300 ${index <= currentStep
                                                    ? 'bg-gradient-to-r from-secondary to-primary'
                                                    : 'bg-gray-200'
                                                }`}
                                        />
                                    ))}
                                </div>
                                <p className="text-center text-sm text-gray-500">
                                    {currentStep + 1} de {onboardingSteps.length}
                                </p>
                            </div>

                            {/* Content */}
                            <div className="text-center space-y-4">
                                {/* Title */}
                                <h2 className="text-center font-bold text-secondary">
                                    {currentStepData.title}
                                </h2>

                                {/* Description */}
                                <p className="text-gray-700 h-32 text-base leading-relaxed text-start">
                                    {currentStepData.description}
                                </p>
                            </div>

                            {/* Navigation Buttons */}
                            <div className="flex justify-between items-center mt-12 space-x-4">
                                {/* Previous Button */}
                                <IonButton
                                    onClick={handlePrevious}
                                    disabled={currentStep === 0 || isCompleting}
                                    size='small'
                                    color='secondary'
                                    className={` ${currentStep === 0
                                            ? 'invisible'
                                            : 'text-white'
                                        }`}
                                >
                                    <ChevronLeft className="size-5 text-white" />
                                    <span className='text-white'>Anterior</span>
                                </IonButton>

                                {/* Next/Finish Button */}
                                <IonButton
                                    onClick={handleNext}
                                    disabled={isCompleting}
                                    size='small'
                                    color='secondary'
                                    className='text-white'
                                >
                                    {isCompleting ? (
                                        <>
                                            <IonSpinner color="light" />
                                            <span className='text-white'>Finalitzant...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span className='text-white'>{isLastStep ? 'Començar' : 'Següent'}</span>
                                            <ChevronRight className="size-5 text-white" />
                                        </>
                                    )}
                                </IonButton>
                            </div>
                            {/* Step indicators with dots */}
                            <div className="flex justify-center space-x-3 mt-8">
                                {onboardingSteps.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentStep(index)}
                                        disabled={isCompleting}
                                        className={`h-3 w-3 rounded-full! transition-all duration-30 ${index === currentStep
                                                ? 'bg-secondary scale-110'
                                                : index < currentStep
                                                    ? 'bg-gray-500'
                                                    : 'bg-gray-300 hover:bg-gray-400'
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </PublicLayout>
    )
}