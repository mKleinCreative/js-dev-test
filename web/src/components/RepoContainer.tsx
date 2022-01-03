import React, { Component } from 'react';
import { Card, Icon } from 'react-materialize';
import 'materialize-css';
import API from '../utils/API';

interface RepoContainerProps {
  props: any;
  fullName: string;
  id: number;
  description: string;
  language: string;
  forks: number;
  state: {
    commitMessage: string;
    commitAuthor: string;
    commitDate: any;
  };
}

class RepoContainer extends Component<RepoContainerProps, {}> {
  constructor(props: any) {
    super(props);
  }
  state = {
    commitMessage: '',
    commitAuthor: '',    commitDate: '',
  };
  static defaultProps: Partial<RepoContainerProps> = {
    fullName: '',
    state: {
      commitMessage: '',
      commitAuthor: '',
      commitDate: '',
    },
  };

  getCommits = async (fullName: string) => {
    let commits = await API.getCommits(fullName);
    this.setState({
        commitMessage: commits.message,
        commitAuthor: commits.author.name,
        commitDate: commits.author.date,
    });
  };

  render() {
    const { fullName, id, description, language, forks } = this.props;
    return (
      <Card
        title={`${fullName}`}
        className="blue-grey lighten-1"
        closeIcon={<Icon>close</Icon>}
        key={id}
        reveal={
          (
            <div>
              <div>Author: {this.state.commitAuthor}</div>
              <div>Date: {this.state.commitDate}</div>
              <br />
              <div>Detais: {this.state.commitMessage}</div>
            </div>
          ) || <div>""</div>
        }
        revealIcon={
            <Icon
                onClick={() => this.getCommits(fullName)}
            >
                description
            </Icon>
        }
      >
        {description || 'No information for the current repo given'}
        <br />
        Primary Language: {language}
        <br />
        Forks: {forks}
      </Card>
    );
  }
}

export default RepoContainer;
