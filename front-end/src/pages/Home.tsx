import imgGoogle from '../assets/google.svg';
import '../styles/pgHome.scss'
import Button from '../components/Button';
import Aside from '../components/Aside';
import { FormEvent } from "react";
import { useContext, useState } from 'react';
import  toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';
import { authContext } from '../context/AuthContext';
import { database } from '../services/firebase';

export function Home() {

  const history = useHistory();
  const [ idRoom, setIdRoom ] = useState('');
  const { user, signInWithGoogle } = useContext(authContext);

  async function navToNewRoom() {
    if(!user) {
      await signInWithGoogle();
    }
    
    history.push('/sala/criar');
  }

  async function joinRoom(event: FormEvent) {
    event.preventDefault();

    if(idRoom.trim() === '') {
      setIdRoom('');
      toast.error('Você precisa digitar o código da sala!');
      return;
    }

    const roomRef = await database.ref(`rooms/${idRoom}`).get();

    if (!roomRef.exists()) {
      setIdRoom('');
      toast.error('Sala não encontrada!');
      return;
    }

    if (roomRef.val().endDate) {
      toast.error('Sala encerrada!');
      return;
    }

    setIdRoom('');
    toast.success('Sucesso!!!');
    history.push(`/sala/${idRoom}`);
  }

    return (
      <div id="pageHome">
        <Aside />
        <main>
          <div className="login">
            <h1>Talk_Ask</h1>
            <button onClick={navToNewRoom} className="btnGoogle">
              <img src={imgGoogle} alt=""/>
              Crie sua sala com o Google
            </button>
            <div className="divison">ou entre em uma sala</div>
            <form onSubmit={joinRoom}>
              <input type="text" placeholder="Digite o código da sala" onChange={event => setIdRoom(event.target.value)} value={idRoom} />
              <Button type="submit" title="	--&gt; ] Entrar na sala" />
            </form>
          </div>
        </main>
      </div>
    );
  }
  
  export default Home;