import React, { useState, useCallback } from 'react';
import ReactPaginate from 'react-paginate';
import _ from 'lodash';
import PersonDetails from './personDetails';
import FilterInput from './filterInput';


const Table = ({data}) => {

  const itemsPerPage = 10;

  let [currentPage, setCurrentPage] = useState(0);
  let [person, setPerson] = useState({});
  let [filter, setFilter] = useState('');

  const onPageSelect = useCallback((page) => {
    setCurrentPage(page.selected);
  }, []);

  const onRowSelect = (person) => {
    setPerson(person);
  }

  const onSearch = (text) => {
    setFilter(text);
    setCurrentPage(0);
  }

  let filteredData = [];

  if (filter !== '') {
    filteredData = data.filter(item => {
      if ( item.firstName.toLowerCase().includes(filter.toLowerCase()) ) return true;
    })
  } else {
    filteredData = data;
  }

  const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  const chunk = _.chunk(filteredData, itemsPerPage);
  let rows = [];

  if (filteredData.length) {
    rows = chunk[currentPage].map(person => {
      return (
        <tr key={person.id} onClick={ onRowSelect.bind(null, person) } >
          <td>{person.id}</td>
          <td>{person.firstName}</td>
          <td>{person.lastName}</td>
          <td>{person.email}</td>
          <td>{person.phone}</td>
        </tr>
      )
    });
  }

  return <>
    <FilterInput onSearch={onSearch} />
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
    <PersonDetails person={person} />
  </>

}
  

export default Table;
