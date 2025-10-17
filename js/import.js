// Sistema de Importação Flexível
class DataImporter {
    constructor() {
        this.supportedFormats = ['.xlsx', '.xls', '.csv', '.json'];
        this.fieldMappings = {
            // Mapeamento de campos comuns
            'nome': ['nome', 'name', 'Nome', 'Name', 'NOME'],
            'login': ['login', 'user', 'usuario', 'username', 'Login', 'User', 'Usuario', 'LOGIN'],
            'email': ['email', 'e-mail', 'mail', 'Email', 'E-mail', 'EMAIL'],
            'departamento': ['departamento', 'department', 'depto', 'setor', 'Departamento', 'Department', 'DEPARTAMENTO'],
            'status': ['status', 'status da conta', 'situacao', 'Status', 'STATUS'],
            'ultimo_logon': ['ultimo logon', 'last login', 'lastlogon', 'Último Logon', 'LAST_LOGON'],
            'matricula': ['matricula', 'registration', 'id', 'Matricula', 'MATRICULA'],
            'telefone': ['telefone', 'phone', 'fone', 'Telefone', 'TELEFONE'],
            'cargo': ['cargo', 'role', 'position', 'Cargo', 'CARGO']
        };
    }

    async importFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = (e) => {
                try {
                    const data = this.processFile(file, e.target.result);
                    resolve(data);
                } catch (error) {
                    reject(error);
                }
            };
            
            reader.onerror = () => reject(new Error('Erro ao ler arquivo'));
            
            if (file.name.endsWith('.csv')) {
                reader.readAsText(file);
            } else {
                reader.readAsArrayBuffer(file);
            }
        });
    }

    processFile(file, content) {
        const extension = file.name.toLowerCase().split('.').pop();
        
        switch (extension) {
            case 'xlsx':
            case 'xls':
                return this.processExcel(content);
            case 'csv':
                return this.processCSV(content);
            case 'json':
                return this.processJSON(content);
            default:
                throw new Error('Formato não suportado');
        }
    }

    processExcel(data) {
        try {
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetsData = [];
            
            // Processar todas as abas
            workbook.SheetNames.forEach(sheetName => {
                const worksheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
                
                if (jsonData.length > 0) {
                    sheetsData.push({
                        name: sheetName,
                        data: jsonData,
                        headers: jsonData[0],
                        rows: jsonData.slice(1)
                    });
                }
            });
            
            return this.unifyExcelData(sheetsData);
        } catch (error) {
            throw new Error(`Erro ao processar Excel: ${error.message}`);
        }
    }

    processCSV(csvText) {
        try {
            const lines = csvText.split('\n').filter(line => line.trim() !== '');
            const headers = this.parseCSVLine(lines[0]);
            const rows = lines.slice(1).map(line => this.parseCSVLine(line));
            
            return this.normalizeData([headers], rows);
        } catch (error) {
            throw new Error(`Erro ao processar CSV: ${error.message}`);
        }
    }

    processJSON(jsonText) {
        try {
            const data = JSON.parse(jsonText);
            
            if (Array.isArray(data)) {
                // Array de objetos
                const headers = Object.keys(data[0] || {});
                const rows = data.map(obj => headers.map(header => obj[header]));
                return this.normalizeData([headers], rows);
            } else {
                // Objeto com estrutura específica
                return this.handleStructuredJSON(data);
            }
        } catch (error) {
            throw new Error(`Erro ao processar JSON: ${error.message}`);
        }
    }

    parseCSVLine(line) {
        const result = [];
        let current = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                result.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }
        
        result.push(current.trim());
        return result;
    }

    unifyExcelData(sheetsData) {
        let allUsers = [];
        
        sheetsData.forEach(sheet => {
            const normalizedData = this.normalizeData([sheet.headers], sheet.rows);
            allUsers = allUsers.concat(normalizedData);
        });
        
        return allUsers;
    }

    normalizeData(headersArray, rowsArray) {
        const unifiedHeaders = this.identifyHeaders(headersArray.flat());
        const normalizedUsers = [];
        
        rowsArray.forEach(row => {
            if (row && row.length > 0) {
                const user = {};
                
                unifiedHeaders.forEach((standardField, index) => {
                    if (row[index] !== undefined && row[index] !== null && row[index] !== '') {
                        user[standardField] = row[index];
                    }
                });
                
                // Apenas adiciona se tiver dados mínimos
                if (user.login || user.email || user.nome) {
                    normalizedUsers.push(this.enrichUserData(user));
                }
            }
        });
        
        return normalizedUsers;
    }

    identifyHeaders(headers) {
        const identifiedHeaders = [];
        
        headers.forEach((header, index) => {
            if (header && typeof header === 'string') {
                const standardField = this.mapToStandardField(header.trim());
                identifiedHeaders[index] = standardField || `campo_${index}`;
            } else {
                identifiedHeaders[index] = `campo_${index}`;
            }
        });
        
        return identifiedHeaders;
    }

    mapToStandardField(header) {
        const lowerHeader = header.toLowerCase();
        
        for (const [standardField, variations] of Object.entries(this.fieldMappings)) {
            if (variations.some(variation => lowerHeader.includes(variation.toLowerCase()))) {
                return standardField;
            }
        }
        
        return null;
    }

    enrichUserData(user) {
        // Garantir campos padrão
        const enrichedUser = {
            login: user.login || '',
            nome: user.nome || '',
            email: user.email || '',
            departamento: user.departamento || '',
            status_ad: user.status || user.status_ad || 'Desabilitada',
            ultimo_logon: user.ultimo_logon || '',
            matricula: user.matricula || '',
            telefone: user.telefone || '',
            cargo: user.cargo || '',
            licenca_office: user.licenca_office || '',
            soeweb_bloqueado: user.soeweb_bloqueado || false,
            // Campos adicionais preservados
            dados_originais: { ...user }
        };
        
        // Limpar campos vazios
        Object.keys(enrichedUser).forEach(key => {
            if (enrichedUser[key] === '' || enrichedUser[key] === null) {
                enrichedUser[key] = '';
            }
        });
        
        return enrichedUser;
    }

    handleStructuredJSON(data) {
        // Tentar identificar a estrutura do JSON
        if (data.users && Array.isArray(data.users)) {
            return this.normalizeData([Object.keys(data.users[0] || {})], data.users.map(user => Object.values(user)));
        } else if (data.data && Array.isArray(data.data)) {
            return this.normalizeData([Object.keys(data.data[0] || {})], data.data.map(user => Object.values(user)));
        } else {
            // Tentar extrair arrays de qualquer propriedade
            for (const key in data) {
                if (Array.isArray(data[key])) {
                    const sampleItem = data[key][0];
                    if (typeof sampleItem === 'object') {
                        return this.normalizeData([Object.keys(sampleItem || {})], data[key].map(user => Object.values(user)));
                    }
                }
            }
            throw new Error('Estrutura JSON não reconhecida');
        }
    }

    // Análise de qualidade dos dados
    analyzeDataQuality(users) {
        const analysis = {
            totalUsers: users.length,
            fields: {},
            issues: []
        };
        
        if (users.length === 0) {
            analysis.issues.push('Nenhum usuário encontrado');
            return analysis;
        }
        
        // Analisar cada campo
        Object.keys(this.fieldMappings).forEach(field => {
            const filledCount = users.filter(user => user[field] && user[field].toString().trim() !== '').length;
            const fillRate = (filledCount / users.length) * 100;
            
            analysis.fields[field] = {
                filled: filledCount,
                empty: users.length - filledCount,
                fillRate: fillRate.toFixed(1)
            };
            
            if (fillRate < 50 && field !== 'telefone' && field !== 'cargo') {
                analysis.issues.push(`Campo "${field}" preenchido em apenas ${fillRate.toFixed(1)}% dos registros`);
            }
        });
        
        // Verificar duplicatas
        const logins = users.map(u => u.login?.toLowerCase()).filter(Boolean);
        const duplicates = logins.filter((login, index) => logins.indexOf(login) !== index);
        if (duplicates.length > 0) {
            analysis.issues.push(`${duplicates.length} logins duplicados encontrados`);
        }
        
        return analysis;
    }

    // Gerar template para upload
    generateTemplate() {
        const headers = Object.keys(this.fieldMappings);
        const templateData = [headers];
        
        const worksheet = XLSX.utils.aoa_to_sheet(templateData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Template');
        
        XLSX.writeFile(workbook, 'template_importacao_usuarios.xlsx');
    }
}

// Instância global do importador
const dataImporter = new DataImporter();

// Funções de interface atualizadas
async function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // Verificar formato
    const extension = file.name.toLowerCase().split('.').pop();
    if (!dataImporter.supportedFormats.includes('.' + extension)) {
        showImportStatus(`❌ Formato não suportado: .${extension}`, 'error');
        return;
    }
    
    showImportStatus('📤 Processando arquivo...', 'loading');
    
    try {
        const users = await dataImporter.importFile(file);
        
        // Analisar qualidade dos dados
        const analysis = dataImporter.analyzeDataQuality(users);
        
        if (users.length === 0) {
            showImportStatus('❌ Nenhum usuário válido encontrado no arquivo', 'error');
            return;
        }
        
        // Mostrar análise de qualidade
        showDataAnalysis(analysis, users.length);
        
        // Atualizar estado da aplicação
        AppState.users = users;
        AppState.filteredUsers = users;
        
        // Salvar dados
        storage.saveUsersData(users);
        
        showImportStatus(`✅ ${users.length} usuários importados com sucesso!`, 'success');
        initializeDashboard();
        
    } catch (error) {
        showImportStatus(`❌ Erro na importação: ${error.message}`, 'error');
        console.error('Erro detalhado:', error);
    }
}

function showDataAnalysis(analysis, totalUsers) {
    const analysisHTML = `
        <div class="data-analysis">
            <h4><i class="fas fa-chart-bar"></i> Análise dos Dados Importados</h4>
            <div class="analysis-grid">
                <div class="analysis-item">
                    <strong>Total de Registros:</strong> ${analysis.totalUsers}
                </div>
                <div class="analysis-item">
                    <strong>Campos Identificados:</strong> ${Object.keys(analysis.fields).length}
                </div>
                ${analysis.issues.length > 0 ? `
                <div class="analysis-warnings">
                    <strong><i class="fas fa-exclamation-triangle"></i> Observações:</strong>
                    <ul>
                        ${analysis.issues.map(issue => `<li>${issue}</li>`).join('')}
                    </ul>
                </div>
                ` : ''}
            </div>
            <div class="field-analysis">
                <h5>Preenchimento por Campo:</h5>
                ${Object.entries(analysis.fields).map(([field, stats]) => `
                    <div class="field-stats">
                        <span class="field-name">${field}:</span>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${stats.fillRate}%"></div>
                        </div>
                        <span class="fill-rate">${stats.fillRate}%</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    // Inserir análise antes do status
    const statusElement = document.getElementById('import-status');
    statusElement.insertAdjacentHTML('beforebegin', analysisHTML);
}

function importFromJSON() {
    const jsonInput = document.getElementById('json-input').value;
    
    if (!jsonInput.trim()) {
        showImportStatus('Por favor, cole os dados em formato JSON.', 'error');
        return;
    }
    
    try {
        // Criar um arquivo virtual
        const blob = new Blob([jsonInput], { type: 'application/json' });
        const file = new File([blob], 'dados.json', { type: 'application/json' });
        
        // Usar o mesmo sistema de importação
        handleFileUpload({ target: { files: [file] } });
    } catch (error) {
        showImportStatus('Erro ao processar JSON: ' + error.message, 'error');
    }
}

function downloadTemplate() {
    dataImporter.generateTemplate();
    showImportStatus('📝 Template baixado com sucesso!', 'success');
}

// Atualizar event listener
document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('file-input');
    if (fileInput) {
        fileInput.addEventListener('change', handleFileUpload);
    }
    
    // Adicionar botão de template
    const uploadOptions = document.querySelector('.upload-options');
    if (uploadOptions) {
        const templateOption = `
            <div class="upload-option">
                <div class="option-icon">
                    <i class="fas fa-download"></i>
                </div>
                <h3>Template de Importação</h3>
                <p>Baixe nosso template para preparar seus dados</p>
                <button class="btn-secondary" onclick="downloadTemplate()">
                    <i class="fas fa-file-download"></i> Baixar Template
                </button>
                <small>Estruture seus dados conforme nosso formato</small>
            </div>
        `;
        uploadOptions.insertAdjacentHTML('beforeend', templateOption);
    }
});
