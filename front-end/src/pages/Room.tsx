import { Link } from 'react-router-dom';
import { FormEvent } from "react";
import { useParams } from 'react-router-dom';
import { useContext, useState } from 'react';
import toast from 'react-hot-toast';

import { database } from '../services/firebase';
import { authContext } from '../context/AuthContext';
import Button from '../components/Button';
import RoomId from '../components/RoomId';

import '../styles/pgRoom.scss';
import { useEffect } from 'react';

type paramsCode = {
  id: string;
}

type FirebaseQuestion = Record<string, {
  author: {
    name: string,
    photo: string,
  },
  content: string,
  isAnswered: boolean,
  isHighLighted: boolean
}>;

type Question = {
  id: string,
  author: {
    name: string,
    photo: string,
  },
  content: string,
  isAnswered: boolean,
  isHighLighted: boolean
};

export function Room() {

  const { user } = useContext(authContext);
  const params = useParams<paramsCode>();
  const [ newQuestion, setNewQuestion ] = useState('');
  const [ nameRoom, setNameRoom ] = useState('');
  const [ questionRoom, setQuestionRoom ] = useState<Question[]>([]);
  const roomRef = database.ref(`rooms/${params.id}`);

  useEffect(() => {

    roomRef.on('value', room => {
      const firebaseQuestion: FirebaseQuestion = room.val().questions ?? {};
      const arrayQuestions = Object.entries(firebaseQuestion).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighLighted: value.isHighLighted,
          isAnswered: value.isAnswered,
        }
      });

      setNameRoom(room.val().title);
      setQuestionRoom(arrayQuestions)
    });
  }, [params.id] );

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

  return (
    <div id="pageRoom">
      <header>
        <div className="containerH">
          <Link to="/">
            <strong>
              Talk_Ask
            </strong>
          </Link>
          <RoomId code={params.id}/>   
        </div>
        <hr style={{
          border: 0,
          backgroundColor: '#E2E2E2',
          height: 2
        }} />
      </header>
      <main>
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
                    Para enviar uma pergunta, <button className="loginForm" type="button">
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
          {JSON.stringify(questionRoom)}
        </div>
      </main>
    </div>
  );
}
  
export default Room;
  