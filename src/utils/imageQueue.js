const DEFAULT_CONCURRENCY = 4;

class TaskQueue {
  constructor(concurrency = DEFAULT_CONCURRENCY) {
    this.concurrency = concurrency;
    this.activeCount = 0;
    this.queue = [];
  }

  enqueue(task) {
    return new Promise((resolve, reject) => {
      this.queue.push({ task, resolve, reject });
      this._dequeue();
    });
  }

  _dequeue() {
    if (this.activeCount >= this.concurrency) return;
    const next = this.queue.shift();
    if (!next) return;

    this.activeCount += 1;
    const { task, resolve, reject } = next;

    Promise.resolve()
      .then(task)
      .then((result) => resolve(result))
      .catch((err) => reject(err))
      .finally(() => {
        this.activeCount -= 1;
        this._dequeue();
      });
  }
}

const imageQueue = new TaskQueue(DEFAULT_CONCURRENCY);

export function setImageQueueConcurrency(n) {
  if (Number.isFinite(n) && n > 0) {
    imageQueue.concurrency = n;
  }
}

export function enqueueImageLoad(src) {
  return imageQueue.enqueue(() =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(src);
      img.onerror = reject;
      img.src = src;
      // Hint to not block rendering
      if ('decoding' in img) {
        try { img.decoding = 'async'; } catch {}
      }
    })
  );
}



