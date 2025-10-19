import pool from '../config/database.js';
class VantagemDAO {
  async findAll() {
    const [rows] = await pool.query('SELECT * FROM Vantagem WHERE ativo = 1');
    return rows;
  }
  async findById(id) {
    const [rows] = await pool.query('SELECT * FROM Vantagem WHERE id_vantagem = ?', [id]);
    return rows[0];
  }
  async create(vantagem) {
    const { id_empresa, id_categoria, custo_moedas, titulo, descricao, img_url } = vantagem;
    const [result] = await pool.query(
      'INSERT INTO Vantagem (id_empresa, id_categoria, custo_moedas, titulo, descricao, img_url) VALUES (?, ?, ?, ?, ?, ?)',
      [id_empresa, id_categoria, custo_moedas, titulo, descricao, img_url]
    );
    return { id: result.insertId, ...vantagem };
  }
}

export default new VantagemDAO();
