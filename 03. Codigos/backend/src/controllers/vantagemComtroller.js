
export const getAllVantagens = async (req, res) => {
  res.status(200).json({ ok: true, data: [], message: 'Lista de vantagens (stub)' });
};

export const getVantagemById = async (req, res) => {
  const { id } = req.params;
  res.status(200).json({ ok: true, data: { id }, message: 'Detalhe de vantagem (stub)' });
};

export const create = async (req, res) => {
  const payload = req.body;
  res.status(201).json({ ok: true, data: payload, message: 'Vantagem criada (stub)' });
};

export const update = async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  res.status(200).json({ ok: true, data: { id, ...payload }, message: 'Vantagem atualizada (stub)' });
};

export const remove = async (req, res) => {
  const { id } = req.params;
  res.status(204).send();
};
