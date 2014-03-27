var Commander = require("commander");

Commander
  .usage("start [options] [source_addr:]source_port target_addr:target_port")
  .option("-D, --daemon             ",     "")
  .option("-l, --log          <FILE>",     "records log to FILE", process.stdout)
  .option("-c, --cert         <CERT>",     "certificate/key to use", null)
  .option("-t, --timeout      <TIMEOUT>",  "server exits after TIMEOUT when no client connected", null)
  .option("-i, --idle-timeout <ITIMEOUT>", "server exits after ITIMEOUT when no data transfered", null)
  .on("--help", function() {
    console.log("  Examples:");
    console.log("");
    console.log("    $ strait start 8787 localhost:12345");
    console.log("    $ strait start --cert self.pem --log ./development.log 8787 localhost:12345");
  })
  .parse(process.argv);

module.exports = Commander;
