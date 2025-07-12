class QuickTemplateManager {
    constructor() {
        this.templates = {
            // Google快速模板
            google: {
                '学号信息收集': {
                    description: '搜索学号相关信息',
                    examples: [
                        { name: '学号泄露', query: '学号 filetype:txt OR filetype:xls OR filetype:xlsx', description: '搜索可能包含学号信息的文档' },
                        { name: '学号格式', query: '学号 site:edu.cn', description: '在教育网站中搜索学号' },
                        { name: '学号数据库', query: '学号 database OR 数据库', description: '搜索学号数据库' },
                        { name: '学号规则', query: '学号规则 OR 学号编码 site:edu.cn', description: '搜索学号编码规则' },
                        { name: '学号查询', query: '学号查询系统 OR 学号验证', description: '搜索学号查询系统' }
                    ]
                },
                '邮箱信息收集': {
                    description: '搜索邮箱相关信息',
                    examples: [
                        { name: '邮箱泄露', query: 'email filetype:txt OR filetype:csv', description: '搜索邮箱泄露文件' },
                        { name: '邮箱格式', query: '@gmail.com OR @qq.com OR @163.com', description: '搜索特定邮箱格式' },
                        { name: '邮箱列表', query: '邮箱 filetype:xls OR filetype:xlsx', description: '搜索邮箱列表文件' },
                        { name: '教师邮箱', query: '教师邮箱 site:edu.cn', description: '搜索教师邮箱信息' },
                        { name: '学生邮箱', query: '学生邮箱 OR 学号@edu.cn', description: '搜索学生邮箱格式' }
                    ]
                },
                '课程信息收集': {
                    description: '搜索课程相关信息',
                    examples: [
                        { name: '课程表', query: '课程表 filetype:xls OR filetype:xlsx site:edu.cn', description: '搜索课程表文件' },
                        { name: '教学计划', query: '教学计划 OR 培养方案 site:edu.cn', description: '搜索教学计划文档' },
                        { name: '选课系统', query: '选课系统 OR 教务系统 site:edu.cn', description: '搜索选课系统' },
                        { name: '实验指导', query: '实验指导书 OR 实验手册 filetype:pdf', description: '搜索实验指导文档' },
                        { name: '考试安排', query: '考试安排 OR 考试时间表 site:edu.cn', description: '搜索考试安排信息' }
                    ]
                },
                '文件泄露': {
                    description: '搜索常见文件泄露',
                    examples: [
                        { name: '配置文件', query: 'config filetype:txt OR filetype:ini OR filetype:conf', description: '搜索配置文件泄露' },
                        { name: '备份文件', query: 'backup filetype:bak OR filetype:sql OR filetype:zip', description: '搜索备份文件泄露' },
                        { name: '日志文件', query: 'log filetype:log OR filetype:txt', description: '搜索日志文件泄露' },
                        { name: '数据库文件', query: 'database filetype:sql OR filetype:db OR filetype:mdb', description: '搜索数据库文件泄露' },
                        { name: '源代码', query: 'source code filetype:zip OR filetype:rar', description: '搜索源代码泄露' },
                        { name: 'API文档', query: 'API文档 OR 接口文档 filetype:pdf OR filetype:txt', description: '搜索API文档泄露' }
                    ]
                },
                '操作手册': {
                    description: '搜索操作手册和文档',
                    examples: [
                        { name: '用户手册', query: '用户手册 OR 使用说明 filetype:pdf', description: '搜索用户手册PDF' },
                        { name: '技术文档', query: '技术文档 OR 开发文档 filetype:pdf', description: '搜索技术文档' },
                        { name: 'API文档', query: 'API文档 OR 接口文档 filetype:pdf', description: '搜索API文档' },
                        { name: '运维手册', query: '运维手册 OR 部署文档 filetype:pdf', description: '搜索运维手册' },
                        { name: '系统手册', query: '系统手册 OR 管理员手册 filetype:pdf', description: '搜索系统管理手册' },
                        { name: '故障排除', query: '故障排除 OR 问题解决 filetype:pdf', description: '搜索故障排除文档' }
                    ]
                },
                '敏感信息': {
                    description: '搜索敏感信息泄露',
                    examples: [
                        { name: '密码泄露', query: 'password filetype:txt OR filetype:ini', description: '搜索密码泄露文件' },
                        { name: '密钥泄露', query: 'private key filetype:pem OR filetype:key', description: '搜索私钥泄露' },
                        { name: 'Token泄露', query: 'token filetype:txt OR filetype:json', description: '搜索Token泄露' },
                        { name: 'API密钥', query: 'api key filetype:txt OR filetype:json', description: '搜索API密钥泄露' },
                        { name: '数据库密码', query: 'database password OR db password filetype:txt', description: '搜索数据库密码' },
                        { name: '管理员密码', query: 'admin password OR 管理员密码 filetype:txt', description: '搜索管理员密码' }
                    ]
                }
            },

            // 百度快速模板
            baidu: {
                '学号信息收集': {
                    description: '在百度中搜索学号相关信息',
                    examples: [
                        { name: '学号泄露', query: '学号 filetype:txt OR filetype:xls', description: '搜索学号泄露文档' },
                        { name: '学号格式', query: '学号 site:edu.cn', description: '在教育网站中搜索学号' },
                        { name: '学号数据库', query: '学号 数据库', description: '搜索学号数据库' },
                        { name: '学号规则', query: '学号规则 OR 学号编码 site:edu.cn', description: '搜索学号编码规则' },
                        { name: '学号查询', query: '学号查询系统 OR 学号验证', description: '搜索学号查询系统' }
                    ]
                },
                '邮箱信息收集': {
                    description: '在百度中搜索邮箱相关信息',
                    examples: [
                        { name: '邮箱泄露', query: '邮箱 filetype:txt OR filetype:csv', description: '搜索邮箱泄露文件' },
                        { name: '邮箱格式', query: '@gmail.com OR @qq.com', description: '搜索特定邮箱格式' },
                        { name: '邮箱列表', query: '邮箱列表 filetype:xls', description: '搜索邮箱列表文件' },
                        { name: '教师邮箱', query: '教师邮箱 site:edu.cn', description: '搜索教师邮箱信息' },
                        { name: '学生邮箱', query: '学生邮箱 OR 学号@edu.cn', description: '搜索学生邮箱格式' }
                    ]
                },
                '课程信息收集': {
                    description: '在百度中搜索课程相关信息',
                    examples: [
                        { name: '课程表', query: '课程表 filetype:xls OR filetype:xlsx site:edu.cn', description: '搜索课程表文件' },
                        { name: '教学计划', query: '教学计划 OR 培养方案 site:edu.cn', description: '搜索教学计划文档' },
                        { name: '选课系统', query: '选课系统 OR 教务系统 site:edu.cn', description: '搜索选课系统' },
                        { name: '实验指导', query: '实验指导书 OR 实验手册 filetype:pdf', description: '搜索实验指导文档' },
                        { name: '考试安排', query: '考试安排 OR 考试时间表 site:edu.cn', description: '搜索考试安排信息' }
                    ]
                },
                '文件泄露': {
                    description: '在百度中搜索文件泄露',
                    examples: [
                        { name: '配置文件', query: 'config filetype:txt OR filetype:ini', description: '搜索配置文件泄露' },
                        { name: '备份文件', query: 'backup filetype:bak OR filetype:sql', description: '搜索备份文件泄露' },
                        { name: '日志文件', query: 'log filetype:log', description: '搜索日志文件泄露' },
                        { name: '数据库文件', query: 'database filetype:sql OR filetype:db', description: '搜索数据库文件泄露' },
                        { name: '源代码', query: 'source code filetype:zip OR filetype:rar', description: '搜索源代码泄露' }
                    ]
                }
            },

            // 360搜索快速模板
            so360: {
                '学号信息收集': {
                    description: '在360搜索中搜索学号相关信息',
                    examples: [
                        { name: '学号泄露', query: '学号 filetype:txt OR filetype:xls', description: '搜索学号泄露文档' },
                        { name: '学号格式', query: '学号 site:edu.cn', description: '在教育网站中搜索学号' },
                        { name: '学号数据库', query: '学号 数据库', description: '搜索学号数据库' },
                        { name: '学号规则', query: '学号规则 OR 学号编码 site:edu.cn', description: '搜索学号编码规则' },
                        { name: '学号查询', query: '学号查询系统 OR 学号验证', description: '搜索学号查询系统' }
                    ]
                },
                '邮箱信息收集': {
                    description: '在360搜索中搜索邮箱相关信息',
                    examples: [
                        { name: '邮箱泄露', query: '邮箱 filetype:txt OR filetype:csv', description: '搜索邮箱泄露文件' },
                        { name: '邮箱格式', query: '@gmail.com OR @qq.com', description: '搜索特定邮箱格式' },
                        { name: '邮箱列表', query: '邮箱列表 filetype:xls', description: '搜索邮箱列表文件' },
                        { name: '教师邮箱', query: '教师邮箱 site:edu.cn', description: '搜索教师邮箱信息' },
                        { name: '学生邮箱', query: '学生邮箱 OR 学号@edu.cn', description: '搜索学生邮箱格式' }
                    ]
                },
                '课程信息收集': {
                    description: '在360搜索中搜索课程相关信息',
                    examples: [
                        { name: '课程表', query: '课程表 filetype:xls OR filetype:xlsx site:edu.cn', description: '搜索课程表文件' },
                        { name: '教学计划', query: '教学计划 OR 培养方案 site:edu.cn', description: '搜索教学计划文档' },
                        { name: '选课系统', query: '选课系统 OR 教务系统 site:edu.cn', description: '搜索选课系统' },
                        { name: '实验指导', query: '实验指导书 OR 实验手册 filetype:pdf', description: '搜索实验指导文档' },
                        { name: '考试安排', query: '考试安排 OR 考试时间表 site:edu.cn', description: '搜索考试安排信息' }
                    ]
                },
                '文件泄露': {
                    description: '在360搜索中搜索文件泄露',
                    examples: [
                        { name: '配置文件', query: 'config filetype:txt OR filetype:ini', description: '搜索配置文件泄露' },
                        { name: '备份文件', query: 'backup filetype:bak OR filetype:sql', description: '搜索备份文件泄露' },
                        { name: '日志文件', query: 'log filetype:log', description: '搜索日志文件泄露' },
                        { name: '数据库文件', query: 'database filetype:sql OR filetype:db', description: '搜索数据库文件泄露' },
                        { name: '源代码', query: 'source code filetype:zip OR filetype:rar', description: '搜索源代码泄露' }
                    ]
                }
            },

            // FOFA快速模板
            fofa: {
                '教育网站': {
                    description: '搜索教育网站相关资产',
                    examples: [
                        { name: '教务系统', query: 'title="教务系统" OR title="教务管理"', description: '搜索教务管理系统' },
                        { name: '选课系统', query: 'title="选课系统" OR title="课程管理"', description: '搜索选课系统' },
                        { name: '图书馆系统', query: 'title="图书馆" OR title="图书管理"', description: '搜索图书馆系统' },
                        { name: '学生管理系统', query: 'title="学生管理" OR title="学籍管理"', description: '搜索学生管理系统' },
                        { name: '教师管理系统', query: 'title="教师管理" OR title="人事管理"', description: '搜索教师管理系统' },
                        { name: '财务系统', query: 'title="财务系统" OR title="财务管理"', description: '搜索财务管理系统' }
                    ]
                },
                'Web服务': {
                    description: '搜索Web服务相关资产',
                    examples: [
                        { name: 'Web服务器', query: 'service="http" OR service="https"', description: '搜索Web服务器' },
                        { name: 'Nginx服务器', query: 'server="nginx"', description: '搜索Nginx服务器' },
                        { name: 'Apache服务器', query: 'server="apache"', description: '搜索Apache服务器' },
                        { name: 'IIS服务器', query: 'server="iis"', description: '搜索IIS服务器' },
                        { name: 'Tomcat服务器', query: 'server="tomcat"', description: '搜索Tomcat服务器' },
                        { name: 'WebLogic服务器', query: 'server="weblogic"', description: '搜索WebLogic服务器' }
                    ]
                },
                '数据库服务': {
                    description: '搜索数据库服务',
                    examples: [
                        { name: 'MySQL数据库', query: 'service="mysql"', description: '搜索MySQL数据库' },
                        { name: 'Redis数据库', query: 'service="redis"', description: '搜索Redis数据库' },
                        { name: 'MongoDB数据库', query: 'service="mongodb"', description: '搜索MongoDB数据库' },
                        { name: 'PostgreSQL数据库', query: 'service="postgresql"', description: '搜索PostgreSQL数据库' },
                        { name: 'Oracle数据库', query: 'service="oracle"', description: '搜索Oracle数据库' },
                        { name: 'SQL Server数据库', query: 'service="mssql"', description: '搜索SQL Server数据库' }
                    ]
                },
                '管理后台': {
                    description: '搜索管理后台',
                    examples: [
                        { name: 'Jenkins', query: 'service="jenkins"', description: '搜索Jenkins管理后台' },
                        { name: 'GitLab', query: 'service="gitlab"', description: '搜索GitLab管理后台' },
                        { name: 'WordPress后台', query: 'service="wordpress"', description: '搜索WordPress后台' },
                        { name: 'phpMyAdmin', query: 'title="phpMyAdmin"', description: '搜索phpMyAdmin后台' },
                        { name: 'Docker管理', query: 'title="Docker" OR title="Portainer"', description: '搜索Docker管理界面' },
                        { name: 'Kubernetes管理', query: 'title="Kubernetes" OR title="K8s"', description: '搜索K8s管理界面' }
                    ]
                },
                '开发框架': {
                    description: '搜索开发框架',
                    examples: [
                        { name: 'Spring Boot', query: 'title="Spring Boot"', description: '搜索Spring Boot应用' },
                        { name: 'Laravel', query: 'title="Laravel"', description: '搜索Laravel应用' },
                        { name: 'Django', query: 'title="Django"', description: '搜索Django应用' },
                        { name: 'Flask', query: 'title="Flask"', description: '搜索Flask应用' },
                        { name: 'Vue.js', query: 'title="Vue" OR title="Vue.js"', description: '搜索Vue.js应用' },
                        { name: 'React', query: 'title="React" OR title="React.js"', description: '搜索React应用' }
                    ]
                },
                '云服务': {
                    description: '搜索云服务相关',
                    examples: [
                        { name: '阿里云', query: 'title="阿里云" OR title="Alibaba Cloud"', description: '搜索阿里云服务' },
                        { name: '腾讯云', query: 'title="腾讯云" OR title="Tencent Cloud"', description: '搜索腾讯云服务' },
                        { name: 'AWS', query: 'title="AWS" OR title="Amazon"', description: '搜索AWS服务' },
                        { name: 'Azure', query: 'title="Azure" OR title="Microsoft"', description: '搜索Azure服务' },
                        { name: '华为云', query: 'title="华为云" OR title="Huawei Cloud"', description: '搜索华为云服务' },
                        { name: '百度云', query: 'title="百度云" OR title="Baidu Cloud"', description: '搜索百度云服务' }
                    ]
                },
                '安全设备': {
                    description: '搜索安全设备',
                    examples: [
                        { name: '防火墙', query: 'title="防火墙" OR title="Firewall"', description: '搜索防火墙设备' },
                        { name: 'VPN设备', query: 'title="VPN" OR title="虚拟专用网"', description: '搜索VPN设备' },
                        { name: '入侵检测', query: 'title="IDS" OR title="IPS"', description: '搜索入侵检测系统' },
                        { name: 'WAF设备', query: 'title="WAF" OR title="Web应用防火墙"', description: '搜索WAF设备' },
                        { name: '堡垒机', query: 'title="堡垒机" OR title="跳板机"', description: '搜索堡垒机设备' },
                        { name: '安全审计', query: 'title="安全审计" OR title="日志审计"', description: '搜索安全审计系统' }
                    ]
                }
            },

            // Hunter快速模板
            hunter: {
                'Web服务': {
                    description: '在Hunter中搜索Web服务相关资产',
                    examples: [
                        { name: 'Web服务器', query: 'service="http" OR service="https"', description: '搜索Web服务器' },
                        { name: 'Nginx服务器', query: 'server="nginx"', description: '搜索Nginx服务器' },
                        { name: 'Apache服务器', query: 'server="apache"', description: '搜索Apache服务器' },
                        { name: 'IIS服务器', query: 'server="iis"', description: '搜索IIS服务器' }
                    ]
                },
                '数据库服务': {
                    description: '在Hunter中搜索数据库服务',
                    examples: [
                        { name: 'MySQL数据库', query: 'service="mysql"', description: '搜索MySQL数据库' },
                        { name: 'Redis数据库', query: 'service="redis"', description: '搜索Redis数据库' },
                        { name: 'MongoDB数据库', query: 'service="mongodb"', description: '搜索MongoDB数据库' },
                        { name: 'PostgreSQL数据库', query: 'service="postgresql"', description: '搜索PostgreSQL数据库' }
                    ]
                },
                '管理后台': {
                    description: '在Hunter中搜索管理后台',
                    examples: [
                        { name: 'Jenkins', query: 'service="jenkins"', description: '搜索Jenkins管理后台' },
                        { name: 'GitLab', query: 'service="gitlab"', description: '搜索GitLab管理后台' },
                        { name: 'WordPress后台', query: 'service="wordpress"', description: '搜索WordPress后台' },
                        { name: 'phpMyAdmin', query: 'title="phpMyAdmin"', description: '搜索phpMyAdmin后台' }
                    ]
                },
                '开发框架': {
                    description: '在Hunter中搜索开发框架',
                    examples: [
                        { name: 'Spring Boot', query: 'title="Spring Boot"', description: '搜索Spring Boot应用' },
                        { name: 'Laravel', query: 'title="Laravel"', description: '搜索Laravel应用' },
                        { name: 'Django', query: 'title="Django"', description: '搜索Django应用' },
                        { name: 'Flask', query: 'title="Flask"', description: '搜索Flask应用' }
                    ]
                },
                '云服务': {
                    description: '在Hunter中搜索云服务相关',
                    examples: [
                        { name: '阿里云', query: 'title="阿里云" OR title="Alibaba Cloud"', description: '搜索阿里云服务' },
                        { name: '腾讯云', query: 'title="腾讯云" OR title="Tencent Cloud"', description: '搜索腾讯云服务' },
                        { name: 'AWS', query: 'title="AWS" OR title="Amazon"', description: '搜索AWS服务' },
                        { name: 'Azure', query: 'title="Azure" OR title="Microsoft"', description: '搜索Azure服务' }
                    ]
                },
                '安全设备': {
                    description: '在Hunter中搜索安全设备',
                    examples: [
                        { name: '防火墙', query: 'title="防火墙" OR title="Firewall"', description: '搜索防火墙设备' },
                        { name: 'VPN设备', query: 'title="VPN" OR title="虚拟专用网"', description: '搜索VPN设备' },
                        { name: '入侵检测', query: 'title="IDS" OR title="IPS"', description: '搜索入侵检测系统' },
                        { name: 'WAF设备', query: 'title="WAF" OR title="Web应用防火墙"', description: '搜索WAF设备' }
                    ]
                }
            },

            // Shodan快速模板
            shodan: {
                'Web服务': {
                    description: '在Shodan中搜索Web服务',
                    examples: [
                        { name: 'Web服务器', query: 'product:nginx OR product:apache OR product:iis', description: '搜索Web服务器' },
                        { name: 'Nginx服务器', query: 'product:nginx', description: '搜索Nginx服务器' },
                        { name: 'Apache服务器', query: 'product:apache', description: '搜索Apache服务器' },
                        { name: 'IIS服务器', query: 'product:iis', description: '搜索IIS服务器' }
                    ]
                },
                '数据库服务': {
                    description: '在Shodan中搜索数据库服务',
                    examples: [
                        { name: 'MySQL数据库', query: 'product:mysql', description: '搜索MySQL数据库' },
                        { name: 'Redis数据库', query: 'product:redis', description: '搜索Redis数据库' },
                        { name: 'MongoDB数据库', query: 'product:mongodb', description: '搜索MongoDB数据库' },
                        { name: 'PostgreSQL数据库', query: 'product:postgresql', description: '搜索PostgreSQL数据库' }
                    ]
                },
                '操作系统': {
                    description: '在Shodan中搜索操作系统',
                    examples: [
                        { name: 'Linux系统', query: 'os:linux', description: '搜索Linux系统' },
                        { name: 'Windows系统', query: 'os:windows', description: '搜索Windows系统' },
                        { name: 'macOS系统', query: 'os:macos', description: '搜索macOS系统' },
                        { name: 'FreeBSD系统', query: 'os:freebsd', description: '搜索FreeBSD系统' }
                    ]
                },
                '网络设备': {
                    description: '在Shodan中搜索网络设备',
                    examples: [
                        { name: '路由器', query: 'product:router', description: '搜索路由器设备' },
                        { name: '交换机', query: 'product:switch', description: '搜索交换机设备' },
                        { name: '防火墙', query: 'product:firewall', description: '搜索防火墙设备' },
                        { name: 'VPN设备', query: 'product:vpn', description: '搜索VPN设备' }
                    ]
                },
                'IoT设备': {
                    description: '在Shodan中搜索IoT设备',
                    examples: [
                        { name: '摄像头', query: 'product:camera', description: '搜索网络摄像头' },
                        { name: '打印机', query: 'product:printer', description: '搜索网络打印机' },
                        { name: '智能家居', query: 'product:smart home', description: '搜索智能家居设备' },
                        { name: '工业控制', query: 'product:industrial', description: '搜索工业控制系统' }
                    ]
                },
                '地理位置': {
                    description: '在Shodan中按地理位置搜索',
                    examples: [
                        { name: '中国设备', query: 'country:CN', description: '搜索中国的设备' },
                        { name: '美国设备', query: 'country:US', description: '搜索美国的设备' },
                        { name: '日本设备', query: 'country:JP', description: '搜索日本的设备' },
                        { name: '德国设备', query: 'country:DE', description: '搜索德国的设备' }
                    ]
                }
            }
        };
    }

    getQuickTemplates(engine) {
        return this.templates[engine] || {};
    }

    getTemplateCategories(engine) {
        const templates = this.getQuickTemplates(engine);
        return Object.keys(templates);
    }

    getTemplateExamples(engine, category) {
        const templates = this.getQuickTemplates(engine);
        return templates[category] ? templates[category].examples : [];
    }

    getTemplateDescription(engine, category) {
        const templates = this.getQuickTemplates(engine);
        return templates[category] ? templates[category].description : '';
    }

    getAllEngines() {
        return Object.keys(this.templates);
    }
}

window.QuickTemplateManager = QuickTemplateManager; 