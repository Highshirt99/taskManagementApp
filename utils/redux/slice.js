import { createSlice } from "@reduxjs/toolkit";
import boards from "../../data.json";

const initialState = {
  boards: boards,
  selectedBoard: boards.boards[0],
  newTask: {},
};

export const kanbanSlice = createSlice({
  name: "kanban",
  initialState,
  reducers: {
    setId: (state) => {
      state.selectedBoard = state.boards.boards[0];
      // set id's for boards
      state.boards.boards.map((board) => (board.id = Math.random() * 100000));
      // set id's for tasks
      state.boards.boards.forEach((board) => {
        board.columns.forEach((column) => {
          column.tasks.map((task) => {
            task.id = Math.random() * 1000000000;
          });
        });
      });

      // set id's for subtasks
      state.boards.boards.forEach((board) => {
        board.columns.forEach((column) => {
          column.tasks.forEach((task) => {
            task.subtasks.map((subtask) => {
              subtask.id = Math.random() * 100000000;
            });
          });
        });
      });
    },

    selectBoard: (state, action) => {
      state.selectedBoard = action.payload;
    },
    addNewTask: (state, action) => {
      state.selectedBoard.columns.forEach((column) => {
        if (action.payload.status.toLowerCase() === column.name.toLowerCase()) {
          column.tasks.push(action.payload);
        }
      });

      state.boards.boards.forEach((board) => {
        board.columns.forEach((column) => {
          if (
            board.id === state.selectedBoard.id &&
            action.payload.status.toLowerCase() === column.name.toLowerCase()
          ) {
            column.tasks.push(action.payload);
          }
        });
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
      state.boards.boards.push(action.payload);
    },
    deleteBoard: (state, action) => {
      state.boards = {
        boards: state.boards.boards.filter(
          (board) => board.id !== action.payload
        ),
      };
      state.selectedBoard = state.boards.boards[0];
    },
    markCompleted: (state, action) => {
      state.selectedBoard.columns.forEach((column) => {
        column.tasks.forEach((task) => {
          task.subtasks.map((subtask) => {
            if (subtask.id === action.payload.id) {
              subtask.isCompleted = !subtask.isCompleted;
            }
          });
        });
      });

      state.boards.boards.forEach((board) => {
        board.columns.forEach((column) => {
          column.tasks.forEach((task) => {
            task.subtasks.map((subtask) => {
              if (subtask.id === action.payload.id) {
                subtask.isCompleted = !subtask.isCompleted;
              }
            });
          });
        });
      });
    },

    changeStatus: (state, action) => {
      const completed = [];

      state.boards.boards.forEach((board) => {
        board.columns.forEach((column) => {
          column.tasks.forEach((task) => {
            if (task.id === action.payload.task?.id) {
              task.subtasks.forEach((subtask) => {
                if (subtask.isCompleted) {
                  completed.push(subtask);
                }

                task.status =
                  completed.length === 0
                    ? board.columns[0].name
                    : completed.length > 0 &&
                      completed.length < task.subtasks.length
                    ? board.columns[1].name
                    : completed.length === task.subtasks.length
                    ? board.columns[2].name
                    : "";
              });
              state.newTask = {
                ...task,
              };
            }
          });
        });
      });

      const updatedBoards = state.boards.boards.map((board) => {
        if (state.selectedBoard.id !== board.id) return board;

        const oldColumnIndex = board.columns.findIndex(
          (column) => column.name === action.payload.task?.status
        );

        const newColumnIndex = board.columns.findIndex(
          (column) => column.name === state.newTask.status
        );

        if (oldColumnIndex === -1 || newColumnIndex === -1) return board;

        const updatedColumns = [...board.columns];
        const oldColumn = updatedColumns[oldColumnIndex];
        const newColumn = updatedColumns[newColumnIndex];

        const updatedTasks = oldColumn.tasks.filter(
          (t) => t.id !== action.payload.task?.id
        );

        oldColumn.tasks = updatedTasks;
        newColumn.tasks.push(state.newTask);

        return (board = {
          ...board,
          columns: updatedColumns,
        });
      });

      state.boards = {
        boards: updatedBoards,
      };
    },

    deleteTask: (state, action) => {
      console.log(action.payload);
      state.boards = {
        boards: state.boards.boards.map((board) => ({
          ...board,
          columns: board.columns.map((column) => ({
            ...column,
            tasks: column.tasks.filter((task) => task.id !== action.payload),
          })),
        })),
      };
    },

    editTask: (state, action) => {
      state.boards.boards.forEach((board) => {
        board.columns.forEach((column) => {
          column.tasks.map((task) => {
            if (task.id === action.payload.id) {
              task.title = action.payload.data.title;
              task.description = action.payload.data.description;
              task.subtasks = action.payload.data.subtasks;
              task.status = action.payload.data.status;
            }
          });
        });
      }),
        state.selectedBoard.columns.forEach((column) => {
          column.tasks.map((task) => {
            if (task.id === action.payload.id) {
              task.title = action.payload.data.title;
              task.description = action.payload.data.description;
              task.subtasks = action.payload.data.subtasks;
              task.status = action.payload.data.status;
            }
          });
        });
    },
  },
});

export const {
  selectBoard,
  addNewTask,
  editBoard,
  setId,
  createBoard,
  deleteBoard,
  markCompleted,
  changeStatus,
  deleteTask,
  editTask,
} = kanbanSlice.actions;
export default kanbanSlice.reducer;
