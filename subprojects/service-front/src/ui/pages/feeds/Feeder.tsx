import Feed from './Feed'
import { FeedType } from 'typings'

interface FeederProps {
  feeds: FeedType[]
}

const Feeder: React.FC<FeederProps> = ({ feeds }) => {
  return (
    <div className="panel">
      <div className="panel-body feedlist">
        {feeds.map((feed, idx) => {
          return <Feed key={idx} feed={feed} />
        })}
      </div>
    </div>
  )
}

export default Feeder
