import { useState } from 'react'

const Select = ({ option}) => {

    const getValue = (e) =>{
        option(e.target.value)
    }

  return (
    <>
      <select className="selectreminder" onChange={ (e) => getValue(e) }>
        <option value="0">All</option>
        <option value="1">Set</option>
        <option value="2">UnSet</option>
      </select>
    </>
  );
};

export default Select;
