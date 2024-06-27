import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUser,
  addUser,
  deleteUser,
  updateUser,
} from "../../store/reducers/userReducer";
import { User } from "../../interface";

export default function Admin() {
  const getData: any = useSelector((state: any) => state.user.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, []);

  //Hàm thêm mới user
  const handleAdd = () => {
    let newUser = {
      name: "Au Tuan",
      age: 19,
    };
    dispatch(addUser(newUser));
  };

  //Hàm xóa
  const handleDeleteUser = (id: number) => {
    dispatch(deleteUser(id));
  };

  //Hàm chỉnh sửa
  const handleUpdateUser = (user: User) => {
    let updatedUser = {
      ...user,
      name: "Au Tuan Updated",
      age: 20,
    };
    dispatch(updateUser(updatedUser));
  };

  return (
    <div>
      <div>
        {getData.map((user: User) => (
          <ul key={user.id}>
            <li>{user.name}</li>
            <li>{user.age}</li>
            <li>
              <button onClick={() => handleDeleteUser(user.id)}>Xóa</button>
            </li>
            <li>
              <button onClick={() => handleUpdateUser(user)}>Cập nhật</button>
            </li>
          </ul>
        ))}
      </div>
      <button onClick={handleAdd}>Thêm User</button>
    </div>
  );
}
