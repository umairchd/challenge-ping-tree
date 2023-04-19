const redis = require("../lib/redis");

//create service
exports.createTargets = (body) => {
  return new Promise((resolve, reject) => {
    redis.get("targets", (err, data) => {
      if (err) {
        reject(err);
      }
      redis.setex("targets", 3000, JSON.stringify(body));
      resolve(null);
    });
  });
};

// get all targets
exports.getTargets = () => {
  return new Promise((resolve, reject) => {
    redis.get("targets", (err, data) => {
      if (err) {
        reject(err);
      }
      if (data !== null) {
        data = JSON.parse(data);
        resolve(data);
      } else {
        resolve(data);
      }
    });
  });
};

// get a target
exports.getTarget = (id) => {
  return new Promise((resolve, reject) => {
    redis.get("targets", (err, data) => {
      if (err) {
        reject(err);
      }
      if (data !== null) {
        data = JSON.parse(data);
        let filterData = data.targets.find((targets) => targets.id == id);
        resolve(filterData);
      } else {
        resolve(data);
      }
    });
  });
};

// update a target
exports.updateTarget = (id, body) => {
  return new Promise((resolve, reject) => {
    redis.get("targets", (err, data) => {
      if (err) {
        reject(err);
      }
      if (data !== null) {
        data = JSON.parse(data);
        let targetIndex = data.targets.findIndex((target) => target.id == id);
        if (targetIndex !== -1) {
          data.targets[targetIndex] = body;
          redis.setex("targets", 3600, JSON.stringify(data));
        }
        resolve(data);
      } else {
        resolve(data);
      }
    });
  });
};

// get per day target
exports.getTargetPerDayCount = (id, date1, publisher) => {
  return new Promise((resolve, reject) => {
    redis.get(`targetPerDay${id}${date1}${publisher}`, (err, data) => {
      if (err) {
        reject(err);
      }
      if (data !== null) {
        data = JSON.parse(data);
        resolve(data);
      } else {
        resolve(data);
      }
    });
  });
};

// create per day target count
exports.createPerDayCount = (id, body) => {
  return new Promise((resolve, reject) => {
    redis.setex(
      `targetPerDay${id}${body.date}${body.publisher}`,
      3600,
      JSON.stringify(body)
    );
    
    resolve(true);
  });
};
