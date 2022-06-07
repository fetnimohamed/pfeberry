import React, { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';
import {listWeeks} from '../../store/actions/weekActions';
import { listUsers } from '../../store/actions/userActions';
import {listTaskModels} from '../../store/actions/taskModelActions';
import { listComponents } from '../../store/actions/componentsActions';
import { listTaskStates } from '../../store/actions/taskStateActions';
import { listDepartement } from '../../store/actions/departementActions';
import {updatetask} from '../../store/actions/taskActions'
import {WEEK_DETAILS_RESET} from '../../store/constants/weekConstants'
import {USER_DETAILS_RESET} from '../../store/constants/userConstants'
import {TASKMODEL_DETAILS_RESET} from '../../store/constants/taskModelConstants'
import {COMPONENTS_DETAILS_RESET } from '../../store/constants/componentsConstants';
import { DEPARTEMENT_DETAILS_RESET } from '../../store/constants/departementConstants';
import { TASKSTATE_DETAILS_RESET } from '../../store/constants/taskStateConstants';
import dayjs from 'dayjs';

const validationSchema = yup.object({
    name: yup.string('Enter name').required('Name is required'),
    description: yup.string('Enter a description'),
    startDate:yup.date(),
    endDate: yup.date(),
});

export const EditTask = ({state , close }) => {
    //const [age, setAge] = React.useState('');
  const [weekss,setWeeks] = useState([]);
  const [userss,setUsers] = useState([]);
  const [modelss,setModels]= useState([]);
  const [componentss,setComponents]= useState([]);
  const [departementss,setDepartements] = useState([]);
  const [statess,setStates] = useState([])
  const taskStateList = useSelector((state) => state.taskStateList);
  const { taskStates } = taskStateList;
  const userList = useSelector((state) => state.userList);
  const { users} = userList;
  const weekList = useSelector((state) => state.weekList);
  const { weeks } = weekList;
  const departementList = useSelector((state) => state.departementList);
 const { departements } = departementList;
  const taskModelList = useSelector((state) => state.taskModelList);
  const { taskModels } = taskModelList;
  const  componentsList= useSelector((state) => state.componentsList);
  const { components } = componentsList;
    const dispatch = useDispatch();
    ///get task theme and model////
   useEffect(() => {
        dispatch(listWeeks());
        dispatch({
            type: WEEK_DETAILS_RESET,
        });
        dispatch(listUsers());
        dispatch({
            type: USER_DETAILS_RESET,
        });
        dispatch(listTaskModels());
        dispatch({
            type: TASKMODEL_DETAILS_RESET,
       });
        dispatch(listComponents());
        dispatch({
            type: COMPONENTS_DETAILS_RESET,
         });
        dispatch(listTaskStates());
        dispatch({
            type: TASKSTATE_DETAILS_RESET,
        });
  
       dispatch(listDepartement());

        dispatch({
            type: DEPARTEMENT_DETAILS_RESET
        });
    
    }, [dispatch]);

    useEffect(() => {
        if (weeks?.weeks) {
            setWeeks(weeks.weeks);
            console.log(weeks);
        }
          if (users?.users) {
            setUsers(users.users);
            console.log(users);
        }
          if (taskModels?.taskModels) {
            setModels(taskModels.taskModels);
            console.log(taskModels);
        }
           if (components?.components) {
            setComponents(components.components);
            console.log(components);
        }
            if (departements?.departement) {
            setDepartements(departements.departement);
            console.log(departements);
        }
        if (taskStates?.taskStates) {
            setStates(taskStates.taskStates);
            console.log(taskStates);
        }
    }, [weeks,users,taskModels,components,departements,taskStates]);

 
    const formik = useFormik({
        initialValues: {
            name: state.name,
            description: state.description,
            week:state.week._id,
            user: state.user._id,
            start: state.startDate,
            endDate: state.endDate,
            taskModel:state.taskModel._id,
            component: state.component._id,
            departement:state.departement._id,
            taskState:state.taskState._id,

        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values);
            dispatch(updatetask({
                 _id: state._id, 
                  name: values.name, 
                  description: values.description,
                  week: values.week,
                  user: values.user,
                  startDate: values.startDate,
                  endDate: values.endDate,
                  taskModel:values.taskModel,
                  component: values.component,
                  departement: values.departement,
                  taskState: values.taskState,
                }));
            close();
        }
    });

    return (
        <div>
            <h1 style={{ marginBottom: 20 }}>Edit task </h1>

            <form onSubmit={formik.handleSubmit}>
                 <TextField
                    fullWidth
                    id="name"
                    name="name"
                    label="Name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                    style={{ marginBottom: 20 }}
                />
                <TextField
                    fullWidth
                    id="description"
                    name="description"
                    label="Description"
                    type="text"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                    style={{ marginBottom: 20 }}
                />
                <FormControl fullWidth>
                    <InputLabel id="weeks-label">week</InputLabel>
                    <Select
                        labelId="weeks-label"
                        id="weeks"
                        name="weeks"
                        value={formik.values.week}
                        onChange={formik.handleChange}
                        label="weeks"
                        style={{ marginBottom: 20 }}
                    >{console.log(weeks)}
                        {weekss.map((week) => (
                            <MenuItem value={week._id}>{week.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                 <FormControl fullWidth>
                    <InputLabel id="users-label">user</InputLabel>
                    <Select
                        labelId="users-label"
                        id="users"
                        name="users"
                        value={formik.values.user}
                        onChange={formik.handleChange}
                        label="users"
                        style={{ marginBottom: 20 }}
                    >
                        {userss.map((user) => (
                            <MenuItem value={user._id}>{user.firstName}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                      <TextField
                    id="startDate"
                    name="startDate"
                    label="Start Date"
                    type="date"
                    value={dayjs(formik.values.startDate).format("YYYY-MM-DD")}
                    onChange={formik.handleChange}
                    error={formik.touched.startDate && Boolean(formik.errors.startDate)}
                    helperText={formik.touched.startDate && Boolean(formik.errors.startDate)}
                    style={{ marginBottom: 20 }}
                />
              <TextField
                    id="endDate"
                    name="endDate"
                    label="End Date"
                    type="date"
                    value={dayjs(formik.values.endDate).format("YYYY-MM-DD")}
                    onChange={formik.handleChange}
                    error={formik.touched.endDate && Boolean(formik.errors.endDate)}
                    helperText={formik.touched.endDate && Boolean(formik.errors.endDate)}
                    style={{ marginBottom: 20 }}
                />
                 <FormControl fullWidth>
                    <InputLabel id="taskModel-label">task Model</InputLabel>
                    <Select
                        labelId="taskModel-label"
                        id="taskModel"
                        name="taskModel"
                        value={formik.values.taskModel}
                        onChange={formik.handleChange}
                        label="taskModel"
                        style={{ marginBottom: 20 }}
                    >
                        {modelss.map((model) => (
                            <MenuItem value={model._id}>{model.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="component-label">component</InputLabel>
                    <Select
                        labelId="component-label"
                        id="component"
                        name="component"
                        value={formik.values.component}
                        onChange={formik.handleChange}
                        label="component"
                        style={{ marginBottom: 20 }}
                    >
                        {componentss.map((component) => (
                            <MenuItem value={component._id}>{component.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                  <FormControl fullWidth>
                    <InputLabel id="departements-label">departement</InputLabel>
                    <Select
                        labelId="departements-label"
                        id="departements"
                        name="departements"
                        value={formik.values.departement}
                        onChange={formik.handleChange}
                        label="departements"
                       style={{ marginBottom: 20 }} 
                    >
                        {departementss.map((departement) => (
                            <MenuItem value={departement._id}>{departement.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
             <FormControl fullWidth>
                    <InputLabel id="taskState-label">taskState</InputLabel>
                    <Select
                        labelId="taskState-label"
                        id="taskState"
                        name="taskState"
                        value={formik.values.taskState}
                        onChange={formik.handleChange}
                        label="taskState"
                        style={{ marginBottom: 20 }}
                    >
                        {statess.map((ttaskS) => (
                            <MenuItem value={ttaskS._id}>{ttaskS.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <div style={{ marginTop: 20, float: 'right' }}>
                    <Button color="primary" variant="contained" style={{ marginRight: 5 }} type="submit">
                        Submit
                    </Button>
                    <Button color="error" variant="contained" style={{ marginLeft: 5 }} onClick={close}>
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    );
};