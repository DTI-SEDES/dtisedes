// ... (código anterior mantido) ...

function processWorkbook(workbook) {
    try {
        showImportStatus('Processando planilhas...', 'loading');
        
        // Processar cada aba da planilha
        const adUsers = processADSheet(workbook.Sheets['User AD']);
        const officeUsers = processOfficeSheet(workbook.Sheets['User Office']);
        const soeWebUsers = processSoeWebSheet(workbook.Sheets['user SoeWeb']);
        
        // Unificar dados
        const unifiedUsers = unifyUserData(adUsers, officeUsers, soeWebUsers);
        
        AppState.users = unifiedUsers;
        AppState.filteredUsers = unifiedUsers;
        
        showImportStatus(`✅ Dados importados com sucesso! ${unifiedUsers.length} usuários processados.`, 'success');
        initializeDashboard();
        
    } catch (error) {
        showImportStatus('❌ Erro ao processar planilha: ' + error.message, 'error');
        console.error('Erro detalhado:', error);
    }
}

function initializeDashboard() {
    // Mostrar seções
    document.getElementById('metrics-section').style.display = 'block';
    document.getElementById('analysis-section').style.display = 'block';
    document.getElementById('filter-section').style.display = 'block';
    document.getElementById('users-section').style.display = 'block';
    
    // Atualizar componentes
    updateStatistics();
    updateCharts();
    populateFilters();
    renderTable();
    
    // Scroll suave para a seção de métricas
    document.getElementById('metrics-section').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

// ... (restante do código mantido igual) ...
