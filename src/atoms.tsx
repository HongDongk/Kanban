import { atom } from "recoil";

export interface ITodo {
  id: number;
  text: string;
}

export interface IToDoState {
  [key: string]: ITodo[];
}

export const TRELLO_TODO = "TRELLO_TODO";
  
export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    "해야될 일": [],
    "진행 중": [],
    "완료한 일": [],
  },
});