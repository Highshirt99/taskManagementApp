import { createSlice } from "@reduxjs/toolkit";
import boards from "../../data.json";

const initialState = {
  boards: boards,
  selectedBoard: boards.boards[0],
};

export const kanbanSlice = createSlice({
  name: "kanban",
  initialState,
  reducers: {
    selectBoard: (state, action) => {
      state.selectedBoard = action.payload;
    },
    addNewTask: (state, action) => {
      state.selectedBoard.columns.forEach((column) => {
        if(action.payload.status === column.name){
          column.tasks.push(action.payload)
        }
      })
     
    }
  },
});

export const { selectBoard, addNewTask } = kanbanSlice.actions;
export default kanbanSlice.reducer;
