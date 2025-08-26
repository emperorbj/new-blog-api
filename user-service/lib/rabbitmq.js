import amqp from 'amqplib';

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

export const publishUserEvent = async (channel, eventType, userData) => {
    try {
        const message = JSON.stringify({ eventType, userData });
        channel.sendToQueue('user-events', Buffer.from(message), { persistent: true });
        console.log(`Published ${eventType} event:`, userData);
    } catch (error) {
        console.error('Error publishing event:', error.message);
    }
};