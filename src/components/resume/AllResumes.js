import React, { Component } from "react";
import { Segment, Grid } from 'semantic-ui-react';
import "../../App.css";
import Top_tile from "../Top_tile";
import Scrolling_tile from "../Scrolling_tile";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';


class AllResumes extends Component {

    constructor() {
        super();
        this.state = {
          resumes_2020: [],
          resumes_2019: [],
          response: '',
          responseToPost: '',
        }
      }
    
      componentDidMount = () => {
        fetch('/api/getAllResumes/senior/2020')
        .then(res => res.json())
        .then(
          (result) => {
            console.log("type of result " + typeof(result))
            console.log(result);  
            this.setState({
              resumes_2020: result
            });
          },
         
          (error) => {
            console.log("error is " + error);
          }
        )

        fetch('/api/getAllResumes/senior/2019')
        .then(res => res.json())
        .then(
          (result) => {
            console.log("type of result " + typeof(result))
            console.log(result);  
            this.setState({
              resumes_2019: result
            });
          },
         
          (error) => {
            console.log("error is " + error);
          }
        )

      }
    
    
      createResumeCard = (resume, key) => {
        return (
            <Grid.Column>
                <Scrolling_tile name={ resume.name } 
                                class={ resume.class } 
                                index={ key + 1 }
                                pic={ resume.profilePicUrl }
                />
            </Grid.Column>
        )
      }
    
      render2020Resumes = (resumes) => {
        resumes = this.state.resumes_2020
        let gridValues = []
        if (Array.isArray(resumes)) {
          resumes.forEach((i) => {
            gridValues.push(this.createResumeCard(i, gridValues.length - 1))
          })
        } else if (resumes.length === 1) {
            gridValues.push(this.createResumeCard(resumes, 0))
        } else {
          return (
            <div>
              <p>none</p>
            </div>
            
          )
        }
        return gridValues
      }

      render2019Resumes = (resumes) => {
        resumes = this.state.resumes_2019
        let gridValues = []
        if (Array.isArray(resumes)) {
          resumes.forEach((i) => {
            gridValues.push(this.createResumeCard(i, this.state.resumes_2020.length + gridValues.length - 1))
          })
        } else if (resumes.length === 1) {
            gridValues.push(this.createResumeCard(resumes, 0))
        } else {
          return (
            <div>
              <p>none</p>
            </div>
            
          )
        }
        return gridValues
      }

    render() {
        return (
            <div className="App" id="all_resumes">
                <Segment vertical textAlign="center">

                    {/* seniors */}
                    <div className="year_header" id="2020">
                        <h4 className="classYear">2020</h4>
                    </div>
                    <Grid columns={5} relaxed>
                        { this.render2020Resumes() }
                    </Grid>

                    <br></br>
                    <br></br>

                    {/* alums */}
                    <div className="year_header" id="2019">
                        <h4 className="classYear">2019</h4>
                    </div>
                    <Grid columns={5} relaxed>
                        { this.render2019Resumes() }
                    </Grid>

                </Segment>

            </div>
        );
    }

}

export default AllResumes;