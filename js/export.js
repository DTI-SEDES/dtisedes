function updateCharts() {
    updateDepartmentChart();
    updateStatusChart();
    updateLicenseChart();
}

function updateDepartmentChart() {
    const ctx = document.getElementById('department-chart').getContext('2d');
    const departments = {};
    
    AppState.users.forEach(user => {
        const dept = user.departamento || 'Não informado';
        departments[dept] = (departments[dept] || 0) + 1;
    });
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(departments),
            datasets: [{
                label: 'Usuários por Departamento',
                data: Object.values(departments),
                backgroundColor: 'rgba(102, 126, 234, 0.8)',
                borderColor: 'rgba(102, 126, 234, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function updateStatusChart() {
    const ctx = document.getElementById('status-chart').getContext('2d');
    const statusCount = {
        'Habilitada': 0,
        'Desabilitada': 0
    };
    
    AppState.users.forEach(user => {
        const status = user.status_ad || 'Desabilitada';
        statusCount[status] = (statusCount[status] || 0) + 1;
    });
    
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: Object.keys(statusCount),
            datasets: [{
                data: Object.values(statusCount),
                backgroundColor: [
                    'rgba(56, 161, 105, 0.8)',
                    'rgba(229, 62, 62, 0.8)'
                ],
                borderColor: [
                    'rgba(56, 161, 105, 1)',
                    'rgba(229, 62, 62, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

function updateLicenseChart() {
    const ctx = document.getElementById('license-chart').getContext('2d');
    const licenses = {};
    
    AppState.users.forEach(user => {
        const license = user.licenca_office || 'Sem licença';
        licenses[license] = (licenses[license] || 0) + 1;
    });
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(licenses),
            datasets: [{
                data: Object.values(licenses),
                backgroundColor: [
                    'rgba(102, 126, 234, 0.8)',
                    'rgba(118, 75, 162, 0.8)',
                    'rgba(237, 137, 54, 0.8)',
                    'rgba(66, 153, 225, 0.8)'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

function exportToPDF() {
    // Implementação básica - em produção usar biblioteca como jsPDF
    const usersToExport = AppState.filteredUsers.length > 50 ? 
        AppState.filteredUsers.slice(0, 50) : AppState.filteredUsers;
    
    let content = `Relatório de Usuários - ${new Date().toLocaleDateString('pt-BR')}\n\n`;
    content += `Total: ${usersToExport.length} usuários\n\n`;
    
    usersToExport.forEach(user => {
        content += `Nome: ${user.nome || 'N/A'}\n`;
        content += `Login: ${user.login}\n`;
        content += `E-mail: ${user.email || 'N/A'}\n`;
        content += `Departamento: ${user.departamento || 'N/A'}\n`;
        content += `Status: ${user.status_ad}\n`;
        content += `Licença: ${user.licenca_office || 'N/A'}\n`;
        content += '─'.repeat(50) + '\n';
    });
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `usuarios_sedes_${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    
    showImportStatus(`Relatório exportado com ${usersToExport.length} usuários.`, 'success');
}

function exportToExcel() {
    try {
        const data = AppState.filteredUsers.map(user => ({
            'Nome': user.nome || '',
            'Login': user.login,
            'E-mail': user.email || '',
            'Departamento': user.departamento || '',
            'Status AD': user.status_ad,
            'Último Logon': user.ultimo_logon || '',
            'Matrícula': user.matricula || '',
            'Licença Office': user.licenca_office || '',
            'SoeWeb Bloqueado': user.soeweb_bloqueado ? 'Sim' : 'Não',
            'Telefone': user.telefone || '',
            'Cargo': user.cargo || ''
        }));
        
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Usuários');
        
        XLSX.writeFile(workbook, `usuarios_sedes_${new Date().toISOString().split('T')[0]}.xlsx`);
        showImportStatus(`Planilha exportada com ${data.length} usuários.`, 'success');
    } catch (error) {
        showImportStatus('Erro ao exportar Excel: ' + error.message, 'error');
    }
}

function exportUserCard(login) {
    const user = AppState.users.find(u => u.login === login);
    if (!user) return;
    
    const content = `
        FICHA DO USUÁRIO - SEDES
        ========================
        
        Nome: ${user.nome || 'N/A'}
        Login: ${user.login}
        E-mail: ${user.email || 'Não cadastrado'}
        Departamento: ${user.departamento || 'N/A'}
        Status AD: ${user.status_ad}
        Último Logon: ${formatDate(user.ultimo_logon)}
        Matrícula: ${user.matricula || 'N/A'}
        Licença Office: ${user.licenca_office || 'N/A'}
        SoeWeb Bloqueado: ${user.soeweb_bloqueado ? 'Sim' : 'Não'}
        Telefone: ${user.telefone || 'N/A'}
        Cargo: ${user.cargo || 'N/A'}
        
        Emitido em: ${new Date().toLocaleDateString('pt-BR')}
    `;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ficha_${user.login}.txt`;
    a.click();
    URL.revokeObjectURL(url);
}

function printUserCard() {
    window.print();
}
