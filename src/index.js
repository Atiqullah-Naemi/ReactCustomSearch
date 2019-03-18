import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Container, Row, Col, Input, Table } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";

class App extends Component {
   state = {
      users: [],
      searchTerm: ""
   };

   onChange = e => {
      this.setState({
         searchTerm: e.target.value
      });
   };

   getData = async () => {
      const getUrl = await fetch("https://jsonplaceholder.typicode.com/users");
      const response = await getUrl.json();

      this.setState({
         users: response
      });
   };

   componentDidMount() {
      this.getData();
   }

   render() {
      const { searchTerm } = this.state;
      const filteredUsers = this.state.users.filter(user => {
         return (
            user.name
               .toLowerCase()
               .indexOf(searchTerm.toString().toLowerCase()) !== -1
         );
      });

      return (
         <Container className="app" style={{ marginTop: "50px" }}>
            <Row>
               <Col md={12} style={{ margin: "15px 0 15px 0" }}>
                  <Input
                     onChange={this.onChange}
                     type="text"
                     name="search"
                     placeholder="Search"
                  />
               </Col>
            </Row>
            <Row>
               <Table size="sm">
                  <thead>
                     <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>City</th>
                     </tr>
                  </thead>
                  <tbody>
                     {filteredUsers.map((user, index) => {
                        return (
                           <tr key={index}>
                              <td>{user.name}</td>
                              <td>{user.email}</td>
                              <td>{user.address.city}</td>
                           </tr>
                        );
                     })}
                  </tbody>
               </Table>
            </Row>
         </Container>
      );
   }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
