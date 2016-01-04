var PropTypes = React.PropTypes;

var  SWTypeahead = React.createClass({
  propTypes: {
    inputName: PropTypes.string,
    onSelect: PropTypes.func,
    data: PropTypes.array.isRequired,
    searchKey: PropTypes.string.isRequired,
  },

  getDefaultProps: function() {
    return {
      onSelect: () => {},
    };
  },

  getInitialState: function() {
    return {
      possibleData: [],
    };
  },

  _onClick: function() {
    this.refs.typeahead.value = "";
    this.props.onSelect(null);
  },

  _onChange: function(e) {
    if (e.target.value === "") {
      this.setState({possibleData: []});
      return;
    }
    var possibleData = this.props.data.filter(
      data => data[this.props.searchKey].toLowerCase().includes(e.target.value.toLowerCase())
    );
    
    this.setState({possibleData});
  },

  _onResultClick: function(data) {
    this.setState({possibleData: []});
    this.refs.typeahead.value = data[this.props.searchKey];
    this.props.onSelect(data);
  },

  render: function() {
    var results = null;
    if (this.state.possibleData.length) {
      results =
        <div>
          <ul className="typeahead-resultList">
            {this.state.possibleData.map(
              (data, idx) => 
                <li 
                  className="typeahead-result"
                  onClick={() => this._onResultClick(data)}>
                  {data[this.props.searchKey]}
                </li>
            )}
          </ul>
        </div>;
    }
    return(
      <div>
        <input 
          className="typeahead-typeahead"
          name={this.props.inputName} 
          onClick={this._onClick}
          onChange={this._onChange}
          ref="typeahead"
          type="text" 
        />
        {results}
      </div>
    );
  }
});

StarWarsImperialAssault = React.createClass({
  getInitialState: function() {
    return {
      currentTiles: [],
      nextTiles: [],
    };
  },

  _onCurrentSelect: function(data) {
    if (!data) {
      this.setState({currentTiles: []});
      return;
    }
    this.setState({currentTiles: data.tiles});
  },

  _onNextSelect: function(data) {
    if (!data) {
      this.setState({nextTiles: []});
      return;
    }
    this.setState({nextTiles: data.tiles});
  },

  _toFormattedMarkup(arr) {
    if (!arr.length) {
      return "";
    }

    return arr.map(
      (tile, idx) => {
        var className;
        var modifier = "";
        if (idx % 2 === 0) {
          className = 'base-evenTile';
        } else {
          className = 'base-oddTile';
        }

        if (idx !== arr.length - 1) {
          modifier = ","
        }

        return (
          <span className={className}>
            {tile + modifier}
          </span>
        );
    });
  },

  render: function() {
    var tilesToKeep = [];
    var newTiles = []; 
    var tilesToRemove = [];
    if (this.state.nextTiles.length) {
      tilesToKeep = this.state.currentTiles.filter(
        tile => this.state.nextTiles.indexOf(tile) !== -1
      );
      newTiles = this.state.nextTiles.filter(
        tile => this.state.currentTiles.indexOf(tile) === -1
      );
      tilesToRemove = this.state.currentTiles.filter(
        tile => this.state.nextTiles.indexOf(tile) === -1
      );
    } else {
      newTiles = this.state.currentTiles;
    }

    var tilesToKeepMarkup = 
      tilesToKeep.length ?
      <div>Tiles to Keep: {this._toFormattedMarkup(tilesToKeep)}</div> :
      null;
    var newTilesMarkup = 
      newTiles.length ?
      <div>New Tiles: {this._toFormattedMarkup(newTiles)}</div>:
      null;
    var tilesToRemoveMarkup = 
      tilesToRemove.length ?
      <div>Tiles to Remove: {this._toFormattedMarkup(tilesToRemove)}</div>:
      null;
    return(
      <div>
        <div className="base-currentTypeahead">
          Current Mission:
          <SWTypeahead 
            data={SWData}
            inputName="current_mission" 
            onSelect={this._onCurrentSelect}
            searchKey="name"
          />
        </div>
        <div className="base-nextTypeahead">
          Next Mission:
          <SWTypeahead 
            data={SWData}
            inputName="next_mission" 
            onSelect={this._onNextSelect}
            searchKey="name"
          />
        </div>
        <div className="clearfix" />
        {tilesToKeepMarkup}
        {newTilesMarkup}
        {tilesToRemoveMarkup}
        <div>
          <a 
            href="http://files.geekdo.com/geekfile_download.php?filetype=application%2Fpdf&filename=Campaign+Tile+Guide+v3.0.pdf&filecode=svuew6rswl&validationcode=faabcfbe0379a0498d3249e4a2ff7cc9"
            target="_blank">
            See Campaign Tile Guide
          </a>
        </div>
      </div>
    );
  }
});
