import amqp = require('amqplib');
import { ConsumerCallback, MQServiceProps } from './types';

let MQConn: amqp.Connection;

export async function GetMQInstance(): Promise<amqp.Connection>{
	if(MQConn) return MQConn;
	else return await StartConnection();
}

async function StartConnection(): Promise<amqp.Connection> {
	if(MQConn) return MQConn;
	try{
    console.log('[MQ] Starting conection');
	  const url = process.env.MQ_URL || 'amqp://localhost';
    MQConn = await amqp.connect(url);
    console.log('[MQ] Conection started');
	  return MQConn;
	}	catch (err) {
		console.log('[MQ] Could not connect');
		console.log(err.message);
		throw err;
	}
}


export class MQServicePublisher {

	private channel: amqp.Channel;

	constructor(
	  private readonly mq: amqp.Connection,
		private readonly routingKey: string,
    private readonly exchange: string,
	){
		this.init();
	}

	async init(): Promise<void>{
    this.channel = await this.mq.createChannel();
		await this.channel.assertExchange(this.exchange, 'topic');
	}

	public async publish(data: {}, eventName: string): Promise<void> {
	  this.channel.publish(
						this.exchange, `${this.routingKey}.${eventName}`,
					  Buffer.from(JSON.stringify(data))
		);
	}
}


export class MQServiceConsumer {
	private connection: amqp.Connection; 
	private queue: string;
	private channel: amqp.Channel;
	private exchange: string;

	private listeners: Record<string,Array<ConsumerCallback>> = {};
	private listenPattern: string;

  constructor(props: MQServiceProps){
		this.queue = props.queue;
		this.exchange = props.exchange;
		this.listenPattern  = props.listenPattern;

		this.Init(props.connectionUrl);
	}

  private async Init(url: string): Promise<void> {
		this.connection = await amqp.connect(url);
		this.channel = await this.connection.createChannel();

		await this.channel.assertQueue(this.queue);
		await this.channel.assertExchange(this.exchange, 'topic');
		await this.channel.bindQueue(this.queue, this.exchange, this.listenPattern);
		this.on();
	}

	private on(){
		this.channel.consume(this.queue, (msg) => {
			this.dispatchListener(msg.fields.routingKey, msg.content);
			this.channel.ack(msg);
		});	
	}

	private dispatchListener(routingKey: string, data: Buffer){
	  this.listeners[routingKey]?.map(theListener => {
			theListener(data);	
		});
	}
	
	public registerListener(pattern: string, fn: ConsumerCallback){
		if(this.listeners.hasOwnProperty(pattern) == false)
	    this.listeners[pattern]  = [];
	  this.listeners[pattern].push(fn);
	  console.log(this.listeners);
	}
}

