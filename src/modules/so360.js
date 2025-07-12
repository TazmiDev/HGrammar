class So360Module {
    constructor() {
        this.baseUrl = 'https://www.so.com/s';
        this.name = '360搜索';
        this.description = '360搜索引擎语法生成器';
    }

    getInfo() {
        return {
            name: this.name,
            description: this.description,
            baseUrl: this.baseUrl,
            supportedTemplates: ['filetype', 'site', 'intitle', 'inurl', 'intext', 'exclude', 'date', 'combined']
        };
    }

    generate(template, params) {
        const query = this.buildQuery(template, params);
        const url = `${this.baseUrl}?q=${encodeURIComponent(query)}`;
        
        return {
            engine: 'so360',
            template: template.name,
            query: query,
            url: url,
            description: this.getDescription(template, params)
        };
    }

    buildQuery(template, params) {
        let query = '';

        // 根据模板名称映射到对应的处理逻辑
        const templateType = this.getTemplateType(template.name);
        
        switch (templateType) {
            case 'filetype':
                query = `${params.keyword} filetype:${params.filetype}`;
                break;

            case 'site':
                query = `${params.keyword} site:${params.site}`;
                break;

            case 'intitle':
                query = `intitle:${params.keyword}`;
                break;

            case 'inurl':
                query = `inurl:${params.keyword}`;
                break;

            case 'intext':
                query = `intext:${params.keyword}`;
                break;

            case 'exclude':
                query = `${params.keyword} -${params.exclude}`;
                break;

            case 'date':
                const startDate = new Date(params.startDate);
                const endDate = new Date(params.endDate);
                const startYear = startDate.getFullYear();
                const endYear = endDate.getFullYear();
                query = `${params.keyword} after:${startYear} before:${endYear}`;
                break;

            case 'combined':
                const keywords = Array.isArray(params.keywords) ? params.keywords.join(' ') : params.keywords;
                const conditions = Array.isArray(params.conditions) ? params.conditions.join(' ') : params.conditions;
                query = `${keywords} ${conditions}`;
                break;

            default:
                query = params.keyword || '';
        }

        return query.trim();
    }

    getTemplateType(templateName) {
        const templateMap = {
            '网站搜索': 'site',
            '文件类型搜索': 'filetype',
            '标题搜索': 'intitle',
            'URL搜索': 'inurl',
            '内容搜索': 'intext',
            '排除搜索': 'exclude',
            '时间范围搜索': 'date',
            '组合搜索': 'combined'
        };
        return templateMap[templateName] || templateName;
    }

    getDescription(template, params) {
        const templateType = this.getTemplateType(template.name);
        
        switch (templateType) {
            case 'filetype':
                return `在360搜索中搜索包含"${params.keyword}"的${params.filetype}文件`;
            case 'site':
                return `在360搜索中搜索${params.site}网站内的"${params.keyword}"`;
            case 'intitle':
                return `在360搜索中搜索标题包含"${params.keyword}"的页面`;
            case 'inurl':
                return `在360搜索中搜索URL包含"${params.keyword}"的页面`;
            case 'intext':
                return `在360搜索中搜索内容包含"${params.keyword}"的页面`;
            case 'exclude':
                return `在360搜索中搜索"${params.keyword}"但排除"${params.exclude}"`;
            case 'date':
                return `在360搜索中搜索${params.startDate}到${params.endDate}期间的"${params.keyword}"`;
            case 'combined':
                return `360搜索组合搜索: ${params.keywords} ${params.conditions}`;
            default:
                return `在360搜索中搜索"${params.keyword}"`;
        }
    }

    getAdvancedOperators() {
        return {
            'filetype:': '搜索特定文件类型',
            'site:': '在指定网站内搜索',
            'intitle:': '搜索标题包含关键词',
            'inurl:': '搜索URL包含关键词',
            'intext:': '搜索内容包含关键词',
            'allintitle:': '搜索标题包含所有关键词',
            'allinurl:': '搜索URL包含所有关键词',
            'allintext:': '搜索内容包含所有关键词',
            'after:': '搜索指定日期之后的内容',
            'before:': '搜索指定日期之前的内容',
            'daterange:': '搜索指定日期范围的内容',
            'related:': '搜索相关网站',
            'cache:': '搜索网页缓存',
            'info:': '获取网站信息',
            'link:': '搜索链接到指定网站的页面',
            'define:': '搜索定义',
            'weather:': '搜索天气信息',
            'stock:': '搜索股票信息',
            'movie:': '搜索电影信息',
            'book:': '搜索图书信息'
        };
    }

    get360SpecificOperators() {
        return {
            '360问答': '搜索360问答内容',
            '360百科': '搜索360百科内容',
            '360图片': '搜索360图片',
            '360视频': '搜索360视频',
            '360新闻': '搜索360新闻',
            '360学术': '搜索360学术',
            '360文库': '搜索360文库',
            '360地图': '搜索360地图',
            '360翻译': '搜索360翻译',
            '360音乐': '搜索360音乐'
        };
    }
}

window.So360Module = So360Module; 