import { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { authContext } from '../context/AuthContext';
import { database } from '../services/firebase';

type Question = {
    id: string,
    author: {
      name: string,
      photo: string,
    },
    content: string,
    isAnswered: boolean,
    isHighLighted: boolean,
    likeCount: number,
    likeId: string | undefined,
};

type FirebaseQuestion = Record<string, {
    author: {
      name: string,
      photo: string,
    },
    content: string,
    isAnswered: boolean,
    isHighLighted: boolean
    like: Record<string, {
      authorId: string,
    }>
}>;
  
type RoomId = {
    id: string;
  }
export function useRoom(roomId: RoomId) {

    const history = useHistory();
    const { user } = useContext(authContext);
    const [ nameRoom, setNameRoom ] = useState('');
    const [ questionRoom, setQuestionRoom ] = useState<Question[]>([]);
    const roomRef = database.ref(`rooms/${roomId.id}`);

    useEffect(() => {
      roomRef.on('value', room => {
        if (room.exists()){
        const firebaseQuestion: FirebaseQuestion = room.val().questions ?? {};
        const arrayQuestions = Object.entries(firebaseQuestion).map(([key, value]) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
            isHighLighted: value.isHighLighted,
            isAnswered: value.isAnswered,
            likeCount: Object.values(value.like ?? {}).length,
            likeId: Object.entries(value.like ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0],
          }
          
        });
  
        setNameRoom(room.val().title);
        setQuestionRoom(arrayQuestions);
      }
      else {
        history.push('/');
        return;
      }
      });
    
      return () => {
        roomRef.off('value');
      }
    }, [roomId.id, user?.id, roomRef, history] );
  
  return { nameRoom, questionRoom };
}