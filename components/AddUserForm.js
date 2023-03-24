import { useState } from 'react';

export default function AddUserForm({ addUser, users }) {
   const [user, setUser] = useState({
      id: new Date().getTime(),
      name: '',
      email: '',
      phone: '',
      website: '',
      address: {
         city: '',
      },
      company: {
         name: '',
      },
   });

   const handleSubmit = (event) => {
      event.preventDefault();
      addUser(user);
      setUser({
         id: new Date().getTime(),
         name: '',
         email: '',
         phone: '',
         website: '',
         address: {
            city: '',
         },
         company: {
            name: '',
         },
      });
   };

   const handleChange = (event) => {
      const target = event.target;
      const name = target.name;
      const value = target.value;

      if (name === 'city') {
         setUser(prevUser => ({
            ...prevUser,
            address: {
               ...prevUser.address,
               city: value,
            },
         }));
      } else if (name === 'companyName') {
         setUser(prevUser => ({
            ...prevUser,
            company: {
               ...prevUser.company,
               name: value,
            },
         }));
      } else {
         setUser(prevUser => ({
            ...prevUser,
            [name]: value,
         }));
      }
   };

   return (
      <form className='formUser' onSubmit={handleSubmit}>
         <p>Имя: <input type='text' name='name' value={user.name} onChange={handleChange} placeholder='Имя' /></p>
         <p>Email<input type='text' name='email' value={user.email} onChange={handleChange} placeholder='Email' /></p>
         <p>Телефон:<input type='text' name='phone' value={user.phone} onChange={handleChange} placeholder='Телефон' /></p>
         <p>Сайт: <input type='text' name='website' value={user.website} onChange={handleChange} placeholder='Сайт' /></p>
         <p>Город: <input type='text' name='city' value={user.address.city} onChange={handleChange} placeholder='Город' /></p>
         <p>Компания: <input type='text' name='companyName' value={user.company.name} onChange={handleChange} placeholder='Компания' /></p>
         <button type='submit'>Добавить</button>
      </form>
   );
}


