import React, { useState } from 'react';
import { Container, Avatar, Typography, TextField, Button } from '@material-ui/core';
import style from '../Tool/Style';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { loginUsuario } from '../../actions/UsuarioAction';
import { withRouter } from 'react-router-dom';
import { useStateValue } from '../../contexto/store';


const Login = (props) => {

  // eslint-disable-next-line no-unused-vars
  const [{ sesionUsuario }, dispatch] = useStateValue();

  const [usuario, setUsuario] = useState({
    Email: '',
    Password: ''
  });

  const ingresarValoresMemoria = e => {
    const { name, value } = e.target;
    setUsuario(anterior => ({
      ...anterior,
      [name]: value
    }))
  }

  const loginUsuarioSubmit = e => {
    e.preventDefault();

    loginUsuario(usuario, dispatch)
      .then((response) => {

        if (response.status === 200) {

          window.localStorage.setItem("token_seguridad", response.data.token);
          props.history.push("/");

        } else {

          dispatch({
            type: 'OPEN_SNACKBAR',
            mensaje: 'La credenciales del usuario son incorrectas'
          })
        }
      })
  }

  return (
    <Container maxWidth="xs" >
      <div style={style.paper}>

        <Avatar style={style.avatar}>
          <LockOutlinedIcon style={style.icon} />
        </Avatar>

        <Typography component="h1" variant="h5">
          Login de Usuario
        </Typography>

        <form style={style.form}>

          <TextField
            name="Email"
            label="Email"
            value={usuario.Email}
            onChange={ingresarValoresMemoria}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            name="Password"
            label="Contraseña"
            value={usuario.Password}
            onChange={ingresarValoresMemoria}
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
          />

          <Button
            onClick={loginUsuarioSubmit}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={style.submit}
          >Enviar
          </Button>
        </form>

      </div>
    </Container>
  );
};

export default withRouter(Login);