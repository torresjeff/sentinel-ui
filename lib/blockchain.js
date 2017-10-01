
class Blockchain {
    constructor() {
    }

    connect() {
        throw new Error("Abstract");
    }

    disconnect() {
        throw new Error("Abstract");
    }

    getAllTransactions() {
        throw new Error("Abstract");
    }

    getAllClientes() {
        throw new Error("Abstract");
    }

    getClienteById(id) {
        throw new Error("Abstract");
    }

    createCliente(cliente) {
        throw new Error("Abstract");
    }

    getAllProductos() {
        throw new Error("Abstract");
    }

    getProductosByUsuario(username) {
        throw new Error("Abstract");
    }

    getProductoById(id) {
        throw new Error("Abstract");
    }

    createProducto(producto) {
        throw new Error("Abstract");
    }

    getAllAcuerdos() {
        throw new Error("Abstract");
    }

    getAcuerdoById(id) {
        throw new Error("Abstract");
    }

    definirAcuerdo(acuerdo) {
        throw new Error("Abstract");
    }

    getAllPagos() {
        throw new Error("Abstract");
    }

    pagar(pago) {
        throw new Error("Abstract");
    }

}

module.exports = Blockchain;
