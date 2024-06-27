import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { User } from "../../interface"
import axios from "axios"

const initialUser: User[] = []
// Hàm lấy tất cả user
export const getUser: any = createAsyncThunk(
    "users/getAllUser",
    async ()=> {
        const data = await axios.get("http://localhost:8080/users")
        return data.data
    }
)

// Hàm thêm mới user
export const addUser: any = createAsyncThunk(
    "users/addUser",
    async (user, newUser)=> {
        const res =  await axios.post("http://localhost:8080/users", newUser)
        return res.data
    }
)

// Hàm xóa user
export const deleteUser: any = createAsyncThunk(
    "users/deleteUser",
    async (id)=> {
        const res = await axios.delete(`http://localhost:8080/users/${id}`)
        return res.data
    }
)

export const updateUser: any = createAsyncThunk(
    "users/updateUser", 
    async (user: User)=> {
        const res = await axios.patch(`http://localhost:8080/users/${user.id}`, user)
        return res.data
    }
)



const userReducer = createSlice ({
    name: "user",
    initialState: {
        user: initialUser
    },
    reducers: {
        // Nơi khai báo cách action
    },
    extraReducers: (builder: any)=> {
        builder
        .addCase(getUser.pending, (state: any, action: any)=> {
            // TRạng thái chờ lấy dữ liệu   

        })
        .addCase(getUser.fulfilled, (state: any, action: any)=> {
            // TRạng thái lấy dữ liệu thành công
            state.user = action.payload;

        })
        .addCase(addUser.fulfilled, (state: any, action: any) => {
            state.user.push(action.payload)
        })
        .addCase(deleteUser.fulfilled, (state: any, action: any) => {
            state.user = state.user.filter((item: any) => {
                return item.id !== action.payload;
            });
        })
        .addCase(updateUser.fulfilled, (state: any, action: any) => {
            state.user = state.user.map((item: any) =>
                item.id === action.payload.id ? action.payload : item
            );
        })
        .addCase(getUser.rejected, (state: any, action: any) => {
            // Trạng thái lấy dữ liệu thất bại
        })
    }
})


export default userReducer.reducer