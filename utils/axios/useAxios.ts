import { axiosRes } from './index.js'
import { useAppStore } from '~/store/app'

export const getUserList = async () => {
  try {
    const response = await axiosRes.get('/user')
    const appStore = useAppStore()
    appStore.user.list = response.data.data
  } catch (error) {
    throw error
  }
}

// {
//   "age": 0,
//   "id": 0,
//   "name": "string"
// }
export const putUserInfo = async (info: any) => {
  try {
    return await axiosRes.put('/user', info)
  } catch (error) {
    throw error
  }
}

// {
//   "age": 0,
//   "name": "string"
// }
export const postCreateUser = async (data: any) => {
  try {
    return await axiosRes.post('/user', data)
  } catch (error) {
    throw error
  }
}

// {
//   "id": 0
// }
export const deleteUser = async (id: string | number) => {
  try {
    return await axiosRes.delete('/user', { data: { id } })
  } catch (error) {
    throw error
  }
}