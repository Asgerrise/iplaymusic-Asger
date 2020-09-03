const connect = require("gulp-connect");
const {watchHTML, buildHTML} = require("./tasks/html");
const {watchSCSS, watchSCSSDark, buildSCSS, buildSCSSDark} = require("./tasks/scss");
const {watchJS, buildJS} = require("./tasks/js");
const {watchIMAGE, buildIMAGE} = require("./tasks/images");
const {watchMEDIA, buildMEDIA} = require("./tasks/media");

function dev(done){
    watchHTML();
    watchSCSS();
    watchSCSSDark();
    watchJS();
    watchIMAGE();
    watchMEDIA();
    connect.server({
        livereload: true, 
        root: "tmp"
    });
    done();
}

function build(done){
    buildHTML();
    buildSCSS();
    buildSCSSDark();
    buildJS();
    buildIMAGE();
    buildMEDIA();
    done();
}
exports.default = dev;
exports.build = build;