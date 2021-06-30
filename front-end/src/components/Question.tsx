import { ReactNode } from "react";

import '../styles/cpQuestion.scss';

type QuestionProps = {
    author: {
      name: string,
      photo: string,
    },
    content: string,
    children?: ReactNode,
};

export function Question({ author, content, children}: QuestionProps) {
    
    return (
        <div id="cpQuestion">
            <p>{content}</p>
            <div className="info">
                <div className="name">
                    <img src={author.photo} alt=""/>
                    <span>{author.name}</span>
                </div>
                <div className="children">
                    {children}
                </div>
            </div>
        </div>
  );
}
  
export default Question;
  