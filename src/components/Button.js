
import PropTypes from 'prop-types'


function Button({text, color, onClick}) {
    return (
        <button 
            onClick= {onClick}
            className="btn"
            style={{backgroundColor:color, width: "100%" }} >
            {text}
            </button>
    )
}

Button.defaultProps ={
    color:'steelblue',
}

Button.propTypes={
    text: PropTypes.string,
    color: PropTypes.string,

}

export default Button
