import React, { useState } from 'react';

const FilterInput = ({onSearch = ()=>{} }) => {

  let [value, setValue] = useState('');

  const changeHandler = (e) => {
    setValue(e.target.value);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    onSearch(value);
  }

  return <form className='filterInput' onSubmit={submitHandler} >
    <input value={value} onChange={changeHandler} />
    <input type='submit' value='Поиск' />
  </form>
}

export default FilterInput;