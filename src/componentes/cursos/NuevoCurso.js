import React, { useState } from 'react';
import { Container, Typography, Grid, TextField, Button } from '@material-ui/core';
import style from '../Tool/Style';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import ImageUploader from 'react-images-upload';
import { v4 as uuidv4 } from 'uuid';
import { obtenerDataImagen } from '../../actions/ImagenAction';

const NuevoCurso = () => {

  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
  const [imagenCurso, setImagenCurso] = useState(null);

  const [curso, setCurso] = useState({
    titulo: '',
    descripcion: '',
    precio: 0.0,
    promocion: 0.0
  });

  const ingresarValoresMemoria = e => {
    const { name, value } = e.target;

    setCurso(anterior => ({
      ...anterior,
      [name]: value
    }));
  }

  const subirFoto = imagenes => {
    console.log(imagenes);

    const foto = imagenes[0];
    obtenerDataImagen(foto).then(respuesta => {
      setImagenCurso(respuesta);
    });
  }

  const fotoKey = uuidv4();

  return (
    <Container component="main" maxWidth="md" justify="center" >
      <div style={style.paper}>
        <Typography component="h1" variant="h5" >
          Registro de Nuevo Curso
        </Typography>
        <form style={style.form} >
          <Grid container spacing={2}>

            <Grid item xs={12} md={12}>
              <TextField
                name="titulo"
                variant="outlined"
                fullWidth
                label="Título"
                value={curso.titulo}
                onChange={ingresarValoresMemoria}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                name="descripcion"
                variant="outlined"
                fullWidth
                label="Descripción"
                value={curso.descripcion}
                onChange={ingresarValoresMemoria}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="precio"
                variant="outlined"
                fullWidth
                label="Precio Normal"
                value={curso.precio}
                onChange={ingresarValoresMemoria}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="promocion"
                variant="outlined"
                fullWidth
                label="Precio Promoción"
                value={curso.promocion}
                onChange={ingresarValoresMemoria}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  value={fechaSeleccionada}
                  onChange={setFechaSeleccionada}
                  margin="normal"
                  id="fecha-publicacion-id"
                  label="Selecciona Fecha de Publicación"
                  format="dd/MM/yyyy"
                  fullWidth
                  KeyboardButtonProps={{
                    "aria-label": "change date"
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>

            <Grid item xs={12} md={6}>
              <ImageUploader
                withIcon={false}
                key={fotoKey}
                singleImage={true}
                buttonText="Selecciona imagen del Curso"
                onChange={subirFoto}
                imgExtension={[".jpg", ".gif", ".png", ".jpeg"]}
              />
            </Grid>

          </Grid>

          <Grid container justifyContent="center">
            <Grid item xs={12} md={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                style={style.submit}
              >
                Guardar Curso
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default NuevoCurso;