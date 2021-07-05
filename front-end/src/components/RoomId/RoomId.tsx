import  toast from 'react-hot-toast';
import copy from '../../assets/copy.svg';

import './cpRoomId.scss';

type RoomCode = {
    code: string;
}

export function RoomId(props: RoomCode) {
    
    function copyIdRoom() {
        navigator.clipboard.writeText(props.code);
        toast.success('Copiado!');
    }

  return (
    <div id="cpRoomId">
        <button onClick={copyIdRoom} title="Copiar código da sala">
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