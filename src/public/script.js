const API_BASE_URL = 'http://localhost:3000';

document.getElementById('cadastroForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const usuarioId = document.getElementById('usuarioId').value;
  const consumo = document.getElementById('consumo').value;
  const dataLeitura = document.getElementById('dataLeitura').value;

  try {
    const response = await fetch(`${API_BASE_URL}/consumo/registro`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuarioId: Number(usuarioId), consumo: Number(consumo), dataLeitura }),
    });
    const data = await response.json();
    alert('Registro cadastrado com sucesso!');
  } catch (error) {
    alert('Erro ao cadastrar registro: ' + error.message);
  }
});

document.getElementById('historicoForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const usuarioId = document.getElementById('usuarioIdHistorico').value;
  const inicio = document.getElementById('inicio').value;
  const fim = document.getElementById('fim').value;

  try {
    const response = await fetch(`${API_BASE_URL}/consumo/historico?usuarioId=${usuarioId}&inicio=${inicio}&fim=${fim}`);
    const data = await response.json();

    const historicoResultado = document.getElementById('historicoResultado');
    historicoResultado.innerHTML = '';
    data.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `Data: ${item.dataLeitura}, Consumo: ${item.consumo} m³`;
      historicoResultado.appendChild(li);
    });
  } catch (error) {
    alert('Erro ao consultar histórico: ' + error.message);
  }
});

document.getElementById('alertasForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const usuarioId = document.getElementById('usuarioIdAlerta').value;

  try {
    const response = await fetch(`${API_BASE_URL}/consumo/alerta/${usuarioId}`);
    const data = await response.json();
    const alertaResultado = document.getElementById('alertaResultado');
    alertaResultado.textContent = data.mensagem;
  } catch (error) {
    alert('Erro ao verificar alertas: ' + error.message);
  }
});
