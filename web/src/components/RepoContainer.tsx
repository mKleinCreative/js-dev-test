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
    commitAuthor: 'No commit history',
    commitDate: '',
  };
  static defaultProps: Partial<RepoContainerProps> = {
    fullName: '',
    state: {
      commitMessage: '',
      commitAuthor: 'No commit history',
      commitDate: '',
    },
  };

  componentDidMount() {
    this.getCommits(this.props.fullName);
  }

  getCommits = async (fullName: string) => {
    let commits = await API.getCommits(fullName);
    let relevantInfo: any = [
      commits.author.name,
      commits.author.date,
      commits.message,
    ];
    this.setState({
      commitMessage: relevantInfo[2],
      commitAuthor: relevantInfo[0],
      commitDate: relevantInfo[1],
    });
  };

  render() {
    const { fullName, id, description, language, forks } = this.props;
    return (
      <Card
        title={`${fullName}`}
        className="blue-grey darken-1"
        closeIcon={<Icon>close</Icon>}
        key={id}
        reveal={
          (
            <div>
              <div>{this.state.commitAuthor}</div>
              <div>{this.state.commitDate}</div>
              <br />
              <div>{this.state.commitMessage}</div>
              <br />
            </div>
          ) || <div>""</div>
        }
        revealIcon={<Icon>description</Icon>}
      >
        {description || 'No description given'}
        <br />
        Primary Language: {language}
        <br />
        Forks: {forks}
      </Card>
    );
  }
}

export default RepoContainer;
