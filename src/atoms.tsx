import { atom, selector } from "recoil";

interface IToDoState {
  [key: string]: string[];
}
  
export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    "해야될 일": ["a", "b"],
    "진행 중": ["c", "d", "e"],
    "완료한 일": ["f"],
  },
});