import { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import ModalForm from "../../layout/ModalForm/ModalForm";
import { Route, Switch, NavLink } from "react-router-dom";
import Messages from "./Messages";
import Modal from "../../components/Modal";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useSelector, RootStateOrAny } from "react-redux";
import { useDispatch } from "react-redux";
import { add_channel_name } from "../../reducers/ChannelReducer";
import Particles from "../../components/Particles";
import * as app from "../../../package.json";
import { BACKEND_URL } from "../../config/config";

function Chat() {
  const ChannelName = useSelector((state: RootStateOrAny) => state.channel);
  const [curInvite, setCurInvite] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const dispatch = useDispatch();
  //CHECKING WHETHER THEY USERS HAVE A TOKEN AND WETHER THE TOKENS ARE LEGIBLE
  const history = useHistory();
  const response = (res?: any) => {
    axios
      .get(BACKEND_URL + "/chat", { withCredentials: true })
      .then((res) => <Particles children={res.data.message} />)
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => response(), []);
  //FETCHING CHANNEL NAMES AND IDS
  const fetchData = async (res?: any) => {
    await axios
      .get(BACKEND_URL + "/chat/channel", { withCredentials: true })
      .then((res) => {
        dispatch(add_channel_name(res.data));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isCopied === false) return;
    const timeoutId = setTimeout(() => {
      setIsCopied(false);
      setIsModalOpen(false);
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [isCopied]);

  return (
    <>
      <Modal open={isModalOpen} close={setIsModalOpen}>
        <div className='flex flex-col container'>
          <h3>Click below to Copy:</h3>
          <CopyToClipboard
            text={
              "https://" +
              window.location.host +
              "/chat/channel/?invite=" +
              curInvite
            }
            onCopy={() => {
              setIsCopied(true);
            }}
          >
            <button className='border-accent-0 border p-2 rounded-md w-72 mt-3 overflow-hidden text-accent-0 hover:text-white hover:bg-accent-0 inline-flex justify-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='currentColor'
                className='mr-2'
              >
                <path d='M19 3h-2.25a1 1 0 0 0-1-1h-7.5a1 1 0 0 0-1 1H5c-1.103 0-2 .897-2 2v15c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zm0 17H5V5h2v2h10V5h2v15z'></path>
              </svg>
              Invite Link
            </button>
          </CopyToClipboard>
          {isCopied && (
            <span className='text-red-500 mt-3'>Copied to clipboard</span>
          )}
        </div>
      </Modal>
      <ModalForm trigger={isOpen} setTrigger={setIsOpen} isNew={isNew} />
      <div className='conatiner flex'>
        <div className='w-64 h-screen relative flex flex-col flex-grow-0 items-center text-center bg-primary-200 text-white'>
          <div className='inline-flex w-full justify-evenly'>
            <h1 className='text-3xl font-bold py-2' title='Chats'>
              Chats
            </h1>
            <i className='text-teal-600 rounded-full bg-teal-400 bg-opacity-5 h-auto my-3 px-2'>
              alpha {app.version}+
            </i>
          </div>
          {ChannelName === null || ChannelName.length === 0 ? (
            <p className='py-3'>Create channel or join one</p>
          ) : (
            <div className='overflow-auto scroll-hidden w-full space-y-1 flex flex-col'>
              {ChannelName.map((channel: any) => (
                <NavLink
                  key={channel.channelId}
                  exact
                  to={`/chat/channel/${channel.channelId}`}
                  className='hover:bg-primary-light-0 mx-2 p-3 text-left group flex justify-between rounded-md'
                  activeClassName='bg-primary-light-100'
                >
                  {channel.channelName}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setCurInvite(channel.channelId);
                      setIsModalOpen(true);
                    }}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      width='20'
                      height='20'
                      fill='currentColor'
                      className='hidden group-hover:inline'
                      style={{
                        transform: "msFilter",
                      }}
                    >
                      <path d='M19 8h-2v3h-3v2h3v3h2v-3h3v-2h-3zM4 8a3.91 3.91 0 0 0 4 4 3.91 3.91 0 0 0 4-4 3.91 3.91 0 0 0-4-4 3.91 3.91 0 0 0-4 4zm6 0a1.91 1.91 0 0 1-2 2 1.91 1.91 0 0 1-2-2 1.91 1.91 0 0 1 2-2 1.91 1.91 0 0 1 2 2zM4 18a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3v1h2v-1a5 5 0 0 0-5-5H7a5 5 0 0 0-5 5v1h2z'></path>
                    </svg>
                  </button>
                </NavLink>
              ))}
            </div>
          )}
          <div className=' w-full top-full sticky h-16 flex divide-x'>
            <button
              className='w-full bg-accent-0 hover:bg-teal-600 flex items-center justify-center transition-colors duration-300'
              onClick={(e) => {
                e.preventDefault();
                setIsNew(true);
                setIsOpen(true);
              }}
            >
              Create
            </button>
            <button
              className='w-full bg-accent-0 hover:bg-teal-600 flex items-center justify-center transition-colors duration-300'
              onClick={(e) => {
                e.preventDefault();
                setIsNew(false);
                setIsOpen(true);
              }}
            >
              Join
            </button>
          </div>
        </div>
        <Switch>
          {ChannelName.map((channel: any) => (
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
