import { useContext } from 'react';
import { authContext } from '../../context/AuthContext';
import { useState } from 'react';
import { FormEvent } from "react";
import { Link, useHistory } from 'react-router-dom';
import  toast from 'react-hot-toast';

import { database } from "../../services/firebase"
import Button from '../../components/Button/Button';

import './pgNewRoom.scss'
import Aside from '../../components/Aside/Aside';

export function NewRoom() {

  const history = useHistory();
  const [newRoom, setNewRoom] = useState('');
  const { user } = useContext(authContext);

  async function createRoom(event: FormEvent) {
    event.preventDefault();

    if(newRoom.trim() === '') {
      toast.error('Você precisa digitar o nome da sala!!!');
      return;
    }

    if(user === undefined) {
      history.push(`/`);
      toast.error('Você precisa se autenticar!!!');
      return;
    }

    const roomRef = database.ref('rooms');
    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,  
    });

    toast.success('Sala criada com sucesso!!!');
    history.push(`/sala/${firebaseRoom.key}`);
  }

  return (
    
    <div id="pageNewRoom">
      {
        user === undefined && 
        (
          history.push('/')
        )
      }
     <Aside />
      <main>
        <div className="create">
          <h1>Talk_Ask</h1>
          <div className="infoUser">
            <img src={user?.photo} alt=""/>
            <span>{user?.name}</span>
          </div>
          <h2>Crie uma sala</h2>
          <form onSubmit={createRoom}>
            <input type="text" placeholder="Nome da sala" onChange={event => setNewRoom(event.target.value)} />
            <Button type="submit" title="Criar sala" />
            <p className="">
              Quer entrar em uma sala já existente? 
              <Link to='/'> Clique aqui</Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}
  
export default NewRoom;