// Função para importar dados via JSON
function importFromJSON() {
    const jsonInput = document.getElementById('json-input').value;
    
    if (!jsonInput.trim()) {
        showImportStatus('Por favor, cole os dados em formato JSON.', 'error');
        return;
    }
    
    try {
        const jsonData = JSON.parse(jsonInput);
        
        if (Array.isArray(jsonData)) {
            AppState.users = jsonData;
            AppState.filteredUsers = jsonData;
            showImportStatus(`Dados JSON importados com sucesso! ${jsonData.length} usuários carregados.`, 'success');
            initializeDashboard();
        } else {
            showImportStatus('Formato JSON inválido. Esperado um array de usuários.', 'error');
        }
    } catch (error) {
        showImportStatus('Erro ao analisar JSON: ' + error.message, 'error');
    }
}

// Função para exportar estrutura de dados de exemplo
function generateSampleJSON() {
    const sampleData = [
        {
            "login": "joao.silva",
            "nome": "João da Silva",
            "email": "joao.silva@social.rs.gov.br",
            "departamento": "DPA",
            "status_ad": "Habilitada",
            "ultimo_logon": "2025-09-15 08:30:00",
            "matricula": "1234567",
            "licenca_office": "Office 365 E3",
            "soeweb_bloqueado": false,
            "telefone": "(51) 99999-9999",
            "cargo": "Analista"
        },
        {
            "login": "maria.santos",
            "nome": "Maria Santos",
            "email": "maria.santos@social.rs.gov.br",
            "departamento": "DICON",
            "status_ad": "Habilitada",
            "ultimo_logon": "2025-09-14 14:20:00",
            "matricula": "7654321",
            "licenca_office": "Office 365 E1",
            "soeweb_bloqueado": false,
            "telefone": "(51) 88888-8888",
            "cargo": "Coordenadora"
        }
    ];
    
    document.getElementById('json-input').value = JSON.stringify(sampleData, null, 2);
    showImportStatus('Estrutura de exemplo carregada. Modifique os dados conforme necessário.', 'success');
}
