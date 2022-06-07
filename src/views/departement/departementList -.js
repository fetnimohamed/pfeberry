import React from 'react';
import {useEffect,useState} from 'react';
import { useSelector ,useDispatch} from 'react-redux';

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
import { AddDepartement} from './AddDepartement';
import { EditDepartement } from './EditDepartement';
import { deleteDepartement, listDepartement } from '../../store/actions/departementActions';
import { DEPARTEMENT_DETAILS_RESET } from '../../store/constants/departementConstants';
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
export const DepartementList = () => {
    //////use state////////
    const [departementss, setDepartements] = useState([]);
    const [departement, setDepartement] = useState({});
    //////use state////////
    ///open modals///
    const [open, setOpen] = useState(false);
    let [openCreate, setOpenCreate] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleAdd = () => {
        setOpenCreate(!openCreate);
    };
    const [openDelete, setOpenDelete] = useState(false);
    const handleCloseAdd = () => setOpenCreate(false);
    ///open modals///
    const departementList = useSelector((state) => state.departementList);
    const { loading, error, departements } = departementList;
    const dispatch = useDispatch();
    const departementDelete = useSelector((state) => state.departementDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = departementDelete;

    useEffect(() => {
        dispatch(listDepartement());

        dispatch({
            type: DEPARTEMENT_DETAILS_RESET
        });
    }, [dispatch, successDelete, openCreate, open]);

    useEffect(() => {
        if (loading === false) {
            console.log(departementList);
            setDepartements(departementList.departements.departement);
        }
    }, [loading]);
    const deleteHandler = (departement) => {
        setOpenDelete(true);
        setDepartement(departement);
    };
    return (
        <>
            <h1>departements</h1>

            <Button color="primary" onClick={handleAdd} variant="contained" style={{ marginBottom: 25, float: 'right' }}>
                Create departement
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
                        {departementss.map((row) => (
                            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.description}</TableCell>
                                <TableCell>
                                    <EditIcon
                                        onClick={() => {
                                            setDepartement(row);
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
                    <EditDepartement state={departement} close={handleClose} />
                </Box>
            </Modal>
            <Modal open={openCreate} onClose={handleCloseAdd}>
                <Box sx={style}>
                    <AddDepartement close={handleCloseAdd} />
                </Box>
            </Modal>
            <Modal open={openDelete} onClose={() => setOpenDelete(false)}>
                <Box sx={style}>
                    <h3>Do you really want to delete this departement ?</h3>
                    <Button
                        color="primary"
                        onClick={() => {
                            dispatch(deleteDepartement(departement._id));
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
