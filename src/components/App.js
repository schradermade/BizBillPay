import React, { Component } from 'react';
import { v4 } from 'uuid';
import '../App.css';
import { Table, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileInvoiceDollar, faHandshake, faHandshakeSlash, faAddressCard } from '@fortawesome/free-solid-svg-icons';

class App extends Component {

  state = {
    isLoading : false,
    bills: [
      {
        'id' : '1',
        'BillName' : 'Newberg Water',
        'BillLink' : 'https://www.newbergoregon.gov/finance/page/how-pay-your-water-bill',
        'DatePaid' : '3/5/2021',
        'DueDate' : '4/5/2021',
        'Paid' : false
      },
      {
        'id' : '2',
        'BillName' : 'PGE',
        'BillLink' : 'https://www.newbergoregon.gov/finance/page/how-pay-your-water-bill',
        'DatePaid' : '3/5/2021',
        'DueDate' : '4/5/2021',
        'Paid' : false
      },
      {
        'id' : '3',
        'BillName' : 'ArrowHead Insurance',
        'BillLink' : 'https://www.newbergoregon.gov/finance/page/how-pay-your-water-bill',
        'DatePaid' : '3/5/2021',
        'DueDate' : '4/5/2021',
        'Paid' : false
      },
      {
        'id' : '4',
        'BillName' : 'NW Natural Gas',
        'BillLink' : 'https://www.newbergoregon.gov/finance/page/how-pay-your-water-bill',
        'DatePaid' : '3/5/2021',
        'DueDate' : '4/5/2021',
        'Paid' : false
      },
      {
        'id' : '5',
        'BillName' : 'Lease Payment',
        'BillLink' : 'https://www.newbergoregon.gov/finance/page/how-pay-your-water-bill',
        'DatePaid' : '3/5/2021',
        'DueDate' : '4/5/2021',
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

  reverse(id) {
    let bill = this.state.bills.filter (i => i.id === id);
    bill[0].Paid = false;
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
    let unPaid = [...this.state.bills].filter (i => i.Paid === false)
    let paid = [...this.state.bills].filter (i => i.Paid === true)
    let isBackgroundGreen = unPaid.length === 0 ? true : false


    if (isLoading) {
      return(
        <div>Loading...</div>
      );
    }
    //unPaid Bills
    let unPaidBills =
    allBills.map(bill => {
      if (bill.Paid === false) {
      return  <tr key={bill.Id}>
                <td>{bill.BillName}</td>
                <td>{bill.DueDate}</td>

                <td><Button className='btn btn-lg btn-warning' 
                  onClick={() => this.redirectToBill(bill.id)}>
                  <FontAwesomeIcon icon={faFileInvoiceDollar} /></Button></td>

                <td><Button className='btn btn-lg btn-success' 
                  onClick={() => this.billPaid(bill.id)}>
                  <FontAwesomeIcon icon={faHandshake} /></Button></td>
              </tr>
        }
      }  
    )

    //Paid Bills
    let paidBills =
    allBills.map(bill => {
      if (bill.Paid === true ) {
      return  <tr key={bill.Id}>
                <td>{bill.BillName}</td>
                <td>{bill.DueDate}</td>
                <td>{bill.DatePaid}</td>

                <td><Button className='btn btn-lg btn-warning' 
                onClick={() => this.redirectToBill(bill.id)}>
                <FontAwesomeIcon icon={faFileInvoiceDollar} /></Button></td>

                <td><Button className='btn btn-lg btn-success' 
                onClick={() => this.reverse(bill.id)}>
                <FontAwesomeIcon icon={faHandshakeSlash} /></Button></td>
              </tr>
        }
      }
    )

    return (
      <>
      <div className={ isBackgroundGreen ? 'background-green' : 'background-red' }>

        {/* UN-PAID BILLS TABLE */}
        <div className='container border border-secondary rounded center'>
          <h1 className='center text-left'>Business Bill Tracker</h1>
          <div className='row'>
            <div className='center text-center'>
              <Table dark responsive striped bordered hover>
                <thead>
                  <tr>
                  <th className='center text-left' colSpan='8'>UnPaid Bills</th>
                  </tr>
                  <tr>
                    <th>Bill Name</th>
                    <th>Due Date</th> 
                    <th>Bill Link</th>
                    <th>Mark Paid</th>
                  </tr>
                </thead>
                <tbody>
                  { unPaid.length === 0 ? <td colSpan='8'>No unpaid bills.</td> : unPaidBills}
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
                  <th className='center text-left' colSpan='8'>Paid Bills</th>
                </tr>
                  <tr>
                    <th>Bill Name</th>
                    <th>Due Date</th>
                    <th>Date Paid</th>
                    <th>Bill Link</th>
                    <th>Reverse</th>
                  </tr>
                </thead>
                <tbody>
                  { paid.length === 0 ? <td colSpan='8'>No unpaid bills.</td> : paidBills}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
      </>
    
    );
  }
}

export default App;