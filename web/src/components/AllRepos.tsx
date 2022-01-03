import { Icon, Col, Navbar, NavItem } from 'react-materialize';
import 'materialize-css';
import React, { Component } from 'react';
import API from '../utils/API';
import RepoContainer from './RepoContainer';

class AllRepos extends Component {
  state: any = {
    repos: [],
    languages: [],
    langSelect: '',
  };

  componentDidMount() {
    this.getRepos();
  }

  componentDidUpdate() {
    this.renderNav();
    this.showRepos();
  }

  getRepos = async () => {
    let pulledRepos: any = await API.getRepos();
    let allLanguages: Array<string> = [];
    pulledRepos.data.allRepos.forEach((repo: any) => {
      if (allLanguages.indexOf(repo.language) === -1) {
        allLanguages.push(repo.language);
      }
    });
    this.setState({ repos: pulledRepos.data, languages: allLanguages });
  };

  setLanguage = (lang: string) => {
    this.setState({ langSelect: lang });
  };

  renderNav = () => {
    return (
      <Navbar
        alignLinks="right"
        brand={<div>Filter by language</div>}
        menuIcon={<Icon>menu</Icon>}
        className="blue-grey darken-3"
        options={{
          edge: 'left',
          inDuration: 250,
          preventScrolling: true,
          outDuration: 200,
        }}
      >
        <NavItem key={8675309} onClick={() => this.setLanguage('')}>
          None
        </NavItem>
        {this.state.languages.map((language: string, i: number) => {
          return (
            <NavItem
              key={i}
              className={`${language}-toggle`}
              onClick={() => {
                this.setState({ langSelect: language }
                )
              }}
            >
              {language}
            </NavItem>
          );
        })}
      </Navbar>
    );
  };

  showRepos = () => {
    let calledRepos: any = this.state.repos;
    if (calledRepos.allRepos && this.state.langSelect === '') {
      return calledRepos.allRepos.map((repo: any, i: number) => {
        return (
          <RepoContainer
            fullName={repo.full_name}
            id={repo.id}
            description={repo.description}
            language={repo.language}
            forks={repo.forks}
            key={repo.id + (i + 1)}
          />
        );
      });
    } else if (calledRepos.allRepos && this.state.langSelect !== '') {
      return calledRepos.allRepos.map((repo: any, i: number) => {
        if (repo.language === this.state.langSelect) {
          return (
            <RepoContainer
              fullName={repo.full_name}
              id={repo.id}
              description={repo.description}
              language={repo.language}
              forks={repo.forks}
              key={repo.id + (i + 1)}
            />
          );
        }
      });
    } else {
      return <div>Loading...</div>;
    }
  };

  render() {
    return (
      <Col m={10} s={12} offset={'m1'}>
        {this.renderNav()}
        {this.showRepos()}
      </Col>
    );
  }
}

export default AllRepos;
