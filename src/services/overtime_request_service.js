import apiClient from "../config/api_client";

export const overtime_request_service = {
    // Add Overtime Requests
    addOvertimeRequest: async (data) => {
        try {
            const res = await apiClient.post(`api/overtime-request`, data)
            return res
        } catch (error) {
            throw error.response ? error.response.data : error
        }
    },
    // List of Overtime requests
    getOvertimeRequest: async () => {
        try {
            const res = await apiClient.get(`api/overtime-requests`)
            return res
        } catch (error) {
            throw error.response ? error.response.data : error
        }
    },
    // List of Overtime request By Employee ID
    getOvertimeRequestByEmployeeId: async (id) => {
        try {
            const res = await apiClient.get(`api/overtime-request/emp/${id}`)
            return res
        } catch (error) {
            console.log("ini error: "+error);
            throw error.response ? error.response.data : error
        }
    },

    // List of Overtime request By Id
    getOvertimeRequestById: async (id) => {
        try {
            const res = await apiClient.get(`api/overtime-request/${id}`)
            return res
        } catch (error) {
            throw error.response ? error.response.data : error
        }
    },

}