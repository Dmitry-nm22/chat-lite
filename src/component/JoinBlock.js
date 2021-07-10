import socket from '../Socket'



function joinBlock() {
    return (
        <div className='join-block'>
            <input type="text" placeholder='room id'/>
            <input type="text" placeholder='Name'/>
            <button className='btn-join'>JOIN</button>
        </div>
    );
}

export default joinBlock;