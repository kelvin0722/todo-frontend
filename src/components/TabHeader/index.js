import PropTypes from 'prop-types'

function TabHeader(props){
  return (
    <div className="nav nav-tabs">
      <span
        className={props.viewCompleted ? "nav-link active" : "nav-link"}
        onClick={() => props.toggleCompleted(true)}
      >
        Complete
      </span>
      <span
        className={props.viewCompleted ? "nav-link" : "nav-link active"}
        onClick={() =>props.toggleCompleted(false)}
      >
        Incomplete
      </span>
    </div>
  )
}

TabHeader.propTypes = {
  viewCompleted: PropTypes.bool.isRequired,
  toggleCompleted: PropTypes.func.isRequired
}

export default TabHeader