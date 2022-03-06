import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../layout/loadingComponent";
import { useStore } from "../../../stores/store";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../common/form/MyTextInput";
import MyTextArea from "../../../common/form/MyTextArea";
import MySelectedInput from "../../../common/form/MySelectedInput";
import { categoryOptions } from "../../../common/options/categoryOptions";
import MyDateInput from "../../../common/form/MyDateInput";
import { Activity, ActivityFormValues } from "../../../models/activity";
import { v4 as uuid } from 'uuid';



export default observer(function ActivityForm() {
    const history = useHistory();
    const { activityStore } = useStore();
    const { createActivity, updateActivity,
        loading, loadActivity, loadingInitial, } = activityStore;

    const { id } = useParams<{ id: string }>();

    const [activity, setActivity] = useState<ActivityFormValues>(new ActivityFormValues());

    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required'),
        category: Yup.string().required('Category is required'),  
        date: Yup.string().required('Date is required').nullable(),      
        description: Yup.string().required('Description is required'),        
        city: Yup.string().required('City is required'),
        venue: Yup.string().required('Venue is required'),
        
    });

    useEffect(() => {
        if (id) loadActivity(id).then(activity => setActivity(new ActivityFormValues(activity))).finally(() => loading === false);
    }, [id, loadActivity]);

    function handleFormSubmit(activity: ActivityFormValues) {
        if (!activity.id) {
           let newActivity = {
                ...activity,
                id: uuid()
            };
            createActivity(newActivity as Activity).then(() => history.push(`/activities/${newActivity.id}`));
        } else {
            updateActivity(activity).then(() => history.push(`/activities/${activity.id}`));            
        } 
    }

 

    if (loadingInitial) return <LoadingComponent content='Loading activity...' />;

    return (
        <Segment clearing>      
        <Header content='Activity Details' sub color='teal' />      
            <Formik 
            validationSchema={validationSchema}
            enableReinitialize 
            initialValues={activity} 
            onSubmit={values => handleFormSubmit(values)}>
                {({handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name='title' placeholder='Title' />
                        <MyTextArea rows={3} name='description' placeholder='Description' />
                        <MySelectedInput options={categoryOptions} name='category' placeholder='Category' />
                        <MyDateInput 
                        name='date' 
                        placeholderText='Date' 
                        showTimeSelect
                        timeCaption='time'
                        dateFormat='MMMM d, yyyy h:mm aa'                        
                        />
                        <Header content='Location details' sub color='teal' />  
                        <MyTextInput name='city' placeholder='City' />
                        <MyTextInput name='venue' placeholder='Venue' /> 
                        <Button loading={isSubmitting} 
                        floated="right" positive type='submit' 
                        content="Submit" 
                        disabled={!isValid || isSubmitting || !dirty} />                        
                        <Button as={Link} to='/activities/' floated="right" type='button' content='Cancel' />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})


