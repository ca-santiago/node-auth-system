

export interface IMQService {

}

export interface MQServiceProps {
	connectionUrl: string;
	queue: string;
	exchange: string;
	serviceName: string;
  listenPattern: string;
}

export type ConsumerCallback = (b: Buffer) => any;

