import './css/App.css';
import gotopIcon from './images/btn_goTop.png'
import Buttons from './components/Buttons';
import Dropdown from './components/Dropdown';
import Pagination from './components/Pagination';
import Card from './components/Card';
import React,{useState, useEffect} from "react";

const App = () =>{
    //宣告變數
    const [state,setState] = useState({
      cards: [],
      error: null,
      isLoaded: false,
      itemZones:[], //宣告一個新的陣列(不重複區域)
      cardByZone: [],
      currentZone:''
    });


//API 資料
useEffect(()=>{
    fetch( 'https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json',{method:"GET"})
      .then(res => res.json())
      .then(
        (data) => {
          setState({
            isLoaded: true,
            cards: data.result.records,//all
            // 過濾重複的區域資料，並存在 itemZones 的新陣列中
            itemZones: data.result.records.map((item)=>(item.Zone)).filter(function(element, index, arr){
                return arr.indexOf(element) === index;
            }),
            cardByZone: [],
            currentZone:''
          });
        },
        (sError) => {
          setState({
            isLoaded: true,
            error:sError,
            ...state
            
          });
        }
      )
},[]);

const getCureentZone = (zone) =>{
  console.log('zome',zone);

  // console.log(zone);
  //篩選資料 來源 cards
  
  
//   cardByZone = cards.filter(function(element){
//     return element.Zone === zone;
// })

setState({
   ...state, //????
   cardByZone : cards.filter(function(element){
    return element.Zone === zone;
  }),
  currentZone: zone
});
  console.log('cardByZone',state.cardByZone)
}

const { cards,itemZones ,cardByZone,currentZone} = state;


return (
    <div className="App">
      <header className="banner">
        <div className="container">
            <h1>高雄旅遊資訊網</h1>
            <Dropdown itemZones= {itemZones} getZone={getCureentZone}/>
            {/* <select id="selectName">
          
            </select> */}
            <div className="menu">
                <p className="title-menu">熱門行政區</p>
                <ul className="buttonList">
                    <li><Buttons content="苓雅區" color="purple" /></li>
                    <li><Buttons content="三民區" color="orange"/></li>
                    <li><Buttons content="新興區" color="yellow" /></li>
                    <li><Buttons content="鹽埕區" color="blue" /></li>
                </ul>
                {/* <input type="button" value="苓雅區" style={{background:'#8A82CC'}}/>
                <input type="button" value="三民區" style={{background:'#FFA782'}}/>
                <input type="button" value="新興區" style={{background:'#F5D105'}}/>
                <input type="button" value="鹽埕區" style={{background:'#559AC8'}}/> */}
            </div>
            <div className="icon-menu">
                <hr />
            </div> 
        </div>
    </header>
    <div className="content container"> 
        <div className="main">
            <h2 className="title-main">{currentZone}</h2>
            <ul className="list">
            {/* 測試用:先撈五筆卡片資料 */}

            {cardByZone.map(function(card,index){
                 return <Card key={card.Id} item={card}/>
            })}
            {/* {cards.map((card) =>(
             <Card item={card}/>
            ))}  */}
            </ul>
        </div>

        <div className="goTop">
            <img src={gotopIcon}  alt="gotopIcon"/>
        </div>
        <Pagination/>
        {/* <ul className="page">
           <li><a href="https://hackmd.io/xG1tw_nER7Wu3xL1gbGYPQ?both">Prev </a></li>
           <li><a href="#">1</a></li>
           <li><a href="#">2</a></li>
           <li><a href="#">Next</a></li>
        </ul> */}
    </div>
    
    <footer>
        <div className="container">
            <p>高雄旅遊網</p>
            <p className="pStyle">資料來源: 高雄市政府</p>
        </div>
    </footer>
    
</div>
  );
}

export default App;
