import { atom, selector } from "recoil";

export interface ITodo {
  id: number;
  text: string;
}

interface IToDoState {
  [key: string]: ITodo[];
}
  
export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    "해야될 일": [],
    "진행 중": [],
    "완료한 일": [],
  },
});