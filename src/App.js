import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faFileInvoiceDollar, faHandshake } from '@fortawesome/free-solid-svg-icons';

class App extends Component {
  state = {
    isLoading : false,
    bills: [
      {
        'id' : '1',
        'BillName' : 'Newberg Water',
        'BillLink' : 'https://www.newbergoregon.gov/finance/page/how-pay-your-water-bill',
        'DatePaid' : '3/5/2021',
        'Paid' : false
      },
      {
        'id' : '1',
        'BillName' : 'PGE',
        'BillLink' : 'https://www.newbergoregon.gov/finance/page/how-pay-your-water-bill',
        'DatePaid' : '3/5/2021',
        'Paid' : false
      },
      {
        'id' : '1',
        'BillName' : 'ArrowHead Insurance',
        'BillLink' : 'https://www.newbergoregon.gov/finance/page/how-pay-your-water-bill',
        'DatePaid' : '3/5/2021',
        'Paid' : false
      },
      {
        'id' : '1',
        'BillName' : 'NW Natural Gas',
        'BillLink' : 'https://www.newbergoregon.gov/finance/page/how-pay-your-water-bill',
        'DatePaid' : '3/5/2021',
        'Paid' : false
      },
      {
        'id' : '1',
        'BillName' : 'Lease Payment',
        'BillLink' : 'https://www.newbergoregon.gov/finance/page/how-pay-your-water-bill',
        'DatePaid' : '3/5/2021',
        'Paid' : false
      },
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

  // async componentDidMount() {
  //   const response = await fetch();
  //   const body = await response.json(0);
  //     this.setState({ bills: body, isLoading: false })
  // }

  render() {
    const isLoading = this.state.isLoading;
    const allBills = this.state.bills;
    const unPaid = this.state.bills;
    const paid = this.state.bills;

    if (isLoading) {
      return(
        <div>Loading...</div>
      );
    }
    //unPaid Bills
    let unPaidBills =
    unPaid.map(bill => {
      if (bill.Paid === false) {
      return <tr key={bill.Id}>
              <td>{bill.BillName}</td>
              <td><Button className='btn btn-lg btn-warning' onClick={() => this.redirectToBill(bill.id)}> <FontAwesomeIcon icon={faFileInvoiceDollar} /></Button></td>
              <td><Button className='btn btn-lg btn-success' onClick={() => this.billPaid(bill.id)}> <FontAwesomeIcon icon={faHandshake} /></Button></td>
            </tr>
        }
      }  
    )

    //Paid Bills
    let paidBills =
    paid.map(bill => {
      if (bill.Paid === true ) {
        return <tr key={bill.Id}>
                  <td>{bill.BillName}</td>
                  <td>{bill.BillLink}</td>
                  <td>{bill.DatePaid}</td>
                </tr>
        }
      }
    )

    return (
      <>
        <div className='row'>
          <div className='col-12'>
            <h1 className='center text-center'>Small Business Bill Tracker</h1>
          </div>
        </div>

        {/* UN-PAID BILLS TABLE */}
        <div className='container border border-secondary rounded center'>
          <div className='row'>
            <div className='center text-center'>
              <Table dark responsive striped bordered hover>
                <thead>
                  <tr>
                  <th colSpan='8'>UnPaid Bills</th>
                  </tr>
                  <tr>
                    <th>Bill Name</th>
                    <th>Bill Link</th>
                    <th>Mark Paid</th>
                  </tr>
                </thead>
                <tbody>
                  { this.state.bills.length === 0 ? <td colSpan='8'>No unpaid bills.</td> : unPaidBills}
                </tbody>
              </Table>
            </div>
          </div>
        </div>

        {/* PAID BILLS TABLE */}
        <div className='container border border-secondary rounded center'>
          <div className='row'>
            <div className='center text-center'>
              <Table dark responsive striped bordered hover>
                <thead>
                <tr>
                  <th colSpan='8'>Paid Bills</th>
                </tr>
                  <tr>
                    <th>Bill Name</th>
                    <th>Bill Link</th>
                    <th>Date Paid</th>
                  </tr>
                </thead>
                <tbody>
                  { this.state.bills.length === 0 ? <td colSpan='8'>No unpaid bills.</td> : paidBills}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </>
    
    );
  }
}

export default App;