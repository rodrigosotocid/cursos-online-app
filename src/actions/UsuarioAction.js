import HttpCliente from '../servicios/HttpCliente';
import axios from 'axios';

/* se crea esta instancia de axios para "registrarUsuario" y "loginUsuario",
ya que no deben usar el token de seguridad para consumir alguna funcionalidad
de ASP.NETCORE de mi Web Service
*/
const instancia = axios.create();
instancia.CancelToken = axios.CancelToken;
instancia.isCancel = axios.isCancel;

export const registrarUsuario = usuario => {
  return new Promise((resolve, eject) => {
    instancia.post("/usuario/registrar", usuario).then((response) => {
      resolve(response);
    })
  })
}

export const obtenerUsuarioActual = (dispatch) => {
  return new Promise((resolve, reject) => {
    HttpCliente.get("/usuario")
      .then(response => {


        if (response.data && response.data.imagenPerfil) {
          let fotoPerfil = response.data.imagenPerfil;
          const nuevoFile = `data:image/${fotoPerfil.extension};base64,${fotoPerfil.data}`;
          response.data.imagenPerfil = nuevoFile;
        }

        if (typeof (dispatch) === "function") {
          dispatch({
            type: "INICIAR_SESION",
            sesion: response.data,
            autenticado: true
          });

          resolve(response);
          console.log("response ", response);
        }
      }).catch(error => {
        resolve(error);
      });
  })
}

export const actualizarUsuario = (usuario, dispatch) => {
  return new Promise((resolve, reject) => {
    HttpCliente.put("/usuario", usuario)
      .then(response => {

        if (response.data && response.data.imagenPerfil) {
          let fotoPerfil = response.data.imagenPerfil;
          const nuevoFile = `data:image/${fotoPerfil.extension};base64,${fotoPerfil.data}`;
          response.data.imagenPerfil = nuevoFile;
        }

        dispatch({
          type: 'INICIAR_SESION',
          sesion: response.data,
          autenticado: true
        })

        resolve(response);

      }).catch(error => {
        resolve(error.response)
      })
  })
}

export const loginUsuario = (usuario, dispatch) => {
  return new Promise((resolve, reject) => {
    instancia.post("/usuario/login", usuario)
      .then(response => {

        if (response.data && response.data.imagenPerfil) {
          let fotoPerfil = response.data.imagenPerfil;
          const nuevoFile = `data:image/${fotoPerfil.extension};base64,${fotoPerfil.data}`;
          response.data.imagenPerfil = nuevoFile;
        }

        dispatch({
          type: 'INICIAR_SESION',
          sesion: response.data,
          autenticado: true
        })
        resolve(response);
      }).catch(error => {
        resolve(error.response);
      });
  })
}