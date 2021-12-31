import { Card, Icon, Col, Navbar, NavItem } from 'react-materialize';
import 'materialize-css'
import React, { Component } from 'react';
import API from '../utils/API';

class AllRepos extends Component {
    state:any = {
        repos: [],
        languages: [],
        langSelect: ""
    };

    componentDidMount() {
        this.getRepos();
    }

    componentDidUpdate() {
        this.renderNav();
        this.showRepos();
    }

    getRepos = async () => {
        let pulledRepos:any = await API.getRepos()
        let allLanguages:any = []
        pulledRepos.data.allRepos.forEach((repo: any) => {
            console.log(repo.language)
            if (allLanguages.indexOf(repo.language) === -1) {
                allLanguages.push(repo.language)
            }
        })
        this.setState({repos: pulledRepos.data, languages: allLanguages})
        console.log(this.state)
    }

    setLanguage = (lang:any) => {
        this.setState({langSelect: lang})
    }

    renderNav = () => {
        return (
            <Navbar
                alignLinks="right"
                menuIcon={<Icon>Filter by Language</Icon>}
                options={{
                    edge: 'left',
                    inDuration: 250,
                    preventScrolling: true,
                    outDuration: 200
                }}
            >
                <NavItem
                    key={8675309}
                    onClick={this.setLanguage}
                >
                    None
                </NavItem>
                {this.state.languages.map((language:string, i:number) => {
                    return (
                        <NavItem 
                            key={i}
                            onClick={() => this.setState({langSelect: language})}
                            >
                            {language}
                        </NavItem>
                    )
                }
                )}
            </Navbar>
        )
    }

    showRepos = () => {
        let calledRepos: any = this.state.repos
        if (calledRepos.allRepos && this.state.langSelect === "") {
            return calledRepos.allRepos.map((repo:any, i:number) => {
                return (
                    <Card
                        title={`${repo.full_name}`}
                        className="blue-grey darken-1"
                        closeIcon={<Icon>closeIcon</Icon>}
                        key={repo.id}
                    >
                        {repo.description || "No description given"}<br />
                        Primary Language: {repo.language}<br/>
                        Forks: {repo.forks}
                    </Card>
                )
            })
        } else if (calledRepos.allRepos && this.state.langSelect !== "") {
            return calledRepos.allRepos.map((repo: any, i: number) => {
                if (repo.language === this.state.langSelect) {
                    return (
                        <Card
                            title={`${repo.full_name}`}
                            className="blue-grey darken-1"
                            closeIcon={<Icon>closeIcon</Icon>}
                            key={repo.id}
                        >
                            {repo.description || "No description given"}<br />
                            Primary Language: {repo.language}<br />
                            Forks: {repo.forks}
                        </Card>
                    )
                }
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
                    {this.renderNav()}
                    {this.showRepos()}
            </Col>
        )
    }
}

export default AllRepos