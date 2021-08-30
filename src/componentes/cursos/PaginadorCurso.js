import React, { useState, useEffect } from 'react';
import { paginacionCurso } from '../../actions/CursoAction';
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Hidden,
  TextField
} from '@material-ui/core';
import { Grid } from '@material-ui/core';
import ControlTyping from '../Tool/ControlTyping';


const PaginadorCurso = () => {

  const [textoBusquedaCurso, setTextoBusquedaCurso] = useState("");
  const typingBuscadorTexto = ControlTyping(textoBusquedaCurso, 900);

  const [paginadorRequest, setPaginadorRequest] = useState({
    titulo: "",
    numeroPagina: 0,
    cantidadElementos: 5,
  });

  const [paginadorResponse, setPaginadorResponse] = useState({
    listaRecords: [],
    totalRecords: 0,
    numeroPaginas: 0,
  });

  useEffect(() => {

    const obtenerListaCurso = async () => {

      let tituloVariant = "";
      let paginaVariant = paginadorRequest.numeroPagina + 1;

      if (typingBuscadorTexto) {
        tituloVariant = typingBuscadorTexto;
        paginaVariant = 1
      }

      const objetoPaginadorRequest = {
        titulo: tituloVariant,
        numeroPagina: paginaVariant,
        cantidadElementos: paginadorRequest.cantidadElementos,
      };

      const response = await paginacionCurso(objetoPaginadorRequest);
      setPaginadorResponse(response.data);
    }
    obtenerListaCurso();


    /* paginacionCurso(objetoPaginadorRequest).then(response => {
      console.log(response);
    }); */

  }, [paginadorRequest, typingBuscadorTexto])


  const cambiarPagina = (event, nuevaPagina) => {
    setPaginadorRequest((anterior) => ({
      ...anterior,
      numeroPagina: parseInt(nuevaPagina)
    }));
  };

  const cambiarCantidadRecords = (event) => {
    setPaginadorRequest((anterior) => ({
      ...anterior,
      cantidadElementos: parseInt(event.target.value),
      numeroPagina: 0,
    }));
  };


  return (
    <div style={{ padding: "10px", width: "100%" }}>
      <Grid container style={{ paddingTop: "20px", paddingBottom: "20px" }}>
        <Grid item xs={12} sm={4} md={6}>

          <TextField
            fullWidth
            name="textoBusquedaCurso"
            variant="outlined"
            label="Busca tu curso"
            onChange={e => setTextoBusquedaCurso(e.target.value)}
          />

        </Grid>
      </Grid>

      <TableContainer container={Paper} >
        <Table>

          <TableHead>
            <TableRow>
              <TableCell align="left" >Curso</TableCell>

              <Hidden xsDown >
                <TableCell align="left" >Descripción</TableCell>
                <TableCell align="left" >Fecha Publicación</TableCell>
                <TableCell align="left" >Precio Original</TableCell>
                <TableCell align="left" >Precio Promoción</TableCell>
              </Hidden>

            </TableRow>
          </TableHead>

          <TableBody>
            {paginadorResponse.listaRecords.map((curso) => (
              <TableRow key={curso.CursoId}>
                <TableCell align="left" >{curso.Titulo}</TableCell>

                <Hidden xsDown >
                  <TableCell align="left" >{curso.Descripcion}</TableCell>
                  <TableCell align="center" >{(new Date(curso.FechaPublicacion).toLocaleDateString())}</TableCell>
                  <TableCell align="center" >{curso.PrecioActual} €</TableCell>
                  <TableCell align="center" >{curso.Promocion} €</TableCell>
                </Hidden>

              </TableRow>
            ))}
          </TableBody>

        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        rowsPerPageOptions={[5, 10, 25]}
        count={paginadorResponse.totalRecords}
        rowsPerPage={paginadorRequest.cantidadElementos}
        page={paginadorRequest.numeroPagina}
        onPageChange={cambiarPagina}
        onRowsPerPageChange={cambiarCantidadRecords}
        labelRowsPerPage="Cursos por pagina"
      />
    </div>
  );
};

export default PaginadorCurso;