module.exports = class Queue {

  constructor(defaultContext) {
    this.defaultContext = defaultContext;
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
   * @param {Function} asyncTask An async function
   * @param {Object} context In which to execute
   */
  push(asyncTask, ctx = this.defaultContext) {
    if (!this.inProgress) {
      this.schedule = [];
      this.schedule.push(asyncTask.bind(ctx))
      this.run();
    } else {
      this.schedule.push(asyncTask.bind(ctx));
    }
  }

}
