class HGrammarApp {
    constructor() {
        this.generator = new GrammarGenerator();
        this.templateManager = new TemplateManager();
        this.quickTemplateManager = new QuickTemplateManager();
        this.currentResult = null;
        this.history = [];
        this.init();
    }

    // 自定义弹窗功能
    showModal(title, message, type = 'info', showCancel = false) {
        return new Promise((resolve) => {
            const modal = document.getElementById('customModal');
            const modalTitle = document.getElementById('modalTitle');
            const modalMessage = document.getElementById('modalMessage');
            const modalConfirm = document.getElementById('modalConfirm');
            const modalCancel = document.getElementById('modalCancel');
            const modalClose = document.getElementById('modalClose');
            
            // 设置标题和消息
            modalTitle.textContent = title;
            modalMessage.textContent = message;
            
            // 根据类型设置样式和图标
            const modalHeader = modal.querySelector('.modal-header');
            modalHeader.className = 'modal-header';
            
            // 添加图标到标题
            let icon = '';
            switch (type) {
                case 'success':
                    modalHeader.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
                    icon = '<i class="fas fa-check-circle"></i> ';
                    break;
                case 'error':
                    modalHeader.style.background = 'linear-gradient(135deg, #dc3545 0%, #e74c3c 100%)';
                    icon = '<i class="fas fa-exclamation-circle"></i> ';
                    break;
                case 'warning':
                    modalHeader.style.background = 'linear-gradient(135deg, #ffc107 0%, #fd7e14 100%)';
                    icon = '<i class="fas fa-exclamation-triangle"></i> ';
                    break;
                default:
                    modalHeader.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                    icon = '<i class="fas fa-info-circle"></i> ';
            }
            
            modalTitle.innerHTML = icon + title;
            
            // 显示/隐藏取消按钮
            modalCancel.style.display = showCancel ? 'block' : 'none';
            
            // 显示弹窗
            modal.style.display = 'block';
            
            // 自动关闭定时器（仅用于非确认对话框）
            let autoCloseTimer = null;
            if (!showCancel) {
                autoCloseTimer = setTimeout(() => {
                    handleClose();
                }, 5000);
            }
            
            // 绑定事件
            const handleConfirm = () => {
                if (autoCloseTimer) clearTimeout(autoCloseTimer);
                modal.style.display = 'none';
                cleanup();
                resolve(true);
            };
            
            const handleCancel = () => {
                if (autoCloseTimer) clearTimeout(autoCloseTimer);
                modal.style.display = 'none';
                cleanup();
                resolve(false);
            };
            
            const handleClose = () => {
                if (autoCloseTimer) clearTimeout(autoCloseTimer);
                modal.style.display = 'none';
                cleanup();
                resolve(false);
            };
            
            const cleanup = () => {
                modalConfirm.removeEventListener('click', handleConfirm);
                modalCancel.removeEventListener('click', handleCancel);
                modalClose.removeEventListener('click', handleClose);
                modal.removeEventListener('click', handleModalClick);
            };
            
            const handleModalClick = (e) => {
                if (e.target === modal) {
                    handleClose();
                }
            };
            
            modalConfirm.addEventListener('click', handleConfirm);
            modalCancel.addEventListener('click', handleCancel);
            modalClose.addEventListener('click', handleClose);
            modal.addEventListener('click', handleModalClick);
            
            // 聚焦到确认按钮
            modalConfirm.focus();
        });
    }

    // 显示确认对话框
    showConfirm(title, message) {
        return this.showModal(title, message, 'warning', true);
    }

    // 显示信息对话框
    showInfo(title, message) {
        return this.showModal(title, message, 'info');
    }

    // 显示成功对话框
    showSuccess(title, message) {
        return this.showModal(title, message, 'success');
    }

    // 显示错误对话框
    showError(title, message) {
        return this.showModal(title, message, 'error');
    }

    init() {
        this.registerModules();
        this.registerTemplates();
        this.loadHistoryFromStorage();
        this.bindEvents();
        this.updateTemplateOptions();
        this.updateParamsContainer();
        this.updateQuickTemplates();
        this.updateHistoryDisplay();
    }

    registerModules() {
        this.generator.registerModule('google', new GoogleModule());
        this.generator.registerModule('baidu', new BaiduModule());
        this.generator.registerModule('so360', new So360Module());
        this.generator.registerModule('fofa', new FofaModule());
        this.generator.registerModule('hunter', new HunterModule());
        this.generator.registerModule('shodan', new ShodanModule());
    }

    registerTemplates() {
        const templates = this.templateManager.getAllTemplates();
        for (const [name, template] of Object.entries(templates)) {
            this.generator.registerTemplate(name, template);
        }
    }

    bindEvents() {
        document.getElementById('engine').addEventListener('change', () => {
            this.updateTemplateOptions();
            this.updateParamsContainer();
            this.updateQuickTemplates();
        });
        document.getElementById('template').addEventListener('change', () => this.updateParamsContainer());
        document.getElementById('generateBtn').addEventListener('click', () => this.generateGrammar());
        document.getElementById('clearBtn').addEventListener('click', () => this.clearForm());
        document.getElementById('copyBtn').addEventListener('click', () => this.copyResult());
        document.getElementById('exportBtn').addEventListener('click', () => this.exportResult());
        document.getElementById('openBtn').addEventListener('click', () => this.openResult());
        
        // 历史记录相关事件
        document.getElementById('exportHistoryBtn').addEventListener('click', () => this.exportHistory());
        document.getElementById('clearHistoryBtn').addEventListener('click', () => this.clearAllHistory());
        
        // 历史记录搜索功能
        document.getElementById('historySearchInput').addEventListener('input', (e) => {
            this.searchHistory(e.target.value);
        });
        document.getElementById('clearSearchBtn').addEventListener('click', () => {
            document.getElementById('historySearchInput').value = '';
            this.searchHistory('');
        });
        
        // 添加键盘事件支持
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const modal = document.getElementById('customModal');
                if (modal.style.display === 'block') {
                    modal.style.display = 'none';
                }
            }
        });
        // 失焦自动保存
        const queryEdit = document.getElementById('queryEdit');
        if (queryEdit) {
            queryEdit.addEventListener('blur', () => {
                this.saveEditedQuery();
            });
        }
    }

    updateTemplateOptions() {
        const engine = document.getElementById('engine').value;
        const templateSelect = document.getElementById('template');
        templateSelect.innerHTML = '';
        
        let templates = [];
        
        switch (engine) {
            case 'google':
            case 'baidu':
            case 'so360':
                templates = [
                    { value: 'site', text: '网站搜索 (site:)' },
                    { value: 'filetype', text: '文件类型搜索 (filetype:)' },
                    { value: 'intitle', text: '标题搜索 (intitle:)' },
                    { value: 'inurl', text: 'URL搜索 (inurl:)' },
                    { value: 'intext', text: '内容搜索 (intext:)' },
                    { value: 'exclude', text: '排除搜索 (-)' },
                    { value: 'date', text: '时间范围搜索' },
                    { value: 'combined', text: '组合搜索 (复选框)' }
                ];
                break;
            case 'fofa':
                templates = [
                    { value: 'domain', text: '域名搜索 (domain="")' },
                    { value: 'ip', text: 'IP搜索 (ip="")' },
                    { value: 'port', text: '端口搜索 (port="")' },
                    { value: 'title', text: '网站标题搜索 (title="")' },
                    { value: 'body', text: 'HTML正文搜索 (body="")' },
                    { value: 'header', text: '响应标头搜索 (header="")' },
                    { value: 'cert', text: '证书搜索 (cert="")' },
                    { value: 'combined', text: '组合搜索 (复选框)' }
                ];
                break;
            case 'hunter':
                templates = [
                    { value: 'domain', text: '域名搜索 (domain="")' },
                    { value: 'ip', text: 'IP搜索 (ip="")' },
                    { value: 'port', text: '端口搜索 (ip.port="")' },
                    { value: 'title', text: '网站标题搜索 (web.title="")' },
                    { value: 'body', text: '网站正文搜索 (web.body="")' },
                    { value: 'header', text: 'HTTP请求头搜索 (header="")' },
                    { value: 'cert', text: '证书搜索 (cert="")' },
                    { value: 'combined', text: '组合搜索 (复选框)' }
                ];
                break;
            case 'shodan':
                templates = [
                    { value: 'hostname', text: '主机名搜索 (hostname:)' },
                    { value: 'ip', text: 'IP搜索 (ip:)' },
                    { value: 'port', text: '端口搜索 (port:)' },
                    { value: 'product', text: '产品搜索 (product:)' },
                    { value: 'os', text: '操作系统搜索 (os:)' },
                    { value: 'country', text: '国家搜索 (country:)' },
                    { value: 'city', text: '城市搜索 (city:)' },
                    { value: 'org', text: '组织搜索 (org:)' },
                    { value: 'ssl', text: 'SSL证书搜索 (ssl:)' },
                    { value: 'combined', text: '组合搜索 (复选框)' }
                ];
                break;
        }
        
        templates.forEach(template => {
            const option = document.createElement('option');
            option.value = template.value;
            option.textContent = template.text;
            templateSelect.appendChild(option);
        });
    }

    updateParamsContainer() {
        const template = document.getElementById('template').value;
        const engine = document.getElementById('engine').value;
        const container = document.getElementById('paramsContainer');
        const advancedOptions = document.getElementById('advancedOptions');
        
        container.innerHTML = '';
        
        if (template === 'combined') {
            this.showAdvancedOptions(engine);
            advancedOptions.style.display = 'block';
        } else {
            advancedOptions.style.display = 'none';
            
            const templateData = this.templateManager.getTemplate(template);
            if (!templateData) return;

            for (const param of templateData.params) {
                const paramGroup = document.createElement('div');
                paramGroup.className = 'param-group';
                
                const label = document.createElement('label');
                label.textContent = this.getParamLabel(param);
                
                const input = this.createParamInput(param);
                
                paramGroup.appendChild(label);
                paramGroup.appendChild(input);
                container.appendChild(paramGroup);
            }
        }
    }

    showAdvancedOptions(engine) {
        const advancedGrid = document.getElementById('advancedGrid');
        advancedGrid.innerHTML = '';
        
        let options = [];
        
        switch (engine) {
            case 'google':
            case 'baidu':
            case 'so360':
                options = [
                    { id: 'site', label: '网站搜索', description: 'site:domain.com', input: 'text', placeholder: '输入域名' },
                    { id: 'filetype', label: '文件类型搜索', description: 'filetype:pdf', input: 'select', options: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'csv', 'xml', 'json'] },
                    { id: 'intitle', label: '标题搜索', description: 'intitle:keyword', input: 'text', placeholder: '输入标题关键词' },
                    { id: 'inurl', label: 'URL搜索', description: 'inurl:keyword', input: 'text', placeholder: '输入URL关键词' },
                    { id: 'intext', label: '内容搜索', description: 'intext:keyword', input: 'text', placeholder: '输入内容关键词' },
                    { id: 'allintitle', label: '全标题搜索', description: 'allintitle:keyword1 keyword2', input: 'text', placeholder: '输入多个标题关键词' },
                    { id: 'allinurl', label: '全URL搜索', description: 'allinurl:keyword1 keyword2', input: 'text', placeholder: '输入多个URL关键词' },
                    { id: 'allintext', label: '全内容搜索', description: 'allintext:keyword1 keyword2', input: 'text', placeholder: '输入多个内容关键词' },
                    { id: 'exclude', label: '排除搜索', description: '-keyword', input: 'text', placeholder: '输入要排除的关键词' },
                    { id: 'related', label: '相关网站', description: 'related:domain.com', input: 'text', placeholder: '输入域名' },
                    { id: 'cache', label: '缓存搜索', description: 'cache:domain.com', input: 'text', placeholder: '输入域名' },
                    { id: 'info', label: '网站信息', description: 'info:domain.com', input: 'text', placeholder: '输入域名' },
                    { id: 'link', label: '链接搜索', description: 'link:domain.com', input: 'text', placeholder: '输入域名' },
                    { id: 'define', label: '定义搜索', description: 'define:keyword', input: 'text', placeholder: '输入要定义的关键词' },
                    { id: 'weather', label: '天气搜索', description: 'weather:city', input: 'text', placeholder: '输入城市名' },
                    { id: 'stock', label: '股票搜索', description: 'stock:symbol', input: 'text', placeholder: '输入股票代码' },
                    { id: 'movie', label: '电影搜索', description: 'movie:title', input: 'text', placeholder: '输入电影名' },
                    { id: 'book', label: '图书搜索', description: 'book:title', input: 'text', placeholder: '输入书名' }
                ];
                break;
            case 'fofa':
                options = [
                    { id: 'domain', label: '域名搜索', description: 'domain="domain.com"', input: 'text', placeholder: '输入域名' },
                    { id: 'ip', label: 'IP搜索', description: 'ip="192.168.1.1"', input: 'text', placeholder: '输入IP地址或网段' },
                    { id: 'port', label: '端口搜索', description: 'port="80"', input: 'select', options: ['21', '22', '23', '25', '53', '80', '110', '143', '443', '993', '995', '1433', '3306', '3389', '5432', '6379', '8080', '8443', '9200', '27017'] },
                    { id: 'title', label: '网站标题搜索', description: 'title="keyword"', input: 'text', placeholder: '输入标题关键词' },
                    { id: 'body', label: 'HTML正文搜索', description: 'body="keyword"', input: 'text', placeholder: '输入内容关键词' },
                    { id: 'header', label: '响应标头搜索', description: 'header="keyword"', input: 'text', placeholder: '输入HTTP头关键词' },
                    { id: 'cert', label: '证书搜索', description: 'cert="keyword"', input: 'text', placeholder: '输入证书关键词' },
                    { id: 'country', label: '国家搜索', description: 'country="CN"', input: 'text', placeholder: '输入国家代码' },
                    { id: 'region', label: '省份/地区搜索', description: 'region="Zhejiang"', input: 'text', placeholder: '输入省份名' },
                    { id: 'city', label: '城市搜索', description: 'city="Hangzhou"', input: 'text', placeholder: '输入城市名' },
                    { id: 'protocol', label: '协议搜索', description: 'protocol="http"', input: 'select', options: ['http', 'https', 'ftp', 'ssh', 'telnet', 'smtp', 'pop3', 'imap'] },
                    { id: 'banner', label: '协议返回信息搜索', description: 'banner="keyword"', input: 'text', placeholder: '输入协议返回信息关键词' },
                    { id: 'icon_hash', label: '网站图标哈希搜索', description: 'icon_hash="hash"', input: 'text', placeholder: '输入图标哈希值' },
                    { id: 'host', label: '主机名搜索', description: 'host="keyword"', input: 'text', placeholder: '输入主机关键词' },
                    { id: 'base_protocol', label: '基础协议搜索', description: 'base_protocol="http"', input: 'select', options: ['http', 'https', 'ftp', 'ssh', 'telnet'] },
                    { id: 'server', label: '服务器搜索', description: 'server="keyword"', input: 'text', placeholder: '输入服务器关键词' },
                    { id: 'app', label: '应用搜索', description: 'app="keyword"', input: 'text', placeholder: '输入应用关键词' },
                    { id: 'os', label: '操作系统搜索', description: 'os="keyword"', input: 'text', placeholder: '输入操作系统关键词' },
                    { id: 'product', label: '产品搜索', description: 'product="nginx"', input: 'text', placeholder: '输入产品名' },
                    { id: 'category', label: '分类搜索', description: 'category="服务"', input: 'text', placeholder: '输入分类' },
                    { id: 'type', label: '资产类型搜索', description: 'type="service"', input: 'select', options: ['service', 'subdomain'] },
                    { id: 'cloud_name', label: '云服务商搜索', description: 'cloud_name="Aliyundun"', input: 'text', placeholder: '输入云服务商' },
                    { id: 'is_cloud', label: '云服务资产筛选', description: 'is_cloud=true', input: 'select', options: ['true', 'false'] },
                    { id: 'is_fraud', label: '仿冒垃圾站群筛选', description: 'is_fraud=true', input: 'select', options: ['true', 'false'] },
                    { id: 'is_honeypot', label: '蜜罐资产筛选', description: 'is_honeypot=true', input: 'select', options: ['true', 'false'] },
                    { id: 'org', label: '组织搜索', description: 'org="LLC Baxet"', input: 'text', placeholder: '输入组织名' },
                    { id: 'cert.subject.org', label: '证书持有者组织搜索', description: 'cert.subject.org="Oracle Corporation"', input: 'text', placeholder: '输入证书持有者组织' },
                    { id: 'cert.issuer.org', label: '证书颁发者组织搜索', description: 'cert.issuer.org="cPanel, Inc."', input: 'text', placeholder: '输入证书颁发者组织' }
                ];
                break;
            case 'hunter':
                options = [
                    { id: 'domain', label: '域名搜索', description: 'domain="domain.com"', input: 'text', placeholder: '输入域名' },
                    { id: 'domain.suffix', label: '主域搜索', description: 'domain.suffix="qq.com"', input: 'text', placeholder: '输入主域名' },
                    { id: 'ip', label: 'IP搜索', description: 'ip="192.168.1.1"', input: 'text', placeholder: '输入IP地址或网段' },
                    { id: 'ip.port', label: '开放端口搜索', description: 'ip.port="80"', input: 'select', options: ['21', '22', '23', '25', '53', '80', '110', '143', '443', '993', '995', '1433', '3306', '3389', '5432', '6379', '8080', '8443', '9200', '27017'] },
                    { id: 'ip.country', label: 'IP对应主机所在国搜索', description: 'ip.country="CN"', input: 'text', placeholder: '输入国家代码' },
                    { id: 'ip.region', label: 'IP对应主机所在省份搜索', description: 'ip.region="Zhejiang"', input: 'text', placeholder: '输入省份名' },
                    { id: 'ip.city', label: 'IP对应主机所在城市搜索', description: 'ip.city="Hangzhou"', input: 'text', placeholder: '输入城市名' },
                    { id: 'ip.isp', label: '运营商搜索', description: 'ip.isp="电信"', input: 'text', placeholder: '输入运营商' },
                    { id: 'ip.os', label: '操作系统搜索', description: 'ip.os="Windows"', input: 'text', placeholder: '输入操作系统' },
                    { id: 'web.title', label: '网站标题搜索', description: 'web.title="keyword"', input: 'text', placeholder: '输入标题关键词' },
                    { id: 'web.body', label: '网站正文搜索', description: 'web.body="keyword"', input: 'text', placeholder: '输入内容关键词' },
                    { id: 'header', label: 'HTTP请求头搜索', description: 'header="keyword"', input: 'text', placeholder: '输入HTTP头关键词' },
                    { id: 'header.status_code', label: 'HTTP状态码搜索', description: 'header.status_code="402"', input: 'select', options: ['200', '301', '302', '404', '500', '503'] },
                    { id: 'header.server', label: '服务器信息搜索', description: 'header.server=="Microsoft-IIS/10"', input: 'text', placeholder: '输入服务器信息' },
                    { id: 'cert', label: '证书搜索', description: 'cert="keyword"', input: 'text', placeholder: '输入证书关键词' },
                    { id: 'icp.web_name', label: 'ICP备案网站名搜索', description: 'icp.web_name="奇安信"', input: 'text', placeholder: '输入ICP备案网站名' },
                    { id: 'icp.name', label: 'ICP备案单位名搜索', description: 'icp.name="奇安信"', input: 'text', placeholder: '输入ICP备案单位名' },
                    { id: 'app.vendor', label: '组件厂商搜索', description: 'app.vendor="PHP"', input: 'text', placeholder: '输入组件厂商' },
                    { id: 'app.version', label: '组件版本搜索', description: 'app.version="1.8.1"', input: 'text', placeholder: '输入组件版本' }
                ];
                break;
            case 'shodan':
                options = [
                    { id: 'hostname', label: '主机名搜索', description: 'hostname:domain.com', input: 'text', placeholder: '输入主机名' },
                    { id: 'ip', label: 'IP搜索', description: 'ip:192.168.1.1', input: 'text', placeholder: '输入IP地址' },
                    { id: 'port', label: '端口搜索', description: 'port:80', input: 'select', options: ['21', '22', '23', '25', '53', '80', '110', '143', '443', '993', '995', '1433', '3306', '3389', '5432', '6379', '8080', '8443', '9200', '27017'] },
                    { id: 'product', label: '产品搜索', description: 'product:nginx', input: 'select', options: ['nginx', 'apache', 'iis', 'tomcat', 'weblogic', 'websphere', 'jboss', 'glassfish', 'jetty', 'lighttpd', 'openresty', 'caddy', 'traefik', 'haproxy', 'varnish', 'squid'] },
                    { id: 'os', label: '操作系统搜索', description: 'os:linux', input: 'select', options: ['linux', 'windows', 'macos', 'unix', 'freebsd', 'openbsd', 'netbsd'] },
                    { id: 'country', label: '国家搜索', description: 'country:CN', input: 'select', options: ['CN', 'US', 'JP', 'DE', 'GB', 'FR', 'CA', 'AU', 'BR', 'IN', 'RU', 'KR', 'IT', 'ES', 'NL', 'SE', 'CH', 'NO', 'DK', 'FI'] },
                    { id: 'city', label: '城市搜索', description: 'city:Beijing', input: 'text', placeholder: '输入城市名' },
                    { id: 'org', label: '组织搜索', description: 'org:organization', input: 'text', placeholder: '输入组织名' },
                    { id: 'ssl', label: 'SSL证书搜索', description: 'ssl:keyword', input: 'text', placeholder: '输入SSL证书关键词' },
                    { id: 'http_title', label: 'HTTP标题搜索', description: 'http.title:keyword', input: 'text', placeholder: '输入HTTP标题关键词' },
                    { id: 'http_html', label: 'HTTP内容搜索', description: 'http.html:keyword', input: 'text', placeholder: '输入HTTP内容关键词' },
                    { id: 'http_status', label: 'HTTP状态码搜索', description: 'http.status:200', input: 'select', options: ['200', '301', '302', '404', '500', '503'] },
                    { id: 'http_headers', label: 'HTTP头搜索', description: 'http.headers:keyword', input: 'text', placeholder: '输入HTTP头关键词' },
                    { id: 'http_favicon_hash', label: '网站图标哈希搜索', description: 'http.favicon.hash:hash', input: 'text', placeholder: '输入图标哈希值' },
                    { id: 'http_robots_hash', label: 'Robots哈希搜索', description: 'http.robots_hash:hash', input: 'text', placeholder: '输入robots哈希值' },
                    { id: 'http_sitemap_hash', label: 'Sitemap哈希搜索', description: 'http.sitemap_hash:hash', input: 'text', placeholder: '输入sitemap哈希值' },
                    { id: 'http_waf', label: 'WAF搜索', description: 'http.waf:keyword', input: 'text', placeholder: '输入WAF关键词' },
                    { id: 'http_ssl', label: 'HTTP SSL搜索', description: 'http.ssl:keyword', input: 'text', placeholder: '输入SSL关键词' },
                    { id: 'http_redirect', label: '重定向搜索', description: 'http.redirect:keyword', input: 'text', placeholder: '输入重定向关键词' },
                    { id: 'http_location', label: 'Location头搜索', description: 'http.location:keyword', input: 'text', placeholder: '输入Location关键词' },
                    { id: 'http_server', label: '服务器信息搜索', description: 'http.server:keyword', input: 'text', placeholder: '输入服务器关键词' },
                    { id: 'http_cookies', label: 'Cookie搜索', description: 'http.cookies:keyword', input: 'text', placeholder: '输入Cookie关键词' },
                    { id: 'http_auth', label: '认证搜索', description: 'http.auth:keyword', input: 'text', placeholder: '输入认证关键词' },
                    { id: 'http_www_authenticate', label: 'WWW-Authenticate搜索', description: 'http.www_authenticate:keyword', input: 'text', placeholder: '输入WWW-Authenticate关键词' },
                    { id: 'http_proxy', label: '代理搜索', description: 'http.proxy:keyword', input: 'text', placeholder: '输入代理关键词' },
                    { id: 'http_robots', label: 'Robots搜索', description: 'http.robots:keyword', input: 'text', placeholder: '输入robots关键词' },
                    { id: 'http_sitemap', label: 'Sitemap搜索', description: 'http.sitemap:keyword', input: 'text', placeholder: '输入sitemap关键词' }
                ];
                break;
        }
        
        options.forEach(option => {
            const item = document.createElement('div');
            item.className = 'advanced-item';
            
            // 创建复选框行
            const checkboxRow = document.createElement('div');
            checkboxRow.className = 'checkbox-row';
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = `advanced_${option.id}`;
            checkbox.dataset.option = option.id;
            checkbox.dataset.description = option.description;
            checkbox.dataset.param = option.id; // 添加data-param属性
            
            const label = document.createElement('label');
            label.htmlFor = `advanced_${option.id}`;
            label.innerHTML = `
                <strong>${option.label}</strong>
                <div class="description">${option.description}</div>
            `;
            
            checkboxRow.appendChild(checkbox);
            // 操作符下拉框（仅FOFA/Hunter/Shodan显示）
            let operatorSelect = null;
            if (engine === 'fofa' || engine === 'hunter') {
                operatorSelect = document.createElement('select');
                operatorSelect.className = 'operator-select';
                operatorSelect.id = `operator_${option.id}`;
                ['==', '=', '!='].forEach(op => {
                    const opOpt = document.createElement('option');
                    opOpt.value = op;
                    opOpt.textContent = op;
                    operatorSelect.appendChild(opOpt);
                });
                operatorSelect.style.marginRight = '8px';
                operatorSelect.style.display = 'none';
                checkboxRow.appendChild(operatorSelect);
            } else if (engine === 'shodan') {
                operatorSelect = document.createElement('select');
                operatorSelect.className = 'operator-select';
                operatorSelect.id = `operator_${option.id}`;
                [':', '!:'].forEach(op => {
                    const opOpt = document.createElement('option');
                    opOpt.value = op;
                    opOpt.textContent = op;
                    operatorSelect.appendChild(opOpt);
                });
                operatorSelect.style.marginRight = '8px';
                operatorSelect.style.display = 'none';
                checkboxRow.appendChild(operatorSelect);
            }
            checkboxRow.appendChild(label);
            item.appendChild(checkboxRow);
            
            if (option.input === 'text') {
                const inputGroup = document.createElement('div');
                inputGroup.className = 'input-group';
                const input = document.createElement('input');
                input.type = 'text';
                input.placeholder = option.placeholder;
                input.id = `advanced_input_${option.id}`;
                input.style.display = 'none';
                // 添加验证
                this.addInputValidation(input, option.id);
                inputGroup.appendChild(input);
                item.appendChild(inputGroup);
                checkbox.addEventListener('change', () => {
                    input.style.display = checkbox.checked ? 'block' : 'none';
                    if (operatorSelect) operatorSelect.style.display = checkbox.checked ? 'inline-block' : 'none';
                });
            } else if (option.input === 'select') {
                const inputGroup = document.createElement('div');
                inputGroup.className = 'input-group';
                const select = document.createElement('select');
                select.id = `advanced_input_${option.id}`;
                select.style.display = 'none';
                option.options.forEach(opt => {
                    const optionElement = document.createElement('option');
                    optionElement.value = opt;
                    optionElement.textContent = opt;
                    select.appendChild(optionElement);
                });
                inputGroup.appendChild(select);
                item.appendChild(inputGroup);
                checkbox.addEventListener('change', () => {
                    select.style.display = checkbox.checked ? 'block' : 'none';
                    if (operatorSelect) operatorSelect.style.display = checkbox.checked ? 'inline-block' : 'none';
                });
            }
            advancedGrid.appendChild(item);
        });
    }

    getParamLabel(param) {
        const labels = {
            'keyword': '关键词',
            'filetype': '文件类型',
            'site': '网站',
            'exclude': '排除关键词',
            'startDate': '开始日期',
            'endDate': '结束日期',
            'keywords': '关键词列表',
            'conditions': '搜索条件'
        };
        return labels[param] || param;
    }

    createParamInput(param) {
        if (param === 'keywords' || param === 'conditions') {
            const textarea = document.createElement('textarea');
            textarea.placeholder = '请输入参数';
            textarea.id = `param_${param}`;
            this.addInputValidation(textarea, param);
            return textarea;
        } else if (param === 'startDate' || param === 'endDate') {
            const input = document.createElement('input');
            input.type = 'date';
            input.id = `param_${param}`;
            return input;
        } else {
            const input = document.createElement('input');
            input.type = 'text';
            input.placeholder = '请输入参数';
            input.id = `param_${param}`;
            this.addInputValidation(input, param);
            return input;
        }
    }

    addInputValidation(input, paramName) {
        // 设置验证类型
        let validationType = 'text';
        if (paramName === 'site' || paramName === 'domain') {
            validationType = 'domain';
        } else if (paramName === 'ip') {
            validationType = 'ip';
        } else if (paramName === 'port') {
            validationType = 'port';
        }
        input.dataset.validationType = validationType;
        
        // 添加实时验证
        const debouncedValidation = Utils.debounce((value) => {
            const validation = Utils.validateInput(value, validationType);
            
            // 移除之前的验证样式
            input.classList.remove('valid', 'invalid');
            
            if (value.trim()) {
                if (validation.valid) {
                    input.classList.add('valid');
                    input.title = '';
                } else {
                    input.classList.add('invalid');
                    input.title = validation.message;
                }
            }
        }, 300);
        
        input.addEventListener('input', (e) => {
            debouncedValidation(e.target.value);
        });
        
        input.addEventListener('blur', (e) => {
            debouncedValidation(e.target.value);
        });
    }

    generateGrammar() {
        try {
            const engine = document.getElementById('engine').value;
            const template = document.getElementById('template').value;
            
            let params;
            if (template === 'combined') {
                params = this.collectAdvancedParams();
            } else {
                params = this.collectParams();
            }
            
            // 调试信息
            console.log('Engine:', engine);
            console.log('Template:', template);
            console.log('Params:', params);
            
            const result = this.generator.generate(engine, template, params);
            console.log('Result:', result);
            
            this.displayResult(result);
            Utils.showNotification('语法生成成功！', 'success');
        } catch (error) {
            console.error('Generation error:', error);
            Utils.showNotification(`生成失败: ${error.message}`, 'error');
        }
    }

    collectAdvancedParams() {
        const params = {};
        const conditions = [];
        const engine = document.getElementById('engine').value;
        // 收集所有选中的复选框
        const checkboxes = document.querySelectorAll('#advancedGrid input[type="checkbox"]:checked');
        checkboxes.forEach(checkbox => {
            const option = checkbox.dataset.option;
            const description = checkbox.dataset.description;
            const input = document.getElementById(`advanced_input_${option}`);
            // 新增：操作符下拉框
            let operator = null;
            const operatorSelect = document.getElementById(`operator_${option}`);
            if (operatorSelect && operatorSelect.style.display !== 'none') {
                operator = operatorSelect.value;
            }
            if (input && input.value.trim()) {
                // 根据选项类型进行验证
                let validationType = 'text';
                if (option === 'site' || option === 'domain') {
                    validationType = 'domain';
                } else if (option === 'ip') {
                    validationType = 'ip';
                } else if (option === 'port') {
                    validationType = 'port';
                }
                const validation = Utils.validateInput(input.value, validationType);
                if (!validation.valid) {
                    Utils.showNotification(`高级选项验证失败: ${validation.message}`, 'error');
                    throw new Error(`高级选项验证失败: ${validation.message}`);
                }
                // 根据引擎和选项生成正确的语法
                let syntax = '';
                if ((engine === 'fofa' || engine === 'hunter') && operator) {
                    // FOFA/Hunter支持 ==、=、!=
                    if (operator === '==') {
                        syntax = `${option}=="${validation.value}"`;
                    } else if (operator === '=') {
                        syntax = `${option}="${validation.value}"`;
                    } else if (operator === '!=') {
                        syntax = `${option}!="${validation.value}"`;
                    }
                } else if (engine === 'shodan' && operator) {
                    // Shodan支持 :、!:
                    if (operator === ':') {
                        syntax = `${option}:${validation.value}`;
                    } else if (operator === '!:') {
                        syntax = `${option}!:${validation.value}`;
                    }
                } else if (engine === 'fofa') {
                    syntax = this.generateFofaSyntax(option, validation.value);
                } else if (engine === 'hunter') {
                    syntax = this.generateHunterSyntax(option, validation.value);
                } else if (description.includes('"')) {
                    syntax = description.replace(/"[^"]*"/, `"${validation.value}"`);
                } else if (description.includes(':')) {
                    syntax = description.replace(/:[^ ]*/, `:${validation.value}`);
                } else {
                    syntax = description.replace(/[^ ]*$/, validation.value);
                }
                conditions.push(syntax);
            }
        });
        params.conditions = conditions;
        return params;
    }

    generateFofaSyntax(option, value) {
        switch (option) {
            case 'domain':
                return `domain="${value}"`;
            case 'ip':
                return `ip="${value}"`;
            case 'port':
                return `port="${value}"`;
            case 'title':
                return `title="${value}"`;
            case 'body':
                return `body="${value}"`;
            case 'header':
                return `header="${value}"`;
            case 'cert':
                return `cert="${value}"`;
            case 'country':
                return `country="${value}"`;
            case 'region':
                return `region="${value}"`;
            case 'city':
                return `city="${value}"`;
            case 'protocol':
                return `protocol="${value}"`;
            case 'banner':
                return `banner="${value}"`;
            case 'icon_hash':
                return `icon_hash="${value}"`;
            case 'host':
                return `host="${value}"`;
            case 'base_protocol':
                return `base_protocol="${value}"`;
            case 'server':
                return `server="${value}"`;
            case 'app':
                return `app="${value}"`;
            case 'os':
                return `os="${value}"`;
            case 'product':
                return `product="${value}"`;
            case 'category':
                return `category="${value}"`;
            case 'type':
                return `type="${value}"`;
            case 'cloud_name':
                return `cloud_name="${value}"`;
            case 'is_cloud':
                return `is_cloud=${value}`;
            case 'is_fraud':
                return `is_fraud=${value}`;
            case 'is_honeypot':
                return `is_honeypot=${value}`;
            case 'org':
                return `org="${value}"`;
            case 'cert.subject.org':
                return `cert.subject.org="${value}"`;
            case 'cert.issuer.org':
                return `cert.issuer.org="${value}"`;
            default:
                return `${option}="${value}"`;
        }
    }

    generateHunterSyntax(option, value) {
        switch (option) {
            case 'domain':
                return `domain="${value}"`;
            case 'domain.suffix':
                return `domain.suffix="${value}"`;
            case 'ip':
                return `ip="${value}"`;
            case 'ip.port':
                return `ip.port="${value}"`;
            case 'ip.country':
                return `ip.country="${value}"`;
            case 'ip.region':
                return `ip.region="${value}"`;
            case 'ip.city':
                return `ip.city="${value}"`;
            case 'ip.isp':
                return `ip.isp="${value}"`;
            case 'ip.os':
                return `ip.os="${value}"`;
            case 'web.title':
                return `web.title="${value}"`;
            case 'web.body':
                return `web.body="${value}"`;
            case 'header':
                return `header="${value}"`;
            case 'header.status_code':
                return `header.status_code="${value}"`;
            case 'header.server':
                return `header.server=="${value}"`;
            case 'cert':
                return `cert="${value}"`;
            case 'icp.web_name':
                return `icp.web_name="${value}"`;
            case 'icp.name':
                return `icp.name="${value}"`;
            case 'app.vendor':
                return `app.vendor="${value}"`;
            case 'app.version':
                return `app.version="${value}"`;
            default:
                return `${option}="${value}"`;
        }
    }

    collectParams() {
        const params = {};
        const inputs = document.querySelectorAll('#paramsContainer input, #paramsContainer select, #paramsContainer textarea');
        
        inputs.forEach(input => {
            const paramName = input.id.replace('param_', '');
            if (input.value.trim()) {
                // 根据参数类型进行验证
                let validationType = 'text';
                if (paramName === 'site' || paramName === 'domain') {
                    validationType = 'domain';
                } else if (paramName === 'ip') {
                    validationType = 'ip';
                } else if (paramName === 'port') {
                    validationType = 'port';
                }
                
                const validation = Utils.validateInput(input.value, validationType);
                if (validation.valid) {
                    params[paramName] = validation.value;
                } else {
                    Utils.showNotification(`参数验证失败: ${validation.message}`, 'error');
                    throw new Error(`参数验证失败: ${validation.message}`);
                }
            }
        });
        
        // 检查是否有必需的参数缺失，为缺失的参数提供默认值
        const template = document.getElementById('template').value;
        const templateData = this.templateManager.getTemplate(template);
        
        if (templateData) {
            for (const param of templateData.params) {
                if (!params[param]) {
                    // 为某些参数提供默认值
                    if (param === 'keyword') {
                        params[param] = '*'; // 使用通配符作为默认关键词
                    } else if (param === 'keywords') {
                        params[param] = '*'; // 使用通配符作为默认关键词
                    } else {
                        // 对于其他参数，如果用户没有输入，则跳过这个模板
                        console.log(`参数 ${param} 缺失，跳过生成`);
                        return {};
                    }
                }
            }
        }
        
        return params;
    }

    displayResult(result) {
        this.currentResult = result;
        // 填充可编辑textarea
        const queryEdit = document.getElementById('queryEdit');
        if (queryEdit) queryEdit.value = result.query;
        document.getElementById('urlDisplay').textContent = result.url;
        document.getElementById('descriptionDisplay').textContent = result.description;
        document.getElementById('resultPanel').style.display = 'block';
        // 保存到历史记录
        this.saveToHistory(result);
    }

    saveToHistory(result) {
        // 收集当前参数
        const params = this.collectCurrentParams();
        // 规范化 query 用于去重
        let normQuery = result.query;
        if (result.template === 'combined' && Array.isArray(params.conditions)) {
            // 组合搜索：条件排序后 join
            normQuery = params.conditions.slice().sort().join(' ');
        } else if (typeof normQuery === 'string') {
            // 普通搜索：去多余空格
            normQuery = normQuery.trim().replace(/\s+/g, ' ');
        }
        // 先去重：移除已有的相同 engine+template+query 的历史
        this.history = this.history.filter(item => {
            let itemNormQuery = item.query;
            if (item.template === 'combined' && item.params && Array.isArray(item.params.conditions)) {
                itemNormQuery = item.params.conditions.slice().sort().join(' ');
            } else if (typeof itemNormQuery === 'string') {
                itemNormQuery = itemNormQuery.trim().replace(/\s+/g, ' ');
            }
            return !(item.engine === result.engine && item.template === result.template && itemNormQuery === normQuery);
        });
        const historyItem = {
            id: Utils.generateId(),
            timestamp: new Date().toISOString(),
            engine: result.engine,
            template: result.template,
            query: result.query,
            url: result.url,
            description: result.description,
            params: params
        };
        // 添加到历史记录数组开头
        this.history.unshift(historyItem);
        // 限制历史记录数量（最多保存50条）
        if (this.history.length > 50) {
            this.history = this.history.slice(0, 50);
        }
        // 保存到本地存储
        this.saveHistoryToStorage();
        // 更新历史记录显示
        this.updateHistoryDisplay();
    }

    // 收集当前参数
    collectCurrentParams() {
        const params = [];
        const container = document.getElementById('paramsContainer');
        const inputs = container.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            params.push(input.value);
        });
        
        // 收集高级选项参数
        const advancedParams = {};
        const advancedGrid = document.getElementById('advancedGrid');
        if (advancedGrid) {
            const checkboxes = advancedGrid.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    const paramName = checkbox.getAttribute('data-param');
                    const inputGroup = checkbox.closest('.advanced-item').querySelector('.input-group');
                    if (inputGroup) {
                        const input = inputGroup.querySelector('input, select');
                        if (input) {
                            advancedParams[paramName] = {
                                value: input.value,
                                type: input.type || 'text'
                            };
                        }
                    }
                }
            });
        }
        
        if (Object.keys(advancedParams).length > 0) {
            params.advanced = advancedParams;
        }
        
        return params;
    }

    saveHistoryToStorage() {
        try {
            localStorage.setItem('hgrammar_history', JSON.stringify(this.history));
        } catch (error) {
            console.error('保存历史记录失败:', error);
        }
    }

    loadHistoryFromStorage() {
        try {
            const savedHistory = localStorage.getItem('hgrammar_history');
            if (savedHistory) {
                this.history = JSON.parse(savedHistory);
            }
        } catch (error) {
            console.error('加载历史记录失败:', error);
            this.history = [];
        }
    }

    updateHistoryDisplay() {
        const historyList = document.getElementById('historyList');
        historyList.innerHTML = '';
        
        if (this.history.length === 0) {
            historyList.innerHTML = '<div class="empty-history">暂无历史记录</div>';
            return;
        }
        
        this.history.forEach(item => {
            const historyItem = this.createHistoryItem(item);
            historyList.appendChild(historyItem);
        });
    }

    // 搜索历史记录
    searchHistory(keyword) {
        const clearSearchBtn = document.getElementById('clearSearchBtn');
        
        if (keyword.trim()) {
            clearSearchBtn.style.display = 'block';
            this.displayFilteredHistory(keyword);
        } else {
            clearSearchBtn.style.display = 'none';
            this.updateHistoryDisplay();
        }
    }

    // 显示过滤后的历史记录
    displayFilteredHistory(keyword) {
        const historyList = document.getElementById('historyList');
        historyList.innerHTML = '';
        
        const filteredHistory = this.history.filter(item => {
            const searchText = keyword.toLowerCase();
            return (
                item.engine.toLowerCase().includes(searchText) ||
                item.template.toLowerCase().includes(searchText) ||
                item.query.toLowerCase().includes(searchText) ||
                item.description.toLowerCase().includes(searchText) ||
                new Date(item.timestamp).toLocaleString().toLowerCase().includes(searchText)
            );
        });
        
        if (filteredHistory.length === 0) {
            historyList.innerHTML = '<div class="empty-history">未找到匹配的历史记录</div>';
            return;
        }
        
        filteredHistory.forEach(item => {
            const historyItem = this.createHistoryItem(item);
            historyList.appendChild(historyItem);
        });
    }

    // 创建历史记录项（提取公共方法）
    createHistoryItem(item) {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.dataset.id = item.id;
        
        const header = document.createElement('div');
        header.className = 'history-header';
        
        const title = document.createElement('h4');
        title.textContent = `${item.engine} - ${item.template}`;
        
        const timestamp = document.createElement('span');
        timestamp.className = 'history-timestamp';
        timestamp.textContent = new Date(item.timestamp).toLocaleString();
        
        const actions = document.createElement('div');
        actions.className = 'history-actions';
        
        const copyBtn = document.createElement('button');
        copyBtn.className = 'btn btn-small';
        copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
        copyBtn.title = '复制语法';
        copyBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.copyHistoryItem(item);
        });
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-small btn-danger';
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        deleteBtn.title = '删除记录';
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.deleteHistoryItem(item.id);
        });
        
        actions.appendChild(copyBtn);
        actions.appendChild(deleteBtn);
        
        header.appendChild(title);
        header.appendChild(timestamp);
        header.appendChild(actions);
        
        const content = document.createElement('div');
        content.className = 'history-content';
        
        const query = document.createElement('div');
        query.className = 'history-query';
        query.textContent = item.query;
        
        const description = document.createElement('div');
        description.className = 'history-description';
        description.textContent = item.description;
        
        content.appendChild(query);
        content.appendChild(description);
        
        historyItem.appendChild(header);
        historyItem.appendChild(content);
        
        // 点击历史记录项可以重新加载
        historyItem.addEventListener('click', () => {
            this.loadHistoryItem(item);
        });
        
        return historyItem;
    }

    copyHistoryItem(item) {
        Utils.copyToClipboard(item.query).then(() => {
            Utils.showNotification('搜索语法已复制到剪贴板', 'success');
        }).catch(() => {
            Utils.showNotification('复制失败', 'error');
        });
    }

    deleteHistoryItem(id) {
        this.history = this.history.filter(item => item.id !== id);
        this.saveHistoryToStorage();
        this.updateHistoryDisplay();
        Utils.showNotification('历史记录已删除', 'success');
    }

    loadHistoryItem(item) {
        // 只显示结果，不重新加载参数
        this.currentResult = item;
        this.displayResult(item);
        
        Utils.showNotification('历史记录已查看', 'info');
    }

    clearAllHistory() {
        this.showConfirm('确认清除', '确定要清除所有历史记录吗？此操作不可恢复。').then(confirmed => {
            if (confirmed) {
                this.history = [];
                this.saveHistoryToStorage();
                this.updateHistoryDisplay();
                Utils.showNotification('所有历史记录已清除', 'success');
            }
        });
    }

    exportHistory() {
        if (this.history.length === 0) {
            Utils.showNotification('暂无历史记录可导出', 'info');
            return;
        }
        
        const exportData = {
            exportTime: new Date().toISOString(),
            totalCount: this.history.length,
            history: this.history
        };
        
        const content = JSON.stringify(exportData, null, 2);
        const filename = `hgrammar_history_${new Date().toISOString().slice(0, 10)}.json`;
        
        Utils.downloadText(filename, content);
        Utils.showNotification('历史记录已导出', 'success');
    }

    clearForm() {
        document.getElementById('paramsContainer').innerHTML = '';
        document.getElementById('resultPanel').style.display = 'none';
        this.currentResult = null;
        this.updateParamsContainer();
        Utils.showNotification('表单已清空', 'info');
    }

    copyResult() {
        if (!this.currentResult) return;
        
        // 优先复制搜索语法
        const text = this.currentResult.query;
        
        Utils.copyToClipboard(text).then(() => {
            Utils.showNotification('搜索语法已复制到剪贴板', 'success');
        }).catch(() => {
            Utils.showNotification('复制失败', 'error', 'error');
        });
    }

    exportResult() {
        if (!this.currentResult) return;
        
        const content = JSON.stringify(this.currentResult, null, 2);
        const filename = `hgrammar_${this.currentResult.engine}_${Date.now()}.json`;
        
        Utils.downloadText(filename, content);
        Utils.showNotification('结果已导出', 'success');
    }

    updateQuickTemplates() {
        const engine = document.getElementById('engine').value;
        const quickTemplatesContainer = document.getElementById('quickTemplates');
        quickTemplatesContainer.innerHTML = '';
        
        // 添加刷新按钮
        const refreshButton = document.createElement('div');
        refreshButton.className = 'refresh-button';
        refreshButton.innerHTML = '<i class="fas fa-sync-alt"></i>';
        refreshButton.title = '刷新模板';
        refreshButton.addEventListener('click', () => {
            this.updateQuickTemplates();
        });
        quickTemplatesContainer.appendChild(refreshButton);
        
        const templates = this.quickTemplateManager.getQuickTemplates(engine);
        const categories = this.quickTemplateManager.getTemplateCategories(engine);
        
        if (categories.length === 0) {
            const noTemplateDiv = document.createElement('div');
            noTemplateDiv.className = 'no-template';
            noTemplateDiv.innerHTML = '<p>暂无快速模板</p>';
            quickTemplatesContainer.appendChild(noTemplateDiv);
            return;
        }
        
        // 随机选择2-3个类别
        const shuffledCategories = categories.sort(() => 0.5 - Math.random());
        const selectedCategories = shuffledCategories.slice(0, Math.floor(Math.random() * 2) + 3);
        
        selectedCategories.forEach(category => {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'quick-template-category';
            
            const categoryTitle = document.createElement('h4');
            categoryTitle.textContent = category;
            categoryTitle.className = 'quick-template-title';
            
            const examplesContainer = document.createElement('div');
            examplesContainer.className = 'quick-template-examples';
            
            const examples = this.quickTemplateManager.getTemplateExamples(engine, category);
            // 随机选择1-2个示例
            const shuffledExamples = examples.sort(() => 0.5 - Math.random());
            const selectedExamples = shuffledExamples.slice(0, Math.floor(Math.random() * 2) + 1);
            
            selectedExamples.forEach(example => {
                const exampleDiv = document.createElement('div');
                exampleDiv.className = 'quick-template-example';
                
                const exampleName = document.createElement('div');
                exampleName.className = 'example-name';
                exampleName.textContent = example.name;
                
                const exampleQuery = document.createElement('div');
                exampleQuery.className = 'example-query';
                exampleQuery.textContent = example.query;
                
                const copyButton = document.createElement('button');
                copyButton.className = 'btn btn-small';
                copyButton.textContent = '复制';
                copyButton.addEventListener('click', () => {
                    this.copyQuickTemplate(example.query);
                });
                
                exampleDiv.appendChild(exampleName);
                exampleDiv.appendChild(exampleQuery);
                exampleDiv.appendChild(copyButton);
                examplesContainer.appendChild(exampleDiv);
            });
            
            categoryDiv.appendChild(categoryTitle);
            categoryDiv.appendChild(examplesContainer);
            quickTemplatesContainer.appendChild(categoryDiv);
        });
    }

    copyQuickTemplate(query) {
        Utils.copyToClipboard(query).then(() => {
            Utils.showNotification('搜索语法已复制到剪贴板', 'success');
        }).catch(() => {
            Utils.showNotification('复制失败', 'error');
        });
    }

    openResult() {
        if (!this.currentResult) return;
        
        window.open(this.currentResult.url, '_blank');
    }

    // 保存编辑后的语法并更新URL
    saveEditedQuery() {
        const queryEdit = document.getElementById('queryEdit');
        if (!queryEdit) return;
        const newQuery = queryEdit.value.trim();
        if (!newQuery) return;
        // 重新生成URL
        const engine = document.getElementById('engine').value;
        let url = '';
        if (engine === 'fofa') {
            url = 'https://fofa.info/result?qbase64=' + safeBtoa(newQuery);
        } else if (engine === 'hunter') {
            url = 'https://hunter.qianxin.com/list?search=' + safeBtoa(newQuery) + '&conditions=';
        } else if (engine === 'shodan') {
            url = 'https://www.shodan.io/search?query=' + encodeURIComponent(newQuery);
        } else if (engine === 'google') {
            url = 'https://www.google.com/search?q=' + encodeURIComponent(newQuery);
        } else if (engine === 'baidu') {
            url = 'https://www.baidu.com/s?wd=' + encodeURIComponent(newQuery);
        } else if (engine === 'so360') {
            url = 'https://www.so.com/s?q=' + encodeURIComponent(newQuery);
        } else {
            url = newQuery;
        }
        document.getElementById('urlDisplay').textContent = url;
        // 可选：自动保存到历史记录
        this.saveToHistory({
            engine: engine,
            template: document.getElementById('template').value,
            query: newQuery,
            url: url,
            description: document.getElementById('descriptionDisplay').textContent
        });
    }
}

// 安全base64编码，支持中文
function safeBtoa(str) {
    return btoa(unescape(encodeURIComponent(str)));
}

document.addEventListener('DOMContentLoaded', () => {
    new HGrammarApp();
    // 底部抽屉GitHub按钮显示逻辑
    const drawer = document.getElementById('githubDrawer');
    function checkDrawer() {
        if (!drawer) return;
        const scrollY = window.scrollY || window.pageYOffset;
        const winH = window.innerHeight || document.documentElement.clientHeight;
        const docH = document.documentElement.scrollHeight;
        if (scrollY + winH >= docH - 8) {
            drawer.classList.add('show');
        } else {
            drawer.classList.remove('show');
        }
    }
    window.addEventListener('scroll', checkDrawer);
    window.addEventListener('resize', checkDrawer);
    checkDrawer();
}); 