import React, { useEffect, useState } from "react";
import axios from "axios";
import membersList from "../../assets/icons/memberslist.svg";
import { BACKEND_URL } from "../../config/config";

interface ChannelProps {
  channelId: string;
}

interface MemberProps {
  username: string;
}

function Members({ channelId }: ChannelProps) {
  const [members, setMembers] = useState<MemberProps | any>([]);

  const fetchMembers = () => {
    axios
      .get(BACKEND_URL + `/chat/${channelId}/members`, {
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
      <div className='w-52 h-screen  text-white flex-grow-0 bg-primary-200 lg:hidden'>
        <div className='flex w-full justify-center items-center'>
          <img src={membersList} alt='' className='w-5' />
          <h1 className='text-lg border-b border-gray-600 text-center mx-2'>
            Members
          </h1>
        </div>

        <div className='py-2'>
          {members.map(({ username }: MemberProps, index: number) => (
            <div
              key={index}
              className='mx-2 p-2 hover:bg-primary-0 rounded-md cursor-pointer'
            >
              {username}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Members;
