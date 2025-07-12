class Utils {
    static escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    static copyToClipboard(text) {
        if (navigator.clipboard) {
            return navigator.clipboard.writeText(text);
        } else {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            return Promise.resolve();
        }
    }

    static downloadText(filename, content) {
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    static formatDate(date) {
        return date.toISOString().split('T')[0];
    }

    static validateUrl(url) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }

    static sanitizeInput(input) {
        if (typeof input !== 'string') {
            return '';
        }
        
        // 移除首尾空白
        let sanitized = input.trim();
        
        // 移除所有HTML标签和危险字符
        sanitized = sanitized.replace(/<[^>]*>/g, '');
        sanitized = sanitized.replace(/[<>]/g, '');
        
        // 移除JavaScript事件处理器
        sanitized = sanitized.replace(/on\w+\s*=/gi, '');
        sanitized = sanitized.replace(/javascript:/gi, '');
        sanitized = sanitized.replace(/vbscript:/gi, '');
        sanitized = sanitized.replace(/data:/gi, '');
        
        // 移除其他危险协议
        sanitized = sanitized.replace(/file:/gi, '');
        sanitized = sanitized.replace(/ftp:/gi, '');
        
        // 移除SQL注入相关字符
        sanitized = sanitized.replace(/['";]/g, '');
        
        // 移除控制字符
        sanitized = sanitized.replace(/[\x00-\x1F\x7F]/g, '');
        
        return sanitized;
    }

    static validateInput(input, type = 'text') {
        if (typeof input !== 'string') {
            return { valid: false, message: '输入必须是字符串' };
        }
        
        const sanitized = this.sanitizeInput(input);
        
        // 检查是否为空
        if (!sanitized) {
            return { valid: false, message: '输入不能为空' };
        }
        
        // 检查长度
        if (sanitized.length > 1000) {
            return { valid: false, message: '输入长度不能超过1000个字符' };
        }
        
        // 根据类型进行特定验证
        switch (type) {
            case 'domain':
                // 域名验证
                const domainRegex = /^[a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?)*$/;
                if (!domainRegex.test(sanitized)) {
                    return { valid: false, message: '请输入有效的域名格式' };
                }
                break;
                
            case 'ip':
                // IP地址验证
                const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
                if (!ipRegex.test(sanitized)) {
                    return { valid: false, message: '请输入有效的IP地址格式' };
                }
                break;
                
            case 'port':
                // 端口号验证
                const port = parseInt(sanitized);
                if (isNaN(port) || port < 1 || port > 65535) {
                    return { valid: false, message: '端口号必须在1-65535之间' };
                }
                break;
                
            case 'email':
                // 邮箱验证
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(sanitized)) {
                    return { valid: false, message: '请输入有效的邮箱格式' };
                }
                break;
                
            case 'url':
                // URL验证
                try {
                    new URL(sanitized);
                } catch {
                    return { valid: false, message: '请输入有效的URL格式' };
                }
                break;
        }
        
        return { valid: true, value: sanitized };
    }

    static escapeHtml(text) {
        if (typeof text !== 'string') {
            return '';
        }
        
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    static generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    static showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    static formatSearchResult(result) {
        return {
            engine: result.engine,
            template: result.template,
            query: result.query,
            url: result.url,
            description: result.description,
            timestamp: new Date().toISOString()
        };
    }

    static parseSearchParams(params) {
        const result = {};
        for (const [key, value] of Object.entries(params)) {
            if (value && value.trim()) {
                result[key] = value.trim();
            }
        }
        return result;
    }
}

window.Utils = Utils; 