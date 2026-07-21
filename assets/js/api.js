/**
 * REST API Client for Google Apps Script Backend
 */
const API_CONFIG = {
    // Replace with your deployed Apps Script Web App URL
    ENDPOINT: localStorage.getItem('gas_api_url') || 'https://script.google.com/macros/s/AKfycbyFKcBAaM1QVpkzcG1w26UgRTdxQfaUn8ti_pAJWMT73i3PgsRnbwJMBIOPBSPChya3/exec',
    MOCK_MODE: false
};

const API = {
    async request(action, method = 'GET', data = null) {
        if (!API_CONFIG.ENDPOINT || API_CONFIG.ENDPOINT.includes('YOUR_EXEC_ID')) {
            console.warn('API Endpoint not configured. Using local mock/fallback behavior.');
        }

        try {
            if (method === 'GET') {
                const params = new URLSearchParams({ action, ...data });
                const response = await fetch(`${API_CONFIG.ENDPOINT}?${params.toString()}`);
                return await response.json();
            } else {
                const response = await fetch(`${API_CONFIG.ENDPOINT}?action=${action}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                    body: JSON.stringify(data)
                });
                return await response.json();
            }
        } catch (error) {
            console.error(`API Error [${action}]:`, error);
            return { success: false, message: error.message || 'Gagal terhubung ke server.' };
        }
    },

    // Shortcuts
    getBooks(query = {}) { return this.request('getBooks', 'GET', query); },
    getBookDetail(id) { return this.request('getBookDetail', 'GET', { id }); },
    getCategories() { return this.request('getCategories', 'GET'); },
    addGuestBook(data) { return this.request('addGuestBook', 'POST', data); },
    getGuestBook() { return this.request('getGuestBook', 'GET'); },
    login(credentials) { return this.request('login', 'POST', credentials); },
    register(userData) { return this.request('register', 'POST', userData); },
    logReading(logData) { return this.request('logReading', 'POST', logData); },
    getDashboardStats() { return this.request('getDashboardStats', 'GET'); },
    uploadFile(fileData) { return this.request('uploadFile', 'POST', fileData); }
};
