import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteTaskModel, listTaskModels } from '../../store/actions/taskModelActions';
import { TASKMODEL_DETAILS_RESET } from '../../store/constants/taskModelConstants';
import { AddTaskModel } from './AddTaskModel';
import { EditTaskModels } from './EditTaskModels';
import { listTaskThemes } from '../../store/actions/taskThemeActions';
import { TASKTHEME_DETAILS_RESET } from '../../store/constants/taskThemeConstants';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
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
export const TaskModelsList = () => {
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
    const [models, setModels] = useState([]);
    const [themes, setThemes] = useState([]);
    const [rows, setRows] = useState([]);
    const [model, setModel] = useState({});
    const [theme, setTheme] = useState('');
    const taskModelList = useSelector((Model) => Model.taskModelList);
    const { loading, error, taskModels } = taskModelList;
    const dispatch = useDispatch();
    const taskModelDelete = useSelector((Model) => Model.taskModelDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = taskModelDelete;
    const taskThemeList = useSelector((state) => state.taskThemeList);
    const { taskThemes } = taskThemeList;
    const handleChange = (e) => {
        setTheme(e.target.value);
        console.log(e.target.value);
        if (e.target.value === '1') {
            setRows(models);
        } else {
            console.log(models.filter((model) => model.taskTheme._id === e.target.value));
            setRows(models.filter((model) => model.taskTheme._id === e.target.value));
        }
    };
    useEffect(() => {
        dispatch(listTaskModels());

        dispatch({
            type: TASKMODEL_DETAILS_RESET
        });
        dispatch(listTaskThemes());

        dispatch({
            type: TASKTHEME_DETAILS_RESET
        });
        console.log({ taskThemes });
    }, [dispatch, successDelete, openCreate, open]);
    useEffect(() => {
        if (loading === false) {
            console.log(taskModels);
            setModels(taskModels.taskModels);
            setRows(taskModels.taskModels);
        }
    }, [loading]);

    useEffect(() => {
        if (taskThemes) {
            setThemes(taskThemes.taskThemes);
        }
    }, [taskThemes]);
    const deleteHandler = (taskModel) => {
        setOpenDelete(true);
        setModel(taskModel);
    };

    return (
        <div>
            <h1>Task Models </h1>
            <Button color="primary" onClick={handleAdd} variant="contained" style={{ marginBottom: 25, float: 'right' }}>
                Create task models
            </Button>
            <FormControl style={{ width: '25%', marginBottom: 25, marginRight: 25, float: 'right' }}>
                <InputLabel id="taskTheme-label">filter by task theme</InputLabel>
                <Select labelId="taskTheme-label" id="taskTheme" name="taskTheme" value={theme} onChange={handleChange} label="taskTheme">
                    <MenuItem value="1">
                        <em>All</em>
                    </MenuItem>
                    {themes.map((theme) => (
                        <MenuItem value={theme._id}>{theme.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {/* <TableCell>Name</TableCell> */}
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>TASK THEME REF</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.length === 0 ? (
                            <TableCell>No Task Models (Please reconsider your filter)</TableCell>
                        ) : (
                            rows.map((row) => (
                                <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.description}</TableCell>
                                    <TableCell>{row.taskTheme.name}</TableCell>
                                    <TableCell>
                                        <EditIcon
                                            onClick={() => {
                                                setModel(row);
                                                handleOpen();
                                            }}
                                        />
                                        <DeleteIcon onClick={() => deleteHandler(row)} />
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                    <EditTaskModels model={model} close={handleClose} />
                </Box>
            </Modal>
            <Modal open={openCreate} onClose={handleCloseAdd}>
                <Box sx={style}>
                    <AddTaskModel close={handleCloseAdd} />
                </Box>
            </Modal>
            <Modal open={openDelete} onClose={() => setOpenDelete(false)}>
                <Box sx={style}>
                    <h3>Do you really want to delete this task Model?</h3>
                    <Button
                        color="primary"
                        onClick={() => {
                            dispatch(deleteTaskModel(model._id));
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
        </div>
    );
};
