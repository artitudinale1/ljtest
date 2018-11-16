import React from "react";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DownshiftMultiple from "./AssetsFilterAlternate";
import { assetsActions } from "../actions";

const Suggestions = props => {
  console.log(props.results);
  const options = props.results.map((r, i) => <li key={i}>{r}</li>);
  return <ul>{options}</ul>;
};

class AssetsFilter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      textInput: null,
      results: []
    };
    this.addFilter = this.addFilter.bind(this);
  }
  addFilter = (label, option) => {
    this.props.addFilter(label, option);
  };

  removeFilter = (label, option) => {
    this.props.removeFilter();
  };

  getInfo = t => {
    let suggestion = [];
    this.props.option.map(function(o) {
      if (o.toLowerCase().search(t.toLowerCase()) !== -1) {
        suggestion.push(o);
      }
    });
    this.setState({
      results: suggestion
    });
  };

  handleInputChange = event => {
    let target = event.currentTarget;
    this.setState(
      {
        textInput: target.value
      },
      () => {
        if (this.state.textInput && this.state.textInput.length > 0) {
          // if (this.state.textInput.length % 2 === 0) {
          this.getInfo(this.state.textInput);
          //  }t
        }
      }
    );
  };

  render() {
    return (
      <div className="filter-component">
        <Grid container spacing={8} direction="row">
          <Grid item xs={3}>
            <p>{this.props.label}</p>
          </Grid>
          <Grid item xs={3}>
            <DownshiftMultiple
              option={this.props.option}
              label={this.props.label}
              addFilter={this.props.addFilter}
            />
          </Grid>
          <Grid item xs={3} />
          <Grid item xs={3}>
            <Button variant="outlined" onClick={this.props.removeFilter}>
              Clear this Filter
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addFilter: (label, option) => {
      dispatch(assetsActions.addFilter(label, option));
    },
    removeFilter: () => {
      dispatch(assetsActions.removeFilter());
    }
  };
};

const connectedAssetsFilter = connect(
  null,
  mapDispatchToProps
)(AssetsFilter);
export { connectedAssetsFilter as AssetsFilter };
