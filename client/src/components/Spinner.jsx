import './Spinner.css'

const Spinner = ({ isSpinnerVisible }) => {
    
    return (
        <div className={`spinner_wrap ${isSpinnerVisible ? 'visible' : 'hidden'}`}>
            <div className="spinner"></div>
        </div>
    )
}

export default Spinner