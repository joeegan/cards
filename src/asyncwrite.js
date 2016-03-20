// sequential promise scheduler proof, for just pasting into the babel repl

let schedule = [asyncTask.bind(this, 1), asyncTask.bind(this, 2)];
let inProgress;

async function run() {
  for (let p of schedule) {
    inProgress = true;
    await p();
  }
  inProgress = false;
  schedule = [];
}
run();


function asyncTask(idx) {
  return new Promise(function(resolve) {
    setTimeout(function() {
      console.log(idx, new Date());
      resolve();
    }, 1001);
  });
}

function addToSchedule(msg) {
  if (!inProgress) {
    console.log('we are not inProgress');
    schedule = [];
    schedule.push(asyncTask.bind(this, msg))
    run();
  } else {
    schedule.push(asyncTask.bind(this, msg));
  }
}


addToSchedule(3);
addToSchedule(4);

setTimeout(function() {
  addToSchedule(5);
}, 10000);
