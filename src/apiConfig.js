import axios from "axios";
const axiosClient = axios.create({ baseURL: "https://kahoot-hxym.onrender.com" })


axiosClient.interceptors.request.use((requestConfig) => {
  const accessToken = localStorage.getItem('accessToken-kahoot')
  if (accessToken) requestConfig.headers["Authorization"] = `Bearer ${accessToken}`
  return requestConfig
}, (error) => {
  return Promise.reject(error)
})


axiosClient.interceptors.response.use((res) => {
  return res
}, async (error) => {
  const originalConfig = error.config
  const statusCode = error.response.status
  if (statusCode === 401 && originalConfig.url === "/auth/token") return Promise.reject(error)
  if (statusCode === 401) {
    const tokenResponse = await axiosClient.post('/auth/token', { refreshToken: localStorage.getItem('refreshToken-kahoot') })
    localStorage.setItem('accessToken-kahoot', tokenResponse.data.data)
    return axiosClient(originalConfig)
  }
  try {
    error.message = error.message.data.error
  } catch (error) {
    console.log(error)
  }
  return Promise.reject(error)
})


export default axiosClient