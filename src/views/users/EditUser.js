import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { Password } from '@material-ui/icons';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
export const EditUser = ({ user }) => {
    const [title, setTitle] = useState('Add user ');

    const formik = useFormik({
        initialValues: {
            firstName: user?.firstName ? user.firstName : '',
            lastName: user?.lastName ? user.lastName : '',
            email: user?.email ? user?.email : '',
            password: '',
            verifPassword: '',
            isAdmin: false,
            isDispatcher: true,
            isSuperAdmin: false
        },
        // validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values);
            // dispatch(CreateSystem(values.name, values.description));
            //       close();
        }
    });
    useEffect(() => {
        console.log(user);
        if (user) setTitle('Edit user');
    }, []);
    return (
        <div>
            <h1 style={{ marginBottom: 20 }}>Create System</h1>

            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    // error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                    // helperText={formik.touched.firstName && formik.errors.firstName}
                    style={{ marginBottom: 20 }}
                />
                <TextField
                    fullWidth
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    type="text"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    // error={formik.touched.description && Boolean(formik.errors.description)}
                    // helperText={formik.touched.description && formik.errors.description}
                    style={{ marginBottom: 20 }}
                />
                <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    // error={formik.touched.description && Boolean(formik.errors.description)}
                    // helperText={formik.touched.description && formik.errors.description}
                    style={{ marginBottom: 20 }}
                />
                <TextField
                    fullWidth
                    id="password"
                    name="password"
                    label="password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    // error={formik.touched.description && Boolean(formik.errors.description)}
                    // helperText={formik.touched.description && formik.errors.description}
                    style={{ marginBottom: 20 }}
                />
                {user ? (
                    <TextField
                        fullWidth
                        id="verifPassword"
                        name="verifPassword"
                        label="verifPassword"
                        type="password"
                        value={formik.values.verifPassword}
                        onChange={formik.handleChange}
                        // error={formik.touched.description && Boolean(formik.errors.description)}
                        // helperText={formik.touched.description && formik.errors.description}
                        style={{ marginBottom: 20 }}
                    />
                ) : (
                    ''
                )}
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
