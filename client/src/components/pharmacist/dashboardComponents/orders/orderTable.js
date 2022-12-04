import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button } from "@mui/material";

export default function OrderTable(probs) {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "customer", headerName: "Customer", width: 130 },
    { field: "pq", headerName: "No. Products", width: 130 },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      width: 90,
    },
    {
      field: "status",
      headerName: "Status",
      width: 160,
    },

    {
      field: "date",
      headerName: "Order Date",
      type: "date",
      width: 200,
    },
    
    {
      field: "Update",
      renderCell: (cellValues) => {
        return (
          <Button variant="contained" color="primary" onClick={(event) => {}}>
            Update
          </Button>
        );
      },
    },
  ];
  return (
    <div style={{ height: 400, width: "100%", marginTop: "2rem" }}>
      <DataGrid
        rows={probs.rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
