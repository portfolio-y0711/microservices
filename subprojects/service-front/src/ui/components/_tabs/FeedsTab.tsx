interface FeedsTabProps { }

const FeedsTab: React.FC<FeedsTabProps> = () => {
  return (
    <div id="feedsTab" className="tab-pane">
      <div className="profile-feed row">
        <div className="col-sm-6">
          <div className="profile-activity clearfix">
            <div>
              <img
                className="pull-left"
                alt="Alex Doe's avatar"
                src="https://bootdey.com/img/Content/avatar/avatar1.png"
              />
              <a className="user" href="#">
                {' '}
                Alex Doe{' '}
              </a>
              changed his profile photo.
              <a href="#">Take a look</a>
              <div className="time">
                <i className="ace-icon fa fa-clock-o bigger-110"></i>
                an hour ago
              </div>
            </div>

            <div className="tools action-buttons">
              <a href="#" className="blue">
                <i className="ace-icon fa fa-pencil bigger-125"></i>
              </a>

              <a href="#" className="red">
                <i className="ace-icon fa fa-times bigger-125"></i>
              </a>
            </div>
          </div>

          <div className="profile-activity clearfix">
            <div>
              <img
                className="pull-left"
                alt="Susan Smith's avatar"
                src="https://bootdey.com/img/Content/avatar/avatar2.png"
              />
              <a className="user" href="#">
                {' '}
                Susan Smith{' '}
              </a>
              is now friends with Alex Doe.
              <div className="time">
                <i className="ace-icon fa fa-clock-o bigger-110"></i>2 hours ago
              </div>
            </div>

            <div className="tools action-buttons">
              <a href="#" className="blue">
                <i className="ace-icon fa fa-pencil bigger-125"></i>
              </a>

              <a href="#" className="red">
                <i className="ace-icon fa fa-times bigger-125"></i>
              </a>
            </div>
          </div>

          <div className="profile-activity clearfix">
            <div>
              <img
                className="pull-left"
                alt="David Palms's avatar"
                src="https://bootdey.com/img/Content/avatar/avatar3.png"
              />
              <a className="user" href="#">
                {' '}
                David Palms{' '}
              </a>
              left a comment on Alex's wall.
              <div className="time">
                <i className="ace-icon fa fa-clock-o bigger-110"></i>8 hours ago
              </div>
            </div>

            <div className="tools action-buttons">
              <a href="#" className="blue">
                <i className="ace-icon fa fa-pencil bigger-125"></i>
              </a>

              <a href="#" className="red">
                <i className="ace-icon fa fa-times bigger-125"></i>
              </a>
            </div>
          </div>

          <div className="profile-activity clearfix">
            <div>
              <img
                className="pull-left"
                alt="Alex Doe's avatar"
                src="https://bootdey.com/img/Content/avatar/avatar4.png"
              />
              <a className="user" href="#">
                {' '}
                Alex Doe{' '}
              </a>
              upgraded his skills.
              <div className="time">
                <i className="ace-icon fa fa-clock-o bigger-110"></i>
                12 hours ago
              </div>
            </div>

            <div className="tools action-buttons">
              <a href="#" className="blue">
                <i className="ace-icon fa fa-pencil bigger-125"></i>
              </a>

              <a href="#" className="red">
                <i className="ace-icon fa fa-times bigger-125"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="col-sm-6"></div>
      </div>

      <div className="space-12"></div>

      <div className="center">
        <button type="button" className="btn btn-sm btn-primary btn-white btn-round">
          <i className="ace-icon fa fa-rss bigger-150 middle orange2"></i>
          <span className="bigger-110">View more activities</span>

          <i className="icon-on-right ace-icon fa fa-arrow-right"></i>
        </button>
      </div>
    </div>
  )
}

export default FeedsTab
