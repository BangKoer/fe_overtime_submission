import apiClient from "../config/api_client"

export const auth_services = {
    login: async (data) => {
        try {
            const res = await apiClient.post('api/user/login', data)
            // console.log(res);
            return res
        } catch (error) {
            console.log(error);
            throw error.response ? error.response.data : error
        }
    }
}