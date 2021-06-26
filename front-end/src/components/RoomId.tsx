import  toast from 'react-hot-toast';
import copy from '../assets/copy.svg';

import '../styles/cpRoomId.scss';

type RoomId = {
    code: string;
}

export function RoomId(props: RoomId) {
    function copyIdRoom() {
        navigator.clipboard.writeText(props.code);
        toast.success('Copiado!');
    }

  return (
    <div id="cpRoomId">
        <button onClick={copyIdRoom}>
            <div>
                <img src={copy} alt=""/>
            </div>
            <strong>
                Sala# {props.code}
            </strong>
        </button>
    </div>
  );
}
  
export default RoomId;