import { Link, useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

import { database } from '../services/firebase';
import { useRoom } from '../hook/useRoom';
import Button from '../components/Button';
import RoomId from '../components/RoomId';
import Question from '../components/Question';

import '../styles/pgAdminRoom.scss';
import NotQuestion from '../components/NotQuestion';

type paramsCode = {
  id: string;
}

export function AdminRoom() {

    const history = useHistory();
    const params = useParams<paramsCode>();
    const { questionRoom, nameRoom } = useRoom(params);

    async function closeRoom() {
        if(window.confirm('Tem certeza que você deseja encerrar esta sala?')) { 
            await database.ref(`rooms/${params.id}`).update({
                endDate: new Date(),
            });
            toast.success("Sala encerrada!");
            history.push('/')
        }
    }

    function roomUser() {
        toast.success("Visão Usuário");
        history.push(`/sala/${params.id}`);
    }
    
    
    async function deleteQuestion(questionId: string) {
            if(window.confirm("Tem certeza que você deseja excluir esta pergunta?")) {
                await database.ref(`rooms/${params.id}/questions/${questionId}`).remove();
                toast.success("Pergunta Excluida!");
            }
    }

    async function answeredQuestion(questionId: string) {
        await database.ref(`rooms/${params.id}/questions/${questionId}`).push({
            isAnswer: true,
        });
        toast.success("Pergunta Respondida!");
    }

    return (
        <div id="pageAdminRoom">
            <header>
                <div className="containerH">
                    <Link to="/">
                        <strong>
                            Talk_Ask
                        </strong>
                    </Link>
                    <div className="adminH">
                        <RoomId code={params.id}/>
                        <Button onClick={roomUser} title="Usuário" isOutLine/>
                        <Button onClick={closeRoom} title="Encerrar a sala" isOutLine/>
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
                    { 
                        questionRoom.length > 0 ? (
                            questionRoom.map(event => {
                                return (
                                <Question key={event.id} content={event.content} author={event.author}>
                                    <div className="buttonAdmin">
                                        <button onClick={() => deleteQuestion(event.id)} title="Excluir pergunta">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M3 5.99988H5H21" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M8 5.99988V3.99988C8 3.46944 8.21071 2.96074 8.58579 2.58566C8.96086 2.21059 9.46957 1.99988 10 1.99988H14C14.5304 1.99988 15.0391 2.21059 15.4142 2.58566C15.7893 2.96074 16 3.46944 16 3.99988V5.99988M19 5.99988V19.9999C19 20.5303 18.7893 21.039 18.4142 21.4141C18.0391 21.7892 17.5304 21.9999 17 21.9999H7C6.46957 21.9999 5.96086 21.7892 5.58579 21.4141C5.21071 21.039 5 20.5303 5 19.9999V5.99988H19Z" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </button>
                                        <button onClick={() => answeredQuestion(event.id)} title="Pergunta respondida">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M12 17.9999H18C19.657 17.9999 21 16.6569 21 14.9999V6.99988C21 5.34288 19.657 3.99988 18 3.99988H6C4.343 3.99988 3 5.34288 3 6.99988V14.9999C3 16.6569 4.343 17.9999 6 17.9999H7.5V20.9999L12 17.9999Z" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </button>
                                        <button onClick={() => answeredQuestion(event.id)} title="Pergunta respondida">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="12.0003" cy="11.9998" r="9.00375" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M8.44287 12.3391L10.6108 14.507L10.5968 14.493L15.4878 9.60193" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </button>
                                    </div>
                                </Question>
                                );
                            })
                        ) 
                        : 
                        (
                            <NotQuestion />
                        ) 
                    }         
                </div>
            </main>
        </div>
    );
}
  
export default AdminRoom;