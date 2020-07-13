import { IonItem, IonAlert, IonInput, IonButton, IonLabel, IonCard } from '@ionic/react';
import React, { useState } from 'react';
import axios from 'axios';
import { validUserDetails } from '../utils/index'
const EmployeeCrud: React.FC = () => {
    const [empName, setEmpName] = useState("");
    const [empJob, setEmpJob] = useState("");
    const [empID, setEmpID] = useState(1);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const alertUser = (message: string) => {
        setAlertMessage(message);
        setShowAlert(true);
    }

    const addEmployee = () => {
        if (validUserDetails(empName, empJob)) {
            axios.post('https://reqres.in/api/users', {
                name: empName,
                job: empJob
            })
                .then(function (res) {
                    const resp = res.data;
                    alertUser(`New User Created at ${resp.createdAt}.`)
                })
                .catch(function (error) {
                    alertUser(`Error occured in Adding the user`)
                })
        } else {
            alertUser(`Please Enter Valid Employee Name and Job`)
        }
    }
    const updateEmployee = () => {
        if (validUserDetails(empName, empJob)) {
            axios.put(`https://reqres.in/api/users/${empID}`, {
                name: empName,
                job: empJob
            })
                .then(function (res) {
                    const resp = res.data;
                    alertUser(`User updated at ${resp.updatedAt}.`)
                })
                .catch(function (error) {
                    alertUser(`Error occured in updating user`)
                })
        } else {
            alertUser(`Please Enter Valid Employee Name and Job`)
        }
    }

    const deleteEmployee = () => {
        axios.delete(`https://reqres.in/api/users/${empID}`)
            .then(function () {
                alertUser(`User ${empID} deleted `)
            })
            .catch(function (error) {
                alertUser(`Error occured in deleting user`)
                console.log(error);
            })
    }




    return (

        <IonCard>
            <IonAlert
                isOpen={showAlert}
                onDidDismiss={() => setShowAlert(false)}
                header={'Success'}
                message={alertMessage}
                buttons={[{ text: 'Ok', role: 'cancel' }]}
            />

            <IonCard class="ion-margin">
                <IonItem>
                    <IonLabel position="floating">Employee ID</IonLabel>
                    <IonInput
                        name="empID"
                        value={empID}
                        type="text"
                        onIonChange={e => setEmpID(e.detail.value as any)}
                    ></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Employee Name</IonLabel>
                    <IonInput
                        name="empName"
                        value={empName}
                        type="text"
                        onIonChange={e => setEmpName(e.detail.value as any)}
                    ></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Job</IonLabel>
                    <IonInput
                        name="job"
                        value={empJob}
                        type="text"
                        onIonChange={e => setEmpJob(e.detail.value as any)}
                    ></IonInput>
                </IonItem>
            </IonCard>
            <IonItem>
                <IonButton onClick={() => addEmployee()} color="primary" >Add Employee</IonButton>
                <IonButton onClick={() => updateEmployee()} color="secondary" >Update Employee</IonButton>
                <IonButton onClick={() => deleteEmployee()} color="danger" >Delete Employee</IonButton>
            </IonItem>

        </IonCard>
    );
};

export default EmployeeCrud;
