import React, {useReducer} from "react";
import JoinBlock from "./component/JoinBlock";
import reducer from './reducer'
import socket from "./Socket";
import Chat from "./component/Chat";
import axios from "axios";

function App() {
    const [state, dispatch] = useReducer(reducer,{
        joined: false,
        roomId: null,
        userName: null,
        users: [],
        messages: []
    })

    const onLogin = async (obj) => {
        dispatch({
            type: 'JOINED',
            payload: obj
        })
        socket.emit('ROOM:JOIN', obj)
        const {data} = await axios.get(`/rooms/${obj.roomId}`)
        setUsers(data.users)
    }

    const setUsers = (users) => {
        dispatch({
            type: 'SET_USERS',
            payload: users,
        });
    };

    React.useEffect(() => {
       // socket.on('ROOM:JOINED', setUsers);
        socket.on('ROOM:SET_USERS', setUsers);
    }, []);



  return (
    <div className = 'wrapper'>
        { !state.joined ? <JoinBlock onLogin={onLogin}/> : <Chat {...state}/>}
    </div>
  );
}

export default App;
