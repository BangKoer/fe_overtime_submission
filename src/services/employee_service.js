import apiClient from "../config/api_client"

export const employee_service = {
    getEmployeeByDepartment : async (id) => {
        try {
            const res = await apiClient.get(`api/employee/dpt/${id}`)
            return res
        } catch (error) {
            throw error.response ? error.response.data : error
        }
    }
}