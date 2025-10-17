function populateFilters() {
    const departmentFilter = document.getElementById('department-filter');
    const departments = [...new Set(AppState.users.map(user => user.departamento).filter(Boolean))];
    
    departments.sort().forEach(dept => {
        const option = document.createElement('option');
        option.value = dept;
        option.textContent = dept;
        departmentFilter.appendChild(option);
    });
}

function applyFilters() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const department = document.getElementById('department-filter').value;
    const status = document.getElementById('status-filter').value;
    
    AppState.currentFilters = { searchTerm, department, status };
    
    AppState.filteredUsers = AppState.users.filter(user => {
        const matchesSearch = !searchTerm || 
            user.nome.toLowerCase().includes(searchTerm) ||
            user.login.toLowerCase().includes(searchTerm) ||
            user.email.toLowerCase().includes(searchTerm) ||
            user.departamento.toLowerCase().includes(searchTerm);
        
        const matchesDept = !department || user.departamento === department;
        const matchesStatus = !status || user.status_ad === status;
        
        return matchesSearch && matchesDept && matchesStatus;
    });
    
    AppState.currentPage = 1;
    renderTable();
    updateStatistics();
}

function clearFilters() {
    document.getElementById('search-input').value = '';
    document.getElementById('department-filter').value = '';
    document.getElementById('status-filter').value = '';
    
    AppState.filteredUsers = AppState.users;
    AppState.currentPage = 1;
    renderTable();
    updateStatistics();
}

function renderTable() {
    const tableBody = document.getElementById('users-table-body');
    const pageInfo = document.getElementById('page-info');
    
    // Calcular índices para paginação
    const startIndex = (AppState.currentPage - 1) * AppState.usersPerPage;
    const endIndex = startIndex + AppState.usersPerPage;
    const paginatedUsers = AppState.filteredUsers.slice(startIndex, endIndex);
    
    // Atualizar informações da página
    const totalPages = Math.ceil(AppState.filteredUsers.length / AppState.usersPerPage);
    pageInfo.textContent = `Página ${AppState.currentPage} de ${totalPages} (${AppState.filteredUsers.length} usuários)`;
    
    // Habilitar/desabilitar botões de paginação
    document.getElementById('prev-page').disabled = AppState.currentPage === 1;
    document.getElementById('next-page').disabled = AppState.currentPage === totalPages;
    
    // Renderizar linhas da tabela
    tableBody.innerHTML = '';
    
    paginatedUsers.forEach(user => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${user.nome || 'N/A'}</td>
            <td>${user.login}</td>
            <td>${user.email || '<span style="color: red;">N/A</span>'}</td>
            <td>${user.departamento || 'N/A'}</td>
            <td class="${user.status_ad === 'Habilitada' ? 'status-active' : 'status-inactive'}">
                ${user.status_ad}
            </td>
            <td>${formatDate(user.ultimo_logon)}</td>
            <td>${user.licenca_office || 'N/A'}</td>
            <td>
                <button class="btn-small" onclick="showUserDetails('${user.login}')">👁️ Ver</button>
                <button class="btn-small" onclick="exportUserCard('${user.login}')">📄 PDF</button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

function formatDate(dateString) {
    if (!dateString) return 'Nunca';
    
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
    } catch {
        return dateString;
    }
}

function showUserDetails(login) {
    const user = AppState.users.find(u => u.login === login);
    if (!user) return;
    
    const detailsDiv = document.getElementById('user-details');
    detailsDiv.innerHTML = `
        <div class="user-detail-grid">
            <div class="detail-item">
                <strong>Nome:</strong> ${user.nome || 'N/A'}
            </div>
            <div class="detail-item">
                <strong>Login:</strong> ${user.login}
            </div>
            <div class="detail-item">
                <strong>E-mail:</strong> ${user.email || '<span style="color: red;">Não cadastrado</span>'}
            </div>
            <div class="detail-item">
                <strong>Departamento:</strong> ${user.departamento || 'N/A'}
            </div>
            <div class="detail-item">
                <strong>Status AD:</strong> <span class="${user.status_ad === 'Habilitada' ? 'status-active' : 'status-inactive'}">${user.status_ad}</span>
            </div>
            <div class="detail-item">
                <strong>Último Logon:</strong> ${formatDate(user.ultimo_logon)}
            </div>
            <div class="detail-item">
                <strong>Matrícula:</strong> ${user.matricula || 'N/A'}
            </div>
            <div class="detail-item">
                <strong>Licença Office:</strong> ${user.licenca_office || 'N/A'}
            </div>
            <div class="detail-item">
                <strong>SoeWeb Bloqueado:</strong> ${user.soeweb_bloqueado ? 'Sim' : 'Não'}
            </div>
            <div class="detail-item">
                <strong>Telefone:</strong> ${user.telefone || 'N/A'}
            </div>
            <div class="detail-item">
                <strong>Cargo:</strong> ${user.cargo || 'N/A'}
            </div>
        </div>
        
        ${getUserIssues(user)}
    `;
    
    document.getElementById('user-modal').style.display = 'block';
}

function getUserIssues(user) {
    const issues = [];
    
    if (!user.email) issues.push('❌ E-mail não cadastrado');
    if (user.status_ad === 'Habilitada' && !user.licenca_office) issues.push('❌ Sem licença Office ativa');
    if (user.soeweb_bloqueado) issues.push('❌ Conta bloqueada no SoeWeb');
    if (!user.ultimo_logon || isOldDate(user.ultimo_logon)) issues.push('⚠️ Último logon muito antigo');
    
    if (issues.length === 0) {
        return '<div style="margin-top: 20px; padding: 15px; background: #c6f6d5; border-radius: 8px;">✅ Sem problemas identificados</div>';
    }
    
    return `
        <div style="margin-top: 20px; padding: 15px; background: #fed7d7; border-radius: 8px;">
            <strong>Problemas identificados:</strong>
            <ul style="margin-top: 10px;">
                ${issues.map(issue => `<li>${issue}</li>`).join('')}
            </ul>
        </div>
    `;
}

function isOldDate(dateString) {
    if (!dateString) return true;
    
    try {
        const date = new Date(dateString);
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
        
        return date < sixMonthsAgo;
    } catch {
        return true;
    }
}

function closeModal() {
    document.getElementById('user-modal').style.display = 'none';
}

function showProblematicUsers() {
    const problematicUsers = AppState.users.filter(user => {
        return !user.email || 
               (user.status_ad === 'Habilitada' && !user.licenca_office) ||
               user.soeweb_bloqueado ||
               isOldDate(user.ultimo_logon);
    });
    
    AppState.filteredUsers = problematicUsers;
    AppState.currentPage = 1;
    renderTable();
    
    document.getElementById('search-input').value = '';
    document.getElementById('department-filter').value = '';
    document.getElementById('status-filter').value = '';
    
    showImportStatus(`Mostrando ${problematicUsers.length} usuários com problemas identificados.`, 'loading');
}
