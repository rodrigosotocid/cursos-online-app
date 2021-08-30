import React, { useState } from 'react';
import { Container, Typography, Grid, TextField, Button } from '@material-ui/core';
import style from '../Tool/Style';
import { registrarUsuario } from '../../actions/UsuarioAction';

const RegistrarUsuario = () => {

  const [usuario, setUsuario] = useState({
    NombreCompleto: '',
    Email: '',
    Password: '',
    ConfirmarPassword: '',
    UserName: ''
  });

  const ingresarValoresMemoria = e => {
    const { name, value } = e.target;
    setUsuario(anterior => ({
      ...anterior,
      [name]: value
    }))
  }

  const registrarUsuarioSubmit = e => {
    e.preventDefault();

    registrarUsuario(usuario).then(response => {
      console.log('se registro exitosamente el usuario', response);
      window.localStorage.setItem("token_seguridad", response.data.token);
    });
  }

  return (
    <Container component="main" maxWidth="md" justify="center" >
      <div style={style.paper} >

        <Typography
          component="h1"
          variant="h5"
        >
          Registro de Usuario
        </Typography>

        <form style={style.form}>
          <Grid container spacing={2}>

            <Grid item xs={12} md={12} >
              <TextField
                name="NombreCompleto"
                value={usuario.NombreCompleto}
                onChange={ingresarValoresMemoria}
                variant="outlined"
                fullWidth
                label="Nombre y Apellidos"
              />
            </Grid>
            <Grid item xs={12} md={6} >
              <TextField
                name="Email"
                value={usuario.Email}
                onChange={ingresarValoresMemoria}
                variant="outlined"
                fullWidth
                label="Correo Electrónico"
              />
            </Grid>
            <Grid item xs={12} md={6} >
              <TextField
                name="UserName"
                value={usuario.UserName}
                onChange={ingresarValoresMemoria}
                variant="outlined"
                fullWidth
                label="Nombre de Usuario"
              />
            </Grid>
            <Grid item xs={12} md={6} >
              <TextField
                name="Password"
                value={usuario.Password}
                onChange={ingresarValoresMemoria}
                type="password"
                variant="outlined"
                fullWidth
                label="Contraseña"
              />
            </Grid>
            <Grid item xs={12} md={6} >
              <TextField
                name="ConfirmarPassword"
                value={usuario.ConfirmarPassword}
                onChange={ingresarValoresMemoria}
                type="password" variant="outlined"
                fullWidth
                label="Confirmar Contraseña"
              />
            </Grid>

          </Grid>

          <Grid container justifyContent="center">
            <Grid item xs={12} md={6}>
              <Button
                type="submit"
                onClick={registrarUsuarioSubmit}
                fullWidth
                variant="contained"
                color="primary"
                style={style.submit}
              >
                Enviar
              </Button>
            </Grid>
          </Grid>

        </form>

      </div>
    </Container>
  );
}

export default RegistrarUsuario;