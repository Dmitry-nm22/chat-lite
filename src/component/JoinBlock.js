import {useState} from "react";
import axios from "axios";


function JoinBlock({onLogin}) {
    const [roomId, setRoomId] = useState('')
    const [userName, setUserName] = useState('')
    const [isLoading, setLoading] = useState(false)

    const onEnter = async () =>{
        if(!roomId || !userName){
            return alert('неверные данные')
        }
        const obj ={
            roomId,
            userName
        }
        setLoading(true)
        await axios.post('/rooms', obj)
        onLogin(obj)
    }
    return (
        <div className='join-block'>
            <input type="text" placeholder='room id' value={roomId} onChange={e => setRoomId(e.target.value)}/>
            <input type="text" placeholder='Name' value={userName} onChange={e => setUserName(e.target.value)}/>
            <button disabled={isLoading} className='btn-join' onClick={onEnter}>{isLoading ? 'вход...' : 'войти'}</button>
        </div>
    );
}

export default JoinBlock;