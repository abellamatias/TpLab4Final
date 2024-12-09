
import { createBrowserRouter, Navigate } from "react-router";
import Main from "../layouts/Main";
import * as React from "react";
import { AltaReserva } from "../pages/ABMReservas/altaReserva/AltaReserva";
import { BajaReserva } from "../pages/ABMReservas/bajaReservas/BajaReserva";
import { UpdateReserva } from "../pages/ABMReservas/updateReservas/UpdateReserva";

const Inicio = React.lazy(() => import('../pages/inicio/Inicio'));
const Reservas = React.lazy(() => import('../pages/consultas/reservasfechas/Reservas'));

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <Main/>,
    children: [
      {
        path: '/',
        element: <Navigate to="/Inicio" replace/>
      },
      {
        path: '/inicio',
        element: <Inicio/>,
      },
      {
        path: '/reservas',
        element: <Reservas/>,
      },
      {
        path: '/reservas/agregar',
        element: <AltaReserva/>,
      },
      {
        path: '/reservas/eliminar',
        element: <BajaReserva/>,
      },
      {
        path: '/reservas/modificar',
        element: <UpdateReserva/>,
      },
      { 
        path: '*', 
        element: <Navigate to= '/'/>,
      },
    ],
  },
])

export default Router