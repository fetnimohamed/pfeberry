import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
//////
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
/////
// import { useNavigate } from 'react-router-dom';
import { deleteTaskTheme, listTaskThemes } from '../../store/actions/taskThemeActions';
// import LoadingBox from '../components/LoadingBox';
// import MessageBox from '../components/MessageBox';
import { TASKTHEME_DETAILS_RESET } from '../../store/constants/taskThemeConstants';
import { AddTaskTheme } from './AddTaskTheme';
import { EditTaskTheme } from './EditTaskTheme';

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

export default function Theme() {
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
    const taskThemeList = useSelector((state) => state.taskThemeList);
    const { loading, error, taskThemes } = taskThemeList;
    const [theme, setTheme] = useState({});
    const [themes, setThemes] = useState([]);
    const dispatch = useDispatch();
    const taskThemeDelete = useSelector((state) => state.taskThemeDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = taskThemeDelete;
    useEffect(() => {
        dispatch(listTaskThemes());

        dispatch({
            type: TASKTHEME_DETAILS_RESET
        });
    }, [dispatch, successDelete, open, openCreate]);
    useEffect(() => {
        if (taskThemes?.taskThemes) {
            setThemes(taskThemes.taskThemes);
            console.log(taskThemes);
        }
    }, [taskThemes]);

    const deleteHandler = (taskTheme) => {
        setOpenDelete(true);
        setTheme(taskTheme);
    };
    return (
        <>
            <Button color="primary" onClick={handleAdd} variant="contained" style={{ marginBottom: 25, float: 'right' }}>
                Create task theme
            </Button>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {themes.map((row) => (
                            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.description}</TableCell>
                                <TableCell>
                                    <EditIcon
                                        onClick={() => {
                                            setTheme(row);
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
                    {/* <AddTaskTheme /> */}
                    <EditTaskTheme theme={theme} close={handleClose} />
                </Box>
            </Modal>
            <Modal open={openCreate} onClose={handleCloseAdd}>
                <Box sx={style}>
                    {/* <AddTaskTheme /> */}
                    <AddTaskTheme theme={theme} close={handleCloseAdd} />
                </Box>
            </Modal>
            <Modal open={openDelete} onClose={() => setOpenDelete(false)}>
                <Box sx={style}>
                    <h3>Do you really want to delete this task theme ?</h3>
                    <Button
                        color="primary"
                        onClick={() => {
                            dispatch(deleteTaskTheme(theme._id));
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
}
