const fs=require('fs'),vm=require('vm');
const html=fs.readFileSync(__dirname+'/index.html','utf8');
const ctx={crypto:require('crypto').webcrypto,structuredClone};
vm.createContext(ctx);
vm.runInContext(html.match(/<script id="engine">([\s\S]*?)<\/script>/)[1]+'\nthis.E=Engine;',ctx);
let raw='';process.stdin.on('data',d=>raw+=d);
process.stdin.on('end',()=>{try{const input=JSON.parse(raw),result=input.validate?{state:ctx.E.validate(input.validate)}:ctx.E.mergeRecords(input.current,input.packet,input.choices||{});process.stdout.write(JSON.stringify(result));}catch(e){process.stdout.write(JSON.stringify({error:e.message}));process.exitCode=1;}});
