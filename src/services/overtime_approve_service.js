import apiClient from "../config/api_client"

export const overtime_approve_service = {
    addNewApproval: async (data) => {
        try {
            const res = await apiClient.post(`api/overtime-approval`, data)
            return res
        } catch (error) {
            throw error.response ? error.response.data : error
        }
    },

    getApprovalHistory: async (approverId) => {
        try {
            const res = await apiClient.get(`api/overtime-approval/approver/${approverId}`)
            return res
        } catch (error) {
            throw error.response ? error.response.data : error
        }
    }
}