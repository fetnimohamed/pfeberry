import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {deleteUser ,listUsers } from '../../store/actions/userActions';
import { USER_DETAILS_RESET } from '../../store/constants/userConstants';
//////
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
//import { AddUser } from './AddUser';
//import { EditUser } from './EditUser';
/////
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
};
export const UserList = () => {
    //////use state////////
    const [userss, setUsers] = useState([]);
    const [user, setUser] = useState({});
    //////use state////////
    ///open modals///
    const [open, setOpen] = React.useState(false);
    let [openCreate, setOpenCreate] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleAdd = () => {
        setOpenCreate(!openCreate);
    };
    const [openDelete, setOpenDelete] = useState(false);
    const handleCloseAdd = () => setOpenCreate(false);
    ///open modals///
    const userList = useSelector((state) => state.userList);
    const { loading, error, users } = userList;
    const dispatch = useDispatch();
     const userDelete = useSelector((state) => state.userDelete);
    const {loading: loadingDelete, error: errorDelete,success: successDelete,} = userDelete;

    useEffect(() => {
        dispatch(listUsers());
        dispatch({
        type: USER_DETAILS_RESET,
        });
    }, [dispatch, successDelete, openCreate, open]);

    useEffect(() => {
        if (loading === false) {
            console.log(userList);
            setUsers(userList.users.users);
        }
    }, [loading]);

    const deleteHandler = (user) => {
        setOpenDelete(true);
        setUser(user);
    };
    const role =(user)=>{
         if (user.isSuperAdmin===true) {    
             return"super admin"}
          else if (user.isAdmin===true){
              return "admin"} 
           else {
          return "Dispatcher"}
        }   

    return (
        <>
            <h1>Users</h1>

            <Button color="primary" onClick={handleAdd} variant="contained" style={{ marginBottom: 25, float: 'right' }}>
                Create User
            </Button>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {/* <TableCell>Name</TableCell> */}
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Email</TableCell>
                             <TableCell>Role</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userss.map((row) => (
                            <TableRow key={row.firstName} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell>{row.firstName}</TableCell>
                                <TableCell>{row.lastName}</TableCell>
                                <TableCell>{row.email} </TableCell>
                                <TableCell>{role(row)} </TableCell>
                              {}  <TableCell>
                                    <EditIcon
                                        onClick={() => {
                                            setUser(row);
                                            handleOpen();
                                        }}
                                    />
                                    <DeleteIcon onClick={() => deleteHandler(row)} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/*
            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                    <EditUser state={user} close={handleClose} />
                </Box>
            </Modal>
            <Modal open={openCreate} onClose={handleCloseAdd}>
                <Box sx={style}>
                    <AddUser close={handleCloseAdd} />
                </Box>
                                    </Modal>*/}
            <Modal open={openDelete} onClose={() => setOpenDelete(false)}>
                <Box sx={style}>
                    <h3>Do you really want to delete this user ?</h3>
                    <Button
                        color="primary"
                        onClick={() => {
                            dispatch(deleteUser(user._id));
                            setOpenDelete(false);
                        }}
                        variant="contained"
                        style={{ float: 'right' }}
                    >
                        Yes
                    </Button>
                    <Button
                        color="error"
                        onClick={() => setOpenDelete(false)}
                        variant="contained"
                        style={{ marginRight: 15, float: 'right' }}
                    >
                        No
                    </Button>
                </Box>
            </Modal>
        </>
    );
};
