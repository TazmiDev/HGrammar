class GrammarGenerator {
    constructor() {
        this.modules = {};
        this.templates = {};
    }

    registerModule(name, module) {
        this.modules[name] = module;
    }

    registerTemplate(name, template) {
        this.templates[name] = template;
    }

    generate(engine, template, params) {
        if (!this.modules[engine]) {
            throw new Error(`不支持的搜索引擎: ${engine}`);
        }

        if (!this.templates[template]) {
            throw new Error(`不支持的模板: ${template}`);
        }

        const module = this.modules[engine];
        const templateData = this.templates[template];
        
        function safeBtoa(str) {
            return btoa(unescape(encodeURIComponent(str)));
        }

        // 如果是组合搜索，直接使用参数中的条件
        if (template === 'combined' && params.conditions) {
            let joiner = ' ';
            if (engine === 'fofa' || engine === 'hunter') {
                joiner = ' && ';
            } else if (engine === 'shodan') {
                joiner = ' and ';
            }
            const query = params.conditions.join(joiner);
            const baseUrl = module.getInfo().baseUrl;
            let url = '';
            if (engine === 'fofa') {
                url = `${baseUrl}?qbase64=${safeBtoa(query)}`;
            } else if (engine === 'hunter') {
                url = `https://hunter.qianxin.com/list?search=${safeBtoa(query)}&conditions=`;
            } else {
                url = `${baseUrl}?q=${encodeURIComponent(query)}`;
            }
            return {
                engine: engine,
                template: template,
                query: query,
                url: url,
                description: `组合搜索: ${params.conditions.join(joiner)}`
            };
        }
        
        // 检查参数是否为空
        if (!params || Object.keys(params).length === 0) {
            throw new Error('请填写必要的参数');
        }
        
        // 创建一个包含正确模板名称的对象
        const templateWithName = {
            ...templateData,
            name: template  // 使用模板的键名作为名称
        };
        
        return module.generate(templateWithName, params);
    }

    getSupportedEngines() {
        return Object.keys(this.modules);
    }

    getSupportedTemplates() {
        return Object.keys(this.templates);
    }

    getModuleInfo(engine) {
        if (!this.modules[engine]) {
            return null;
        }
        return this.modules[engine].getInfo();
    }
}

window.GrammarGenerator = GrammarGenerator; 