import { ErrorMessage, Formik } from "formik";
import React from "react";
import { Button, Form, Header, Label } from "semantic-ui-react";
import MyTextInput from "../../common/form/MyTextInput";
import { useStore } from "../../stores/store";

export default function ForgotPasswordForm() {
    const { userStore, modelStore } = useStore();
    const { forgotPassword } = userStore;   

    return (
        <Formik initialValues={{ email: '', error: null  }}
            onSubmit={(values, { setErrors }) => forgotPassword(values.email).catch(error =>
                setErrors({ error: error.response.data }))}>
            {({ handleSubmit, isSubmitting, errors, isValid, dirty  }) => (
                <Form onSubmit={handleSubmit}>
                    <Header as='h2' content='Återskapa nytt lösenord.' color='teal' textAlign='center' />
                    <MyTextInput name='email' placeholder='Email' />
                    <ErrorMessage name='error' render={() =>
                        <Label style={{ marginBotton: 10 }} basic color='red' content={errors.error} />}
                    />
                     <Button disabled={!isValid || !dirty || isSubmitting}
                        loding={isSubmitting}
                        positive content='Submit' type='submit' fluid />
                    <Button onClick={() => modelStore.closeModel()} content='Bakåt' color='blue' fluid />

                </Form>
            )}
        </Formik>
    );
}










