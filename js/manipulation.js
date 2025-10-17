// Sistema de Manipulação de Dados
class DataManipulator {
    constructor() {
        this.bulkSelection = new Set();
    }

    // Edição individual
    editUser(login, updates) {
        const userIndex = AppState.users.findIndex(user => user.login === login);
        if (userIndex !== -1) {
            AppState.users[userIndex] = { ...AppState.users[userIndex], ...updates };
            AppState.filteredUsers = [...AppState.users];
            storage.saveUsersData(AppState.users);
            return true;
        }
        return false;
    }

    // Ações em lote
    bulkEditUsers(logins, updates) {
        let modifiedCount = 0;
        
        logins.forEach(login => {
            if (this.editUser(login, updates)) {
                modifiedCount++;
            }
        });
        
        return modifiedCount;
    }

    // Transformações automáticas
    normalizeEmails() {
        let modifiedCount = 0;
        
        AppState.users.forEach(user => {
            if (user.email && user.email.trim() !== '') {
                const originalEmail = user.email;
                let newEmail = user.email.toLowerCase().trim();
                
                // Remover espaços e caracteres especiais
                newEmail = newEmail.replace(/\s+/g, '');
                
                // Garantir domínio @social.rs.gov.br se não tiver domínio
                if (newEmail && !newEmail.includes('@')) {
                    newEmail += '@social.rs.gov.br';
                }
                
                // Validar formato básico de e-mail
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (emailRegex.test(newEmail) && newEmail !== originalEmail) {
                    user.email = newEmail;
                    modifiedCount++;
                }
            }
        });
        
        if (modifiedCount > 0) {
            storage.saveUsersData(AppState.users);
            showImportStatus(`✅ ${modifiedCount} e-mails normalizados`, 'success');
            renderTable();
        } else {
            showImportStatus('ℹ️ Nenhum e-mail necessitava de normalização', 'loading');
        }
    }

    standardizeDepartments() {
        const departmentMap = {
            'dpa': 'DPA',
            'dicon': 'DICON', 
            'dgs': 'DGS',
            'dg': 'DG',
            'dti': 'DTI',
            'gab': 'GAB',
            'protocolo': 'PROTOCOLO',
            'dpj': 'DPJ'
        };
        
        let modifiedCount = 0;
        
        AppState.users.forEach(user => {
            if (user.departamento && user.departamento.trim() !== '') {
                const originalDept = user.departamento;
                let newDept = user.departamento.trim();
                
                // Tentar padronizar baseado no mapa
                const lowerDept = newDept.toLowerCase();
                for (const [key, value] of Object.entries(departmentMap)) {
                    if (lowerDept.includes(key)) {
                        newDept = value;
                        break;
                    }
                }
                
                // Capitalizar se não encontrou no mapa
                if (newDept === originalDept && newDept.length > 0) {
                    newDept = newDept.toUpperCase();
                }
                
                if (newDept !== originalDept) {
                    user.departamento = newDept;
                    modifiedCount++;
                }
            }
        });
        
        if (modifiedCount > 0) {
            storage.saveUsersData(AppState.users);
            showImportStatus(`✅ ${modifiedCount} departamentos padronizados`, 'success');
            renderTable();
            updateCharts();
        }
    }

    generateLogins() {
        let generatedCount = 0;
        
        AppState.users.forEach(user => {
            if ((!user.login || user.login.trim() === '') && user.nome) {
                // Gerar login a partir do nome
                let login = user.nome.toLowerCase()
                    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remover acentos
                    .replace(/\s+/g, '.') // Espaços viram pontos
                    .replace(/[^a-z0-9.]/g, ''); // Remover caracteres especiais
                
                // Garantir unicidade
                let finalLogin = login;
                let counter = 1;
                while (AppState.users.some(u => u.login === finalLogin && u !== user)) {
                    finalLogin = `${login}${counter}`;
                    counter++;
                }
                
                user.login = finalLogin;
                generatedCount++;
            }
        });
        
        if (generatedCount > 0) {
            storage.saveUsersData(AppState.users);
            showImportStatus(`✅ ${generatedCount} logins gerados automaticamente`, 'success');
            renderTable();
        }
    }

    fillMissingData() {
        let filledCount = 0;
        
        AppState.users.forEach(user => {
            // Preencher e-mail baseado no login
            if ((!user.email || user.email.trim() === '') && user.login) {
                user.email = `${user.login}@social.rs.gov.br`;
                filledCount++;
            }
            
            // Definir status padrão se estiver vazio
            if (!user.status_ad || user.status_ad.trim() === '') {
                user.status_ad = 'Habilitada';
                filledCount++;
            }
        });
        
        if (filledCount > 0) {
            storage.saveUsersData(AppState.users);
            showImportStatus(`✅ ${filledCount} campos preenchidos automaticamente`, 'success');
            renderTable();
            updateStatistics();
        }
    }

    // Limpeza de dados
    removeDuplicates() {
        const seenLogins = new Set();
        const duplicates = [];
        
        const uniqueUsers = AppState.users.filter(user => {
            if (!user.login) return true; // Manter usuários sem login
            
            const loginKey = user.login.toLowerCase();
            if (seenLogins.has(loginKey)) {
                duplicates.push(user);
                return false;
            } else {
                seenLogins.add(loginKey);
                return true;
            }
        });
        
        if (duplicates.length > 0) {
            AppState.users = uniqueUsers;
            AppState.filteredUsers = uniqueUsers;
            storage.saveUsersData(uniqueUsers);
            
            showImportStatus(`✅ ${duplicates.length} duplicatas removidas`, 'success');
            renderTable();
            updateStatistics();
        } else {
            showImportStatus('ℹ️ Nenhuma duplicata encontrada', 'loading');
        }
    }

    removeInactive() {
        const activeUsers = AppState.users.filter(user => 
            user.status_ad !== 'Desabilitada' && 
            (!user.ultimo_logon || !isOldDate(user.ultimo_logon))
        );
        
        const removedCount = AppState.users.length - activeUsers.length;
        
        if (removedCount > 0) {
            AppState.users = activeUsers;
            AppState.filteredUsers = activeUsers;
            storage.saveUsersData(activeUsers);
            
            showImportStatus(`✅ ${removedCount} usuários inativos removidos`, 'success');
            renderTable();
            updateStatistics();
        } else {
            showImportStatus('ℹ️ Nenhum usuário inativo encontrado', 'loading');
        }
    }

    cleanEmails() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const cleanedUsers = AppState.users.filter(user => 
            !user.email || user.email.trim() === '' || emailRegex.test(user.email)
        );
        
        const removedCount = AppState.users.length - cleanedUsers.length;
        
        if (removedCount > 0) {
            AppState.users = cleanedUsers;
            AppState.filteredUsers = cleanedUsers;
            storage.saveUsersData(cleanedUsers);
            
            showImportStatus(`✅ ${removedCount} usuários com e-mails inválidos removidos`, 'success');
            renderTable();
            updateStatistics();
        } else {
            showImportStatus('ℹ️ Nenhum e-mail inválido encontrado', 'loading');
        }
    }
}

// Instância global do manipulador
const dataManipulator = new DataManipulator();

// Funções de interface para manipulação
function openTab(tabName) {
    // Esconder todas as abas
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remover active de todos os botões
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });
    
    // Mostrar aba selecionada
    document.getElementById(tabName).classList.add('active');
    event.currentTarget.classList.add('active');
}

function normalizeEmails() {
    dataManipulator.normalizeEmails();
}

function standardizeDepartments() {
    dataManipulator.standardizeDepartments();
}

function generateLogins() {
    dataManipulator.generateLogins();
}

function fillMissingData() {
    dataManipulator.fillMissingData();
}

function removeDuplicates() {
    if (confirm('Tem certeza que deseja remover usuários duplicados?')) {
        dataManipulator.removeDuplicates();
    }
}

function removeInactive() {
    if (confirm('Tem certeza que deseja remover usuários inativos?')) {
        dataManipulator.removeInactive();
    }
}

function cleanEmails() {
    if (confirm('Tem certeza que deseja remover usuários com e-mails inválidos?')) {
        dataManipulator.cleanEmails();
    }
}

// Inicializar manipulação
document.addEventListener('DOMContentLoaded', function() {
    // Mostrar seção de manipulação se houver dados
    if (AppState.users.length > 0) {
        document.getElementById('manipulation-section').style.display = 'block';
    }
});
