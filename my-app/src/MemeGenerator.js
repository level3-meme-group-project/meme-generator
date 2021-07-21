import React, { Component } from "react"

//Creates initial state 
class MemeGenerator extends Component {
    constructor() {
        super()
        this.state = {
            currentImg: "https://phantom-marca.unidadeditorial.es/eef3aa47c3980d0760e9d5cf15860679/resize/1320/f/webp/assets/multimedia/imagenes/2020/11/27/16065165106560.jpg",
            allMemeImgs: [],
            allSavedMemes: [
                {
                    memeTopText: "Create your",
                    memeBottomText: "own meme",
                    memeImage: "https://phantom-marca.unidadeditorial.es/eef3aa47c3980d0760e9d5cf15860679/resize/1320/f/webp/assets/multimedia/imagenes/2020/11/27/16065165106560.jpg",
                    editable: false
                }
            ]

        }

        //Binds methods that are created
        this.handleChange = this.handleChange.bind(this)
        this.generateNewMeme = this.generateNewMeme.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
        this.saveData = this.saveData.bind(this)
        this.handleImageRefresh = this.handleImageRefresh.bind(this)
    }

    //Pulls API from imgflip.com and loads it into allMemeImgs state
    componentDidMount() {
        fetch(`https://api.imgflip.com/get_memes`)
            .then(response => response.json())
            .then(response => {
                const { memes } = response.data
                this.setState({ allMemeImgs: memes })
            })
    }

    //update the meme objects topText and bottomText properties individually
    handleChange(event) {
        event.preventDefault();

        const fieldName = event.target.name
        const fieldValue = event.target.value

        const newMemesArray = [...this.state.allSavedMemes];
        const index = event.target.attributes.getNamedItem("memeindex").value;
        if (fieldName === "topText") {
            newMemesArray[index].memeTopText = fieldValue
        }
        else if (fieldName === "bottomText") {
            newMemesArray[index].memeBottomText = fieldValue
        }
        this.setState({ allSavedMemes: newMemesArray })

    }

    //places elements of meme into array for later access
    generateNewMeme(event) {
        event.preventDefault();
        this.setState(prevState => {

            const newMeme = {
                memeTopText: "",
                memeBottomText: "",
                memeImage: this.generateNewImage(),
                editable: true

            }

            return ({ allSavedMemes: [...prevState.allSavedMemes, newMeme] })
        })
    }

    //Creates a random number that is used to change url
    generateNewImage() {
        const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length)
        const randMemeImg = this.state.allMemeImgs[randNum].url
        return randMemeImg
    }

    //Deletes memes
    handleDelete(event) {
        event.preventDefault();
        const newMemesArray = [...this.state.allSavedMemes];
        const index = event.target.attributes.getNamedItem("memeindex").value
        console.log(newMemesArray)
        if (index !== -1) {
            newMemesArray.splice(index, 1);
            this.setState({ allSavedMemes: newMemesArray })
        }
    }

    // viewing the final state here since you can't view state with re-rendering
    viewFinalState() {
        //console.log(this.state)
    }

    //edit text in memes

    handleEdit(event) {
        event.preventDefault();
        const newMemesArray1 = [...this.state.allSavedMemes];
        const index = event.target.attributes.getNamedItem("memeindex").value
        newMemesArray1[index].editable = !newMemesArray1[index].editable
        this.setState({ allSavedMemes: newMemesArray1 })
    }

    //save data 

    saveData(event){
        event.preventDefault();
        const newMemesArray1 = [...this.state.allSavedMemes];
        const index = event.target.attributes.getNamedItem("memeindex").value
        newMemesArray1[index].editable = !newMemesArray1[index].editable
        this.setState({ allSavedMemes: newMemesArray1 })


    }

    handleImageRefresh(event){
        event.preventDefault()
        const newMemesArray1 = [...this.state.allSavedMemes];
        const index = event.target.attributes.getNamedItem("memeindex").value
        newMemesArray1[index].memeImage = this.generateNewImage()
        this.setState({ allSavedMemes: newMemesArray1 })
    }

    //Created inputs to collect topText and bottomText 
    //Creates buttons to access methods
    render() {
        const memes = this.state.allSavedMemes.map((item, index) =>

            <div className="meme" key={index}>
                <img className="displayMeme" src={item.memeImage} alt="" />
                <form id="my-form">
                    <input type="text"
                        name="topText"
                        placeholder="Top Text"
                        value={item.memeTopText}
                        memeindex={index}
                        onChange={this.handleChange}
                        className="memeTextEdit memeTopText"
                        disabled={!item.editable} />

                    <input type="text"
                        name="bottomText"
                        placeholder="Bottom Text"
                        value={item.memeBottomText}
                        memeindex={index}
                        onChange={this.handleChange}
                        className="memeTextEdit memeBottomText"
                        disabled={!item.editable} />

                    <button className={"saveButton " + (item.editable ? 'show' : 'hidden')} memeindex={index} onClick={this.saveData}>Save Text</button>

                </form>
                <button className={"editButton " + (item.editable ? 'hidden' : 'show')} memeindex={index} onClick={this.handleEdit}>Edit Meme Text</button>
                <button className={"imageRefreshButton " + (item.editable ? 'show' : 'hidden') } memeindex={index} onClick={this.handleImageRefresh}>Change Photo</button>
                <button className="deleteMemeButton" memeindex={index} onClick={this.handleDelete}>Delete Meme</button>
            </div>
        )

        return (
            <div>
                <button onClick={this.generateNewMeme} className="newMemeButton">Generate New Meme</button>
                {memes}
            </div>

        )

    }
}

export default MemeGenerator