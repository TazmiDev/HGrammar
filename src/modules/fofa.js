class FofaModule {
    constructor() {
        this.baseUrl = 'https://fofa.info/result';
        this.name = 'FOFA';
        this.description = 'FOFA网络空间测绘语法生成器';
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
        const url = `${this.baseUrl}?qbase64=${btoa(query)}`;
        
        return {
            engine: 'fofa',
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
                query = `port="${params.port}"`;
                break;

            case 'title':
                query = `title="${params.title}"`;
                break;

            case 'body':
                query = `body="${params.body}"`;
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
                if (params.port) conditions.push(`port="${params.port}"`);
                if (params.title) conditions.push(`title="${params.title}"`);
                if (params.body) conditions.push(`body="${params.body}"`);
                if (params.header) conditions.push(`header="${params.header}"`);
                if (params.cert) conditions.push(`cert="${params.cert}"`);
                query = conditions.join(' && ');
                break;

            default:
                // 如果没有找到匹配的模板，尝试使用参数中的值
                const paramValue = params[template.name] || params.keyword || '';
                if (paramValue) {
                    query = `${template.name}="${paramValue}"`;
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
                return `搜索端口为"${params.port}"的资产`;
            case 'title':
                return `搜索网站标题包含"${params.title}"的资产`;
            case 'body':
                return `搜索HTML正文包含"${params.body}"的资产`;
            case 'header':
                return `搜索响应标头包含"${params.header}"的资产`;
            case 'cert':
                return `搜索证书包含"${params.cert}"的资产`;
            case 'combined':
                return `FOFA组合搜索: ${Object.values(params).join(' ')}`;
            default:
                // 尝试从参数中获取值
                const paramValue = params[template.name] || params.keyword || '';
                return `在FOFA中搜索"${paramValue}"`;
        }
    }

    getFofaOperators() {
        return {
            'domain': '搜索域名',
            'ip': '搜索IP地址',
            'port': '搜索端口',
            'title': '搜索网站标题',
            'body': '搜索HTML正文',
            'header': '搜索响应标头',
            'cert': '搜索SSL证书',
            'country': '搜索国家',
            'region': '搜索省份/地区',
            'city': '搜索城市',
            'protocol': '搜索协议',
            'banner': '搜索协议返回信息',
            'icon_hash': '搜索网站图标哈希',
            'host': '搜索主机名',
            'base_protocol': '搜索基础协议',
            'server': '搜索服务器信息',
            'app': '搜索应用',
            'os': '搜索操作系统',
            'after': '搜索指定时间之后',
            'before': '搜索指定时间之前',
            'product': '搜索产品名',
            'category': '搜索分类',
            'type': '搜索资产类型',
            'cloud_name': '搜索云服务商',
            'is_cloud': '筛选云服务资产',
            'is_fraud': '筛选仿冒垃圾站群',
            'is_honeypot': '筛选蜜罐资产'
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

window.FofaModule = FofaModule; 