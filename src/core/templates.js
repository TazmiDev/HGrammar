class TemplateManager {
    constructor() {
        this.templates = {
            // 网站搜索 (Google/百度/360)
            site: {
                name: "网站搜索",
                description: "在指定网站内搜索 (site:domain.com)",
                params: ["keyword", "site"],
                examples: [
                    { keyword: "login", site: "edu.cn", description: "在edu.cn中搜索login" },
                    { keyword: "admin", site: "*.com", description: "在com网站中搜索admin" }
                ]
            },

            // 文件类型搜索 (Google/百度/360)
            filetype: {
                name: "文件类型搜索",
                description: "搜索特定类型的文件 (filetype:pdf)",
                params: ["keyword", "filetype"],
                examples: [
                    { keyword: "admin", filetype: "pdf", description: "搜索admin相关的PDF文件" },
                    { keyword: "password", filetype: "xls", description: "搜索password相关的Excel文件" }
                ]
            },

            // 标题搜索 (Google/百度/360)
            intitle: {
                name: "标题搜索",
                description: "搜索标题中包含关键词的页面 (intitle:keyword)",
                params: ["keyword"],
                examples: [
                    { keyword: "admin", description: "搜索标题包含admin的页面" },
                    { keyword: "login", description: "搜索标题包含login的页面" }
                ]
            },

            // URL搜索 (Google/百度/360)
            inurl: {
                name: "URL搜索",
                description: "搜索URL中包含关键词的页面 (inurl:keyword)",
                params: ["keyword"],
                examples: [
                    { keyword: "admin", description: "搜索URL包含admin的页面" },
                    { keyword: "login", description: "搜索URL包含login的页面" }
                ]
            },

            // 内容搜索 (Google/百度/360)
            intext: {
                name: "内容搜索",
                description: "搜索页面内容中包含关键词的页面 (intext:keyword)",
                params: ["keyword"],
                examples: [
                    { keyword: "password", description: "搜索内容包含password的页面" },
                    { keyword: "username", description: "搜索内容包含username的页面" }
                ]
            },

            // 排除搜索 (Google/百度/360)
            exclude: {
                name: "排除搜索",
                description: "排除特定关键词的搜索结果 (-keyword)",
                params: ["keyword", "exclude"],
                examples: [
                    { keyword: "admin", exclude: "login", description: "搜索admin但排除login" },
                    { keyword: "password", exclude: "reset", description: "搜索password但排除reset" }
                ]
            },

            // 时间范围搜索 (Google/百度/360)
            date: {
                name: "时间范围搜索",
                description: "搜索特定时间范围内的内容 (after:year before:year)",
                params: ["keyword", "startDate", "endDate"],
                examples: [
                    { keyword: "vulnerability", startDate: "2023-01-01", endDate: "2023-12-31", description: "搜索2023年的漏洞信息" }
                ]
            },

            // 组合搜索 (Google/百度/360)
            combined: {
                name: "组合搜索",
                description: "组合多个搜索条件",
                params: ["keywords", "conditions"],
                examples: [
                    { keywords: ["admin", "login"], conditions: ["site:example.com", "filetype:pdf"], description: "在example.com中搜索admin和login相关的PDF文件" }
                ]
            },

            // FOFA/Hunter 专用模板
            domain: {
                name: "域名搜索",
                description: "搜索特定域名 (domain=\"domain.com\")",
                params: ["domain"],
                examples: [
                    { domain: "edu.cn", description: "搜索edu.cn域名下的资产" },
                    { domain: "*.cn", description: "搜索cn网站资产" }
                ]
            },

            ip: {
                name: "IP搜索",
                description: "搜索特定IP地址 (ip=\"192.168.1.1\")",
                params: ["ip"],
                examples: [
                    { ip: "192.168.1.1", description: "搜索IP为192.168.1.1的资产" },
                    { ip: "192.168.1.0/24", description: "搜索192.168.1.0/24网段的资产" }
                ]
            },

            port: {
                name: "端口搜索",
                description: "搜索特定端口 (port=\"80\")",
                params: ["port"],
                examples: [
                    { port: "80", description: "搜索开放80端口的资产" },
                    { port: "3306", description: "搜索开放MySQL端口的资产" }
                ]
            },

            service: {
                name: "服务搜索",
                description: "搜索特定服务 (service=\"mysql\")",
                params: ["service"],
                examples: [
                    { service: "mysql", description: "搜索MySQL服务" },
                    { service: "nginx", description: "搜索Nginx服务" }
                ]
            },

            title: {
                name: "标题搜索",
                description: "搜索页面标题 (title=\"keyword\")",
                params: ["title"],
                examples: [
                    { title: "login", description: "搜索标题包含login的页面" },
                    { title: "admin", description: "搜索标题包含admin的页面" }
                ]
            },

            body: {
                name: "内容搜索",
                description: "搜索页面内容 (body=\"keyword\")",
                params: ["body"],
                examples: [
                    { body: "password", description: "搜索内容包含password的页面" },
                    { body: "username", description: "搜索内容包含username的页面" }
                ]
            },

            header: {
                name: "HTTP头搜索",
                description: "搜索HTTP响应头 (header=\"keyword\")",
                params: ["header"],
                examples: [
                    { header: "nginx", description: "搜索HTTP头包含nginx的资产" },
                    { header: "apache", description: "搜索HTTP头包含apache的资产" }
                ]
            },

            cert: {
                name: "证书搜索",
                description: "搜索SSL证书 (cert=\"keyword\")",
                params: ["cert"],
                examples: [
                    { cert: "Let's Encrypt", description: "搜索Let's Encrypt证书" },
                    { cert: "DigiCert", description: "搜索DigiCert证书" }
                ]
            },

            // Shodan 专用模板
            hostname: {
                name: "主机名搜索",
                description: "搜索特定主机名 (hostname:domain.com)",
                params: ["hostname"],
                examples: [
                    { hostname: "example.com", description: "搜索主机名为example.com的设备" },
                    { hostname: "*.edu.cn", description: "搜索edu.cn域名下的设备" }
                ]
            },

            // 为Shodan添加其他模板
            product: {
                name: "产品搜索",
                description: "搜索特定产品 (product:nginx)",
                params: ["product"],
                examples: [
                    { product: "nginx", description: "搜索Nginx产品" },
                    { product: "apache", description: "搜索Apache产品" }
                ]
            },

            os: {
                name: "操作系统搜索",
                description: "搜索特定操作系统 (os:linux)",
                params: ["os"],
                examples: [
                    { os: "linux", description: "搜索Linux系统" },
                    { os: "windows", description: "搜索Windows系统" }
                ]
            },

            country: {
                name: "国家搜索",
                description: "搜索特定国家 (country:CN)",
                params: ["country"],
                examples: [
                    { country: "CN", description: "搜索中国的设备" },
                    { country: "US", description: "搜索美国的设备" }
                ]
            },

            city: {
                name: "城市搜索",
                description: "搜索特定城市 (city:Beijing)",
                params: ["city"],
                examples: [
                    { city: "Beijing", description: "搜索北京的设备" },
                    { city: "Shanghai", description: "搜索上海的设备" }
                ]
            },

            org: {
                name: "组织搜索",
                description: "搜索特定组织 (org:organization)",
                params: ["org"],
                examples: [
                    { org: "Alibaba", description: "搜索阿里巴巴的设备" },
                    { org: "Tencent", description: "搜索腾讯的设备" }
                ]
            },

            ssl: {
                name: "SSL证书搜索",
                description: "搜索SSL证书 (ssl:keyword)",
                params: ["ssl"],
                examples: [
                    { ssl: "Let's Encrypt", description: "搜索Let's Encrypt证书" },
                    { ssl: "DigiCert", description: "搜索DigiCert证书" }
                ]
            }
        };
    }

    getTemplate(name) {
        return this.templates[name];
    }

    getAllTemplates() {
        return this.templates;
    }

    getTemplateNames() {
        return Object.keys(this.templates);
    }

    validateParams(templateName, params) {
        const template = this.templates[templateName];
        if (!template) {
            return false;
        }

        for (const param of template.params) {
            if (!params[param]) {
                return false;
            }
        }
        return true;
    }
}

window.TemplateManager = TemplateManager; 