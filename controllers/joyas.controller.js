const pool = require('../utils/db');

const getJoyas = async (req, res) => {
  const { limits = 10, page = 1, order_by = "id_ASC" } = req.query;
  const [campo, direccion] = order_by.split("_");
  const offset = (page - 1) * limits;

  try {
    // Obtener total de joyas y suma del stock
    const totalQuery = 'SELECT COUNT(*) AS total, SUM(stock) AS stock_total FROM inventario';
    const totalResult = await pool.query(totalQuery);
    const totalJoyas = parseInt(totalResult.rows[0].total);
    const stockTotal = parseInt(totalResult.rows[0].stock_total);

    // Consulta paginada de joyas
    const joyasQuery = `
      SELECT * FROM inventario
      ORDER BY ${campo} ${direccion}
      LIMIT $1 OFFSET $2
    `;
    const { rows } = await pool.query(joyasQuery, [limits, offset]);

    // Estructura HATEOAS
    const results = rows.map(joya => ({
      name: joya.nombre,
      href: `/joyas/joya/${joya.id}`
    }));

    // Respuesta
    res.status(200).json({
      totalJoyas,
      stockTotal,
      results
    });

  } catch (error) {
    console.error('[getJoyas] Error:', error.message);
    res.status(500).json({ error: 'Error al obtener las joyas' });
  }
};

const getJoyasFiltradas = async (req, res) => {
  const { precio_min, precio_max, categoria, metal } = req.query;

  let filtros = [];
  let values = [];
  let index = 1;

  if (precio_min) {
    filtros.push(`precio >= $${index++}`);
    values.push(precio_min);
  }
  if (precio_max) {
    filtros.push(`precio <= $${index++}`);
    values.push(precio_max);
  }
  if (categoria) {
    filtros.push(`categoria = $${index++}`);
    values.push(categoria);
  }
  if (metal) {
    filtros.push(`metal = $${index++}`);
    values.push(metal);
  }

  const where = filtros.length ? `WHERE ${filtros.join(' AND ')}` : '';

  try {
    const query = `SELECT * FROM inventario ${where}`;
    const { rows } = await pool.query(query, values);
    res.status(200).json({ joyas: rows });
  } catch (error) {
    console.error('[getJoyasFiltradas] Error:', error.message);
    res.status(500).json({ error: 'Error al filtrar las joyas' });
  }
};

module.exports = {
    getJoyas,
    getJoyasFiltradas
};

