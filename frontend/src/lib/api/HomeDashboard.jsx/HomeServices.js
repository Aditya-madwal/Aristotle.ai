import api from '../apiConfig';

export const HomeServices = {
    // Get recent PDFs
    getRecentPDFs: async () => {
        try {
            const response = await api.get('/api/get_recent_pdfs/');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Get all roadmaps
    getAllRoadmaps: async () => {
        try {
            const response = await api.get('/api/get_all_roadmaps/');
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

export default HomeServices;