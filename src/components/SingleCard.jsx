
const SingleCard = ({card,handleChoice,flipped,disabled}) => {

    const handleClick = () =>{
        if(!disabled)
            handleChoice(card);
    }

    return (
        <div className="card" >
            <div className={flipped ? "flipped" : ""}>
                <img className="img front" src={card.src} alt="front"/>
                <img 
                    className="img back" 
                    src="/images/back.jpg" 
                    onClick={handleClick} 
                    alt="back"
                />
            </div>
        </div>
    )
}

export default SingleCard;