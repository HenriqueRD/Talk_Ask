import imgAside from '../assets/illustration.svg';
import { Link } from 'react-router-dom';
import '../styles/pgNewRoom.scss'
import Button from '../components/Button';

export function NewRoom() {

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
            <h2>Crie uma nova sala</h2>
            <form>
              <input type="text" placeholder="Nome da sala" />
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
  