var DataTypes = require("sequelize").DataTypes;
var _categorias = require("./categorias");
var _clientes = require("./clientes");
var _detalles_pedido = require("./detalles_pedido");
var _log = require("./log");
var _pedidos = require("./pedidos");
var _productos = require("./productos");

function initModels(sequelize) {
  var categorias = _categorias(sequelize, DataTypes);
  var clientes = _clientes(sequelize, DataTypes);
  var detalles_pedido = _detalles_pedido(sequelize, DataTypes);
  var log = _log(sequelize, DataTypes);
  var pedidos = _pedidos(sequelize, DataTypes);
  var productos = _productos(sequelize, DataTypes);

  pedidos.belongsTo(clientes, { as: "cliente", foreignKey: "cliente_id"});
  clientes.hasMany(pedidos, { as: "pedidos", foreignKey: "cliente_id"});
  detalles_pedido.belongsTo(pedidos, { as: "pedido", foreignKey: "pedido_id"});
  pedidos.hasMany(detalles_pedido, { as: "detalles_pedidos", foreignKey: "pedido_id"});
  detalles_pedido.belongsTo(productos, { as: "producto", foreignKey: "producto_id"});
  productos.hasMany(detalles_pedido, { as: "detalles_pedidos", foreignKey: "producto_id"});

  return {
    categorias,
    clientes,
    detalles_pedido,
    log,
    pedidos,
    productos,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
