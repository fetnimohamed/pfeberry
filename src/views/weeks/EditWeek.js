import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
/////redux/////
import { useDispatch, useSelector } from 'react-redux';
import { updateWeek } from '../../store/actions/weekActions';
import {listUsers} from'../../store/actions/userActions';
import {USER_DETAILS_RESET} from '../../store/constants/userConstants';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
const validationSchema = yup.object({
    name: yup.string('Enter name').required('Name is required'),
    description: yup.string('Enter a description'),
    startDate:yup.date(),
    endDate: yup.date(),
});

export const EditWeek = ({ state, close }) => {
    const weekUpdate = useSelector((state) => state.weekUpdate);
    
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = weekUpdate;
    const [userss, setUsers] = useState([]);
    const userList = useSelector((state) => state.userList);
    const { users } = userList;
    const dispatch = useDispatch();
       useEffect(() => {
        dispatch(listUsers());
        dispatch({
        type: USER_DETAILS_RESET,
        });
   }, [dispatch]);

    useEffect(() => {
        if (users?.users) {
            setUsers(users.users);
            console.log(users);
        }
   
    }, [users]);
    useEffect(() => {
        if (successUpdate) {
            close();
        }
    }, [successUpdate]);
    const formik = useFormik({
        initialValues: {
            name: state.name,
            description: state.description,
            startDate:state.startDate,
            endDate:state.endDate,
            user:state.user._id,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            dispatch(updateWeek({ _id: state._id ,name:values.name,startDate: values.startDate,endDate:values.endDate,description:values.description,user:values.user }));

            if (successUpdate) {
                close();
            }
        }
    });
    return (
        <div>
            <h1 style={{ marginBottom: 20 }}>Edit task State</h1>

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
                    id="startDate"
                    name="startDate"
                    label="Start Date"
                    type="date"
                    value={dayjs(formik.values.startDate).format("YYYY-MM-DD")}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.startDate && Boolean(formik.errors.startDate)}
                    style={{ marginBottom: 20 }}
                />
              <TextField
                    id="endDate"
                    name="endDate"
                    label="End Date"
                    type="date"
                    value={dayjs(formik.values.endDate).format("YYYY-MM-DD")}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.endDate && Boolean(formik.errors.endDate)}
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
                    <InputLabel id="user-label">dispatcher</InputLabel>
                    <Select
                        labelId="user-label"
                        id="user"
                        name="user"
                        value={formik.values.user}
                        onChange={formik.handleChange}
                        label="dispatcher"
                    >
                        {userss.map((user) => (
                            <MenuItem value={user._id}>{user.firstName} {user.lastName}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <div style={{ float: 'right' }}>
                    <Button color="primary" variant="contained" style={{ marginRight: 5 }} type="submit">
                        Submit
                    </Button>
                    <Button
                        color="error"
                        variant="contained"
                        style={{ marginLeft: 5 }}
                        onClick={() => {
                            close();
                        }}
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    );
};
