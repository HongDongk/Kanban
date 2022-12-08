import { useForm } from "react-hook-form";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import DragabbleCard from "./DragabbleCard";

import { ITodo, toDoState } from "../atoms";


const Board = ({ toDos, boardId }: IBoardProps) => {
  const setToDos = useSetRecoilState(toDoState);
  const { register, handleSubmit, setValue, clearErrors, formState: { errors } } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    clearErrors();
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setValue('toDo', '');
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [newToDo, ...allBoards[boardId]],
      };
    });
  };
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", { required: "메세지가 필요합니다" })}
          type="text"
          placeholder={`${boardId} 추가하기`}
        />
        {errors.toDo && <Error>{errors.toDo.message}</Error>}
      </Form>
      <Droppable droppableId={boardId}>
        {(magic,info) => (
          <Area
            isDraggingOver={info.isDraggingOver}
            isDraggingFromThis={Boolean(info.draggingFromThisWith)}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DragabbleCard
                key={toDo.id}
                index={index}
                toDoId={toDo.id}
                toDoText={toDo.text}
              />
            ))}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Board;

interface IBoardProps {
  toDos: ITodo[];
  boardId: string;
}

interface IForm {
  toDo: string;
}

interface IAreaProps {
  isDraggingFromThis: boolean;
  isDraggingOver: boolean;
}

const Wrapper = styled.div`
  width: 300px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Area = styled.div<IAreaProps>`
  background-color: ${(props) => props.isDraggingOver ? "#dfe6e9" : props.isDraggingFromThis ? "#b2bec3" : "transparent"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
`;

const Title = styled.h2`
  height:50px;
  line-height:50px;
  text-align: center;
  font-weight: 600;
  font-size: 18px;
  background-color: skyblue;
`;

const Form = styled.form`
  width:100%;
  display:flex;
  flex-wrap:wrap;
  justify-content:center;
  input {
    padding:5px;
    margin-top:10px;
    outline: none;
    width:85%;
    height:35px;
    border-radius:6px;
    border:none;
  }
`;

const Error = styled.p`
  width:100%;
  color: orangered;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  margin-top: 4px;
`;
