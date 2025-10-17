// script.js - Dashboard Gerenciamento de Usuários SEDES

// Dados dos usuários (simulando os dados fornecidos)
const office365Data = [
    { 
        nome: "Adriana Aparecida de Oliveira", 
        email: "adriana-oliveira@social.rs.gov.br", 
        setor: "DAS", 
        matricula: "3948544", 
        tipoLicenca: "Office 365 E3",
        cpf: "",
        telefone: "",
        descricao: "Analista de Projetos e Polític",
        tipoConta: "Usuario",
        sku: "ENTERPRISEPACK",
        ctoMicrosoft: "SEDES",
        of3: "1020 - CONTAS OF365",
        cidade: "Porto Alegre"
    },
    { 
        nome: "Albano José Kunrath", 
        email: "albano-kunrath@social.rs.gov.br", 
        setor: "DIPPE", 
        matricula: "31778291015", 
        tipoLicenca: "Office 365 E1",
        cpf: "",
        telefone: "(51) 3288-6400",
        descricao: "Servidor",
        tipoConta: "Usuario",
        sku: "STANDARDPACK",
        ctoMicrosoft: "SPGG-GOV",
        of3: "1020 - CONTAS OF365",
        cidade: "Porto Alegre"
    },
    { 
        nome: "Alessandra Gois de Almeida", 
        email: "alessandra-almeida@social.rs.gov.br", 
        setor: "DAS", 
        matricula: "444832401", 
        tipoLicenca: "Office 365 E3",
        cpf: "",
        telefone: "(51) 3288-6517",
        descricao: "Servidora",
        tipoConta: "Usuario",
        sku: "ENTERPRISEPACK",
        ctoMicrosoft: "SEDES",
        of3: "1020 - CONTAS OF365",
        cidade: "Porto Alegre"
    },
    { 
        nome: "Alexandre Marmett Pahim", 
        email: "alexandre-pahim@social.rs.gov.br", 
        setor: "CONSEA", 
        matricula: "69326533034", 
        tipoLicenca: "Office 365 F3",
        cpf: "",
        telefone: "(51) 98559-7112",
        descricao: "Servidor",
        tipoConta: "Usuario",
        sku: "DESKLESSPACK",
        ctoMicrosoft: "SPGG-GOV",
        of3: "1020 - CONTAS OF365",
        cidade: "Porto Alegre"
    },
    { 
        nome: "Alex Martins Moraes", 
        email: "alex-moraes@social.rs.gov.br", 
        setor: "DSA", 
        matricula: "4821319", 
        tipoLicenca: "Office 365 E1",
        cpf: "",
        telefone: "0000",
        descricao: "Servidor",
        tipoConta: "Usuario",
        sku: "STANDARDPACK",
        ctoMicrosoft: "SPGG-GOV",
        of3: "1020 - CONTAS OF365",
        cidade: "Porto Alegre"
    },
    { 
        nome: "Aline Evelim de Lima Farias", 
        email: "aline-farias@social.rs.gov.br", 
        setor: "DGS", 
        matricula: "507829602", 
        tipoLicenca: "Office 365 E3",
        cpf: "",
        telefone: "",
        descricao: "Servidor",
        tipoConta: "Usuario",
        sku: "ENTERPRISEPACK",
        ctoMicrosoft: "SEDES",
        of3: "1020 - CONTAS OF365",
        cidade: "Porto Alegre"
    },
    { 
        nome: "Aline Aparecida Lazzari Martini", 
        email: "aline-martini@social.rs.gov.br", 
        setor: "DIPPE", 
        matricula: "99478420020", 
        tipoLicenca: "Office 365 F3",
        cpf: "",
        telefone: "",
        descricao: "Consultor",
        tipoConta: "Usuario",
        sku: "DESKLESSPACK",
        ctoMicrosoft: "SPGG-GOV",
        of3: "1020 - CONTAS OF365",
        cidade: "Porto Alegre"
    },
    { 
        nome: "Aline Conceição Soares Rodrigues", 
        email: "aline-rodrigues@social.rs.gov.br", 
        setor: "DICON", 
        matricula: "4890035/01", 
        tipoLicenca: "Office 365 E3",
        cpf: "",
        telefone: "(51) 3288-6400",
        descricao: "Servidor",
        tipoConta: "Usuario",
        sku: "ENTERPRISEPACK",
        ctoMicrosoft: "SEDES",
        of3: "1020 - CONTAS OF365",
        cidade: "Porto Alegre"
    },
    { 
        nome: "Aline Ane da Silva", 
        email: "aline-silva@social.rs.gov.br", 
        setor: "DG", 
        matricula: "5078229", 
        tipoLicenca: "Office 365 F3",
        cpf: "",
        telefone: "",
        descricao: "Servidor",
        tipoConta: "Usuario",
        sku: "DESKLESSPACK",
        ctoMicrosoft: "SPGG-GOV",
        of3: "1020 - CONTAS OF365",
        cidade: "Porto Alegre"
    },
    { 
        nome: "Ana Julia Bittencourt Cabelleira", 
        email: "ana-cabelleira@social.rs.gov.br", 
        setor: "DIPPE", 
        matricula: "442420", 
        tipoLicenca: "Office 365 F3",
        cpf: "",
        telefone: "",
        descricao: "Estagiária",
        tipoConta: "Usuario",
        sku: "DESKLESSPACK",
        ctoMicrosoft: "SPGG-GOV",
        of3: "1020 - CONTAS OF365",
        cidade: "Porto Alegre"
    }
];

const soewebData = [
    { 
        nome: "Andrea Corneli Ortis", 
        email: "andrea-ortis@social.rs.gov.br;ortis.andrea@gmail.com", 
        setor: "ASSCOM", 
        matricula: "4821254", 
        prazoOperacao: "14/03/2033",
        ultimaSessao: "10/09/2025 09:08:02",
        bloqueado: false,
        cpf: "02214137076",
        codigoInterno: "664075"
    },
    { 
        nome: "Brayan Martins Viana", 
        email: "brayan-viana@social.rs.gov.br", 
        setor: "ASSCOM", 
        matricula: "5079756", 
        prazoOperacao: "02/07/2033",
        ultimaSessao: "14/07/2025 13:58:39",
        bloqueado: false,
        cpf: "02429017008",
        codigoInterno: "978349"
    },
    { 
        nome: "Camila Leite Martins", 
        email: "camila-martins@social.rs.gov.br", 
        setor: "ASSCOM", 
        matricula: "4674111", 
        prazoOperacao: "14/03/2033",
        ultimaSessao: "08/09/2025 16:19:07",
        bloqueado: false,
        cpf: "01779538022",
        codigoInterno: "869702"
    },
    { 
        nome: "Cássio Rafael Oliveira Machado", 
        email: "cassiorafaelm@gmail.com", 
        setor: "ASSCOM", 
        matricula: "4874234", 
        prazoOperacao: "14/03/2033",
        ultimaSessao: "09/09/2025 17:13:16",
        bloqueado: false,
        cpf: "01318362008",
        codigoInterno: "807394"
    },
    { 
        nome: "Eduardo Patron Cunha", 
        email: "ecunha@social.rs.gov.br", 
        setor: "ASSCOM", 
        matricula: "72725788072", 
        prazoOperacao: "13/09/2033",
        ultimaSessao: "",
        bloqueado: false,
        cpf: "72725788072",
        codigoInterno: "1005322"
    },
    { 
        nome: "Felipe Fabbretti Minor", 
        email: "felipe-minor@social.rs.gov.br", 
        setor: "ASSCOM", 
        matricula: "4822668", 
        prazoOperacao: "14/03/2033",
        ultimaSessao: "09/09/2025 12:51:24",
        bloqueado: false,
        cpf: "82726663087",
        codigoInterno: "669976"
    },
    { 
        nome: "Frederick Silveira Vieira", 
        email: "frederick-vieira@social.rs.gov.br", 
        setor: "ASSCOM", 
        matricula: "4911849", 
        prazoOperacao: "14/03/2033",
        ultimaSessao: "08/09/2025 14:04:59",
        bloqueado: false,
        cpf: "73215775034",
        codigoInterno: "815369"
    },
    { 
        nome: "Glória Costa Amaro", 
        email: "jp-gamaro@social.rs.gov.br", 
        setor: "ASSCOM", 
        matricula: "2244007030", 
        prazoOperacao: "27/03/2033",
        ultimaSessao: "",
        bloqueado: false,
        cpf: "02244007030",
        codigoInterno: "950379"
    },
    { 
        nome: "Iury Galão Casartelli da Luz", 
        email: "iury-luz@social.rs.gov.br", 
        setor: "ASSCOM", 
        matricula: "5071577", 
        prazoOperacao: "03/07/2033",
        ultimaSessao: "09/09/2025 18:11:37",
        bloqueado: false,
        cpf: "86392913068",
        codigoInterno: "978529"
    },
    { 
        nome: "Luzia Marques Lindenbaum", 
        email: "luzia-lindenbaum@social.rs.gov.br", 
        setor: "ASSCOM", 
        matricula: "4242815", 
        prazoOperacao: "09/08/2033",
        ultimaSessao: "10/09/2025 08:45:00",
        bloqueado: false,
        cpf: "94122822068",
        codigoInterno: "991366"
    }
];

// Configurações de paginação
const itemsPerPage = 10;
let currentOffice365Page = 1;
let currentSoeWebPage = 1;
let currentComparisonPage = 1;

// Usuário atualmente selecionado para edição
let currentEditingUser = null;

// Inicialização da aplicação
document.addEventListener('DOMContentLoaded', function() {
    // Preencher dados iniciais
    populateSetorFilters();
    updateStats();
    populateTables();
    
    // Configurar eventos
    setupEventListeners();
});

// Preencher filtros de setor
function populateSetorFilters() {
    const setores = [...new Set([
        ...office365Data.map(user => user.setor),
        ...soewebData.map(user => user.setor)
    ])].filter(setor => setor);
    
    const setorSelects = document.querySelectorAll('#searchSetor, #newUserSetor, #editUserSetor');
    
    setorSelects.forEach(select => {
        setores.forEach(setor => {
            const option = document.createElement('option');
            option.value = setor;
            option.textContent = setor;
            select.appendChild(option);
        });
    });
}

// Atualizar estatísticas
function updateStats() {
    document.getElementById('totalUsers').textContent = office365Data.length + soewebData.length;
    document.getElementById('office365Users').textContent = office365Data.length;
    document.getElementById('soeWebUsers').textContent = soewebData.length;
    document.getElementById('blockedUsers').textContent = soewebData.filter(user => user.bloqueado).length;
}

// Preencher tabelas
function populateTables() {
    populateOffice365Table(office365Data);
    populateSoeWebTable(soewebData);
    populateComparisonTable();
}

// Preencher tabela Office 365
function populateOffice365Table(data) {
    const tbody = document.querySelector('#office365Table tbody');
    tbody.innerHTML = '';
    
    const startIndex = (currentOffice365Page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = data.slice(startIndex, endIndex);
    
    if (paginatedData.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `<td colspan="6" class="loading">Nenhum usuário encontrado</td>`;
        tbody.appendChild(row);
    } else {
        paginatedData.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.nome}</td>
                <td>${user.email}</td>
                <td>${user.setor}</td>
                <td>${user.matricula}</td>
                <td>${user.tipoLicenca}</td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn btn-export" data-user-id="${user.email}" title="Ficha de Usuário">
                            <i class="fas fa-file-export"></i> Ficha
                        </button>
                        <button class="action-btn btn-edit" data-user-id="${user.email}" title="Editar Usuário">
                            <i class="fas fa-edit"></i> Editar
                        </button>
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });
    }
    
    // Atualizar paginação
    updatePagination('office365Pagination', data.length, currentOffice365Page, 'office365');
}

// Preencher tabela SoeWeb
function populateSoeWebTable(data) {
    const tbody = document.querySelector('#soewebTable tbody');
    tbody.innerHTML = '';
    
    const startIndex = (currentSoeWebPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = data.slice(startIndex, endIndex);
    
    if (paginatedData.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `<td colspan="6" class="loading">Nenhum usuário encontrado</td>`;
        tbody.appendChild(row);
    } else {
        paginatedData.forEach(user => {
            const row = document.createElement('tr');
            const statusClass = user.bloqueado ? 'blocked' : '';
            
            row.innerHTML = `
                <td>${user.nome}</td>
                <td>${user.email}</td>
                <td>${user.setor}</td>
                <td>${user.matricula}</td>
                <td class="${statusClass}">${user.bloqueado ? 'Bloqueado' : 'Ativo'}</td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn btn-export" data-user-id="${user.email}" title="Ficha de Usuário">
                            <i class="fas fa-file-export"></i> Ficha
                        </button>
                        <button class="action-btn btn-edit" data-user-id="${user.email}" title="Editar Usuário">
                            <i class="fas fa-edit"></i> Editar
                        </button>
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });
    }
    
    // Atualizar paginação
    updatePagination('soewebPagination', data.length, currentSoeWebPage, 'soeweb');
}

// Preencher tabela comparativa
function populateComparisonTable() {
    const tbody = document.querySelector('#comparisonTable tbody');
    tbody.innerHTML = '';
    
    // Combinar dados para comparação
    const allUsers = [];
    
    office365Data.forEach(user => {
        const soewebUser = soewebData.find(su => 
            su.email.includes(user.email) || 
            su.nome === user.nome || 
            su.matricula === user.matricula
        );
        
        allUsers.push({
            nome: user.nome,
            email: user.email,
            setor: user.setor,
            matricula: user.matricula,
            office365: user.tipoLicenca,
            soeweb: soewebUser ? (soewebUser.bloqueado ? 'Bloqueado' : 'Ativo') : 'Não cadastrado'
        });
    });
    
    // Adicionar usuários do SoeWeb que não estão no Office 365
    soewebData.forEach(user => {
        const existingUser = allUsers.find(au => 
            au.email === user.email || 
            au.nome === user.nome || 
            au.matricula === user.matricula
        );
        
        if (!existingUser) {
            allUsers.push({
                nome: user.nome,
                email: user.email,
                setor: user.setor,
                matricula: user.matricula,
                office365: 'Não cadastrado',
                soeweb: user.bloqueado ? 'Bloqueado' : 'Ativo'
            });
        }
    });
    
    const startIndex = (currentComparisonPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = allUsers.slice(startIndex, endIndex);
    
    if (paginatedData.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `<td colspan="7" class="loading">Nenhum usuário encontrado</td>`;
        tbody.appendChild(row);
    } else {
        // Preencher tabela
        paginatedData.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.nome}</td>
                <td>${user.email}</td>
                <td>${user.setor}</td>
                <td>${user.matricula}</td>
                <td>${user.office365}</td>
                <td>${user.soeweb}</td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn btn-export" data-user-id="${user.email}" title="Ficha de Usuário">
                            <i class="fas fa-file-export"></i> Ficha
                        </button>
                        <button class="action-btn btn-edit" data-user-id="${user.email}" title="Editar Usuário">
                            <i class="fas fa-edit"></i> Editar
                        </button>
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });
    }
    
    // Atualizar paginação
    updatePagination('comparisonPagination', allUsers.length, currentComparisonPage, 'comparison');
}

// Atualizar paginação
function updatePagination(paginationId, totalItems, currentPage, tableType) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const paginationContainer = document.getElementById(paginationId);
    paginationContainer.innerHTML = '';
    
    if (totalPages <= 1) return;
    
    // Botão anterior
    const prevButton = document.createElement('button');
    prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener('click', () => {
        if (tableType === 'office365') {
            currentOffice365Page--;
            populateOffice365Table(office365Data);
        } else if (tableType === 'soeweb') {
            currentSoeWebPage--;
            populateSoeWebTable(soewebData);
        } else {
            currentComparisonPage--;
            populateComparisonTable();
        }
    });
    paginationContainer.appendChild(prevButton);
    
    // Números das páginas
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.classList.toggle('active', i === currentPage);
        pageButton.addEventListener('click', () => {
            if (tableType === 'office365') {
                currentOffice365Page = i;
                populateOffice365Table(office365Data);
            } else if (tableType === 'soeweb') {
                currentSoeWebPage = i;
                populateSoeWebTable(soewebData);
            } else {
                currentComparisonPage = i;
                populateComparisonTable();
            }
        });
        paginationContainer.appendChild(pageButton);
    }
    
    // Botão próximo
    const nextButton = document.createElement('button');
    nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener('click', () => {
        if (tableType === 'office365') {
            currentOffice365Page++;
            populateOffice365Table(office365Data);
        } else if (tableType === 'soeweb') {
            currentSoeWebPage++;
            populateSoeWebTable(soewebData);
        } else {
            currentComparisonPage++;
            populateComparisonTable();
        }
    });
    paginationContainer.appendChild(nextButton);
}

// Configurar eventos
function setupEventListeners() {
    // Tabs
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            this.classList.add('active');
            document.getElementById(`${this.dataset.tab}Tab`).classList.add('active');
        });
    });
    
    // Pesquisa
    document.getElementById('searchBtn').addEventListener('click', performSearch);
    document.getElementById('clearBtn').addEventListener('click', clearSearch);
    
    // Modal novo usuário
    document.getElementById('newUserBtn').addEventListener('click', () => {
        document.getElementById('newUserModal').style.display = 'flex';
    });
    
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.style.display = 'none';
            });
        });
    });
    
    document.getElementById('cancelUserBtn').addEventListener('click', () => {
        document.getElementById('newUserModal').style.display = 'none';
    });
    
    document.getElementById('newUserForm').addEventListener('submit', function(e) {
        e.preventDefault();
        // Aqui seria a lógica para salvar o novo usuário
        alert('Usuário cadastrado com sucesso!');
        document.getElementById('newUserModal').style.display = 'none';
        this.reset();
    });
    
    // Botões de detalhes do usuário
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-export') || e.target.closest('.btn-export')) {
            const userId = e.target.closest('.btn-export').dataset.userId;
            showUserDetails(userId);
        }
        
        if (e.target.classList.contains('btn-edit') || e.target.closest('.btn-edit')) {
            const userId = e.target.closest('.btn-edit').dataset.userId;
            editUser(userId);
        }
    });
    
    document.getElementById('closeDetailBtn').addEventListener('click', () => {
        document.getElementById('userDetailModal').style.display = 'none';
    });
    
    document.getElementById('exportUserBtn').addEventListener('click', exportUserDetails);
    
    document.getElementById('editUserBtn').addEventListener('click', function() {
        const userId = this.dataset.userId;
        editUser(userId);
    });
    
    // Modal de edição
    document.getElementById('cancelEditBtn').addEventListener('click', () => {
        document.getElementById('editUserModal').style.display = 'none';
    });
    
    document.getElementById('editUserForm').addEventListener('submit', function(e) {
        e.preventDefault();
        saveUserChanges();
    });
}

// Realizar pesquisa
function performSearch() {
    const name = document.getElementById('searchName').value.toLowerCase();
    const setor = document.getElementById('searchSetor').value;
    const cpf = document.getElementById('searchCPF').value;
    const matricula = document.getElementById('searchMatricula').value;
    
    // Filtrar dados do Office 365
    const filteredOffice365 = office365Data.filter(user => {
        return (
            (name === '' || user.nome.toLowerCase().includes(name)) &&
            (setor === '' || user.setor === setor) &&
            (cpf === '' || user.cpf.includes(cpf)) &&
            (matricula === '' || user.matricula.includes(matricula))
        );
    });
    
    // Filtrar dados do SoeWeb
    const filteredSoeWeb = soewebData.filter(user => {
        return (
            (name === '' || user.nome.toLowerCase().includes(name)) &&
            (setor === '' || user.setor === setor) &&
            (cpf === '' || user.cpf.includes(cpf)) &&
            (matricula === '' || user.matricula.includes(matricula))
        );
    });
    
    // Atualizar tabelas
    currentOffice365Page = 1;
    currentSoeWebPage = 1;
    currentComparisonPage = 1;
    
    populateOffice365Table(filteredOffice365);
    populateSoeWebTable(filteredSoeWeb);
    populateComparisonTable();
}

// Limpar pesquisa
function clearSearch() {
    document.getElementById('searchForm').reset();
    currentOffice365Page = 1;
    currentSoeWebPage = 1;
    currentComparisonPage = 1;
    populateTables();
}

// Mostrar detalhes do usuário
function showUserDetails(userId) {
    // Encontrar usuário nos dados
    let user = office365Data.find(u => u.email === userId);
    let userType = 'Office 365';
    
    if (!user) {
        user = soewebData.find(u => u.email.includes(userId));
        userType = 'SoeWeb';
    }
    
    if (user) {
        const detailsContainer = document.getElementById('userDetails');
        detailsContainer.innerHTML = '';
        
        // Adicionar detalhes com base no tipo de usuário
        if (userType === 'Office 365') {
            detailsContainer.innerHTML = `
                <div class="detail-item">
                    <div class="detail-label">Nome</div>
                    <div class="detail-value">${user.nome}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">E-mail</div>
                    <div class="detail-value">${user.email}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Setor</div>
                    <div class="detail-value">${user.setor}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Matrícula</div>
                    <div class="detail-value">${user.matricula}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Tipo de Licença</div>
                    <div class="detail-value">${user.tipoLicenca}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Descrição</div>
                    <div class="detail-value">${user.descricao}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Tipo de Conta</div>
                    <div class="detail-value">${user.tipoConta}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">SKU</div>
                    <div class="detail-value">${user.sku}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Cidade</div>
                    <div class="detail-value">${user.cidade}</div>
                </div>
            `;
        } else {
            detailsContainer.innerHTML = `
                <div class="detail-item">
                    <div class="detail-label">Nome</div>
                    <div class="detail-value">${user.nome}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">E-mail</div>
                    <div class="detail-value">${user.email}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Setor</div>
                    <div class="detail-value">${user.setor}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Matrícula</div>
                    <div class="detail-value">${user.matricula}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">CPF</div>
                    <div class="detail-value">${user.cpf}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Prazo de Operação</div>
                    <div class="detail-value">${user.prazoOperacao}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Última Sessão</div>
                    <div class="detail-value">${user.ultimaSessao}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Status</div>
                    <div class="detail-value ${user.bloqueado ? 'blocked' : ''}">${user.bloqueado ? 'Bloqueado' : 'Ativo'}</div>
                </div>
            `;
        }
        
        document.getElementById('userDetailModal').style.display = 'flex';
        document.getElementById('exportUserBtn').dataset.userId = userId;
        document.getElementById('editUserBtn').dataset.userId = userId;
    }
}

// Editar usuário
function editUser(userId) {
    // Encontrar usuário nos dados
    let user = office365Data.find(u => u.email === userId);
    let userType = 'Office 365';
    
    if (!user) {
        user = soewebData.find(u => u.email.includes(userId));
        userType = 'SoeWeb';
    }
    
    if (user) {
        currentEditingUser = { ...user, type: userType };
        
        // Preencher formulário com dados do usuário
        document.getElementById('editUserName').value = user.nome;
        document.getElementById('editUserEmail').value = user.email;
        document.getElementById('editUserSetor').value = user.setor;
        document.getElementById('editUserMatricula').value = user.matricula;
        document.getElementById('editUserCPF').value = user.cpf || '';
        
        if (userType === 'Office 365') {
            document.getElementById('editUserLicense').value = user.tipoLicenca;
            document.getElementById('editUserStatus').value = 'ativo';
        } else {
            document.getElementById('editUserLicense').value = '';
            document.getElementById('editUserStatus').value = user.bloqueado ? 'bloqueado' : 'ativo';
        }
        
        document.getElementById('editUserModal').style.display = 'flex';
    }
}

// Salvar alterações do usuário
function saveUserChanges() {
    if (!currentEditingUser) return;
    
    // Obter dados do formulário
    const nome = document.getElementById('editUserName').value;
    const email = document.getElementById('editUserEmail').value;
    const setor = document.getElementById('editUserSetor').value;
    const matricula = document.getElementById('editUserMatricula').value;
    const cpf = document.getElementById('editUserCPF').value;
    const tipoLicenca = document.getElementById('editUserLicense').value;
    const status = document.getElementById('editUserStatus').value;
    
    // Atualizar dados do usuário
    if (currentEditingUser.type === 'Office 365') {
        const userIndex = office365Data.findIndex(u => u.email === currentEditingUser.email);
        if (userIndex !== -1) {
            office365Data[userIndex] = {
                ...office365Data[userIndex],
                nome,
                email,
                setor,
                matricula,
                cpf,
                tipoLicenca
            };
        }
    } else {
        const userIndex = soewebData.findIndex(u => u.email === currentEditingUser.email);
        if (userIndex !== -1) {
            soewebData[userIndex] = {
                ...soewebData[userIndex],
                nome,
                email,
                setor,
                matricula,
                cpf,
                bloqueado: status === 'bloqueado'
            };
        }
    }
    
    // Atualizar interface
    populateTables();
    updateStats();
    
    // Fechar modal
    document.getElementById('editUserModal').style.display = 'none';
    
    alert('Alterações salvas com sucesso!');
}

// Exportar ficha do usuário
function exportUserDetails() {
    const userId = document.getElementById('exportUserBtn').dataset.userId;
    
    // Encontrar usuário nos dados
    let user = office365Data.find(u => u.email === userId);
    let userType = 'Office 365';
    
    if (!user) {
        user = soewebData.find(u => u.email.includes(userId));
        userType = 'SoeWeb';
    }
    
    if (user) {
        // Criar conteúdo para exportação
        let content = `FICHA DO USUÁRIO\n`;
        content += `================\n\n`;
        content += `Nome: ${user.nome}\n`;
        content += `E-mail: ${user.email}\n`;
        content += `Setor: ${user.setor}\n`;
        content += `Matrícula: ${user.matricula}\n`;
        
        if (userType === 'Office 365') {
            content += `Tipo de Licença: ${user.tipoLicenca}\n`;
            content += `Descrição: ${user.descricao}\n`;
            content += `Tipo de Conta: ${user.tipoConta}\n`;
            content += `SKU: ${user.sku}\n`;
            content += `Cidade: ${user.cidade}\n`;
        } else {
            content += `CPF: ${user.cpf}\n`;
            content += `Prazo de Operação: ${user.prazoOperacao}\n`;
            content += `Última Sessão: ${user.ultimaSessao}\n`;
            content += `Status: ${user.bloqueado ? 'Bloqueado' : 'Ativo'}\n`;
        }
        
        content += `\nExportado em: ${new Date().toLocaleString()}`;
        
        // Criar blob e link para download
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ficha_usuario_${user.nome.replace(/\s+/g, '_')}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        alert(`Ficha do usuário ${user.nome} exportada com sucesso!`);
    }
}
