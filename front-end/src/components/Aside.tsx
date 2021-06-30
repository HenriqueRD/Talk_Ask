import imgAside from '../assets/illustration.svg';

import '../styles/cpAside.scss'

export function Aside() {

  return (
    <div id="cpAside">
    <div></div>
      <div className="mobile">
        <aside>       
          <div className="mobileH">
            <img src={imgAside} alt="" />
          </div>
          <strong>
              Toda pergunta tem uma resposta.
          </strong>
          <p>
            Aprenda e compartilhe conhecimentocom outras pessoas
          </p>
          <div className="mobile"></div>
        </aside>   
      </div>
      <></>
    </div>
  );
}
  
export default Aside;