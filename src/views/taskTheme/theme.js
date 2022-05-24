import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
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
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
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
    }, [dispatch, successDelete]);
    useEffect(() => {
        if (taskThemes?.taskThemes) {
            setThemes(taskThemes.taskThemes);
            console.log(taskThemes);
        }
    }, [taskThemes]);
    const deleteHandler = (taskTheme) => {
        if (window.confirm('Are you sure?')) {
            dispatch(deleteTaskTheme(taskTheme._id));
        }
    };
    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Description</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {themes.map((row) => (
                            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.description}</TableCell>
                                <TableCell align="right">
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
            {/* <table className="table">
                <thead>
                    <tr>
                        <th>NAME</th>
                        <th>DESCRIPTION</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>

                <tbody>
                    {theme.length > 0 &&
                        theme.map((taskTheme) => (
                            <tr key={taskTheme._id}>
                                <td>{taskTheme.name}</td>
                                <td>{taskTheme.description}</td>
                                <td>
                                    <Button onClick={handleOpen}>Open modal</Button>
                                    <button type="button" className="small" onClick={handleOpen}>
                                        Edit
                                    </button>
                                    <button type="button" className="small">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table> */}
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    {/* <AddTaskTheme /> */}
                    <EditTaskTheme theme={theme} />
                </Box>
            </Modal>
        </>
    );
}
