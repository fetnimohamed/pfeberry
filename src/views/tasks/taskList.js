import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, listTask } from '../../store/actions/taskActions';
import { TASK_DETAILS_RESET } from '../../store/constants/taskConstants';
import { useHistory } from 'react-router-dom';

//////
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DetailsIcon from '@mui/icons-material/Details';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
////
import { AddTask } from './AddTask';
import { EditTask } from './EditTask';
import { FormControl, Grid, OutlinedInput, TextField } from '@mui/material';
import { Calendar } from '../calendar/calendar';

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
export const TaskList = () => {
    const [search, setSearch] = useState('');

    //////use state////////
    const [taskss, setTasks] = useState([]);
    const [task, setTask] = useState({});
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
    const taskList = useSelector((state) => state.taskList);
    const { loading, error, tasks } = taskList;
    const dispatch = useDispatch();
    const taskDelete = useSelector((state) => state.taskDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = taskDelete;
    const history = useHistory();
    useEffect(() => {
        dispatch(listTask());

        dispatch({
            type: TASK_DETAILS_RESET
        });
    }, [dispatch, successDelete, openCreate, open]);

    useEffect(() => {
        if (loading === false) {
            console.log(taskList);
            setTasks(taskList.tasks.tasks);
        }
    }, [loading]);
    const deleteHandler = (task) => {
        setOpenDelete(true);
        setTask(task);
    };
    return (
        <>
            <Box component="form" noValidate autoComplete="off">
                <TextField
                    label="search"
                    id="search"
                    margin="normal"
                    type="search"
                    placeholder="search..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value.toLocaleLowerCase());
                    }}
                />
            </Box>
            <Button color="primary" onClick={handleAdd} variant="contained" style={{ marginBottom: 25, float: 'right' }}>
                Create Task
            </Button>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {/* <TableCell>Name</TableCell> */}
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>week</TableCell>
                            <TableCell>user</TableCell>
                            <TableCell>Start Date</TableCell>
                            <TableCell>End Date</TableCell>
                            <TableCell>model</TableCell>
                            <TableCell>component</TableCell>
                            <TableCell>departement</TableCell>
                            <TableCell>status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {taskss
                            .filter((row) => row.name.toLowerCase().includes(search.toLowerCase()))
                            .map((row) => (
                                <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.description}</TableCell>
                                    <TableCell>{row.week?.name}</TableCell>
                                    <TableCell>{row.user?.firstName}</TableCell>
                                    <TableCell>{dayjs(row.startDate).format('DD-MM-YYYY')}</TableCell>
                                    <TableCell>{dayjs(row.endDate).format('DD-MM-YYYY')}</TableCell>
                                    <TableCell>{row.taskModel?.name}</TableCell>
                                    <TableCell>{row.component?.name}</TableCell>
                                    <TableCell>{row.departement?.name}</TableCell>
                                    <TableCell>{row.taskState?.name}</TableCell>
                                    <TableCell>
                                        <EditIcon
                                            onClick={() => {
                                                setTask(row);
                                                console.log(row);
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
                    <EditTask state={task} close={handleClose} />
                </Box>
            </Modal>
            <Modal open={openCreate} onClose={handleCloseAdd}>
                <Box sx={style}>
                    <AddTask close={handleCloseAdd} />
                </Box>
            </Modal>
            <Modal open={openDelete} onClose={() => setOpenDelete(false)}>
                <Box sx={style}>
                    <h3>Do you really want to delete this task?</h3>
                    <Button
                        color="primary"
                        onClick={() => {
                            dispatch(deleteTask(task._id));
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
            <Calendar
                events={[
                    { title: 'event 1', date: '2022-06-15' },
                    { title: 'event 2', date: '2022-06-17' }
                ]}
            />
        </>
    );
};
