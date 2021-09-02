import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import ModalForm from "../../components/ModalForm/ModalForm";
import { Route, Switch, NavLink } from "react-router-dom";
import Messages from "./Messages";
import Modal from "../../components/Modal";

function Chat() {
  //VARIOUS STATES
  const [isChannelName, setIsChannelName] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isNew, setIsNew] = useState(false);

  const clicked = (e) => {
    fetchData();
  };

  // const prevState = useRef();
  //CHECKING WHETHER THEY USERS HAVE A TOKEN AND WETHER THE TOKENS ARE LEGIBLE
  const history = useHistory();
  const response = (req, res) => {
    axios
      .get("http://localhost:8080/chat", { withCredentials: true })
      .then((res) => <Modal children={res.data.message} />)
      .catch(function (error) {
        if (
          error.response.status === 401 ||
          error.response.status === 400 ||
          error
        ) {
          history.push("/login");
          window.location.reload();
        }
      });
  };
  useEffect(() => {
    response();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //FETCHING CHANNEL NAMES AND IDS
  const fetchData = async (res) => {
    await axios
      .get("http://localhost:8080/chat/channel", { withCredentials: true })
      .then((res) => setIsChannelName(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(
    () => {
      fetchData();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    clicked
  );

  return (
    <>
      <div className='flex h-screen'>
        <ModalForm
          trigger={isOpen}
          setTrigger={setIsOpen}
          fetchData={clicked}
          isNew={isNew}
        />
        <div className='w-1/5 h-screen relative flex flex-col flex-grow-0 items-center text-center bg-trueGray-900 text-white'>
          <h1
            className='text-3xl font-bold cursor-pointer w-full py-2'
            onClick={clicked}
            title='Click to reload'
          >
            Chats
          </h1>
          <ul className='w-10/12 overflow-auto scroll-hidden'>
            {isChannelName.map((channel) => (
              <li key={channel.channelId} className='flex w-full my-1'>
                <NavLink
                  exact
                  to={`/chat/channel/${channel.channelId}`}
                  children={channel.channelName}
                  className='p-2 hover:bg-gray-700 w-full rounded-lg text-left'
                  activeClassName='bg-gray-700'
                />
              </li>
            ))}
          </ul>
          <div className=' w-full top-full sticky h-16 flex divide-x'>
            <button
              className='w-full bg-pink-700 hover:bg-pink-800 flex items-center justify-center transition-colors duration-300'
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsNew(true);
                setIsOpen(true);
              }}
            >
              Create
            </button>
            <button
              className='w-full bg-pink-700 hover:bg-pink-800 flex items-center justify-center transition-colors duration-300'
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsNew(false);
                setIsOpen(true);
              }}
            >
              Join
            </button>
          </div>
        </div>
        <Switch>
          {isChannelName.map((channel) => (
            <Route
              exact
              key={channel.channelId}
              path={`/chat/channel/${channel.channelId}`}
            >
              <Messages channelId={channel.channelId} />
            </Route>
          ))}
        </Switch>
      </div>
    </>
  );
}

export default Chat;
