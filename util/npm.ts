import {exec, getOutput} from './exec';

/**
 * npm 查看一个包的版本信息 npm view packageName version
 * 获取包的最新版本号
 * @param {String} packageName 包名
 */
export function getLastVersion(packageName: string) {
    return getOutput('npm', ['view', packageName, 'version']);
}
/**
 * 安装包的最新版本
 * @param {String} packageName 包名
 */
export function installLastest(packageName: string) {
    exec('npm', 'install', '-g', `${packageName}@latest}`);
}