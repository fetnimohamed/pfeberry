import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

/////redux/////
import { useDispatch, useSelector } from 'react-redux';
import { updatedGroup } from '../../store/actions/groupActions';
import { GROUP_UPDATE_RESET } from '../../store/constants/groupConstants';
import {listUsers}from '../../store/actions/userActions'
import {USER_DETAILS_RESET} from '../../store/constants/userConstants'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const validationSchema = yup.object({
    name: yup.string('Enter name').required('Name is required'),
    description: yup.string('Enter a description')
});

export const EditGroup = ({ state , close }) => {
    const [userss, setUsers] = React.useState([]);
    const dispatch = useDispatch();
    const groupUpdate = useSelector((state) => state.groupUpdate);
    const { loading: loadingUpdate,  error: errorUpdate, success: successUpdate,} = groupUpdate;
    const userList = useSelector((state) => state.userList);
    const { users } = userList;

    React.useEffect(() => {
        if (successUpdate) {
            close();
        }
    }, [successUpdate]);

    React.useEffect(() => {
    dispatch(listUsers());

    dispatch({
      type: USER_DETAILS_RESET,
    });
   }, [dispatch]);
   React.useEffect(() => {
        if (users?.users) {
            setUsers(users.users);
            console.log(users);
        }
    }, [users]);
    const formik = useFormik({
        initialValues: {
            name: state.name,
            description: state.description,
            user:state.user,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            dispatch(updatedGroup({ _id: state._id, name: values.name, description: values.description ,user:values.user}));

            if (successUpdate) {
                close();
            }
        }
    });
    return (
        <div>
            <h1 style={{ marginBottom: 20 }}>Edit Group </h1>

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
                    <InputLabel id="user-label">task theme</InputLabel>
                    <Select
                        labelId="user-label"
                        id="user"
                        name="user"
                        value={formik.values.user}
                        onChange={formik.handleChange}
                        label="user"
                    >
                        {userss.map((user) => ( 
                            <MenuItem value={user._id}>{user.firstName} {user.lastName}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <div style={{ marginTop: 20, float: 'right' }}>
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
