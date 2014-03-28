var Commander = require("commander");

Commander
  .usage("[options] [source_addr:]source_port target_addr:target_port")
  .option("-D, --daemon             ",     "")
  .option("-l, --log          <FILE>",     "records log to FILE", process.stdout)
  .option("-c, --cert         <CERT>",     "certificate/key to use", null)
  .option("-t, --timeout      <TIMEOUT>",  "server exits after TIMEOUT when no client connected", null)
  .option("-i, --idle-timeout <ITIMEOUT>", "server exits after ITIMEOUT when no data transfered", null)
  .parse(process.argv);

module.exports = Commander;
