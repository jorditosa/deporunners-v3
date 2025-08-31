import { IonContent, IonPage } from "@ionic/react";
import { ReactNode } from "react";
import HeaderHome from "../components/Header/HeaderHome";

interface PrivateLayoutProps {
  children: ReactNode;
  title?: string;
  showHeader?: boolean;
  headerColor?: string;
  contentColor?: string;
  className?: string;
}

export default function PrivateLayout({ 
  children, 
  showHeader = true,
  contentColor,
  className = ""
}: PrivateLayoutProps) {
  return (
    <IonPage className={className}>
      {showHeader && (
        <HeaderHome />
      )}
      
      <IonContent color={contentColor} className="container">
        {children}
      </IonContent>
    </IonPage>
  )
}