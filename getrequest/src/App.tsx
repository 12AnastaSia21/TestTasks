import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import {
  GridRowsProp,
  GridRowModesModel,
  DataGrid,
  GridColDef,
  GridEventListener,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import "./App.css"

// Тип данных, которые мы получаем с API
interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export default function DataTable() {
  const [rows, setRows] = React.useState<GridRowsProp>([]);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get<Todo[]>("https://jsonplaceholder.typicode.com/todos")
      .then((response) => {
        // Преобразуем данные в формат, который подходит для DataGrid
        const transformedRows = response.data.map((todo) => ({
          id: todo.id,  // id необходимо для DataGrid
          userId: todo.userId,
          title: todo.title,
          completed: todo.completed,
        }));
        setRows(transformedRows); // Сохраняем данные в state
        console.log("Data fetched:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    {
      field: "userId",
      headerName: "UserId",
      renderHeader: () => (
        <div style={{ whiteSpace: "normal", wordWrap: "break-word", textAlign: "left" }}>
          UserId
        </div>
      ),
      flex: 1,
      minWidth: 150,
      type: "number",
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "title",
      headerName: "Title",
      renderHeader: () => (
        <div style={{ whiteSpace: "normal", wordWrap: "break-word", textAlign: "left" }}>
          Title
        </div>
      ),
      minWidth: 200,
      flex: 3,
      type: "string",
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "completed",
      headerName: "Completed",
      renderHeader: () => (
        <div style={{ whiteSpace: "normal", wordWrap: "break-word", textAlign: "left" }}>
          Completed
        </div>
      ),
      minWidth: 150,
      flex: 1,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
  ];

  return (
    <Box
      className="table"
      sx={{
        "& .actions": { color: "text.secondary" },
        "& .textPrimary": { color: "text.primary" },
      }}
    >
      {loading && (
        <Box
          sx={{
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
          <CircularProgress size={120} />
        </Box>
      )}
      {!loading && (
        <DataGrid
          rows={rows}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          sx={{
            "& .MuiDataGrid-cell": {
              whiteSpace: "normal",
              wordWrap: "break-word",  // Разрешить перенос текста
            },
          }}
        />
      )}
    </Box>
  );
}
