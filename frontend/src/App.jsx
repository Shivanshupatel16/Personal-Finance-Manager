import React from "react";
import { Routes, Route } from "react-router-dom";
import AddTransaction from "./pages/AddTransaction";
import EditTransaction from "./pages/EditTransaction";
import DeleteTransaction from "./pages/DeleteTransaction";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TransactionsList from "./transactionlist";
import PrivateRoute from "./PrivateRoute";
function App() {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute><TransactionsList /></PrivateRoute>} />
      <Route path="/add" element={<PrivateRoute><AddTransaction /></PrivateRoute>} />
      <Route path="/:id/edit" element={<PrivateRoute><EditTransaction /></PrivateRoute>} />
      <Route path="/:id/delete" element={<PrivateRoute><DeleteTransaction /></PrivateRoute>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
