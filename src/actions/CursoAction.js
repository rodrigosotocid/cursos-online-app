import HttpCliente from '../servicios/HttpCliente';

export const guardarCurso = async (curso, imagen) => {

  const endpointCurso = '/cursos';
  const promesaCurso = HttpCliente.post(endpointCurso, curso);

  if (imagen) {

    const endpointImagen = '/documento';
    const promesaImagen = HttpCliente.post(endpointImagen, imagen);

    return await Promise.all([promesaCurso, promesaImagen]);

  } else {

    return await Promise.all([promesaCurso]);
  }
};

export const paginacionCurso = (paginador) => {
  return new Promise((resolve, reject) => {
    HttpCliente.post("/cursos/report", paginador).then((response) => {
      resolve(response);
    })
  });
}