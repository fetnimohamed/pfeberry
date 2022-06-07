import React, { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { CreateTaskTheme } from '../../store/actions/taskThemeActions';
import { deleteTaskTheme, listTaskThemes } from '../../store/actions/taskThemeActions';
import { updateTaskModel } from '../../store/actions/taskModelActions';

import { TASKTHEME_DETAILS_RESET } from '../../store/constants/taskThemeConstants';
const validationSchema = yup.object({
    name: yup.string('Enter name').required('Name is required'),
    description: yup.string('Enter a description')
});

export const EditTaskModels = ({ state, close }) => {
    //const [age, setAge] = React.useState('');
    const [themes, setThemes] = React.useState([]);
    const taskModelUpdate = useSelector((state) => state.taskModelUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = taskModelUpdate;
    const taskThemeList = useSelector((state) => state.taskThemeList);
    const { taskThemes } = taskThemeList;
    const dispatch = useDispatch();
    ///get task theme////
    
    console.log(state);
    useEffect(() => {
        dispatch(listTaskThemes());
        dispatch({
            type: TASKTHEME_DETAILS_RESET
        });
    }, [dispatch]);
    useEffect(() => {
        if (taskThemes?.taskThemes) {
            setThemes(taskThemes.taskThemes);
            console.log(taskThemes);
        }
    }, []);
    ///get task theme////
    const formik = useFormik({
        initialValues: {
            name: state.name,
            description: state.description,
            taskTheme: state.taskTheme._id
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // console.log(values);
            dispatch(updateTaskModel({ _id: state._id, name: values.name, description: values.description, taskTheme: values.taskTheme }));
            close();
        }
    });
    return (
        <div>
            <h1 style={{ marginBottom: 20 }}>Edit task Model</h1>

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
                <FormControl fullWidth>
                    <InputLabel id="taskTheme-label">task theme</InputLabel>
                    <Select
                        labelId="taskTheme-label"
                        id="taskTheme"
                        name="taskTheme"
                        value={formik.values.taskTheme}
                        onChange={formik.handleChange}
                        label="taskTheme"
                    >
                        {themes.map((theme) => (
                            <MenuItem value={theme._id}>{theme.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <div style={{ marginTop: 20, float: 'right' }}>
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
