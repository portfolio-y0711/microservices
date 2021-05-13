import { IHandler, IModule, IUser } from '../../typings'
import { writerPanelView } from './writer.views'

export interface IWriterProps {
    logginUser?: IUser
    users: IUser[]
}

export class Writer implements IModule {
    props: IWriterProps
    handler: IHandler

    constructor(props: IWriterProps) {
        this.props = props
    }
    render(): string {
        return (`
            ${writerPanelView(this.props)}
        `)
    }
}