import  toast from 'react-hot-toast';
import copy from '../../assets/copy.svg';
import { useTheme } from '../../hook/useTheme';

import './cpRoomId.scss';

type RoomCode = {
    code: string;
}

export function RoomId(props: RoomCode) {

    const { theme } = useTheme();

    function copyIdRoom() {
        navigator.clipboard.writeText(props.code);
        toast.success('Copiado!');
    }

  return (
    <div id="cpRoomId">
        <div className={theme}>
            <button onClick={copyIdRoom} title="Copiar código da sala"  className="btnID">
                <div>
                    <img src={copy} alt=""/>
                </div>
                <strong>
                    Sala# {props.code}
                </strong>
            </button>
        </div>
    </div>
  );
}
  
export default RoomId;