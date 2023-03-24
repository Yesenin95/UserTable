import { useState } from 'react';
import UserPage from '../components/UserPage';
import AddUserForm from '../components/AddUserForm';
function HomePage() {
   const [users, setUsers] = useState([]);

   const getUsers = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      setUsers(data);
   };

   const getDeleteUser = (userId) => {
      setUsers(prevUsers =>
         prevUsers
            .filter((user) => user.id !== userId)
            .map((user, index) => ({ ...user, id: index + 1 }))
      );
   };

   return <>
      <UserPage getUsers={getUsers} users={users} onDelete={getDeleteUser} />
      {users.length > 0 ? <AddUserForm users={users} onDelete={getDeleteUser} /> : null}
     
   </>
}

export default HomePage