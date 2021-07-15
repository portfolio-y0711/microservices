import { IAmqpConnector } from "@realtime/server/amqp"
import { ISocketConnector } from "@realtime/server/socket.io"
import { IFeedStore } from "@realtime/store"
import { IChatStore } from "@realtime/store"

export interface IFeedSocketListener {
  (context: {
    socketConnector: ISocketConnector,
    amqpConnector: IAmqpConnector,
    feedStore: IFeedStore,
  }): void
}

export interface IChatSocketListener {
  (context: {
    socketConnector: ISocketConnector,
    amqpConnector: IAmqpConnector,
    chatStore: IChatStore,
  }): void
}
