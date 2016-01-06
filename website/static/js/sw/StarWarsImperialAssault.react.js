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
      return "none";
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
      newTiles = this.state.nextTiles.slice();

      this.state.currentTiles.map(
        (tile, idx) => {
          var index = newTiles.indexOf(tile);
          if (index === -1) {
            tilesToRemove.push(tile);
            return;
          }

          tilesToKeep.push(tile);
          newTiles.splice(index, 1);
        }
      );
    } else {
      newTiles = this.state.currentTiles;
    }

    return(
      <div>
        <img src="/static/images/sw/swia-logo.png" className="base-logo" />
        <div className="base-margin-bottom-12">
          <div className="base-margin-bottom-8">
            Current Mission:
            <SWTypeahead 
              data={SWData}
              inputName="current_mission" 
              onSelect={this._onCurrentSelect}
              searchKey="name"
            />
          </div>
          <div>
            Next Mission:
            <SWTypeahead 
              data={SWData}
              inputName="next_mission" 
              onSelect={this._onNextSelect}
              searchKey="name"
            />
          </div>
        </div>
        <div>
          <div className="base-tiles">
            <div className="base-tileList">
              <strong>Tiles to Keep: </strong>{this._toFormattedMarkup(tilesToKeep)}
            </div>
            <div className="base-tileList">
              <strong>New Tiles: </strong>{this._toFormattedMarkup(newTiles)}
            </div>
            <div className="base-tileList">
              <strong>Tiles to Remove: </strong>{this._toFormattedMarkup(tilesToRemove)}
            </div>
          </div>
        </div>
        <div className="clearfix" />
        <div className="base-guides">
          <div className="base-guideTitle">
            Game Guides
          </div>
          <div className="base-guideRow">
            Special thanks to Kush Gulati of BoardGameGeek: 
            <br />
            <a 
              href="https://boardgamegeek.com/filepage/117642/campaign-tile-guide"
              target="_blank">
              See Campaign Tile Guide
            </a>
          </div>
          <div className="base-guideRow">
            Special thanks to Timothy Gallagher of BoardGameGeek: 
            <br />
            <a
              href="https://boardgamegeek.com/filepage/111657/imperial-assault-core-set-terrain-tile-finder"
              target="_blank">
              See Tile Finder
            </a>
          </div>
        </div>
      </div>
    );
  }
});
