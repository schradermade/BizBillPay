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
}