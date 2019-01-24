import React, { Component } from 'react';
import {
    Container,
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
} from 'reactstrap';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Forms from '../forms';
import Home from '../home';
import Weather from '../weather';
import './style.css';

class Header extends Component {
    constructor() {
        super();

        this.state = {
            isOpen: false,
            activePage: 'home',
        };

        this.toggle = this.toggle.bind(this);
        this.headerAddActiveLink = this.headerAddActiveLink.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    headerAddActiveLink = event => {
        const name = event.target.name;
        this.setState({ 'activePage': name });
    };
    render() {
        return (
            <Router>
                <div>
                    <header className="header">
                        <Container>
                            <Navbar expand='md'>
                                <Link
                                    className='header-nav__logo'
                                    onClick={this.headerAddActiveLink}
                                    name='home'
                                    to='/'>
                                    <img src='./img/logo.png' alt='' />
                                    nord weather
                            </Link>
                                <NavbarToggler onClick={this.toggle} />
                                <Collapse isOpen={this.state.isOpen} navbar>
                                    <Nav className='ml-auto' navbar>
                                        <NavItem>
                                            <Link
                                                onClick={this.headerAddActiveLink}
                                                name='home'
                                                className={(this.state.activePage === 'home') ? 'header-nav__link active' : 'header-nav__link'}
                                                to='/'>
                                                Home
                                        </Link>
                                        </NavItem>
                                        <NavItem>
                                            <Link
                                                onClick={this.headerAddActiveLink}
                                                name='weather'
                                                className={(this.state.activePage === 'weather') ? 'header-nav__link active' : 'header-nav__link'}
                                                to='/weather'>
                                                Weather
                                        </Link>
                                        </NavItem>
                                        <NavItem>
                                            <Link
                                                onClick={this.headerAddActiveLink}
                                                name='forms'
                                                className={(this.state.activePage === 'forms') ? 'header-nav__link active' : 'header-nav__link'}
                                                to='/forms'>
                                                Sign in/ Log in
                                        </Link>
                                        </NavItem>
                                    </Nav>
                                </Collapse>
                            </Navbar>
                        </Container>
                    </header>
                    <div className="routs">
                        <Route exact path='/' component={Home} />
                        <Route exact path='/weather' component={Weather} />
                        <Route path='/forms' component={Forms} />
                    </div>
                </div>
            </Router>
        );
    }
}

export default Header;