import React, { useContext } from 'react';
import { Authorization } from '../Context/AuthContext';
import { ChatContext } from '../Context/ChatContext';

const Message = ({ message }) => {
  const { currentuser } = useContext(Authorization);
  const { data } = useContext(ChatContext);

  return (
    <>
      <div className="message owner" style={{ overflow: 'hidden', maxHeight: '200px' }}>
        {/* Rest of your message content */}
      </div>
    </>
  );
};

export default Message;
