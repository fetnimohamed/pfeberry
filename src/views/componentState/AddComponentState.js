import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { CreateCompState } from '../../store/actions/comStateActions';
const validationSchema = yup.object({
    name: yup.string('Enter name').required('Name is required'),
    description: yup.string('Enter a description')
});
export const AddComponentState = ({ close }) => {
    const  compStateCreate= useSelector((state) => state.compStateCreate);
    const { compState, loading, error } = compStateCreate;
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            name: '',
            description: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            dispatch(CreateCompState(values.name, values.description));
            close();
        }
    });
    return (
        <div>
            <h1 style={{ marginBottom: 20 }}>Create task state</h1>

            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    id="name"
                    name="name"
                    label="Name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                    style={{ marginBottom: 20 }}
                />
                <TextField
                    fullWidth
                    id="description"
                    name="description"
                    label="Description"
                    type="text"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                    style={{ marginBottom: 20 }}
                />
                <div style={{ float: 'right' }}>
                    <Button color="primary" variant="contained" style={{ marginRight: 5 }} type="submit">
                        Submit
                    </Button>
                    <Button color="error" variant="contained" style={{ marginLeft: 5 }} onClick={close}>
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    );
};
