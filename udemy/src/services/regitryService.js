import axiosClient3 from "../api/axiosClient3"

export const searchPackages = async (term) => {
  const response = await axiosClient3.get(`/search?text=${term}`)
  return response.data
}


export const getPackageDetail = async (name) => {
  const response = await axiosClient3.get(`/${name}`)
  return response.data
}