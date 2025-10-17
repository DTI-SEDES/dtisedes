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
           
