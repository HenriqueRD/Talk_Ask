import { ReactNode } from "react";
import cx from "classnames";

import './cpQuestion.scss';
import { useTheme } from "../../hook/useTheme";

type QuestionProps = {
    author: {
      name: string,
      photo: string,
    },
    content: string,
    isAnswer?: boolean,
    isHighLighted?: boolean, 
    children?: ReactNode,
};

export function Question({ author, content, children, isAnswer= false, isHighLighted= false }: QuestionProps) {
    const { theme } = useTheme();
    return (
        <div className={theme}>
        <div id="cpQuestion" className={cx( { answer: isAnswer }, { highLighted: isHighLighted && !isAnswer} )}>
            <p>{content}</p>
            <div className={`infoQuestion`}>
                <div className="name">
                    <img src={author.photo} alt=""/>
                    <span>{author.name}</span>
                </div>
                <div className={`children `}>
                    {children}
                </div>
            </div>
        </div>
        </div>
  );
}
  
export default Question;