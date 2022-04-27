const os = require("os");

const getCpuAverage = () => {
  const cpus = os.cpus();

  let idleMs = 0;
  let totalMs = 0;

  cpus.forEach((aCore) => {
    for (type in aCore.times) {
      totalMs += aCore.times[type];
    }
    idleMs += aCore.times.idle;
  });

  return {
    idle: idleMs / cpus.length,
    total: totalMs / cpus.length,
  };
};

const getCpuLoad = () => {
  return new Promise((resolve, reject) => {
    const start = getCpuAverage();
    setTimeout(() => {
      const end = getCpuAverage();
      const idleDifference = end.idle - start.idle;
      const totalDifference = end.total - start.total;
      const percentageCpu =
        100 - Math.floor((100 * idleDifference) / totalDifference);
      resolve(percentageCpu);
    }, 100);
  });
};

const getMacAddress = () => {
  const intf = os.networkInterfaces();
  let mac_address;
  for (let key in intf) {
    if (!intf[key][0].internal) {
      mac_address = intf[key][0].mac;
      break;
    }
  }
  return mac_address;
};

const cpus = os.cpus();

const getServerData = async () => {
  const osType = os.type();
  const uptime = os.uptime();
  const memFree = os.freemem();
  const memTotal = os.totalmem();
  const memUsed = memTotal - memFree;
  const memPercent = Math.floor((memUsed / memTotal) * 100) / 100;
  const cpuModel = cpus[0].model;
  const cpuSpeed = cpus[0].speed;
  const numCpus = cpus.length;
  const cpuLoad = await getCpuLoad();
  return {
    memFree,
    memTotal,
    memPercent,
    osType,
    uptime,
    cpuModel,
    cpuSpeed,
    numCpus,
    cpuLoad,
    memUsed,
  };
};

exports.getMacAddress = getMacAddress;
exports.getServerData = getServerData;
