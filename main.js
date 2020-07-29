const fs = require('fs');
const { execFileSync } = require('child_process');
const tmp = require('tmp');

tmp.setGracefulCleanup();

const tmpobj = tmp.fileSync({
    mode: 0o744,
    prefix: 'helm-exec-',
    postfix: '.sh',
    discardDescriptor: true,
});

fs.appendFile(tmpobj.name, process.env.INPUT_EXEC, function (err) {
    if (err) throw err;

    console.log('::set-output name=helm_output::' + execFileSync(tmpobj.name).toString().split('%').join('%25').split('\n').join('%0A').split('\r').join('%0D'));
});
