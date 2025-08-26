import amqp from 'amqplib';
import { LocalUser } from '../models/user.model.js';

export const connectRabbitMQ = async () => {
    try {
        const connection = await amqp.connect(process.env.RABBITMQ_URL);
        const channel = await connection.createChannel();
        await channel.assertQueue('user-events', { durable: true });
        console.log('Connected to CloudAMQP');
        return { connection, channel };
    } catch (error) {
        console.error('CloudAMQP connection error:', error.message);
        await new Promise(resolve => setTimeout(resolve, 5000));
        return connectRabbitMQ();
    }
};

export const consumeUserEvents = async (channel) => {
    try {
        await channel.consume('user-events', async (msg) => {
            if (msg !== null) {
                const { eventType, userData } = JSON.parse(msg.content.toString());
                console.log(`Received ${eventType} event:`, userData);

                if (eventType === 'UserCreated' || eventType === 'UserUpdated') {
                    await LocalUser.findOneAndUpdate(
                        { userId: userData.userId },
                        { userId: userData.userId, name: userData.name, email: userData.email },
                        { upsert: true, new: true }
                    );
                }
                channel.ack(msg);
            }
        });
    } catch (error) {
        console.error('Error consuming events:', error.message);
    }
};