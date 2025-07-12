class ShodanModule {
    constructor() {
        this.baseUrl = 'https://www.shodan.io/search';
        this.name = 'Shodan';
        this.description = 'Shodan网络设备搜索语法生成器';
    }

    getInfo() {
        return {
            name: this.name,
            description: this.description,
            baseUrl: this.baseUrl,
            supportedTemplates: ['hostname', 'ip', 'port', 'product', 'os', 'country', 'city', 'org', 'ssl', 'combined']
        };
    }

    generate(template, params) {
        const query = this.buildQuery(template, params);
        const url = `${this.baseUrl}?query=${encodeURIComponent(query)}`;
        
        return {
            engine: 'shodan',
            template: template.name,
            query: query,
            url: url,
            description: this.getDescription(template, params)
        };
    }

    buildQuery(template, params) {
        let query = '';

        switch (template.name) {
            case 'hostname':
                query = `hostname:${params.hostname}`;
                break;

            case 'ip':
                if (params.ipRange) {
                    query = `net:${params.ipRange}`;
                } else {
                    query = `ip:${params.ip}`;
                }
                break;

            case 'port':
                query = `port:${params.port}`;
                break;

            case 'product':
                query = `product:${params.product}`;
                break;

            case 'os':
                query = `os:${params.os}`;
                break;

            case 'country':
                query = `country:${params.country}`;
                break;

            case 'city':
                query = `city:${params.city}`;
                break;

            case 'org':
                query = `org:${params.org}`;
                break;

            case 'ssl':
                query = `ssl:${params.ssl}`;
                break;

            case 'combined':
                const conditions = [];
                if (params.hostname) conditions.push(`hostname:${params.hostname}`);
                if (params.ip) conditions.push(`ip:${params.ip}`);
                if (params.port) conditions.push(`port:${params.port}`);
                if (params.product) conditions.push(`product:${params.product}`);
                if (params.os) conditions.push(`os:${params.os}`);
                if (params.country) conditions.push(`country:${params.country}`);
                if (params.city) conditions.push(`city:${params.city}`);
                if (params.org) conditions.push(`org:${params.org}`);
                query = conditions.join(' ');
                break;

            default:
                // 如果没有找到匹配的模板，尝试使用参数中的值
                const paramValue = params[template.name] || params.keyword || '';
                if (paramValue) {
                    query = `${template.name}:${paramValue}`;
                } else {
                    query = '';
                }
        }

        return query.trim();
    }

    getDescription(template, params) {
        switch (template.name) {
            case 'hostname':
                return `在Shodan中搜索主机名为"${params.hostname}"的设备`;
            case 'ip':
                return `在Shodan中搜索IP地址为"${params.ip}"的设备`;
            case 'port':
                return `在Shodan中搜索端口为"${params.port}"的设备`;
            case 'product':
                return `在Shodan中搜索产品为"${params.product}"的设备`;
            case 'os':
                return `在Shodan中搜索操作系统为"${params.os}"的设备`;
            case 'country':
                return `在Shodan中搜索国家为"${params.country}"的设备`;
            case 'city':
                return `在Shodan中搜索城市为"${params.city}"的设备`;
            case 'org':
                return `在Shodan中搜索组织为"${params.org}"的设备`;
            case 'ssl':
                return `在Shodan中搜索SSL证书包含"${params.ssl}"的设备`;
            case 'combined':
                return `Shodan组合搜索: ${Object.values(params).join(' ')}`;
            default:
                // 尝试从参数中获取值
                const paramValue = params[template.name] || params.keyword || '';
                return `在Shodan中搜索"${paramValue}"`;
        }
    }

    getShodanOperators() {
        return {
            'hostname': '搜索主机名',
            'ip': '搜索IP地址',
            'net': '搜索IP网段',
            'port': '搜索端口',
            'product': '搜索产品',
            'os': '搜索操作系统',
            'country': '搜索国家',
            'city': '搜索城市',
            'org': '搜索组织',
            'ssl': '搜索SSL证书',
            'http.title': '搜索HTTP标题',
            'http.html': '搜索HTTP内容',
            'http.status': '搜索HTTP状态码',
            'http.headers': '搜索HTTP头',
            'http.favicon.hash': '搜索网站图标哈希',
            'http.robots_hash': '搜索robots.txt哈希',
            'http.sitemap_hash': '搜索sitemap哈希',
            'http.waf': '搜索WAF',
            'http.ssl': '搜索SSL信息',
            'http.redirect': '搜索重定向',
            'http.location': '搜索Location头',
            'http.server': '搜索服务器信息',
            'http.cookies': '搜索Cookie',
            'http.auth': '搜索认证信息',
            'http.www_authenticate': '搜索WWW-Authenticate头',
            'http.proxy': '搜索代理信息',
            'http.robots': '搜索robots.txt',
            'http.sitemap': '搜索sitemap',
            'http.redirect': '搜索重定向',
            'http.location': '搜索Location头'
        };
    }

    getCommonProducts() {
        return {
            'nginx': 'Nginx',
            'apache': 'Apache',
            'iis': 'IIS',
            'tomcat': 'Tomcat',
            'weblogic': 'WebLogic',
            'websphere': 'WebSphere',
            'jboss': 'JBoss',
            'glassfish': 'GlassFish',
            'jetty': 'Jetty',
            'lighttpd': 'Lighttpd',
            'openresty': 'OpenResty',
            'caddy': 'Caddy',
            'traefik': 'Traefik',
            'haproxy': 'HAProxy',
            'varnish': 'Varnish',
            'squid': 'Squid',
            'nginx/1.18.0': 'Nginx 1.18.0',
            'apache/2.4.41': 'Apache 2.4.41',
            'iis/10.0': 'IIS 10.0',
            'tomcat/9.0.45': 'Tomcat 9.0.45'
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

    getCommonCountries() {
        return {
            'CN': '中国',
            'US': '美国',
            'JP': '日本',
            'DE': '德国',
            'GB': '英国',
            'FR': '法国',
            'CA': '加拿大',
            'AU': '澳大利亚',
            'BR': '巴西',
            'IN': '印度',
            'RU': '俄罗斯',
            'KR': '韩国',
            'IT': '意大利',
            'ES': '西班牙',
            'NL': '荷兰',
            'SE': '瑞典',
            'CH': '瑞士',
            'NO': '挪威',
            'DK': '丹麦',
            'FI': '芬兰'
        };
    }
}

window.ShodanModule = ShodanModule; 