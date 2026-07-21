/**
 * Auth Session Management
 */
const Auth = {
    getUser() {
        const user = localStorage.getItem('user_session');
        return user ? JSON.parse(user) : null;
    },
    
    setUser(user) {
        localStorage.setItem('user_session', JSON.stringify(user));
    },

    logout() {
        localStorage.removeItem('user_session');
        window.location.href = 'login.html';
    },

    requireAuth(requiredRole = null) {
        const user = this.getUser();
        if (!user) {
            window.location.href = 'login.html';
            return null;
        }
        if (requiredRole && user.role !== requiredRole && user.role !== 'Admin') {
            alert('Akses ditolak. Anda tidak memiliki izin.');
            window.location.href = 'dashboard.html';
            return null;
        }
        return user;
    }
};
