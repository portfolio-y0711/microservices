import { IHandler, IModule } from '../typings'

export class FeedPage implements IModule {
    props: string[]
    handler: IHandler
    components: Map<string, string>

    constructor(props: string[]) {
        this.components = new Map([
            ['login', '<Login></Login>'], 
            ['selector', '<Selector></Selector>'], 
            ['writer', '<Writer></Writer>'], 
            ['feeder', '<Feeder></Feeder>']
        ])
        this.props = props
    }

    render(): string {
        return (`
            <div>
                <div>
                    <Navbar>
                </div>
                <div class="container bootdey">
                    <div class="col-md-12 bootstrap snippets">
                        ${this.props.map(key => this.components.get(key)).join('\n')}
                    </div>
                </div>
            </div>
        `)
    }
}

