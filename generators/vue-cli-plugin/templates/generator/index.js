// generator/index.js
module.exports = (api, options, rootOptions) => {
    api.extendPackage({
      dependencies: {
        'rxjs': '^6.3.3',
        'vue-rx': '^6.1.0',
      },
    });
    api.onCreateComplete(() => {
        const fs = require('fs');
        const mainPath = api.resolve('./src/main.js');
        // 获取内容
        let contentMain = fs.readFileSync(mainPath, { encoding: 'utf-8' });
        const lines = contentMain.split(/\r?\n/g).reverse();
        let rxLines = `\nimport VueRx from 'vue-rx';\n\nVue.use(VueRx);`;
        // 注入import
        const lastImportIndex = lines.findIndex(line => line.match(/^import/));
        lines[lastImportIndex] += rxLines;
        // 修改应用
        contentMain = lines.reverse().join('\n');
        fs.writeFileSync(mainPath, contentMain, { encoding: 'utf-8' });
      });
    };
    
}
  