import React from 'react';
import Img from '../image/add-image (1).png';

const Input = () => {
  return (
    <>
      <div className='imputing'>
      <input className='texting' type='text' placeholder='Type something...' style={{ outline: 'none',paddingLeft: '20px'  }} />
      <div className='send'>
        {/* <input type='file' style={{dis}} */}
        <input type='file' style={{display:'none'}}/>
        <button className='butting'>Send</button>
      </div>
      

      </div>
    </>
  )
}

export default Input;
