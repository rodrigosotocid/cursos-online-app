import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme/theme';
import AppNavbar from './componentes/navegacion/AppNavbar';
import { Grid, Snackbar } from '@material-ui/core';
import RegistrarUsuario from './componentes/seguridad/RegistrarUsuario';
import Login from './componentes/seguridad/Login';
import PerfilUsuario from './componentes/seguridad/PerfilUsuario';
import { useStateValue } from './contexto/store';
import { obtenerUsuarioActual } from './actions/UsuarioAction';
import RutaSegura from './componentes/navegacion/RutaSegura';
import NuevoCurso from './componentes/cursos/NuevoCurso';


function App() {

  const [{ openSnackbar }, dispatch] = useStateValue();


  const [iniciaApp, setIniciaApp] = useState(false);

  useEffect(() => {
    if (!iniciaApp) {
      obtenerUsuarioActual(dispatch)
        .then((response) => {
          setIniciaApp(true);
        })
        .catch((error) => {
          setIniciaApp(true);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [iniciaApp]);

  return iniciaApp === false ? null : (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={openSnackbar ? openSnackbar.open : false}
        autoHideDuration={3000}
        ContentProps={{ "aria-describedby": "message-id" }}
        message={<span id="message-id">{openSnackbar ? openSnackbar.mensaje : ""}</span>}
        onClose={() =>
          dispatch({
            type: "OPEN_SNACKBAR",
            openMensaje: {
              open: false,
              mensaje: ""
            }
          })}
      >

      </Snackbar>
      <Router>
        <ThemeProvider theme={theme}>
          <AppNavbar />
          <Grid container>
            <Switch>

              <Route exact path="/auth/login" component={Login} />
              <Route exact path="/auth/registrar" component={RegistrarUsuario} />

              <RutaSegura
                exact
                path="/auth/perfil"
                component={PerfilUsuario}
              />
              <RutaSegura
                exact
                path="/"
                component={PerfilUsuario}
              />

              <RutaSegura
                exact
                path="/curso/nuevo"
                component={NuevoCurso}
              />

            </Switch>
          </Grid>
        </ThemeProvider>
      </Router>
    </>
  )
}

export default App;
