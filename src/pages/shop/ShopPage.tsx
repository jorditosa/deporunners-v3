import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

const ShopPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 3</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 3</IonTitle>
          </IonToolbar>
        </IonHeader>
        <h1>Botiga</h1>
      </IonContent>
    </IonPage>
  );
};

export default ShopPage;
