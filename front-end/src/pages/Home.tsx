import imgAside from '../assets/illustration.svg';
import imgGoogle from '../assets/google.svg';
import '../styles/pgHome.scss'
import Button from '../components/Button';
import { useHistory } from 'react-router-dom';

export function Home() {

  const history = useHistory();

  function navToNewRoom() {
    history.push('/sala/criar');
  }

    return (
      <div id="pageHome">
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
          <div className="login">
            <h1>Talk_Ask</h1>
            <button onClick={navToNewRoom} className="btnGoogle">
              <img src={imgGoogle} alt=""/>
              Crie sua sala com o Google
            </button>
            <div className="divison">ou entre em uma sala</div>
            <form>
              <input type="text" placeholder="Digite o código da sala" />
              <Button onClick={navToNewRoom} type="submit" title="	--&gt; ] Entrar na sala" />
            </form>
          </div>
        </main>
      </div>
    );
  }
  
  export default Home;
  