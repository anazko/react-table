import React from 'react';

const personDetails = ({person}) => {
  if (!person.id) return null;
  
  return <div className='personDetails'>
    <h3>{person.firstName + ' ' + person.lastName}</h3>
    <hr />
    <h4>Контакты: </h4>
    <p>E-mail: {person.email}</p>
    <p>Phone: {person.phone}</p>
    
    <h4>Местонахождение:</h4>
    <p>Штат: {person.address.state}</p>
    <p>Город: {person.address.city}</p>
    <p>Адрес: {person.address.streetAddress}</p>
    <p>Индекс: {person.address.zip}</p>
    
    
    <h4>Описание: </h4>
    <p>{person.description}</p>

  </div>
}

export default personDetails;