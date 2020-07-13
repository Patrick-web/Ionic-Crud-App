import { IonCard, IonCardTitle, IonPopover, IonCardContent, IonText, IonAvatar, IonItem, IonInput, IonButton, IonLabel } from '@ionic/react';
import React, { useState } from 'react';
import axios from 'axios';
import { Pantone } from '../interfaces/index'
const GetPantones: React.FC = () => {
    const [pantoneID, setPantoneID] = useState(1);
    const [showPopover, setShowPopover] = useState(false);
    const [pantones, setPantones] = useState<Pantone[]>([]);

    const getPantone = () => {
        axios.get(`https://reqres.in/api/unknown/${pantoneID}`)
            .then(function (response) {
                const singlepantone: Pantone[] = [response.data.data]
                setPantones(singlepantone)
                setShowPopover(true)
            })
            .catch(function (error) {
                window.alert('Pantone not found')
            })
    }
    const getAllPantones = () => {
        axios.get(`https://reqres.in/api/unknown`)
            .then(function (response) {
                const allPantones: Pantone[] = response.data.data;
                setPantones(allPantones)
                setShowPopover(true)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    return (

        <IonCard>
            <IonPopover
                isOpen={showPopover}
                cssClass='my-custom-class'
                onDidDismiss={e => setShowPopover(false)}
            >
                {pantones.map(pantone => (
                    <IonCard key={pantone.id}>
                        <IonCardTitle class="ion-text-center">
                            <div style={{ background: pantone.color }} className="preview"></div>
                        </IonCardTitle>
                        <IonCardContent class="ion-no-padding">
                            <IonItem>
                                <IonText>Pantone name: {pantone.name}</IonText>
                            </IonItem>
                            <IonItem>
                                <IonText>Pantone value: {pantone.pantone_value}</IonText>
                            </IonItem>
                            <IonItem>
                                <IonText>Year: {pantone.year}</IonText>
                            </IonItem>
                            <IonItem>
                                <IonText>Hex Value: {pantone.color}</IonText>
                            </IonItem>
                        </IonCardContent>
                    </IonCard>
                ))}
            </IonPopover>
            <IonItem class="ion-margin">
                <IonLabel position="floating">Pantone ID</IonLabel>
                <IonInput
                    name="userID"
                    value={pantoneID}
                    type="number"
                    onIonChange={e => setPantoneID(e.detail.value as any)}
                ></IonInput>
            </IonItem>
            <IonItem>
                <IonButton onClick={() => getPantone()} color="primary" >Get a Pantone</IonButton>
                <IonButton onClick={() => getAllPantones()} color="secondary" >Get all Pantones</IonButton>
            </IonItem>

        </IonCard>
    );
};

export default GetPantones;
