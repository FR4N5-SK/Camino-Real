const endpoints = {
    registerUser: "http://localhost:3081/api/users/register",
    loginUser: "http://localhost:3081/api/users/login",
    editPerfil: "http://localhost:3081/api/users/update",
    editProduct: "http://localhost:3081/api/products/update/",
    deleteUser: "http://localhost:3081/api/users/delete",
    editPassword: "http://localhost:3081/api/users/renew-password",
    allHoteles: "http://localhost:3081/api/hotel/all",
    allViajes: "http://localhost:3081/api/routes/all",
    allOfertas: "http://localhost:3081/api/promos/all",
    allUsers: "http://localhost:3081/api/users/all",
    addHotel: "http://localhost:3081/api/hotel/add",
    addOferta: "http://localhost:3081/api/promos/add",
    addViajes: "http://localhost:3081/api/routes/add",
    addCar: "http://localhost:3081/api/products/car/",
    deleteViaje: "http://localhost:3081/api/routes/delete/",
    deleteOferta: "http://localhost:3081/api/promos/delete/",
    deleteHotel: "http://localhost:3081/api/hotel/delete/",
    editHotel: "http://localhost:3081/api/hotel/edit/",
    addReserva: "http://localhost:3081/api/reservas/add",
    comprar: "http://localhost:3081/api/reservas/compra"
}

export default endpoints