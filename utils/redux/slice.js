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
    setId: (state) => {
      state.boards.boards.map((board) => (board.id = Math.random() * 100000));
    },
    selectBoard: (state, action) => {
      state.selectedBoard = action.payload;
    },
    addNewTask: (state, action) => {
      state.selectedBoard.columns.forEach((column) => {
        if (action.payload.status === column.name) {
          column.tasks.push(action.payload);
        }
      });
    },
    editBoard: (state, action) => {
      state.boards.boards.forEach((item) => {
        if (item.id === state.selectedBoard.id) {
          item.name = action.payload.name;
          item.columns = action.payload.columns;
        }
      });
     
    },

    createBoard: (state, action) => {
      state.boards.boards.push(action.payload)
    },
    deleteBoard: (state, action) => {
    state.boards.boards = state.boards.boards.filter((board) => {
         action.payload !== board.id
      })
    }
  },
});

export const { selectBoard, addNewTask, editBoard, setId, 
  createBoard, deleteBoard } =
  kanbanSlice.actions;
export default kanbanSlice.reducer;
