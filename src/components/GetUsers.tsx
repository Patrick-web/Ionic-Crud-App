import { IonItem, IonInput, IonPopover, IonButton, IonLabel, IonCard, IonCardTitle, IonAvatar, IonCardContent, IonText } from '@ionic/react';
import React, { useState } from 'react';
import axios from 'axios';
// import AuthContext from '../context/AuthContext'
// import { useHistory } from "react-router";
const GetUsers: React.FC = () => {
    const [userID, setUserID] = useState(1);
    const [showPopover, setShowPopover] = useState(false);
    interface User {
        id: string;
        email: string;
        first_name: string;
        last_name: string;
        avatar: string;
    }

    const [users, setUsers] = useState<User[]>([]);



    const getSingleUser = () => {
        axios.get(`https://reqres.in/api/users/${userID}`)
            .then(function (response) {
                const singleuser: User[] = [response.data.data]
                setUsers(singleuser)
                setShowPopover(true)
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    const getAllUsers = () => {
        axios.all([
            axios.get('https://reqres.in/api/users?page=1'),
            axios.get('https://reqres.in/api/users?page=2')
        ])
            .then(res => {
                const allusers: User[] = [...res[0].data.data, ...res[1].data.data]
                setUsers(allusers)
                setShowPopover(true)
            })
    }



    return (

        <IonCard>
            <IonPopover
                isOpen={showPopover}
                cssClass='my-custom-class'
                onDidDismiss={e => setShowPopover(false)}
            >
                {users.map(user => (
                    <IonCard key={user.id}>
                        <IonCardTitle class="ion-padding">
                            <IonAvatar class="ion-margin-bottom">
                                <img src={user.avatar} alt="" />
                            </IonAvatar>
                            {user.first_name} {user.last_name}
                        </IonCardTitle>
                        <IonCardContent>
                            <IonText>Email : {user.email}
                            </IonText>
                        </IonCardContent>
                    </IonCard>
                ))}
            </IonPopover>
            <IonItem class="ion-margin">
                <IonLabel position="floating">User ID</IonLabel>
                <IonInput
                    name="userID"
                    value={userID}
                    type="number"
                    onIonChange={e => setUserID(e.detail.value as any)}
                ></IonInput>
            </IonItem>
            <IonItem>
                <IonButton onClick={() => getSingleUser()} color="primary" >Fetch Single User</IonButton>
                <IonButton onClick={() => getAllUsers()} color="secondary" >Get all  Usesr</IonButton>
            </IonItem>

        </IonCard>
    );
};

export default GetUsers;
