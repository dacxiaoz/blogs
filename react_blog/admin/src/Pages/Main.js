import React from 'react'
import {BrowserRouter as Router,Route} from 'react-router-dom'
import Login from './Login'
import AdminIndex from './AdminIndex'
function Main(props){
    return(
        <Router>
            <Route path="/" exact component={Login} />
            {/* 子路由匹配 不能加 exact 否则无法显示 */}
            <Route path="/index/" component={AdminIndex}> 
                {props.children}
            </Route>
        </Router>
    )
}

export default Main