import { ErrorMessage, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, Form, Header, Label } from "semantic-ui-react";
import agent from "../../api/agent";
import MyTextInput from "../../common/form/MyTextInput";
import { useStore } from "../../stores/store";
import userStore from "../../stores/userStore";

export default function ForgotPasswordForm() {
    const { modelStore, userStore } = useStore();
    const { forgotPassword } = userStore;

    // function handleSubmit () {
    //     agent.Account.forgotPassword(email).then(() => {
    //         toast.success('Verification email resent - please check your email');
    //     }).catch(error => console.log(error));
    // }

    return (
        <Formik initialValues={{ email: '', error: null }}
            onSubmit={(values, { setErrors }) => forgotPassword(values.email).catch(error =>
                setErrors({ error: error.response.data }))}>
            {({ handleSubmit, isSubmitting, errors }) => (
                <Form onSubmit={handleSubmit}>
                    <Header as='h2' content='Nytt lösenord' color='teal' textAlign='center' />
                    <MyTextInput name='email' placeholder='Email' />
                    <ErrorMessage name='error' render={() =>
                        <Label style={{ marginBotton: 10 }} basic color='red' content={errors.error} />}
                    />
                    <Button color='linkedin' loading={isSubmitting} content='Submit' type='login' fluid />


                </Form>
            )}
        </Formik>
    );


}










