import React, { useEffect, useState } from "react";
import axios from "axios";
import membersList from "../../assets/icons/memberslist.svg";

function Members({ channelId }) {
  const [members, setMembers] = useState([]);

  const fetchMembers = () => {
    axios
      .get(`http://localhost:8080/chat/${channelId}/members`, {
        withCredentials: true,
      })
      .then((res) => setMembers(res.data))
      .catch((res) => console.log(res));
  };

  useEffect(() => {
    fetchMembers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className='w-1/5 h-screen xl:hidden text-white flex-grow-0'>
        <div className='flex w-full justify-center items-center'>
          <img src={membersList} alt='' className='w-5' />
          <h1 className='text-lg border-b border-gray-600 text-center mx-2'>
            Members
          </h1>
        </div>

        <div className='py-2'>
          {members.map((member, index) => (
            <div
              key={index}
              className='mx-2 p-2 hover:bg-gray-800 rounded-md cursor-pointer'
            >
              {member.username}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Members;
