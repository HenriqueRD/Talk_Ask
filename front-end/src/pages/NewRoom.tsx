import { useContext } from 'react';
import { authContext } from '../context/AuthContext';
import { useState } from 'react';
import { FormEvent } from "react";
import { Link, useHistory } from 'react-router-dom';
import  toast from 'react-hot-toast';

import { database } from "../services/firebase"
import imgAside from '../assets/illustration.svg';
import Button from '../components/Button';

import '../styles/pgNewRoom.scss'

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
      <aside>       
        <img src={imgAside} alt="" />
        <strong>
            Toda pergunta tem uma resposta.
        </strong>
        <p>
          Aprenda e compartilhe conhecimentocom outras pessoas
        </p>
        <div className="mobile"></div>
      </aside>
      <main>
        <div className="create">
          <h1>Talk_Ask</h1>
          <h3>Ola {user?.name}</h3>
          <h2>Crie uma nova sala</h2>
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