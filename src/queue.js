class Queue {
  constructor(){
    this.schedule = [];
    this.inProgress = false;
  }

  async run() {
    for (let p of this.schedule) {
      this.inProgress = true;
      await p();
    }
    this.inProgress = false;
    this.schedule = [];
  }

  /*
   * @param An async function
   */
  push(asyncTask) {
    if (!this.inProgress) {
      this.schedule = [];
      this.schedule.push(asyncTask.bind(this))
      this.run();
    } else {
      this.schedule.push(asyncTask.bind(this));
    }
  }

}

module.exports = Queue;
