import React, { Component } from 'react';
import {
  TabContent, TabPane, Nav, NavItem, NavLink, Row, Col
} from 'reactstrap';
import classnames from 'classnames';
import SignInForm from './signIn';
import LogInForm from './logIn';
import './style.css';

class Forms extends Component {
  constructor() {
    super();

    this.state = {
      activeTab: '1'
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    return (
      <div className="forms-container">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              Sign in
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              Log in
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <SignInForm />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
                <LogInForm />
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    )
  }
}

export default Forms;