import Queue from 'bull';
import { io } from '..';
import config from './config';

const queueOpts = {
  limiter: {
    max: 100,
    duration: 10000,
  },
  prefix: 'NOTIFICATION-TASK',
  defaultJobOptions: {
    attempts: 3,
    removeOnComplete: true,
  },
};

interface INotificationData {
  title: string;
  email: string;
}

class NotificationQueue {
  private readonly queue: Queue.Queue<INotificationData>;

  constructor() {
    this.queue = new Queue<INotificationData>(
      'Notification Queue',
      config.REDIS_URL,
      queueOpts
    );

    this.queue.process('notification', async (job, done) => {
      console.log('processing notification task');
      io.emit('notify', job.data.title, job.data.email);
      done();
    });
  }

  async addNotificationToQueue(notificationData: INotificationData) {
    await this.queue.add('notification', notificationData);
    console.log('the notification has been added to the queue...');
  }
}

const notificationQueue = new NotificationQueue();
export default notificationQueue;
