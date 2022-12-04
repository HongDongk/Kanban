import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

function DragabbleCard({ toDo, index }: IDragabbleCardProps) {
  console.log(toDo, "has been rendered");
  return (
    <Draggable key={toDo} draggableId={toDo} index={index}>
      {(magic, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.dragHandleProps}
          {...magic.draggableProps}
        >
          {toDo}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DragabbleCard); // React Memo: Prop(toDo, index)이 변하지 않으면 리렌더링 방지 - 최적화

interface IDragabbleCardProps {
  toDo: string;
  index: number;
}

const Card = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px;
  background-color: ${(props) => props.isDragging ? "#e4f2ff" : props.theme.cardColor};
  box-shadow: ${(props) => props.isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.05)" : "none"};
`;