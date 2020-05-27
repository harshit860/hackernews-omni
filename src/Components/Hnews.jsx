import React from 'react'
import './../App.css'
import up from './../up.png'

export default function Hnews(props) {
    
    let news = props.data.data.map((element,i) => {
       
        if (element.url) {
            let sitename = element.url.split('//')[1].split('/')[0]
            return <div className = "row news col-12">
                    <div className="col-2 ">{element.num_comments}</div>
                    <div className="col-1">{element.points}</div>
                    <div className="col-1"><img style={{ cursor: "pointer" }} width="12" height="12" src={up} ></img></div>
                    <div className = "row col-7 ">
                        <a style={{ textDecoration: 'none', color: "black" }} href={element.url}>{element._highlightResult.title.value}</a>
                        <div style={{ color: "grey" }}>({sitename})</div>
                        <div style={{ color: "grey"}}>  by  </div>
                        <div>{element._highlightResult.author.value}</div>
                        <div style={{  color: "grey" }}> hours ago</div>
                        <div style={{ cursor: "pointer" }} onClick={() => props.deletefun(element.objectID)}>[ Hide ]</div>
                    </div>
                </div>
            
        }
    

    })
    return (
        <React.Fragment >
            <div className="row nav col-12" > 
                <div className="text-white col-2" >Commments</div>
                <div className="text-white col-1">Vote Count</div>
                <div className="text-white col-1">Up Vote</div>
                <div className="col-8 text-left text-white">News</div>
            </div>
            <div className=" nav2 " > 
                <div className="text-white col-2" title="COMMENT" >C</div>
                <div className="text-white col-1" title="VOTE">V</div>
                <div className="text-white col-1" title="UP Vote Click to vote">UV</div>
                <div className="col-8 text-left text-white">News</div>
            </div>
                {news}
            {/* </div> */}
        </React.Fragment>
    )
}
