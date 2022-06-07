import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTaskState, listTaskStates } from '../../store/actions/taskStateActions';
import { TASKSTATE_DETAILS_RESET } from '../../store/constants/taskStateConstants';
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
import { AddTaskState } from './AddTaskState';
import { EditTaskState } from './EditTaskState';
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
export const TaskStatesList = () => {
    //////use state////////
    const [states, setStates] = useState([]);
    const [state, setState] = useState({});
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
    const taskStateList = useSelector((state) => state.taskStateList);
    const { loading, error, taskStates } = taskStateList;
    const dispatch = useDispatch();
    const taskStateDelete = useSelector((state) => state.taskStateDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = taskStateDelete;

    useEffect(() => {
        dispatch(listTaskStates());

        dispatch({
            type: TASKSTATE_DETAILS_RESET
        });
    }, [dispatch, successDelete, openCreate, open]);
    useEffect(() => {
        if (loading === false) {
            console.log(taskStateList);
            setStates(taskStateList.taskStates.taskStates);
        }
    }, [loading]);
    const deleteHandler = (taskState) => {
        setOpenDelete(true);
        setState(taskState);
    };
    return (
        <>
            <h1>Task States</h1>

            <Button color="primary" onClick={handleAdd} variant="contained" style={{ marginBottom: 25, float: 'right' }}>
                Create task state
            </Button>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {/* <TableCell>Name</TableCell> */}
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {states.map((row) => (
                            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.description}</TableCell>
                                <TableCell>
                                    <EditIcon
                                        onClick={() => {
                                            setState(row);
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
                    <EditTaskState state={state} close={handleClose} />
                </Box>
            </Modal>
            <Modal open={openCreate} onClose={handleCloseAdd}>
                <Box sx={style}>
                    <AddTaskState close={handleCloseAdd} />
                </Box>
            </Modal>
            <Modal open={openDelete} onClose={() => setOpenDelete(false)}>
                <Box sx={style}>
                    <h3>Do you really want to delete this task State ?</h3>
                    <Button
                        color="primary"
                        onClick={() => {
                            dispatch(deleteTaskState(state._id));
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
