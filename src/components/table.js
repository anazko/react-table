import React, { useState, useCallback } from 'react';
import ReactPaginate from 'react-paginate';
import _ from 'lodash';


export default ({data}) => {

  let itemsPerPage = 20;
  const pageCount = Math.ceil(data.length / itemsPerPage);
  let [currentPage, setCurrentPage] = useState(1);

  const onPageSelect = useCallback((page) => {
    setCurrentPage(page.selected);
  }, []);

  const chunk = _.chunk(data, itemsPerPage);

  const rows = chunk[currentPage].map(person => {
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
    <ReactPaginate
      previousLabel={'◀'}
      nextLabel={'▶'}
      breakLabel={'...'}
      breakClassName={'break-me'}
      pageCount={pageCount}
      marginPagesDisplayed={1}
      pageRangeDisplayed={15}
      onPageChange={onPageSelect}
      containerClassName={'pagination'}
      subContainerClassName={'pages pagination'}
      activeClassName={'active'}
      forcePage={currentPage}
      pageClassName={'page'}
      pageLinkClassName={'pageLink'}
      previousClassName={'pagePrev'}
      nextClassName={'pageNext'}
      previousLinkClassName={'pageLink'}
      nextLinkClassName={'pageLink'}
    />
  </>

}
  
