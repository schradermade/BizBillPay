import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { } from '@fortawesome/free-solid-svg-icons';

class App extends Component {
  state = {
    isLoading : false,
    bills: [
      {
        'id' : '1',
        'Bill' : 'Newberg Water',
        'BillLink' : 'https://www.newbergoregon.gov/finance/page/how-pay-your-water-bill',
        'Paid' : false
      }
    ]
  }

  remove(id) {
    let updatedBills = [...this.state.bills].filter (i => i.id !== id)
    this.setState({ bills : updatedBills });
  }

  redirectToBill(id) {
    let bill = [...this.state.bills].filter (i => i.id === id);
    let url = bill[0].BillLink;
    window.open(url);
  }

  billPaid(id) {
    let bill = this.state.bills.filter (i => i.id === id);
    bill[0].Paid = true;
    let updatedBills = [...this.state.bills];
    this.setState({ bills : updatedBills });
  }

  async componentDidMount() {
    const response = await fetch();
    const body = await response.json(0);
      this.setState({ bills: body, isLoading: false })
  }

}