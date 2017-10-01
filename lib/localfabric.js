var Blockchain = require('./blockchain');
var uuid = require('uuid/v4');

// TODO: que retorne promises

class LocalFabric extends Blockchain {
    constructor() {
        super();
        console.log("Using in-memory fabric");
    }

    init() {
        this.clientes = [
            {
            "$class": "org.bancoomeva.acuerdo.Cliente",
            "email": "jtorresa@co.ibm.com",
            "nombre": "Jeffrey",
            "apellido": "Torres"
            },
            {
            "$class": "org.bancoomeva.acuerdo.Cliente",
            "email": "test@co.ibm.com",
            "nombre": "Test",
            "apellido": "Testing"
            }
        ];
        this.productos = [{
            "numero": "123",
            "titular": "resource:org.bancoomeva.acuerdo.Cliente#jtorresa@co.ibm.com",
            "estado": "EN_MORA",
            "tipo": "TC",
            "saldo": 120000,
            "interesMora": 20000,
            "acuerdo": "resource:org.bancoomeva.acuerdo.Acuerdo#cc981969-4a5e-4dec-bc0c-7b865c0bf0bd"
        }, {
            "numero": "234",
            "titular": "resource:org.bancoomeva.acuerdo.Cliente#jtorresa@co.ibm.com",
            "estado": "EN_MORA",
            "tipo": "HIP",
            "saldo": 240000,
            "interesMora": 40000
        }];
        this.acuerdos = [
            {
            "$class": "org.bancoomeva.acuerdo.Acuerdo",
            "acuerdoId": "cc981969-4a5e-4dec-bc0c-7b865c0bf0bd",
            "producto": "resource:org.bancoomeva.acuerdo.Producto#123",
            "pagosPactados": 2,
            "infoPagos": [
                {
                "$class": "org.bancoomeva.acuerdo.InfoPago",
                "id": "0059e38e-7554-4aba-a767-a1f10b35585f",
                "capital": 40000,
                "interesMora": 10000,
                "fechaPactadaPago": "2017-05-31T23:59:59.999Z",
                "fechaPago": "2017-05-16T16:59:59.999Z",
                "estadoPago": "PAGADO"
                },
                {
                "$class": "org.bancoomeva.acuerdo.InfoPago",
                "id": "1ebeb0bd-8b94-4eaf-951e-63fffecac166",
                "capital": 80000,
                "interesMora": 10000,
                "fechaPactadaPago": "2017-06-30T23:59:59.999Z",
                "estadoPago": "SIN_PAGAR"
                }
            ]
            }
        ];
        this.pagos = [
            {
            "$class": "org.bancoomeva.acuerdo.Pagar",
            "transactionId": "517ab122-a15f-4d85-a797-1d96d2164cae",
            "infoPago": "resource:org.bancoomeva.acuerdo.InfoPago#0059e38e-7554-4aba-a767-a1f10b35585f",
            "producto": "resource:org.bancoomeva.acuerdo.Producto#123",
            "acuerdo": "resource:org.bancoomeva.acuerdo.Acuerdo#cc981969-4a5e-4dec-bc0c-7b865c0bf0bd",
            "fechaPago": "2017-05-16T16:59:59.999Z",
            "timestamp": "2017-05-31T15:21:43.457Z"
            }
        ];
        this.transactions = [];
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

    connect() {
    }

    disconnect() {
    }

    getAllTransactions() {
        var transactions = this.transactions;
        return new Promise(function (resolve, reject) {
            resolve({result: transactions});
        });
    }

    getAllClientes() {
        console.log("local getAllClientes()");
        var clientes = this.clientes;
        return new Promise(function (resolve, reject) {
            resolve({result: clientes});
        });
    }

    getClienteById(id) {
        console.log("local getClienteById()");
        for (var i = 0; i < this.clientes.length; i++) {
            if (this.clientes[i].email == id) {
                var cliente = this.clientes[i];
                return new Promise(function (resolve, reject) {
                    resolve({result: cliente});
                });
            }
        }
        return new Promise(function (resolve, reject) {
            resolve({error: 'client not found by id ' + id});
        });
    }

    createCliente(cliente) {
        this.clientes.push(cliente);
        return new Promise(function (resolve, reject) {
            resolve({result: 'success'});
        });
    }

    getAllProductos() {
        var productos = this.productos;
        return new Promise(function (resolve, reject) {
            resolve({result: productos});
        });
        
    }
    getProductosByUsuario(username) {
        var productos = [];
        for (var i = 0; i < this.productos.length; i++) {
            if (this.stripPreHash(this.productos[i].titular) == username) {
                productos.push(this.productos[i]);
            }
        }
        return new Promise(function (resolve, reject) {
            resolve({result: productos});
        });

    }
    getProductoById(id) {
        for (var i = 0; i < this.productos.length; i++) {
            if (this.productos[i].numero == id) {
                var producto = this.productos[i];
                return new Promise(function (resolve, reject) {
                    resolve({result: producto});
                });
            }
        }
        return new Promise(function (resolve, reject) {
            resolve({error: 'product not found by id ' + id});
        });
    }

    createProducto(producto) {
        producto.titular = this.prefixWithNamespace("Cliente", producto.titular);
        this.productos.push(producto);
        return new Promise(function (resolve, reject) {
            resolve({result: 'success'});
        });
    }

    getAllAcuerdos() {
        var acuerdos = this.acuerdos;
        return new Promise(function (resolve, reject) {
            resolve({result: acuerdos});
        });
    }

    getAcuerdoById(id) {
        for (var i = 0; i < this.acuerdos.length; i++) {
            if (this.acuerdos[i].acuerdoId == id) {
                var acuerdo = this.acuerdos[i];
                return new Promise(function (resolve, reject) {
                    resolve({result: acuerdo});
                });
            }
        }
        return new Promise(function (resolve, reject) {
            resolve({error: 'acuerdo not found by id ' + id});
        });
    }

    updateProducto(producto) {
        for (var i = 0; i < this.productos.length; i++) {
            if (this.productos[i].numero == producto.numero) {
                this.productos[i] = producto;
                return true;
            }
        }
        return false;
    };

    definirAcuerdo(acuerdo) {
        acuerdo.acuerdoId = uuid();
        var producto = null;
        var acuerdos = this.acuerdos;
        return this.getProductoById(acuerdo.producto)
            .then((elProducto) => {
                producto = elProducto.result;
                return;
            })
            .then(() => {
                acuerdo.producto = this.prefixWithNamespace("Producto", acuerdo.producto);
                for (var i = 0; i < acuerdo.pagosPactados; i++) {
                    acuerdo.infoPagos[i].id = uuid();
                    acuerdo.infoPagos[i].estadoPago = "SIN_PAGAR";
                }
                this.acuerdos.push(acuerdo);
                return;
            })
            .then(() => {
                producto.acuerdo = this.prefixWithNamespace("Acuerdo", acuerdo.acuerdoId);
                return this.updateProducto(producto);
            })
            .then((result) => {
                if (result) {
                    return new Promise(function (resolve, reject) {
                        resolve({result: 'success'});
                    });
                }
                else {
                    return new Promise(function (resolve, reject) {
                        resolve({error: 'error updating producto in definirAcuerdo() '});
                    });

                }
            });

        //console.log("producto: " + producto);
    }

    getAllPagos() {
        var pagos = this.pagos;
        return new Promise(function (resolve, reject) {
            resolve({result: pagos});
        });
    }

    getPagoById(id) {

    }

    actualizarPago(pago) {

    }

    actualizarInfoPago(acuerdoId, pagoId, fechaPago) {
        for (var i = 0; i < this.acuerdos.length; i++) {
            if (this.acuerdos[i].acuerdoId == acuerdoId) {
                var acuerdo = this.acuerdos[i];
                for (var j = 0; j < acuerdo.infoPagos.length; i++) {
                    if (acuerdo.infoPagos[i].id == pagoId) {
                        acuerdo.infoPagos[i].pago.fechaPago = fechaPago;
                        acuerdo.infoPagos[i].infoPago.estadoPago = "PAGADO";
                        this.acuerdos[i] = acuerdo;
                        return true;
                    }
                }
                
            }
        }
        return false;
    }

    pagar(pago) {
        var acuerdo;
        return this.getAcuerdoById(pago.acuerdo)
            .then((elAcuerdo) => {
                if (elAcuerdo.error) {
                    return new Promise(function (resolve, reject) {
                        resolve({error: 'error buscando acuerdo con id ' + pago.acuerdo});
                    });
                }
                acuerdo = elAcuerdo;
                if (!actualizarInfoPago(pago.acuerdo, pago.pagoId, pago.fechaPago)) {
                }
            })
            .then((result) => {
                if (!result) {

                }
            });

        /*var producto = this.getProductoById(pago.producto);
        pago.producto = this.prefixWithNamespace("Producto", pago.producto);
        pago.acuerdo = this.prefixWithNamespace("Acuerdo", pago.acuerdo);
        pago.pagoId = this.prefixWithNamespace("InfoPago", pago.pagoId);
        return new Promise(function (resolve, reject) {
            resolve({result: 'success'});
        });

        var pagoRegistry;
        var productoRegistry;
        var acuerdoRegistry;
        var pagoRealizado;
        
        return getAssetRegistry("org.bancoomeva.acuerdo.InfoPago")
            .then(function (infoPagosRegistry) {
                pagoRegistry = infoPagosRegistry;
                return infoPagosRegistry.get(pago.infoPago.id);
            })
            .then(function (infoPago) {
                infoPago.fechaPago = pago.fechaPago;
                infoPago.estadoPago = "PAGADO";
                pagoRealizado = infoPago;
                return pagoRegistry.update(infoPago);
            })
            .then(function () {
                return getAssetRegistry("org.bancoomeva.acuerdo.Producto");
            })
            .then(function (productosRegistry) {
                productoRegistry = productosRegistry;
                return productosRegistry.get(pago.producto.numero);
            })
            .then(function (producto) {
                producto.saldo -= pago.infoPago.capital;
                producto.interesMora -= pago.infoPago.interesMora;
                return productoRegistry.update(producto);
            })
            .then(function () {
                return getAssetRegistry("org.bancoomeva.acuerdo.Acuerdo");
            })
            .then(function (acuerdosRegistry) {
                acuerdoRegistry = acuerdosRegistry;
                return acuerdosRegistry.get(pago.acuerdo.acuerdoId);
            })
            .then(function (acuerdo) {
                for (var i = 0; i < acuerdo.pagosPactados; i++) {
                    if (pagoRealizado.id == acuerdo.infoPagos[i].id) {
                        acuerdo.infoPagos[i] = pagoRealizado;
                        return acuerdoRegistry.update(acuerdo);
                    }
                }
            });*/
    }
}

module.exports = LocalFabric;