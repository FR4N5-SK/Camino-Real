import { createContext, useEffect, useState } from "react";
import Swal from 'sweetalert2'
import peticiones from '../validations/peticiones'
import { alertConfirm, alertError } from "../alerts/alerts";

export const Context = createContext();

export function ContextoProvider(props) {
  const [token, setToken] = useState(
    localStorage.getItem("token") === null ? "Invalid" : "Invalid" //localStorage.getItem("token")
  );
  const [admin, setAdmin] = useState(false);
  const [user, setUser] = useState(null);
  const [hoteles, setHoteles] = useState([]);
  const [viajes, setViajes] = useState([]);
  const [ofertas, setOfertas] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const load = async () => {
      setTimeout(async () => {
        await peticionAllHoteles();
        await peticionAllOfertas();
        await peticionAllViajes();
        alertConfirm("Se cargo toda la informacion");
        setLoader(false);
      }, 1000);
    };
    load();
  }, []);

  // Peticion a la api para iniciar sesion
  function peticionLogin(data) {
    return new Promise((resolve, reject) => {
      fetch(peticiones.loginUser, {
        mode: "cors",
        method: "POST", // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .catch((error) => console.error("Error:", error))
        .then((response) => {
          if (response.status < 210 && response.status >= 200) {
            setToken(response.token);
            setUser(response.result);
            if (response.result.role === "admin") {
              setAdmin(true);
            }
            alertConfirm(response.message);
            resolve(true);
          }
          if (response.status < 410 && response.status >= 400) {
            alertError(response.message);
            resolve(false);
          }
          if (response.status < 510 && response.status >= 500) {
            alertError(response.message);
            resolve(false);
          }
        });
    });
  }

  // Funcion de cerrar sesion
  function actionLogout() {
    setToken("Invalid");
    setAdmin(false);
    setUser(null);
    alertConfirm("Se cerro la sesion exitosamente");
  }

  // Peticion a la api para ver los productos
  function peticionAllHoteles() {
    return new Promise((resolve, reject) => {
      fetch(peticiones.allHoteles, {
        mode: "cors",
        method: "GET", // or 'PUT'
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .catch((error) => console.error("Error:", error))
        .then((response) => {
          if (response.status < 210 && response.status >= 200) {
            setHoteles(response.result);
            resolve(true);
          }
          if (response.status < 410 && response.status >= 400) {
            alertError(response.message);
            resolve(false);
          }
          if (response.status < 510 && response.status >= 500) {
            alertError(response.message);
            resolve(false);
          }
        });
    });
  }

  // Peticion a la api para ver los productos
  function peticionAllViajes() {
    return new Promise((resolve, reject) => {
      fetch(peticiones.allViajes, {
        mode: "cors",
        method: "GET", // or 'PUT'
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .catch((error) => console.error("Error:", error))
        .then((response) => {
          if (response.status < 210 && response.status >= 200) {
            setViajes(response.result);
            resolve(true);
          }
          if (response.status < 410 && response.status >= 400) {
            alertError(response.message);
            resolve(false);
          }
          if (response.status < 510 && response.status >= 500) {
            alertError(response.message);
            resolve(false);
          }
        });
    });
  }

  // Peticion a la api para ver los productos
  function peticionAllOfertas() {
    return new Promise((resolve, reject) => {
      fetch(peticiones.allOfertas, {
        mode: "cors",
        method: "GET", // or 'PUT'
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .catch((error) => console.error("Error:", error))
        .then((response) => {
          if (response.status < 210 && response.status >= 200) {
            setOfertas(response.result);
            resolve(true);
          }
          if (response.status < 410 && response.status >= 400) {
            alertError(response.message);
            resolve(false);
          }
          if (response.status < 510 && response.status >= 500) {
            alertError(response.message);
            resolve(false);
          }
        });
    });
  }

  // Peticion a la api para registrar usuarios
  function peticionRegister(data) {
    return new Promise((resolve, reject) => {
      fetch(peticiones.registerUser, {
        mode: "cors",
        method: "POST", // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .catch((error) => console.error("Error:", error))
        .then((response) => {
          if (response.status < 210 && response.status >= 200) {
            alertConfirm(response.message);
            resolve(true);
          }
          if (response.status < 410 && response.status >= 400) {
            alertError(response.message);
            resolve(false);
          }
          if (response.status < 510 && response.status >= 500) {
            alertError(response.message);
            resolve(false);
          }
        });
    });
  }

  // Peticion a la api para agregar los productos
  function peticionAddHotel(data) {
    return new Promise((resolve, reject) => {
      fetch(peticiones.addHotel, {
        mode: "cors",
        method: "POST", // or 'PUT'
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .catch((error) => console.error("Error:", error))
        .then((response) => {
          if (response.status < 210 && response.status >= 200) {
            setHoteles([...hoteles, response.result]);
            alertConfirm(response.message);
            resolve(true);
          }
          if (response.status < 410 && response.status >= 400) {
            alertError(response.message);
            resolve(false);
          }
          if (response.status < 510 && response.status >= 500) {
            alertError(response.message);
            resolve(false);
          }
        });
    });
  }

  // Peticion a la api para agregar los productos
  function peticionAddOferta(data) {
    return new Promise((resolve, reject) => {
      fetch(peticiones.addOferta, {
        mode: "cors",
        method: "POST", // or 'PUT'
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .catch((error) => console.error("Error:", error))
        .then((response) => {
          if (response.status < 210 && response.status >= 200) {
            setOfertas([...ofertas, response.result]);
            alertConfirm(response.message);
            resolve(true);
          }
          if (response.status < 410 && response.status >= 400) {
            alertError(response.message);
            resolve(false);
          }
          if (response.status < 510 && response.status >= 500) {
            alertError(response.message);
            resolve(false);
          }
        });
    });
  }

  // Peticion a la api para agregar los productos
  function peticionAddViaje(data) {
    return new Promise((resolve, reject) => {
      fetch(peticiones.addViajes, {
        mode: "cors",
        method: "POST", // or 'PUT'
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .catch((error) => console.error("Error:", error))
        .then((response) => {
          if (response.status < 210 && response.status >= 200) {
            setViajes([...viajes, response.result]);
            alertConfirm(response.message);
            resolve(true);
          }
          if (response.status < 410 && response.status >= 400) {
            alertError(response.message);
            resolve(false);
          }
          if (response.status < 510 && response.status >= 500) {
            alertError(response.message);
            resolve(false);
          }
        });
    });
  }

  // Peticion a la api para agregar los productos
  function peticionAddReserva(data) {
    return new Promise((resolve, reject) => {
      fetch(peticiones.addReserva, {
        mode: "cors",
        method: "POST", // or 'PUT'
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .catch((error) => console.error("Error:", error))
        .then((response) => {
          if (response.status < 210 && response.status >= 200) {
            alertConfirm(response.message);
            resolve(true);
          }
          if (response.status < 410 && response.status >= 400) {
            alertError(response.message);
            resolve(false);
          }
          if (response.status < 510 && response.status >= 500) {
            alertError(response.message);
            resolve(false);
          }
        });
    });
  }

  // Peticion a la api para agregar los productos
  function peticionComprar(data) {
    return new Promise((resolve, reject) => {
      fetch(peticiones.comprar, {
        mode: "cors",
        method: "POST", // or 'PUT'
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .catch((error) => console.error("Error:", error))
        .then((response) => {
          if (response.status < 210 && response.status >= 200) {
            alertConfirm(response.message);
            resolve(true);
          }
          if (response.status < 410 && response.status >= 400) {
            alertError(response.message);
            resolve(false);
          }
          if (response.status < 510 && response.status >= 500) {
            alertError(response.message);
            resolve(false);
          }
        });
    });
  }

  // Peticion a la api para agregar los productos
  function peticionReview(data) {
    return new Promise((resolve, reject) => {
      fetch(peticiones.addReseña, {
        mode: "cors",
        method: "POST", // or 'PUT'
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .catch((error) => console.error("Error:", error))
        .then((response) => {
          if (response.status < 210 && response.status >= 200) {
            const newStorage = [];
            hoteles.map((item) => {
              if (item._id === response.id_hotel) {
                newStorage.push(response.result);
              } else {
                newStorage.push(item);
              }
            });
            setHoteles(newStorage);
            alertConfirm(response.message);
            resolve(true);
          }
          if (response.status < 410 && response.status >= 400) {
            alertError(response.message);
            resolve(false);
          }
          if (response.status < 510 && response.status >= 500) {
            alertError(response.message);
            resolve(false);
          }
        });
    });
  }

  // Peticion a la api para eliminar los productos
  function deleteViaje(id) {
    return new Promise((resolve, reject) => {
      Swal.fire({
        icon: "question",
        title: "Estas seguro que quieres eliminar la Ruta de Viaje?",
        showDenyButton: true,
        confirmButtonText: "Cancelar",
        denyButtonText: `Confirmar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire("Ten mas cuidado la proxima vez", "", "info");
        } else if (result.isDenied) {
          fetch(peticiones.deleteViaje + id, {
            mode: "cors",
            method: "DELETE", // or 'PUT'
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((res) => res.json())
            .catch((error) => console.error("Error:", error))
            .then((response) => {
              if (response.status < 210 && response.status >= 200) {
                const newState = viajes.filter((item) => item._id !== id);
                setViajes(newState);
                alertConfirm(response.message);
                resolve(true);
              }
              if (response.status < 410 && response.status >= 400) {
                alertError(response.message);
                resolve(false);
              }
              if (response.status < 510 && response.status >= 500) {
                alertError(response.message);
                resolve(false);
              }
            });
        }
      });
    });
  }

  // Peticion a la api para eliminar los productos
  function deleteOferta(id) {
    return new Promise((resolve, reject) => {
      Swal.fire({
        icon: "question",
        title: "Estas seguro que quieres eliminar la Oferta?",
        showDenyButton: true,
        confirmButtonText: "Cancelar",
        denyButtonText: `Confirmar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire("Ten mas cuidado la proxima vez", "", "info");
        } else if (result.isDenied) {
          fetch(peticiones.deleteOferta + id, {
            mode: "cors",
            method: "DELETE", // or 'PUT'
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((res) => res.json())
            .catch((error) => console.error("Error:", error))
            .then((response) => {
              if (response.status < 210 && response.status >= 200) {
                const newState = ofertas.filter((item) => item._id !== id);
                setOfertas(newState);
                alertConfirm(response.message);
                resolve(true);
              }
              if (response.status < 410 && response.status >= 400) {
                alertError(response.message);
                resolve(false);
              }
              if (response.status < 510 && response.status >= 500) {
                alertError(response.message);
                resolve(false);
              }
            });
        }
      });
    });
  }

  // Peticion a la api para eliminar los productos
  function deleteHotel(id) {
    return new Promise((resolve, reject) => {
      Swal.fire({
        icon: "question",
        title: "Estas seguro que quieres eliminar el Hotel?",
        showDenyButton: true,
        confirmButtonText: "Cancelar",
        denyButtonText: `Confirmar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire("Ten mas cuidado la proxima vez", "", "info");
        } else if (result.isDenied) {
          fetch(peticiones.deleteHotel + id, {
            mode: "cors",
            method: "DELETE", // or 'PUT'
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((res) => res.json())
            .catch((error) => console.error("Error:", error))
            .then((response) => {
              if (response.status < 210 && response.status >= 200) {
                const newState = hoteles.filter((item) => item._id !== id);
                setHoteles(newState);
                const newState2 = ofertas.filter(
                  (item) => item.id_hotel !== id
                );
                setOfertas(newState2);
                alertConfirm(response.message);
                resolve(true);
              }
              if (response.status < 410 && response.status >= 400) {
                alertError(response.message);
                resolve(false);
              }
              if (response.status < 510 && response.status >= 500) {
                alertError(response.message);
                resolve(false);
              }
            });
        }
      });
    });
  }

  // Peticion a la api para agregar los productos
  function peticionEditHotel(data, id) {
    return new Promise((resolve, reject) => {
      fetch(peticiones.editHotel + id, {
        mode: "cors",
        method: "PUT", // or 'PUT'
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .catch((error) => console.error("Error:", error))
        .then((response) => {
          if (response.status < 210 && response.status >= 200) {
            const newStorage = [];
            hoteles.map((item) => {
              if (item._id === id) {
                newStorage.push(response.result);
              } else {
                newStorage.push(item);
              }
            });
            setHoteles(newStorage);
            alertConfirm(response.message);
            resolve(true);
          }
          if (response.status < 410 && response.status >= 400) {
            alertError(response.message);
            resolve(false);
          }
          if (response.status < 510 && response.status >= 500) {
            alertError(response.message);
            resolve(false);
          }
        });
    });
  }

  return (
    <Context.Provider
      value={{
        token,
        setToken,
        admin,
        setAdmin,
        user,
        hoteles,
        viajes,
        ofertas,
        loader,
        setLoader,
        peticionLogin,
        actionLogout,
        peticionRegister,
        peticionAllHoteles,
        peticionAllViajes,
        peticionAllOfertas,
        peticionAddHotel,
        peticionAddOferta,
        peticionAddViaje,
        deleteViaje,
        deleteOferta,
        deleteHotel,
        peticionEditHotel,
        peticionAddReserva,
        peticionComprar,
        peticionReview
      }}
    >
      {props.children}
    </Context.Provider>
  );
}