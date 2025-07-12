class HunterModule {
    constructor() {
        this.baseUrl = 'https://hunter.qianxin.com/web/search';
        this.name = 'Hunter';
        this.description = 'Hunter威胁情报语法生成器';
    }

    getInfo() {
        return {
            name: this.name,
            description: this.description,
            baseUrl: this.baseUrl,
            supportedTemplates: ['domain', 'ip', 'port', 'title', 'body', 'header', 'cert', 'combined']
        };
    }

    generate(template, params) {
        const query = this.buildQuery(template, params);
        // 统一生成 base64 链接
        const url = `https://hunter.qianxin.com/list?search=${btoa(query)}&conditions=`;
        return {
            engine: 'hunter',
            template: template.name,
            query: query,
            url: url,
            description: this.getDescription(template, params)
        };
    }

    buildQuery(template, params) {
        let query = '';

        switch (template.name) {
            case 'domain':
                query = `domain="${params.domain}"`;
                break;

            case 'ip':
                if (params.ipRange) {
                    query = `ip="${params.ipRange}"`;
                } else {
                    query = `ip="${params.ip}"`;
                }
                break;

            case 'port':
                query = `ip.port="${params.port}"`;
                break;

            case 'title':
                query = `web.title="${params.title}"`;
                break;

            case 'body':
                query = `web.body="${params.body}"`;
                break;

            case 'header':
                query = `header="${params.header}"`;
                break;

            case 'cert':
                query = `cert="${params.cert}"`;
                break;

            case 'combined':
                const conditions = [];
                if (params.domain) conditions.push(`domain="${params.domain}"`);
                if (params.ip) conditions.push(`ip="${params.ip}"`);
                if (params.port) conditions.push(`ip.port="${params.port}"`);
                if (params.title) conditions.push(`web.title="${params.title}"`);
                if (params.body) conditions.push(`web.body="${params.body}"`);
                if (params.header) conditions.push(`header="${params.header}"`);
                if (params.cert) conditions.push(`cert="${params.cert}"`);
                query = conditions.join(' && ');
                break;

            default:
                // 如果没有找到匹配的模板，尝试使用参数中的值
                const paramValue = params[template.name] || params.keyword || '';
                if (paramValue) {
                    // 根据模板名称生成对应的Hunter语法
                    if (template.name === 'title') {
                        query = `web.title="${paramValue}"`;
                    } else if (template.name === 'body') {
                        query = `web.body="${paramValue}"`;
                    } else if (template.name === 'port') {
                        query = `ip.port="${paramValue}"`;
                    } else {
                        query = `${template.name}="${paramValue}"`;
                    }
                } else {
                    query = '';
                }
        }

        return query.trim();
    }

    getDescription(template, params) {
        switch (template.name) {
            case 'domain':
                return `搜索域名包含"${params.domain}"的资产`;
            case 'ip':
                return `搜索IP地址为"${params.ip}"的资产`;
            case 'port':
                return `搜索开放端口为"${params.port}"的资产`;
            case 'title':
                return `搜索网站标题包含"${params.title}"的资产`;
            case 'body':
                return `搜索网站正文包含"${params.body}"的资产`;
            case 'header':
                return `搜索HTTP请求头包含"${params.header}"的资产`;
            case 'cert':
                return `搜索证书包含"${params.cert}"的资产`;
            case 'combined':
                return `Hunter组合搜索: ${Object.values(params).join(' ')}`;
            default:
                // 尝试从参数中获取值
                const paramValue = params[template.name] || params.keyword || '';
                return `在Hunter中搜索"${paramValue}"`;
        }
    }

    getHunterOperators() {
        return {
            'domain': '搜索域名',
            'domain.suffix': '搜索主域',
            'ip': '搜索IP地址',
            'ip.port': '搜索开放端口',
            'ip.country': '搜索IP对应主机所在国',
            'ip.region': '搜索IP对应主机所在省份',
            'ip.city': '搜索IP对应主机所在城市',
            'ip.isp': '搜索运营商',
            'ip.os': '搜索操作系统',
            'web.title': '搜索网站标题',
            'web.body': '搜索网站正文',
            'header': '搜索HTTP请求头',
            'header.status_code': '搜索HTTP请求返回状态码',
            'header.server': '搜索服务器信息',
            'cert': '搜索证书信息',
            'icp.web_name': '搜索ICP备案网站名',
            'icp.name': '搜索ICP备案单位名',
            'app.vendor': '搜索组件厂商',
            'app.version': '搜索组件版本'
        };
    }

    getCommonServices() {
        return {
            'http': 'HTTP服务',
            'https': 'HTTPS服务',
            'ftp': 'FTP服务',
            'ssh': 'SSH服务',
            'telnet': 'Telnet服务',
            'smtp': 'SMTP服务',
            'pop3': 'POP3服务',
            'imap': 'IMAP服务',
            'mysql': 'MySQL数据库',
            'redis': 'Redis数据库',
            'mongodb': 'MongoDB数据库',
            'elasticsearch': 'Elasticsearch',
            'kibana': 'Kibana',
            'jenkins': 'Jenkins',
            'gitlab': 'GitLab',
            'wordpress': 'WordPress',
            'nginx': 'Nginx',
            'apache': 'Apache',
            'tomcat': 'Tomcat',
            'weblogic': 'WebLogic'
        };
    }

    getCommonPorts() {
        return {
            '21': 'FTP',
            '22': 'SSH',
            '23': 'Telnet',
            '25': 'SMTP',
            '53': 'DNS',
            '80': 'HTTP',
            '110': 'POP3',
            '143': 'IMAP',
            '443': 'HTTPS',
            '993': 'IMAPS',
            '995': 'POP3S',
            '1433': 'MSSQL',
            '3306': 'MySQL',
            '3389': 'RDP',
            '5432': 'PostgreSQL',
            '6379': 'Redis',
            '8080': 'HTTP代理',
            '8443': 'HTTPS代理',
            '9200': 'Elasticsearch',
            '27017': 'MongoDB'
        };
    }
}

window.HunterModule = HunterModule; 