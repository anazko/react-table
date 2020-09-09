import React, {useEffect} from 'react';
import './pagination.css';

const Pagination = ({ totalItems, itemsPerPage, currentPage, onSelect}) => {

  useEffect(() => {
    document.querySelector(".paginator").addEventListener("click", handleClick);
    return () => {
      document.querySelector(".paginator").removeEventListener("click", handleClick);
    }
  }, []);
  
  const handleClick = (e) => {
    if (e.target.dataset.page) {
      onSelect(+e.target.dataset.page);
    }
  }

  const items = [];
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  for (let i = 1; i <= pageCount; i++) {
    items.push(
      <span key={i} className={ (i === currentPage) ? "current" : "" } data-page={i} >
        {i}
      </span>
    );
  }

  return <>
    <div className="paginator">
      {items}
    </div>
  </>
}

export default Pagination;