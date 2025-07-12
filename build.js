const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 跨平台创建目录
function ensureDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

// 跨平台执行命令
function runCommand(command) {
    try {
        console.log(`执行命令: ${command}`);
        execSync(command, { stdio: 'inherit' });
        console.log('✓ 命令执行成功');
    } catch (error) {
        console.error(`✗ 命令执行失败: ${command}`);
        console.error(error.message);
        process.exit(1);
    }
}

console.log('开始构建...');

// 1. 创建 build 目录
ensureDir('build');

// 2. 压缩 JS 文件
console.log('\n压缩 JavaScript 文件...');
runCommand('uglifyjs src/ui/script.js -o build/script.min.js -c -m');
runCommand('uglifyjs src/core/*.js -o build/core.min.js -c -m');
runCommand('uglifyjs src/modules/*.js -o build/modules.min.js -c -m');

// 3. 压缩 CSS 文件
console.log('\n压缩 CSS 文件...');
runCommand('cleancss src/ui/style.css -o build/style.min.css');

// 4. 混淆 JS 文件
console.log('\n混淆 JavaScript 文件...');
runCommand('javascript-obfuscator build --output build --compact true --self-defending true');

console.log('\n✓ 构建完成！');
console.log('生成的文件在 build/ 目录下：');
console.log('- script.min.js (主脚本)');
console.log('- core.min.js (核心模块)');
console.log('- modules.min.js (搜索引擎模块)');
console.log('- style.min.css (样式文件)'); 