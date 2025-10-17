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
                    <
