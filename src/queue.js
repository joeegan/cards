/**
 * Performs async tasks one after another
 */
export default class Queue {

  /**
   * @param {Object} defaultContext
   */
  constructor(defaultContext) {
    this.defaultContext = defaultContext;
    this.schedule = [];
    this.inProgress = false;
  }

  async run() {
    for (const asyncTask of this.schedule) {
      this.inProgress = true;
      await asyncTask();
    }
    this.inProgress = false;
    this.schedule = [];
  }

  /**
   * @param {Function} asyncTask An async function
   * @param {Object} ctx Context In which to execute
   */
  push(asyncTask, ctx = this.defaultContext) {
    if (!this.inProgress) {
      this.schedule = [];
      this.schedule.push(asyncTask.bind(ctx));
      this.run();
    } else {
      this.schedule.push(asyncTask.bind(ctx));
    }
  }

}
