import React, { useState, useCallback } from "react";
import Pagination from './pagination/pagination';

export default ({data}) => {

  // let [itemsPerPage, setItemsPerPage] = useState(30);
  let itemsPerPage = 20;
  let [currentPage, setCurrentPage] = useState(1);

  let startItem = ((currentPage-1) * itemsPerPage);
  let endItem = ((currentPage-1) * itemsPerPage) + itemsPerPage;

  const onPageSelect = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const pagedData = data.slice(startItem, endItem);

  const rows = pagedData.map(person => {
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
    <Pagination 
      totalItems={ data.length } 
      itemsPerPage={ itemsPerPage } 
      currentPage={ currentPage }
      onSelect={ onPageSelect } 
    />  
  </>

}
  
