import {BrowserRouter as Router, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import Home from './components/Home';
import Family from './components/Family';

function App() {
    return (
        <Router>
            <Route path="/" exact component={Home}/>
            <Route path="/createfamily" component={Family}/>
        </Router>
    );
}

export default App;
