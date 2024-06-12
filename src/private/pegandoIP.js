let os = null;
try {
    os = require('os');
} catch (error) {
    console.error('O módulo "os" não está disponível:', error);
    process.exit(1); // Saia do programa ou trate o erro de acordo
}

function getIPAddress() {
    const interfaces = os.networkInterfaces();
    let ipAddress = null;

    if (interfaces) {
        Object.keys(interfaces).forEach((interfaceName) => {
            const interfaceInfo = interfaces[interfaceName];
            for (let i = 0; i < interfaceInfo.length; i++) {
                const iface = interfaceInfo[i];
                if (iface.family === 'IPv4' && !iface.internal) {
                    ipAddress = iface.address;
                    break;
                }
            }
            if (ipAddress) ;
                
        });
    } else {
        console.error('Os interfaces de rede não puderam ser obtidas.');
        // Lide com isso de acordo, talvez definindo um valor padrão para o endereço IP ou lançando uma exceção
    }

    return ipAddress ? ipAddress.toString() : null;
}

let ipAddress = getIPAddress();
if (ipAddress) {
    console.log('Endereço IP:', ipAddress);
} else {
    console.error('Endereço IP não encontrado.');
    // Lide com isso de acordo
}

module.exports = { ipAddress };
