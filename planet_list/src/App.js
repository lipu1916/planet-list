import { Component } from 'react';
import './App.css';
import Tab from './components/Tab'

class App extends Component {
  constructor(prop) {
    super(prop)
    this.state = {
      planetList: []
    }
  }
  componentDidMount() {
    fetch("https://assignment-machstatz.herokuapp.com/planet").then(result => result.json()).then(
      list => {
        console.log(list)
        this.setState({planetList: list})
      }
    )
  }
  render() {
    return(
      <Tab > 
       <div label="Planets"> 
         {
           this.state.planetList.map((item) => {
             return(
               <ol key={item.id}>
                 <div>
                   <span>{item.name}</span>
                   <button
                   style={{marginLeft : 20}}
                   onClick = {() => {
                     const index = this.state.planetList.findIndex(e => e.id === item.id)
                     var favList = this.state.planetList
                     favList[index].isFavourite = !favList[index].isFavourite
                     this.setState({planetList : favList})
                   }
                   }
                   >
                     {
                       item.isFavourite ? "UnFavourite" : "Favourite"
                     }
                   </button>
                 </div>
               </ol>
             )
           })
         }
       </div> 
       <div label="Favourites"> 
       {
           this.state.planetList.filter(item => item.isFavourite === true).map((item) => {
             return(
               <ol key={item.id}>
                 <div>
                   {item.name}
                 </div>
               </ol>
             )
           })
         } 
       </div> 
     </Tab> 
    )
  }
}

export default App;
