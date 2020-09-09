import React, { useState } from "react";
import Pagination from './pagination/pagination';

export default ({data}) => {

  let [itemsPerPage, setItemsPerPage] = useState(30);
  let [currentPage, setCurrentPage] = useState(1);

  let startItem = ((currentPage-1) * itemsPerPage);
  let endItem = ((currentPage-1) * itemsPerPage) + itemsPerPage;


  const onPageSelect = (page) => {
    setCurrentPage(page);
  }

  const rows = data.slice(startItem, endItem).map(person => {
    return (
      <tr key={person.id}>
        <td>{person.id}</td>
        <td>{person.firstName}</td>
        <td>{person.lastName}</td>
        <td>{person.email}</td>
        <td>{person.phone}</td>
      </tr>
    )
  });

  return <>

    <Pagination 
      totalItems={ data.length } 
      itemsPerPage={ itemsPerPage } 
      currentPage={ currentPage }
      onSelect={ onPageSelect } 
    />  
    {startItem} - {endItem}

    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Phone</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
     
  </>

}
  
