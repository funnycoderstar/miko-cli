module.exports = {
    /**
     * 复制文件
     * @param {Array} files 文件列表
     */
    copy(files) {
        if (!this.fs || !this.templatePath || !this.destinationPath) {
            console.error('调用utils/writing.copy出错, 是否没绑定this?');
            process.exit(-1);
        }
        files.forEach((file) => {
            this.fs.copy(
                this.templatePath(file),
                this.destinationPath(file),
            );
        });
    },
    copyTpl(files, options) {
        if (!this.fs || !this.templatePath || !this.destinationPath) {
            console.error('调用utils/writing.copyTpl出错, 是否没绑定this?');
            process.exit(-1);
        }
        files.forEach((file) => {
            this.fs.copyTpl(
                this.templatePath(file),
                this.destinationPath(file.replace('.ejs', '')),
                options,
            );
        });
    },
};

