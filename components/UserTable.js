import { useState } from "react";
import AddUserForm from "./AddUserForm";

export default function UserTable({ users, setUsers, onDelete }) {
   const [sortField, setSortField] = useState(null);
   const [sortOrder, setSortOrder] = useState("asc");
   const [filter, setFilter] = useState("");
   const [editingUser, setEditingUser] = useState(null);

   const EditUser = (event) => {
      const userId = parseInt(event.target.dataset.userId);
      const user = users.find((u) => u.id === userId);
      setEditingUser(user);
   };

   
   const getEditForm = (event) => {
      event.preventDefault();
      const updatedUser = {
         ...editingUser,
         name: event.target.name.value,
         email: event.target.email.value,
         address: {
            ...editingUser.address,
            city: event.target.city.value,
         },
         phone: event.target.phone.value,
         website: event.target.website.value,
         company: {
            ...editingUser.company,
            name: event.target.company.value,
         },
      };
      const updatedUsers = filteredUsers.map((user) =>
         user.id === editingUser.id ? updatedUser : user
      );
      setEditingUser(null);
      setUsers(updatedUsers);
   };

   const getDelete = (event) => {
      const userId = parseInt(event.target.dataset.userId);
      onDelete(userId);
   };

   const getFilter = (event) => {
      setFilter(event.target.value);
   };

   const filteredUsers = users.filter((user) =>
      Object.values(user).some((value) =>
         String(value).toLowerCase().includes(filter.toLowerCase())
      )
   );
   const getSort = (event) => {
      const field = event.target.dataset.field;
      if (!field) {
         return;
      }
      if (sortField === field) {
         setSortOrder(sortOrder === "asc" ? "desc" : "asc");
      } else {
         setSortField(field);
         setSortOrder("asc");
      }
   };
   function sortData(data, field, sortOrder = 'asc') {
      return data.sort((a, b) => {
         const aValue = getNestedValue(a, field);
         const bValue = getNestedValue(b, field);
         return sortOrder === 'asc' ? aValue > bValue ? 1 : -1 : aValue < bValue ? 1 : -1;
      });
   }

   function getNestedValue(obj, field) {
      if (!field) {
         return "";
      }
      const fields = field.split(".");
      let value = obj;
      for (const f of fields) {
         value = value[f];
      }
      return typeof value === 'string' ? value.toLowerCase() : value;
   }

   const sortedUsers = sortData(filteredUsers, sortField, sortOrder);
   const AddUser = (event) => {
      event.preventDefault();
      const newUser = {
         id: users.length + 1,
         name: event.target.name.value,
         email: event.target.email.value,
         address: {
            city: event.target.city.value,
         },
         phone: event.target.phone.value,
         website: event.target.website.value,
         company: {
            name: event.target.company.value,
         },
      };
      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
   };

   return (
      <div>
         <input
            type="text"
            placeholder="Фильтр"
            value={filter}
            onChange={getFilter}
         />
         <table onClick={getSort}>
            <thead>
               <tr>
                  <th data-field="id">ID</th>
                  <th data-field="name">Имя</th>
                  <th data-field="email">Email</th>
                  <th data-field="address.city">Город</th>
                  <th data-field="phone">Телефон</th>
                  <th data-field="website">Сайт</th>
                  <th data-field="company.name">Компания</th>
                  <th></th>
               </tr>
            </thead>
            <tbody>
               {editingUser ? (
                  <tr>
                     <td colSpan="8">
                        <form onSubmit={getEditForm}>
                           <input type="text" name="name" defaultValue={editingUser.name} />
                           <input type="email" name="email" defaultValue={editingUser.email} />
                           <input type="text" name="city" defaultValue={editingUser.address.city} />
                           <input type="tel" name="phone" defaultValue={editingUser.phone} />
                           <input type="text" name="website" defaultValue={editingUser.website} />
                           <input type="text" name="company" defaultValue={editingUser.company.name} />
                           <button type="submit">Сохранить</button>
                        </form>
                     </td>
                  </tr>
               ) : (
                  sortedUsers.map((user) => (
                     <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>
                           <a href={`mailto:${user.email}`}>{user.email}</a>
                        </td>
                        <td>{user.address.city}</td>
                        <td>
                           <a href={`tel:${user.phone}`}>{user.phone}</a>
                        </td>
                        <td>
                           <a href={`http://${user.website}`}>{user.website}</a>
                        </td>
                        <td>{user.company.name}</td>
                        <td>
                           <button onClick={getDelete} data-user-id={user.id}>
                              Удалить
                           </button>
                        </td>
                        <td>
                           <button onClick={EditUser} data-user-id={user.id}>
                              Редактировать
                           </button>
                        </td>
                     </tr>
                  )))}
            </tbody>
         </table>
      
      </div>
   );
}

