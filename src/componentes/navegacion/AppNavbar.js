import React from 'react';
import { AppBar } from '@material-ui/core';
import BarSesion from './bar/BarSesion';
import { useStateValue } from '../../contexto/store';

const AppNavbar = () => {

  // eslint-disable-next-line no-unused-vars
  const [{ sesionUsuario }, dispatch] = useStateValue();

  return sesionUsuario ?
    (sesionUsuario.autenticado === true ? <AppBar position="static"><BarSesion /></AppBar> : null) : null;

  /* return (
    <AppBar position="static">
      <BarSesion />
    </AppBar>
  ); */
};

export default AppNavbar;