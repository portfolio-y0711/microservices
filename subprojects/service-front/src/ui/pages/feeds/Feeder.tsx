import Feed from './Feed'
import { FeedType } from 'typings'

interface FeederProps {
  feeds: FeedType[]
  toShowPad: boolean
}

const Feeder: React.FC<FeederProps> = ({ feeds, toShowPad }) => {
  const calcDepth = (feeds: FeedType[], item: FeedType) => {
    let parentCommentId = item.parentUid
    let depth = 0
    
    while (parentCommentId !== '0') {
      parentCommentId = feeds[feeds.findIndex((f) => f.uuid == parentCommentId)]?.parentUid
      depth++
    }
    return depth
  }
  const displayComments = (feeds: FeedType[]) => {
    const pool = Object.values(feeds)
    const traverse = (list: FeedType[]) => {
      const dfs = (root: any) => {
        const store = []
        const stack = []
        stack.unshift(root)

        while (stack.length > 0) {
          const node: any = stack.shift()
          store.push(
            <Feed 
              key={Math.floor(Math.random() * 10000)} 
              depth={calcDepth(pool, node)} 
              feed={node} 
              toShowPad={toShowPad}
              />
          )
          if (node.children) {
            for (let i = node.children.length - 1; i >= 0; i--) {
              const child = node.children[i]
              stack.unshift(child)
            }
          }
        }
        return store
      }
      return list.map((e) => dfs(e))
    }
    const comments = traverse(feeds)
    return comments
  }

  return (
    <div className="panel">
      <div className="panel-body feedlist">
        {displayComments(feeds).map((c) => {
          return <div key={Math.floor(Math.random() * 10000)}>{c}</div>
        })}
      </div>
    </div>
  )

}
export default Feeder
