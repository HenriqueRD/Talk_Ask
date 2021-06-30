import { Link, useHistory } from 'react-router-dom';
import { FormEvent } from "react";
import { useParams } from 'react-router-dom';
import { useContext, useState } from 'react';
import toast from 'react-hot-toast';

import { database } from '../services/firebase';
import { authContext } from '../context/AuthContext';
import Button from '../components/Button';
import RoomId from '../components/RoomId';
import Question from '../components/Question';

import '../styles/pgRoom.scss';
import { useRoom } from '../hook/useRoom';
import { useEffect } from 'react';

type paramsCode = {
  id: string;
}
// { user?.id === await roomRefer.val().authorId) }
export function Room() {

  const { user, signInWithGoogle } = useContext(authContext);
  const params = useParams<paramsCode>();
  const [ newQuestion, setNewQuestion ] = useState('');
  const [ admin, setAdmin ] = useState(false);
  const { questionRoom, nameRoom } = useRoom(params);
  const history = useHistory();

  async function createNewQuestion(event: FormEvent) {
    event.preventDefault();

    if(newQuestion.trim() === '') {
      toast.error('Você precisa fazer alguma pergunta!!!');
      return;
    }

    if(!user) {
      toast.error('Você precisa estar logado para enviar perguntas!!!');
      return;
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        photo: user.photo 
      },
      isHighLighted: false,
      isAnswer: false
    };

    await database.ref(`rooms/${params.id}/questions`).push(question);
    setNewQuestion('');
  }

  async function likedQuestions(questionId : string, likeId: string | undefined) {
    if(!likeId && user) {
      await database.ref(`rooms/${params.id}/questions/${questionId}/like`).push({
        authorId: user?.id,
      });
    } 
    if(likeId && user) {
      await database.ref(`rooms/${params.id}/questions/${questionId}/like/${likeId}`).remove();
    }
  }

  async function roomAdmin() {
    const roomRef = await (await database.ref(`rooms/${params.id}`).get()).val().authorId;
    if(roomRef === user?.id) {
      toast.success("Visão Admin");
      history.push(`/asala/${params.id}`);
    }
    else {
      return;
    }
  }

  useEffect(() => {
    async function isAdmin() {
      const roomRef = await (await database.ref(`rooms/${params.id}`).get()).val().authorId;

      if(roomRef === user?.id) {
        setAdmin(true);
      }
      else {
        setAdmin(false);
      }
    }
    isAdmin();
  }, [user, params.id]);

  return (
    <div id="pageRoom">
      <header>
        <div className="containerH">
          <Link to="/">
            <strong>
              Talk_Ask
            </strong>
          </Link>
          <div className="isAdmin">
            <RoomId code={params.id}/>
            { admin && 
              (
                <Button onClick={roomAdmin} title="Admin" isOutLine/>
              )
            }
          </div>
        </div>
      </header>
      <hr style={{
        border: 0,
        backgroundColor: '#E2E2E2',
        height: 2
      }} /> 
      <main className="mainQuestions">
        <div className="containerM">
          <div className="titleRoom">
            <h1>{nameRoom}</h1>
            { questionRoom.length > 0 && 
              <span>
                <strong>
                  {questionRoom.length} pergunta(s)
                </strong>
              </span>
            }
          </div>
          <form className="newQuestion" onSubmit={createNewQuestion}>
            <textarea placeholder="O que você quer perguntar?" onChange={event => setNewQuestion(event.target.value)} value={newQuestion}/>
            <div className="formFooter">
              { !user ? 
                (
                  <span className="notUser">
                    Para enviar uma pergunta, <button onClick={signInWithGoogle} className="loginForm" type="button">
                        faça seu login.
                    </button>
                  </span>
                ) 
                : 
                (
                  <div className="user">
                    <img src={user.photo} alt="" />
                    <span>{user.name}</span>
                  </div>
                ) 
              }
              <Button type="submit" disabled={!user} title="Enviar pergunta"/>
            </div>
          </form>
          { 
            questionRoom.length > 0 ? (
              questionRoom.map(event => {
                return (
                  <Question key={ event.id } content={ event.content } author={ event.author }>
                    <button onClick={() => likedQuestions(event.id, event.likeId)} type="button" className={`buttonLike ${event.likeId ? 'liked' : '' } `} aria-label="Marcar como gostei">
                     { event.likeCount > 0 && <span>{ event.likeCount }</span> }
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </Question>
                );
              })
            ) 
            : 
            (
            <p>sdasd</p>
            ) 
          }         
        </div>
      </main>
    </div>
  );
}
  
export default Room;