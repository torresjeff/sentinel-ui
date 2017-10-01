var Blockchain = require('./blockchain');
var BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
var uuid = require('uuid/v4');

class Fabric extends Blockchain {
    constructor(COMPOSER_BUSINESS_NETWORK, COMPOSER_USER_ID, COMPOSER_USER_SECRET, COMPOSER_CONNECTION_PROFILE, WALLET = null) {
        super();
        this.businessNetworkConnection = new BusinessNetworkConnection();
        
        this.COMPOSER_CONNECTION_PROFILE = COMPOSER_CONNECTION_PROFILE;
        this.COMPOSER_BUSINESS_NETWORK = COMPOSER_BUSINESS_NETWORK;
        this.COMPOSER_USER_ID = COMPOSER_USER_ID;
        this.COMPOSER_USER_SECRET = COMPOSER_USER_SECRET;
        this.WALLET = WALLET; // TODO: check if on bluemix
    }

    init() {
        return this.connect()
            .then((result) => {
                this.businessNetworkDefinition = result;
                this.serializer = this.businessNetworkDefinition.getSerializer();
                this.factory = this.businessNetworkDefinition.getFactory(); 
                console.log('businessNetworkDefinition obtained', this.businessNetworkDefinition.getIdentifier());
                return;
            })
            .catch(err => {
                console.error("error: " + err.message);
                throw err;
            });
    }

    connect() {
        if (process.env.VCAP_SERVICES) {
            console.log("Logging in through Bluemix");
            return this.businessNetworkConnection.connect(this.COMPOSER_CONNECTION_PROFILE, this.COMPOSER_BUSINESS_NETWORK, this.COMPOSER_USER_ID, this.COMPOSER_USER_SECRET, {wallet: this.WALLET});
        }
        else {
            console.log("Logging in locally");
            return this.businessNetworkConnection.connect(this.COMPOSER_CONNECTION_PROFILE, this.COMPOSER_BUSINESS_NETWORK, this.COMPOSER_USER_ID, this.COMPOSER_USER_SECRET);
        }
    }

    disconnect() {
        return this.businessNetworkConnection.disconnect();
    }

    prefixWithNamespace(type, id) {
        return 'resource:org.bancoomeva.acuerdo.' + type + "#" + id;
    }

    // Strip todo lo que va antes del hashtag (resource:org.bancomeva...)
    stripPreHash(text) {
        var n = text.indexOf("#");
        if (n != -1) {
            return text.substr(n+1);
        }
        return text;
    }

    getAllTransactions() {
        var allTransactions = [];
        return this.connect()
            .then(() => {
                console.log("connected to the business network");
                return this.businessNetworkConnection.getTransactionRegistry();
            })
            .then((transactionRegistry) => {
                return transactionRegistry.getAll();
            })
            .then((transactions) => {
                for (var i = 0; i < transactions.length; i++) {
                    allTransactions.push(this.serializer.toJSON(transactions[i]));
                }
            })
            .then(() => {
                return this.disconnect();
            })
            .then(() => {
                return allTransactions;
            })
            .catch(function (error) {
                console.error("catching error in getAllTransactions():", error);
                throw error;
            });
    }

    getAllClientes() {
        var allClientes = [];
        return this.connect()
            .then(() => {
                return this.businessNetworkConnection.getParticipantRegistry('org.bancoomeva.acuerdo.Cliente');
            })
            .then((clienteRegistry) => {
                return clienteRegistry.getAll();
            })
            .then((clientes) => {
                for (var i = 0; i < clientes.length; i++) {
                    console.log(this.serializer.toJSON(clientes[i]));
                    allClientes.push(this.serializer.toJSON(clientes[i]));
                }
                return allClientes;
            })
            .then(() => {
                return this.disconnect();
            })
            .then(() => {
                return allClientes;
            })
            .catch(function (error) {
                console.error("Error, couldn't get clients:", error);
                throw error;
            });
    }

    getClienteById(id) {
        var cliente = {};
        return this.connect()
            .then(() => {
                return this.businessNetworkConnection.getParticipantRegistry('org.bancoomeva.acuerdo.Cliente');
            })
            .then((clienteRegistry) => {
                return clienteRegistry.get(id);
            })
            .then((result) => {
                cliente = this.serializer.toJSON(result);
                return cliente;
            })
            .then(() => {
                return this.disconnect();
            })
            .then(() => {
                return cliente;
            })
            .catch(function (error) {
                console.error("Error en getClienteById", error);
                throw error;
            });
    }

    createCliente(cliente) {
        var resource = this.factory.newResource('org.bancoomeva.acuerdo', 'Cliente', cliente.email); // Create a new client using email as id
        console.log("resource factory: " + this.factory);
        resource.nombre = cliente.nombre;
        resource.apellido = cliente.apellido;
        var success = null;
        return this.connect()
            .then(() => {
                return this.businessNetworkConnection.getParticipantRegistry('org.bancoomeva.acuerdo.Cliente');
            })
            .then((clienteRegistry) => {
                return clienteRegistry.add(resource);
            })
            .then((result) => {
                success = "success";
            })
            .then(() => {
                return this.disconnect();
            })
            .then(() => {
                return success;
            })
            .catch(function (error) {
                console.error("Error agregando cliente", error);
                throw error;
            });
    }

    getAllProductos() {
        var productos = [];
        return this.connect()
            .then(() => {
                return this.businessNetworkConnection.getAssetRegistry('org.bancoomeva.acuerdo.Producto');
            })
            .then((productoRegistry) => {
                return productoRegistry.getAll();
            })
            .then((result) => {
                for (var i = 0; i < result.length; i++) {
                    productos.push(this.serializer.toJSON(result[i]));
                }
            })
            .then(() => {
                return this.disconnect();
            })
            .then(() => {
                return productos;
            })
            .catch(function (error) {
                console.error("Error, couldn't get products:", error);
                throw error;
            });
    }

    getProductosByUsuario(username) {
        var productos = [];

        return this.getAllProductos()
            .then((_productos) => {
                for (var i = 0; i < _productos.length; i++) {
                    if (this.stripPreHash(_productos[i].titular) == username) {
                        _productos[i].titular = username;
                        if (_productos[i].acuerdo) {
                            _productos[i].acuerdo = this.stripPreHash(_productos[i].acuerdo);
                        }
                        productos.push(_productos[i]);
                    }
                }
                return productos;
            })
            .catch(function (error) {
                console.error("Error catched in getProductosByUsuario", error);
                throw error;
            });
    }

    getProductoById(id) {
        var producto = {};
        return this.connect()
            .then(() => {
                return this.businessNetworkConnection.getAssetRegistry('org.bancoomeva.acuerdo.Producto');
            })
            .then((productRegistry) => {
                return productRegistry.get(id);
            })
            .then((_producto) => {
                producto = this.serializer.toJSON(_producto);
            })
            .then(() => {
                return this.disconnect();
            })
            .then(() => {
                return producto;
            })
            .catch(function (error) {
                console.error("Error, didn't find product:", error);
                throw error;
            });
    }

    /*getPagoById(id) {
        var infoPago = {};
        //this.getAcuerdosByUsuario()
        return this.connect()
            .then(() => {
                return 
            })
            .catch(function (error) {
                console.error("Error, didn't find InfoPago: ", error);
                throw error;
            });
    }*/

    createProducto(producto) {
        var resource = this.factory.newResource('org.bancoomeva.acuerdo', 'Producto', producto.numero); // Create a new Product using number as id
        resource.titular = this.factory.newRelationship('org.bancoomeva.acuerdo', 'Cliente', producto.titular);
        resource.estado = producto.estado;
        resource.tipo = producto.tipo;
        resource.saldo = producto.saldo;
        resource.interesMora = producto.interesMora;
        
        // TODO: logica de crear una cuerdo si se pasa en seguida con un producto
        /*if (producto.acuerdo) {
            resource.acuerdo = null;
        }*/
        var success = null;

        return this.connect()
            .then(() => {
                return this.businessNetworkConnection.getAssetRegistry('org.bancoomeva.acuerdo.Producto');
            })
            .then((productRegistry) => {
                return productRegistry.add(resource);
            })
            .then((result) => {
                success = "success";
            })
            .then(() => {
                return this.disconnect();
            })
            .then(() => {
                return success;
            })
            .catch(function (error) {
                console.error("Error agregando producto", error);
                throw error;
            });
    }

    getAllAcuerdos() {
        var acuerdos = [];
        return this.connect()
            .then(() => {
                return this.businessNetworkConnection.getAssetRegistry('org.bancoomeva.acuerdo.Acuerdo');
            })
            .then((agreementRegistry) => {
                return agreementRegistry.getAll();
            })
            .then((_acuerdos) => {
                for (var i = 0; i < _acuerdos.length; i++) {
                    acuerdos.push(this.serializer.toJSON(_acuerdos[i]));
                }
            })
            .then(() => {
                return this.disconnect();
            })
            .then(() => {
                return acuerdos;
            })
            .catch(function (error) {
                console.error("Error getting acuerdos", error);
                throw error;
            });
    }

    getAcuerdosByUsuario(username) {
        var acuerdos = [];
        var productos;
        return this.getProductosByUsuario(username)
            .then((_productos) => {
                productos = _productos;
                return this.getAllAcuerdos();
            })
            .then((_acuerdos) => {
                for (var i = 0; i < _acuerdos.length; i++) {
                    for (var j = 0; j < productos.length; j++) {
                        if (this.stripPreHash(_acuerdos[i].producto) == productos[j].numero) {
                            _acuerdos[i].producto = this.stripPreHash(_acuerdos[i].producto);
                            acuerdos.push(_acuerdos[i]);
                        }
                    }
                }
                return acuerdos;
            })
            .catch(function (error) {
                console.error("Catching error in getAcuerdosByUsuario(): ", error);
                throw error;
            });
    }

    getAcuerdoById(id) {
        var acuerdo = {};
        return this.connect()
            .then(() => {
                return this.businessNetworkConnection.getAssetRegistry('org.bancoomeva.acuerdo.Acuerdo');
            })
            .then((acuerdoRegistry) => {
                return acuerdoRegistry.get(id);
            })
            .then((_acuerdo) => {
                acuerdo = this.serializer.toJSON(_acuerdo);
                acuerdo.producto = this.stripPreHash(acuerdo.producto);
            })
            .then(() => {
                return this.disconnect();
            })
            .then(() => {
                return acuerdo;
            })
            .catch(function (error) {
                console.error("Error, didn't find acuerdo:", error);
                throw error;
            });
    }

    definirAcuerdo(acuerdo) {
        var transaction = this.factory.newTransaction('org.bancoomeva.acuerdo', 'DefinirAcuerdo');
        transaction.producto = this.factory.newRelationship('org.bancoomeva.acuerdo', 'Producto', acuerdo.producto);

        var acuerdoId = uuid();
        transaction.acuerdo = this.factory.newResource('org.bancoomeva.acuerdo', 'Acuerdo', acuerdoId); // Generar id para el nuevo acuerdo
        transaction.acuerdo.producto = this.factory.newRelationship('org.bancoomeva.acuerdo', 'Producto', acuerdo.producto);
        transaction.acuerdo.pagosPactados = acuerdo.pagosPactados;
        transaction.acuerdo.infoPagos = [];
        for (var i = 0; i < acuerdo.infoPagos.length; i++) {
            var infoPago = this.factory.newResource('org.bancoomeva.acuerdo', 'InfoPago', uuid()); // Generar id para la informacion del pago
            infoPago.capital = acuerdo.infoPagos[i].capital;
            infoPago.interesMora = acuerdo.infoPagos[i].interesMora;
            infoPago.fechaPactadaPago = new Date(acuerdo.infoPagos[i].fechaPago); // TODO: revisar dates (GMT -05), si coge el date del servidor cual seria?
            infoPago.estadoPago = "SIN_PAGAR";
            //infoPago.acuerdo = factory.newRelationship('org.bancoomeva.acuerdo', 'Acuerdo', acuerdoId);
            transaction.acuerdo.infoPagos.push(infoPago);
        }
        
        var success = null;

        return this.connect()
            .then(() => {
                return this.businessNetworkConnection.submitTransaction(transaction);
            })
            .then((result) => {
                success = "success";
            })
            .then(() => {
                return this.disconnect();
            })
            .then(() => {
                return success;
            })
            .catch(function (error) {
                console.error("catching error in DefinirAcuerdo submitTransaction:", error);
                throw error;
            });
    }

    getAllPagos() {
        var pagos = [];
        return this.connect()
            .then(() => {
                console.log("connected to the business network");
                return this.businessNetworkConnection.getTransactionRegistry();
            })
            .then((transactionRegistry) => {
                return transactionRegistry.getAll();
            })
            .then((transactions) => {
                for (var i = 0; i < transactions.length; i++) {
                    if (transactions[i]) {
                        var transaction = this.serializer.toJSON(transactions[i]);
                        if (transaction['$class'] == 'org.bancoomeva.acuerdo.Pagar') {
                            pagos.push(transaction);
                        }
                    }
                }
            })
            .then(() => {
                return this.disconnect();
            })
            .then(() => {
                return pagos;
            })
            .catch(function (error) {
                console.error("catching error in transactionRegistry.getAll():", error);
                throw error;
            });
    }

    pagar(pago) {
        var transaction = this.factory.newTransaction('org.bancoomeva.acuerdo', 'Pagar'); //
        transaction.fechaPago = new Date(pago.fechaPago);
        transaction.infoPago = this.factory.newRelationship('org.bancoomeva.acuerdo', 'InfoPago', pago.pagoId);
        transaction.producto = this.factory.newRelationship('org.bancoomeva.acuerdo', 'Producto', pago.producto);
        transaction.acuerdo = this.factory.newRelationship('org.bancoomeva.acuerdo', 'Acuerdo', pago.acuerdo);
        //transaction.infoPago.fechaPago = new Date(pago.fechaPago);

        var success = null;
        return this.connect()
            .then(() => {
                return this.businessNetworkConnection.submitTransaction(transaction);
            })
            .then((result) => {
                success = "success";
            })
            .then(() => {
                return this.disconnect();
            })
            .then(() => {
                return success;
            })
            .catch(function (error) {
                console.error("catching error in pagar submitTransaction:", error);
                throw error;
            });
    }
}

module.exports = Fabric;