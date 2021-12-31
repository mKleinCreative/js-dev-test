import React, { Component } from 'react';
import { Card, Icon, Col } from 'react-materialize';
import API from '../utils/API';


interface Repos {
    allRepos: [],
}
class AllRepos extends Component {
    state = {
        repos: [],
        langSelect: ""
    };

    componentDidMount() {
        this.getRepos();
    }

    componentDidUpdate() {
        this.showRepos();
    }

    getRepos = async () => {
        let pulledRepos = await API.getRepos()
        this.setState({repos: pulledRepos?.data})
        console.log(this.state);
        
    }

    showRepos = () => {
        interface Repo {
            id: number,
            fullName: string,
            language: string,
        }
        if (this.state.repos) {
            return this.state.repos.allRepos.map((repo:Repo, i:number) => {
                return (
                    <Card
                        title={`${repo.fullName}`}
                        className="blue-grey darken-1"
                        closeIcon={<Icon></Icon>}
                        key={`${repo.id}${i + 5}`}
                    >
                        Test
                    </Card>
                )
            })
        } else {
            return <div>Loading...</div>
        }
    }

    render(){
        return (
            <Col
                m={6}
                s={12}>
                    {this.showRepos()}
            </Col>
        )
    }
}

export default AllRepos