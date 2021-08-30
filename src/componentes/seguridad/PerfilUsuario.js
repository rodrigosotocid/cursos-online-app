import React, { useState, useEffect } from 'react';
import style from '../Tool/Style';
import { Container, Grid, Typography, TextField, Button, Avatar } from '@material-ui/core';
import { actualizarUsuario } from '../../actions/UsuarioAction';
import { useStateValue } from "../../contexto/store";
import reactFoto from '../../logo.svg';
import { v4 as uuidv4 } from 'uuid';
import ImageUploader from 'react-images-upload';
import { obtenerDataImagen } from '../../actions/ImagenAction';

const PerfilUsuario = () => {

  const [{ sesionUsuario }, dispatch] = useStateValue();

  const [usuario, setUsuario] = useState({
    nombreCompleto: '',
    email: '',
    password: '',
    confirmarPassword: '',
    username: '',
    imagenPerfil: null,
    fotoUrl: ''
  });

  const ingresarValoresMemoria = e => {
    const { name, value } = e.target;
    setUsuario(anterior => ({
      ...anterior,
      [name]: value
    }))
  }


  useEffect(() => {
    setUsuario(sesionUsuario.usuario);

    setUsuario(anterior => ({
      ...anterior,
      fotoUrl: sesionUsuario.usuario.imagenPerfil,
      imagenPerfil: null  // se resetea al cargarse la primera vez, es la imagen que se envía al servidor posteriormente
    }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const guardarUsuario = e => {
    e.preventDefault();

    actualizarUsuario(usuario, dispatch).then(response => {
      if (response.status === 200) {

        dispatch({
          type: "OPEN_SNACKBAR",
          openMensaje: {
            open: true,
            mensaje: "Se guardaron correctamente los cambios en el Perfil de Usuario"
          }
        })

        // Al actualizar se genera un nuevo token por eso hay que trear de vuelta la data y setear el nuevo token
        window.localStorage.setItem('token_seguridad', response.data.token);
      } else {

        dispatch({
          type: "OPEN_SNACKBAR",
          openMensaje: {
            open: true,
            mensaje: "Error al intentar guardar el " + Object.keys(response.data.errors)
          }
        })
      }
    })
  }

  const subirFoto = (imagenes) => {
    const foto = imagenes[0];
    const fotoUrl = URL.createObjectURL(foto);

    obtenerDataImagen(foto).then(respuesta => {

      console.log("respuesta: ", respuesta);
      setUsuario(anterior => ({
        ...anterior,
        imagenPerfil: respuesta, // "respuesta" es un Json que viene del Action "Obtener Imagen"
        fotoUrl: fotoUrl
      }))

    });


  }

  const fotoKey = uuidv4();

  return (
    <Container component="main" maxWidth="md" justify="center">
      <div style={style.paper}>
        <Avatar style={style.avatar} src={usuario.fotoUrl || reactFoto} />
        <Typography
          component="h1"
          variant="h5"
        >
          Perfil de Usuario
        </Typography>


        <form style={style.form}>
          <Grid container spacing={2}>

            <Grid item xs={12} md={12} >
              <TextField
                name="nombreCompleto"
                value={usuario ? usuario.nombreCompleto : ""}
                onChange={ingresarValoresMemoria}
                variant="outlined"
                fullWidth
                label="Nombre y Apellidos"
              />
            </Grid>

            <Grid item xs={12} md={6} >
              <TextField
                name="username"
                value={usuario ? usuario.username : ""}
                onChange={ingresarValoresMemoria}
                variant="outlined"
                fullWidth
                label="Nombre de Usuario"
              />
            </Grid>

            <Grid item xs={12} md={6} >
              <TextField
                name="email"
                value={usuario ? usuario.email : ""}
                onChange={ingresarValoresMemoria}
                variant="outlined"
                fullWidth
                label="Correo Electrónico"
              />
            </Grid>

            <Grid item xs={12} md={6} >
              <TextField
                name="password"
                value={usuario ? usuario.password : ""}
                onChange={ingresarValoresMemoria}
                type="password"
                variant="outlined"
                fullWidth
                label="Contraseña"
              />
            </Grid>
            <Grid item xs={12} md={6} >
              <TextField
                name="confirmarPassword"
                value={usuario.confirmarPassword}
                onChange={ingresarValoresMemoria}
                type="password"
                variant="outlined"
                fullWidth
                label="Confirmar contraseña"
              />
            </Grid>
            <Grid item xs={12}>
              <ImageUploader
                withIcon={false}
                key={fotoKey}
                singleImage={true}
                buttonText="Selecciona una imagen de perfil"
                onChange={subirFoto}
                imgExtension={[".jpg", ".gif", ".png", ".jpeg"]}
                maxFileSize={5242880}
              />
            </Grid>

          </Grid>

          <Grid container justifyContent="center">

            <Grid item xs={12} md={6} >
              <Button
                type="submit"
                onClick={guardarUsuario}
                fullWidth
                variant="contained"
                size="large"
                color="primary"
                style={style.submit}
              >
                Guardar Datos
              </Button>
            </Grid>

          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default PerfilUsuario;