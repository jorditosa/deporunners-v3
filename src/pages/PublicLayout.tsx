import { IonButton, IonContent, IonImg, IonPage, useIonRouter } from "@ionic/react";
import { ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";
import { APP_ROUTES } from "../constants/endpoints";
import Spinner from "../components/ui/Spinner";

interface PublicLayoutProps {
  children: ReactNode;
  headerColor?: string;
  className?: string;
}

export default function PublicLayout({
  children,
  className = ""
}: PublicLayoutProps) {
  const router = useIonRouter();
  const { data, isLoading: isLoadingUser } = useAuth()

  if (isLoadingUser) return <Spinner />
  if (data) router.push(APP_ROUTES.PRIVATE_HOME)
  if (!data) return (
    <IonPage className={className} id="home-page">
      <IonContent color='secondary' className="container">
        <div
          className="absolute inset-0 z-0 h-full"
          style={{
            backgroundImage: 'url(/public-background.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>
        <div className='relative z-10'>
          <IonButton
            fill='clear'
            onClick={() => router.push('/', 'forward')}
            className="py-8 bg-gradient-to-b from-secondary via-secondary w-full"
          >
            <IonImg src="/logo.png" className='w-full' />
          </IonButton>
        </div>
        <div className="relative z-10">
          {children}
          <footer className="container w-full h-full pt-24 pb-2 flex justify-center items-center z-20 p-1">
            <div className="w-full bg-white backdrop-blur-sm rounded px-4 py-2">
              <span className="block text-gray-700 font-semibold text-center">
                &copy; Club Esportiu Deporunners {new Date().getFullYear()}
              </span>
            </div>
          </footer>
        </div>
      </IonContent>
    </IonPage>
  )
}