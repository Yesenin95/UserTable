import { useState } from 'react';
import UserTable from '../components/UserTable';
import AddUserForm from '../components/AddUserForm';

export default function UserPage() {
   const [users, setUsers] = useState([]);
   const [isFormVisible, setIsFormVisible] = useState(false);

   const getUsers = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      setUsers(data);
   };

   const getDeleteUser = (userId) => {
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
   };

   const updatedUsers = (newUsers) => {
      setUsers(newUsers);
   };

   const addUser = (newUser) => {
      setUsers(prevUsers => [...prevUsers, newUser]);
   };

   const toggleFormVisibility = () => {
      setIsFormVisible(prevState => !prevState);
   };

   return (
      <>
         <h1>Users</h1>
         <button className='getUser' onClick={getUsers}>Получить данные</button>
         <button className='addUser' onClick={toggleFormVisibility}>Добавить пользователя</button>
         {isFormVisible && <AddUserForm addUser={addUser} />}
         {users.length > 0 && <UserTable users={users} onDelete={getDeleteUser} setUsers={updatedUsers} />}
      </>
   );
}


