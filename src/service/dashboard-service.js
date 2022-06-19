import Axios from 'axios';

const dashboardService = () => {
    const tasksForChart = async (modelId, componentId) => {
        try {
            const data = await Axios.post('/api/tasks/analyse', {
                modelId,
                componentId
            });
            return data;
        } catch (error) {
            return { x: [], y: [] };
        }
    };
    const tasksPerDepartment = async () => {
        try {
            const data = await Axios.get('/api/tasks/perDepartment');
            return data;
        } catch (error) {
            return { x: [], y: [] };
        }
    };
    return { tasksForChart, tasksPerDepartment };
};
export default dashboardService;
