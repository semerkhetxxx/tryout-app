import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { connect } from 'react-redux';
import HomeComp from './pages/HomeComp.js';
import { AddRecordComp } from './pages/AddRecordComp.js';
import { EditRecordComp } from './pages/EditRecordComp.js';
import AllRecordFormComp from './pages/AllRecordFormComp.js';
import UVRecordComp from './pages/UVRecordComp.js';

class App extends Component {

  componentDidMount(){
    this.props.initAQIData();
  };

  render() {
    
    return (
      <Router>

        <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
          <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
            <span className="navbar-brand col-sm-3 col-md-2 mr-0" href="#">React Tutorial</span>
          </nav>

          <div className="container-fluid">
            <div className="row">
              <nav className="col-md-2 d-none d-md-block bg-light sidebar">
                <div className="sidebar-sticky">
                  <ul className="nav flex-column">
                    <li className="nav-item">
                      <Link className="nav-link active" to='/'>Home</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to='/add'>Add Record</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to='/form'>Records Form</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to='/uv' onClick={ this.props.queryUVData }>UV data</Link>
                    </li>
                  </ul>
                </div>
              </nav>

              <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
                <Switch>
                  <Route path='/' exact component={HomeComp} />
                  <Route path='/add' component={AddRecordComp} />
                  <Route path='/edit' component={EditRecordComp} />
                  <Route path='/form' component={AllRecordFormComp} />
                  <Route path='/uv' component={UVRecordComp} />
                </Switch>
              </main>
            </div>
          </div>

        </div>
      </Router>
    );
  };
}

const mapDispatchToProps = dispatch => ({
    initAQIData: () => dispatch({
      type: 'initAQIDataSaga',
    }),
    queryUVData: () => dispatch({
      type: 'queryUVListSaga',
    }),
});
        
const AppRoot = connect(null, mapDispatchToProps) (App); 

export default AppRoot;
