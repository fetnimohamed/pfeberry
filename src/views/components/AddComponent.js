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
import { listTaskThemes } from '../../store/actions/taskThemeActions';
import { listTaskModels } from '../../store/actions/taskModelActions';
import { CreateComponenets } from '../../store/actions/componentsActions';

import { TASKTHEME_DETAILS_RESET } from '../../store/constants/taskThemeConstants';
import { TASKMODEL_DETAILS_RESET } from '../../store/constants/taskModelConstants';

const validationSchema = yup.object({
    name: yup.string('Enter name').required('Name is required'),
    description: yup.string('Enter a description')
});
export const AddComponent = ({ close }) => {
   // const [age, setAge] = React.useState('');
    const [themes, setThemes] = React.useState([]);
    const [models, setModels] = React.useState([]);
    const  componentsCreate= useSelector((state) => state.componentsCreate);
    const { components,loading, error } = componentsCreate;
    const taskThemeList = useSelector((state) => state.taskThemeList);
    const { taskThemes } = taskThemeList;
    const taskModelList = useSelector((state) => state.taskModelList);
    const { taskModels } = taskModelList;
    const dispatch = useDispatch();
    ///get task theme////
    useEffect(() => {
        dispatch(listTaskThemes());
        dispatch({
            type: TASKTHEME_DETAILS_RESET
        });
        dispatch(listTaskModels());
        dispatch({
            type: TASKMODEL_DETAILS_RESET
        });
    }, [dispatch]);

    useEffect(() => {
        if (taskThemes?.taskThemes) {
            setThemes(taskThemes.taskThemes);
            console.log(taskThemes);
        }
        if (taskModels?.taskModels) {
            setModels(taskModels.taskModels);
            console.log(taskModels);
        }
    }, [taskThemes,taskModels]);
    ///get task theme////
    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            taskTheme: '',
            taskModel:'',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // console.log(values);
            dispatch(CreateComponenets(values.name, values.description, values.taskTheme,values.taskModel));
            close();
         
        }
    });
      let themeeee=formik.values.taskTheme._id;
    return (
        <div>
            <h1 style={{ marginBottom: 20 }}>Create Component</h1>

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
                        style={{ marginBottom: 20 }}
                    >
                        {themes.map((theme) => (
                            <MenuItem value={theme._id}>{theme.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>


                <FormControl fullWidth>
                    <InputLabel id="taskModel-label">task Model</InputLabel>
                    <Select
                        labelId="taskModel-label"
                        id="taskModel"
                        name="taskModel"
                        value={formik.values.taskModel}
                        onChange={formik.handleChange}
                        label="taskModel"
                        style={{ marginBottom: 20 }}
                    >
                        {models.map((model) => (
                            <MenuItem value={model._id}>{model.name}</MenuItem>
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
