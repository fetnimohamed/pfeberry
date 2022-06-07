import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {deleteGroup ,listGroups } from '../../store/actions/groupActions';
import { GROUP_DETAILS_RESET } from '../../store/constants/groupConstants';
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
import { AddGroup } from './AddGroup';
import { EditGroup } from './EditGroup';
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
export const GroupList = () => {
    //////use state////////
    const [groupss, setGroups] = useState([]);
    const [group, setGroup] = useState({});
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
    const groupList = useSelector((state) => state.groupList);
    const { loading, error, groups } = groupList;
    const dispatch = useDispatch();
     const groupDelete = useSelector((state) => state.groupDelete);
    const {loading: loadingDelete, error: errorDelete,success: successDelete,} = groupDelete;

    useEffect(() => {
        dispatch(listGroups());
        dispatch({
        type: GROUP_DETAILS_RESET,
        });
    }, [dispatch, successDelete, openCreate, open]);

    useEffect(() => {
        if (loading === false) {
            console.log(groupList);
            setGroups(groupList.groups.group);
        }
    }, [loading]);

    const deleteHandler = (group) => {
        setOpenDelete(true);
        setGroup(group);
    };
    return (
        <>
            <h1>Groups</h1>

            <Button color="primary" onClick={handleAdd} variant="contained" style={{ marginBottom: 25, float: 'right' }}>
                Create Group
            </Button>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {/* <TableCell>Name</TableCell> */}
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Group admin</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {groupss.map((row) => (
                            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.description}</TableCell>
                                <TableCell>{row.user.firstName} </TableCell>
                                <TableCell>
                                    <EditIcon
                                        onClick={() => {
                                            setGroup(row);
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
            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                    <EditGroup state={group} close={handleClose} />
                </Box>
            </Modal>
            <Modal open={openCreate} onClose={handleCloseAdd}>
                <Box sx={style}>
                    <AddGroup close={handleCloseAdd} />
                </Box>
            </Modal>
            <Modal open={openDelete} onClose={() => setOpenDelete(false)}>
                <Box sx={style}>
                    <h3>Do you really want to delete this Group ?</h3>
                    <Button
                        color="primary"
                        onClick={() => {
                            dispatch(deleteGroup(group._id));
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
