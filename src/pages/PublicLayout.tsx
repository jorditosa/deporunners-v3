import { IonContent, IonImg, IonPage } from "@ionic/react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface PublicLayoutProps {
  children: ReactNode;
  headerColor?: string;
  className?: string;
}

export default function PublicLayout({
  children,
  className = ""
}: PublicLayoutProps) {
  return (
    <IonPage className={className} id="home-page">
      <IonContent color='secondary' className="container">
        <div className='container'>
          <Link to={"/"}>
            <IonImg src="/logo.png" className='w-full' />
          </Link>
        </div>
        {children}
        <footer className="w-full flex justify-center items-center fixed bottom-4">
          <span className="block text-white font-semibold">
            &copy; Club Esportiu Deporunners {new Date().getFullYear()}
          </span>
        </footer>
      </IonContent>
    </IonPage>
  )
}