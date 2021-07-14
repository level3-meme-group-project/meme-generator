import React, {Component} from "react"

//Creates initial state 
class MemeGenerator extends Component {
    constructor(){
        super()
        this.state = {
            topText: "",
            bottomText: "",
            currentImg:"https://phantom-marca.unidadeditorial.es/eef3aa47c3980d0760e9d5cf15860679/resize/1320/f/webp/assets/multimedia/imagenes/2020/11/27/16065165106560.jpg",
            allMemeImgs: [],
            allSavedMemes: []

        }

        //Binds medthods that are created
        this.handleChange = this.handleChange.bind(this)
        this.handleChangeImage = this.handleChangeImage.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    //Pulls API from imgflip.com and loads it into allMemeImgs state
    componentDidMount(){
        fetch(`https://api.imgflip.com/get_memes`)
        .then(response => response.json())
        .then(response => {
            const {memes} = response.data
            this.setState({ allMemeImgs: memes})
        })
    }

    //Renders text immediatley into the dom and updates state - topText and bottomText
    handleChange(event){
        const {name, value} = event.target
        this.setState({ [name]: value })
    }

    //Creates a random number that is used to change url
    handleChangeImage(event){
        event.preventDefault()
        const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length)
        const randMemeImg = this.state.allMemeImgs[randNum].url
        this.setState({currentImg: randMemeImg})
    }

    //places eleemnts of meme into array for later access
    handleSubmit(event){
        event.preventDefault();
        this.setState(prevState => {
            const finishedMeme = {
                memeTopText: this.state.topText,
                memeBottomText: this.state.bottomText,
                memeImage: this.state.currentImg
            }
            return({allSavedMemes: [...prevState.allSavedMemes, finishedMeme]})
        })
    }

    //Created inputs to collect topText and bottomText 
    //Creates buttons to access methods
    render(){
        return(
            <div>
            <form className="memeForm" onSubmit={this.handleSubmit}>
                
                <input
                type="text"
                name="topText"
                placeholder="Top Text"
                value={this.state.topText}
                onChange={this.handleChange}
                />

                <input
                type="text"
                name="bottomText"
                placeholder="Bottom Text"
                value={this.state.bottomText}
                onChange={this.handleChange}
                />
                <br/>
                <button>Add Meme to List</button>
            </form>
            <button onClick={this.handleChangeImage}>Refresh Meme Image</button>
            <button>Edit Existing Meme</button>
            <button>Delete Meme from List</button>
                <div className="meme">
                <img className="displayMeme" src={this.state.currentImg} alt="" />
                <h2 className="top" >{this.state.topText}</h2>
                <h2 className="bottom"> {this.state.bottomText}</h2>
                </div>
            </div>
        
        )
        
    }
}

export default MemeGenerator