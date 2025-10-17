// Estado global da aplicação
const AppState = {
    users: [],
    filteredUsers: [],
    currentPage: 1,
    usersPerPage: 20,
    currentFilters: {}
};

// Inicialização da aplicação
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    loadSampleData(); // Para desenvolvimento
});

function initializeEventListeners() {
    // Upload de arquivo
    document.getElementById('file-input').addEventListener('change', handleFileUpload);
    
    // Paginação
    document.getElementById('prev-page').addEventListener('click', previousPage);
    document.getElementById('next-page').addEventListener('click', nextPage);
    
    // Pesquisa em tempo real
    document.getElementById('search-input').addEventListener('input', applyFilters);
    
    // Modal
    document.querySelector('.close').addEventListener('click', closeModal);
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('user-modal');
        if (event.target === modal) {
            closeModal();
        }
    });
}

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    showImportStatus('Carregando arquivo...', 'loading');
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            processWorkbook(workbook);
        } catch (error) {
            showImportStatus('Erro ao processar arquivo: ' + error.message, 'error');
        }
    };
    reader.readAsArrayBuffer(file);
}

function processWorkbook(workbook) {
    try {
        // Processar cada aba da planilha
        const adUsers = processADSheet(workbook.Sheets['User AD']);
        const officeUsers = processOfficeSheet(workbook.Sheets['User Office']);
        const soeWebUsers = processSoeWebSheet(workbook.Sheets['user SoeWeb']);
        
        // Unificar dados
        const unifiedUsers = unifyUserData(adUsers, officeUsers, soeWebUsers);
        
        AppState.users = unifiedUsers;
        AppState.filteredUsers = unifiedUsers;
        
        showImportStatus(`Dados importados com sucesso! ${unifiedUsers.length} usuários processados.`, 'success');
        initializeDashboard();
        
    } catch (error) {
        showImportStatus('Erro ao processar planilha: ' + error.message, 'error');
    }
}

function processADSheet(sheet) {
    if (!sheet) return [];
    const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    const headers = data[0];
    
    return data.slice(1).map(row => {
        const user = {};
        headers.forEach((header, index) => {
            user[header] = row[index] || '';
        });
        return user;
    }).filter(user => user.Login && user.Login.trim() !== '');
}

function processOfficeSheet(sheet) {
    if (!sheet) return [];
    const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    const headers = data[0];
    
    return data.slice(1).map(row => {
        const user = {};
        headers.forEach((header, index) => {
            user[header] = row[index] || '';
        });
        return user;
    }).filter(user => user.conta && user.conta.trim() !== '');
}

function processSoeWebSheet(sheet) {
    if (!sheet) return [];
    const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    const headers = data[0];
    
    return data.slice(1).map(row => {
        const user = {};
        headers.forEach((header, index) => {
            user[header] = row[index] || '';
        });
        return user;
    }).filter(user => user.Email && user.Email.trim() !== '');
}

function unifyUserData(adUsers, officeUsers, soeWebUsers) {
    const unified = [];
    
    // Criar mapa de usuários por e-mail e login
    const emailMap = new Map();
    const loginMap = new Map();
    
    // Processar usuários do AD
    adUsers.forEach(user => {
        const key = user.Login.toLowerCase();
        loginMap.set(key, user);
    });
    
    // Processar usuários do Office
    officeUsers.forEach(user => {
        const email = user.conta.toLowerCase();
        emailMap.set(email, user);
    });
    
    // Unificar dados
    for (const [login, adUser] of loginMap) {
        const unifiedUser = {
            login: adUser.Login,
            nome: adUser.Nome || '',
            email: adUser.Email || '',
            departamento: adUser.Departamento || '',
            status_ad: adUser['Status da Conta'] || '',
            ultimo_logon: adUser['Ultimo Logon'] || '',
            matricula: '',
            licenca_office: '',
            soeweb_bloqueado: false,
            telefone: '',
            cargo: ''
        };
        
        // Buscar dados do Office por e-mail
        if (adUser.Email) {
            const officeUser = emailMap.get(adUser.Email.toLowerCase());
            if (officeUser) {
                unifiedUser.licenca_office = officeUser.licencaMPSA || '';
                unifiedUser.matricula = officeUser.matricula || '';
                unifiedUser.telefone = officeUser.telefone || '';
                unifiedUser.cargo = officeUser.cargo || '';
            }
        }
        
        // Buscar dados do SoeWeb por e-mail
        if (adUser.Email) {
            const soeUser = soeWebUsers.find(u => 
                u.Email && u.Email.toLowerCase() === adUser.Email.toLowerCase()
            );
            if (soeUser) {
                unifiedUser.soeweb_bloqueado = soeUser.Bloqueado === 'Sim';
            }
        }
        
        unified.push(unifiedUser);
    }
    
    return unified;
}

function showImportStatus(message, type) {
    const statusDiv = document.getElementById('import-status');
    statusDiv.textContent = message;
    statusDiv.className = `status-${type}`;
}

function initializeDashboard() {
    // Mostrar seções
    document.getElementById('stats-section').style.display = 'block';
    document.getElementById('charts-section').style.display = 'block';
    document.getElementById('filter-section').style.display = 'block';
    document.getElementById('table-section').style.display = 'block';
    
    // Atualizar estatísticas
    updateStatistics();
    
    // Atualizar gráficos
    updateCharts();
    
    // Popular filtros
    populateFilters();
    
    // Mostrar tabela
    renderTable();
}

function updateStatistics() {
    const totalUsers = AppState.users.length;
    const activeUsers = AppState.users.filter(u => u.status_ad === 'Habilitada').length;
    const noEmail = AppState.users.filter(u => !u.email || u.email.trim() === '').length;
    const inconsistencies = calculateInconsistencies();
    
    document.getElementById('total-users').textContent = totalUsers;
    document.getElementById('active-users').textContent = activeUsers;
    document.getElementById('no-email').textContent = noEmail;
    document.getElementById('inconsistencies').textContent = inconsistencies;
}

function calculateInconsistencies() {
    return AppState.users.filter(user => {
        return !user.email || 
               (user.status_ad === 'Habilitada' && !user.licenca_office) ||
               user.soeweb_bloqueado;
    }).length;
}

// Funções de paginação
function previousPage() {
    if (AppState.currentPage > 1) {
        AppState.currentPage--;
        renderTable();
    }
}

function nextPage() {
    const totalPages = Math.ceil(AppState.filteredUsers.length / AppState.usersPerPage);
    if (AppState.currentPage < totalPages) {
        AppState.currentPage++;
        renderTable();
    }
}

// Função para desenvolvimento - carregar dados de exemplo
function loadSampleData() {
    // Esta função pode ser usada para carregar dados de exemplo durante o desenvolvimento
    console.log('Aplicação inicializada. Aguardando importação de dados...');
}
