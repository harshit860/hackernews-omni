    import React, { Component } from 'react';
    import axios from 'axios'
import Hnews from './Hnews';

    export default class Home extends Component {
                    constructor(props){
                        super(props)
                        this.state = {
                                data:[],
                                pageno:0
                        }
                    }
                        previous = () =>{
                                        if(this.state.pageno > 0 )
                                        {
                                            this.setState({
                                                pageno: this.state.pageno - 1
                                            },this.componentDidMount)
                                        }
                        }
                    componentDidMount = () =>{
                     console.log('in componentr did mount')
                            
                        axios.get(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${this.state.pageno}`)
                        .then(resp => {
                            let newnews = []
                                        if( localStorage.getItem('IDS') == null)
                                    {
                                    let names = []
                                    localStorage.setItem('IDS',JSON.stringify(names))

                                    }
                                    else
                                    {
                                        let ids = localStorage.getItem('IDS')
                                        let newids = JSON.parse(ids)
                                        
                                        resp.data.hits.map( id =>{
                                            for(let a=0;a<newids.length;a++)
                                            {
                                                let done = []
                                                if(id.objectID == newids[a])
                                                {
                                                        // console.log(id)
                                                }
                                                else
                                                {
                                                    if(newnews.includes(id) == false)
                                                    {
                                                        newnews.push(id)
                                                        done.push(id)
                                                    }
                                                }
                                            }
                                        })
                                        console.log(newnews)

                                        
                                    }

                            this.setState({
                                data:newnews
                            })
                        })
                        .catch(err => console.log(err))
                    }
                    delete = (id) =>{
                        
                        let newnews = []
                         this.state.data.map( element => {
                            if(id == element.objectID)
                            {
                                console.log(element)
                            }
                            else
                            {
                                newnews.push(element)
                            }
                        })
                        let ids = localStorage.getItem('IDS')
                        let arrayid = JSON.parse(ids)
                        arrayid.push(id)
                        localStorage.setItem('IDS',JSON.stringify(arrayid))
                        this.setState({
                            data:newnews
                        })
                    }

                    vote = (element) =>{
                            console.log(element)
                            let newar = []
                            this.state.data.map( (elem,index) =>{
                                if(elem.objectID == element)
                                {
                                    elem.points = Number(elem.points) + 1
                                    newar.push(elem)
                                }
                                else
                                {
                                    newar.push(elem)
                                }
                            })

                            this.setState({
                                    data:newar
                            })


                    }
      render() {
        return (
          <div style={{height:"100%"}}> 
                <Hnews deletefun={this.delete} data={this.state} vote={this.vote}/>
                <div className="col-12 justify-content-end d-flex">
                            <button className="btn" style={{color:"#ff6600"}} onClick={this.previous}>Previous</button>
                            <button disabled style={{color:"#ff6600"}} className="btn">|</button>
                            <button className="btn" style={{color:"#ff6600"}} onClick={()=>{
                                console.log('hi')
                                this.setState({
                                    pageno: this.state.pageno + 1
                                },()=>this.componentDidMount())
                            }}>Next</button>
                </div>
          </div>
        );
      }
    }
    