import React, { useState, useCallback, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import _ from 'lodash';
import PersonDetails from './personDetails';
import FilterInput from './filterInput';

const Table = ({data}) => {

  console.log("render table");

  const itemsPerPage = 10;
  let [currentPage, setCurrentPage] = useState(0);
  let [person, setPerson] = useState({});
  let [filter, setFilter] = useState('');
  let [sorting, setSorting] = useState({
    order: 'asc',
    field: 'id'
  });

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

  const sortingHandler = useCallback((e) => {
    if (e.target.dataset.field === sorting.field) {
      setSorting(prev => ({ ...prev, order: prev.order === 'asc' ? 'desc' : 'asc' }));
    } else {
      setSorting(prev => ({ ...prev, order: 'asc', field: e.target.dataset.field }));
    }
  }, [sorting]);

  useEffect(() => {
    document.querySelector('.sortingTable').addEventListener("click", sortingHandler);
    return () => {
      document.querySelector('.sortingTable').removeEventListener("click", sortingHandler);
    }
  }, [sortingHandler]);


  let filteredData = [];

  if (filter !== '') {
    filteredData = data.filter(item => {
      if ( item.firstName.toLowerCase().includes(filter.toLowerCase()) ) { 
        return true;
      } else {
        return false;
      }
    })
  } else {
    filteredData = data;
  }

  filteredData = _.orderBy(filteredData, sorting.field, sorting.order);

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
        <tr className='sortingTable'>
          <th className={(sorting.field === 'id') ? sorting.order : null} data-field='id' >
            id
          </th>
          <th className={(sorting.field === 'firstName') ? sorting.order : null} data-field='firstName' >
            First Name
          </th>
          <th className={(sorting.field === 'lastName') ? sorting.order : null} data-field='lastName' >
            Last Name
          </th>
          <th className={(sorting.field === 'email') ? sorting.order : null} data-field='email' >
            Email
          </th>
          <th className={(sorting.field === 'phone') ? sorting.order : null} data-field='phone' >
            Phone 
          </th>
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
