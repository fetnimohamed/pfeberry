import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {deleteComponents, listComponents } from '../../store/actions/componentsActions';
import {COMPONENTS_DETAILS_RESET } from '../../store/constants/componentsConstants';
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
////
import { AddComponent } from './AddComponent';
import { EditComponent } from './EditComponent';
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
export const ComponentList = () => {
    //////use state////////
    const [componentss, setComponents] = useState([]);
    const [component, setComponent] = useState({});
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
     const componentsList = useSelector((state) => state.componentsList);
    const { loading, error, components } = componentsList;
    const dispatch = useDispatch();
   const componentsDelete = useSelector((state) => state.componentsDelete);
  const {loading: loadingDelete, error: errorDelete, success: successDelete} = componentsDelete;

    useEffect(() => {
        dispatch(listComponents());
        dispatch({
            type: COMPONENTS_DETAILS_RESET
        });
    }, [dispatch, successDelete, openCreate, open]);

    useEffect(() => {
        if (loading === false) {
            console.log(componentsList);
            setComponents(componentsList.components.components);
        }
    }, [loading]);
    
    const deleteHandler = (component) => {
        setOpenDelete(true);
        setComponent(component);
    };
    return (
        <>
            <Button color="primary" onClick={handleAdd} variant="contained" style={{ marginBottom: 25, float: 'right' }}>
                Create Component 
            </Button>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {/* <TableCell>Name</TableCell> */}
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Theme</TableCell>
                            <TableCell>model</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {componentss.map((row) => (
                            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.description}</TableCell>
                                  <TableCell>{row.taskTheme.name}</TableCell>
                                   <TableCell>{row.taskModel.name}</TableCell>

                                <TableCell>
                                    <EditIcon
                                        onClick={() => {
                                            setComponent(row);
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
                    <EditComponent state={component} close={handleClose} />
                </Box>
            </Modal>
            <Modal open={openCreate} onClose={handleCloseAdd}>
                <Box sx={style}>
                    <AddComponent close={handleCloseAdd} />
                </Box>
            </Modal>
            <Modal open={openDelete} onClose={() => setOpenDelete(false)}>
                <Box sx={style}>
                    <h3>Do you really want to delete this component  ?</h3>
                    <Button
                        color="primary"
                        onClick={() => {
                            dispatch(deleteComponents(component._id));
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
