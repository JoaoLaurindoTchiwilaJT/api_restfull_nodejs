const { io } = require('../../servidor');

// Quando um cliente se conecta
io.on('connection', (socket) => {
  try {
    console.log('Um cliente se conectou:', socket.id);

    // Quando um cliente solicita iniciar uma chamada
    socket.on('initiatePeer', (targetPeerId) => {
      try {
        console.log(`Cliente ${socket.id} solicitou iniciar uma chamada com ${targetPeerId}`);
        // Verificar se o cliente alvo está conectado
        const targetSocket = io.sockets.sockets.get(targetPeerId);
        if (!targetSocket) {
          throw new Error('Cliente alvo não encontrado ou desconectado');
        }
        // Emitir evento para o cliente alvo para iniciar a chamada
        targetSocket.emit('initiatePeer', socket.id);
      } catch (error) {
        console.error('Erro ao iniciar chamada:', error.message);
      }
    });

    // Quando um cliente se desconecta
    socket.on('disconnect', () => {
      console.log('Cliente desconectado:', socket.id);
    });
  } catch (error) {
    console.error('Erro durante conexão do cliente:', error.message);
  }
});
