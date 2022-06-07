import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteWeek, listWeeks } from '../../store/actions/weekActions';
import { WEEK_DETAILS_RESET } from '../../store/constants/weekConstants';
import dayjs from 'dayjs';
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
import { AddWeek } from './AddWeek';
import { EditWeek } from './EditWeek';
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
export const WeekList = () => {
    //////use state////////
    const [weekss, setWeeks] = useState([]);
    const [week, setWeek] = useState({});
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
    const weekList = useSelector((state) => state.weekList);
    const { loading, error, weeks } = weekList;
    const dispatch = useDispatch();
    const weekDelete = useSelector((state) => state.weekDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = weekDelete;

    useEffect(() => {
        dispatch(listWeeks());

        dispatch({
            type: WEEK_DETAILS_RESET
        });
    }, [dispatch, successDelete, openCreate, open]);
    useEffect(() => {
        if (loading === false) {
            console.log(weekList);
            setWeeks(weekList.weeks.weeks);
        }
    }, [loading]);
    const deleteHandler = (week) => {
        setOpenDelete(true);
        setWeek(week);
    };
    return (
        <>
            <h1>Dispatcher Plan</h1>

            <Button color="primary" onClick={handleAdd} variant="contained" style={{ marginBottom: 25, float: 'right' }}>
                Create Week
            </Button>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {/* <TableCell>Name</TableCell> */}
                            <TableCell>Name</TableCell>
                            <TableCell>Start Date</TableCell>
                            <TableCell>End Date</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Dispatcher</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {weekss.map((row) => (
                            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{dayjs(row.startDate).format("DD-MM-YYYY")}</TableCell>
                                <TableCell>{dayjs(row.endDate).format("DD-MM-YYYY")}</TableCell>
                                <TableCell>{row.description}</TableCell>
                                <TableCell>{row.user.firstName}{row.user.lastName}</TableCell>
                                <TableCell>
                                    <EditIcon
                                        onClick={() => {
                                            setWeek(row);
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
                    <EditWeek state={week} close={handleClose} />
                </Box>
            </Modal>
            <Modal open={openCreate} onClose={handleCloseAdd}>
                <Box sx={style}>
                    <AddWeek close={handleCloseAdd} />
                </Box>
            </Modal>
            <Modal open={openDelete} onClose={() => setOpenDelete(false)}>
                <Box sx={style}>
                    <h3>Do you really want to delete this Week ?</h3>
                    <Button
                        color="primary"
                        onClick={() => {
                            dispatch(deleteWeek(week._id));
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
