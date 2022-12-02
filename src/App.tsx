import { DragDropContext, DropResult} from "react-beautiful-dnd";
import styled from "styled-components";
import { useRecoilState } from "recoil";

import { toDoState } from "./atoms";
import Board from "./Components/Board";

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if(!destination) return;
    // setToDos((oldToDos) => {
    //   const toDosCopy = [...oldToDos];
    //   // 1) 요소 삭제
    //   toDosCopy.splice(source.index, 1);
    //   // 2) 삭제된 요소 선택된 위치에 삽입
    //   toDosCopy.splice(destination?.index, 0, draggableId);
    //   return toDosCopy;
    // });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;

export default App;
