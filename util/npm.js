const exec = require('./exec');

module.exports = {
    /**
     * npm 查看一个包的版本信息 npm view packageName version
     * 获取包的最新版本号
     * @param {String} packageName 包名
     */
    getLastVersion(packageName) {
        return exec.getOutput('npm', ['view', packageName, 'version']);
    },
    /**
     * 
     * 安装包的最新版本
     * @param {String} packageName 包名
     */
    installLastest(packageName) {
        exec('npm', 'install', '-g', `${packageName}@latest}`);
    }
}