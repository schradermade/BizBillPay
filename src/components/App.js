import React, { Component, useEffect } from 'react';
import { v4 } from 'uuid';
import '../App.css';
import NewBill from './NewBill.js';
import { Table, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileInvoiceDollar, faHandshake, faHandshakeSlash, faAddressCard } from '@fortawesome/free-solid-svg-icons';
import Amplify, { API } from 'aws-amplify';
import config from '../aws-exports';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';

Amplify.configure(config);

class App extends Component {

  state = {
    isLoading : false,
    bills: [
      {
        'id' : v4(),
        'BillName' : 'Newberg Water',
        'BillLink' : 'https://www.newbergoregon.gov/finance/page/how-pay-your-water-bill',
        'DatePaid' : '3/5/2021',
        'DueDate' : '4/5/2021',
        'Paid' : false,
        'Phone' : "503-555-5555",
        'Address' : '1234 Main St',
        'Unit' : '',
        'City' : 'Tigard',
        'State' : 'Oregon',
        'Zip' : '97062',
        'ContactShow' : false,
        'Notes' : 'Card on file'
      },
      {
        'id' : v4(),
        'BillName' : 'PGE',
        'BillLink' : 'https://www.newbergoregon.gov/finance/page/how-pay-your-water-bill',
        'DatePaid' : '3/5/2021',
        'DueDate' : '4/5/2021',
        'Paid' : false,
        'Phone' : "503-555-5555",
        'Address' : '1234 Main St',
        'Unit' : '',
        'City' : 'Tigard',
        'State' : 'Oregon',
        'Zip' : '97062',
        'ContactShow' : false,
        'Notes' : 'Card on file'
      },
      {
        'id' : v4(),
        'BillName' : 'ArrowHead Insurance',
        'BillLink' : 'https://www.newbergoregon.gov/finance/page/how-pay-your-water-bill',
        'DatePaid' : '3/5/2021',
        'DueDate' : '4/5/2021',
        'Paid' : false,
        'Phone' : "503-555-5555",
        'Address' : '1234 Main St',
        'Unit' : '40',
        'City' : 'Tigard',
        'State' : 'Oregon',
        'Zip' : '97062',
        'ContactShow' : false,
        'Notes' : 'Card on file'
      },
      {
        'id' : v4(),
        'BillName' : 'NW Natural Gas',
        'BillLink' : 'https://www.newbergoregon.gov/finance/page/how-pay-your-water-bill',
        'DatePaid' : '3/5/2021',
        'DueDate' : '4/5/2021',
        'Paid' : false,
        'Phone' : "503-555-5555",
        'Address' : '1234 Main St',
        'Unit' : 'B5',
        'City' : 'Tigard',
        'State' : 'Oregon',
        'Zip' : '97062',
        'ContactShow' : false,
        'Notes' : 'Card on file'
      },
      {
        'id' : v4(),
        'BillName' : 'Lease Payment',
        'BillLink' : 'https://www.newbergoregon.gov/finance/page/how-pay-your-water-bill',
        'DatePaid' : '3/5/2021',
        'DueDate' : '4/5/2021',
        'Paid' : false,
        'Phone' : "503-555-5555",
        'Address' : '1234 Main St',
        'Unit' : '200',
        'City' : 'Tigard',
        'State' : 'Oregon',
        'Zip' : '97062',
        'ContactShow' : false,
        'Notes' : 'Card on file'
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

  contactClick(id) {
    let bill = this.state.bills.filter (i => i.id === id);
    let currentState = bill[0].ContactShow;
    bill[0].ContactShow = !currentState;
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
                <td>{bill.Notes}</td>

                <td><Button className='btn btn-lg btn-warning' 
                  onClick={() => this.redirectToBill(bill.id)}>
                  <FontAwesomeIcon icon={faFileInvoiceDollar} /></Button></td>

                <td><Button className='btn btn-lg btn-success' 
                  onClick={() => this.billPaid(bill.id)}>
                  <FontAwesomeIcon icon={faHandshake} /></Button></td>

                <td><Button className='btn btn-lg btn-info' 
                onClick={() => this.contactClick(bill.id)}>
                <FontAwesomeIcon icon={faAddressCard} /></Button></td>

                { bill.ContactShow === true ? 
                <td className='center text-left'> 
                  <strong>Phone</strong><br/>
                  {bill.Phone}<br/><br/>
                  <strong>Address</strong><br/>
                  {bill.Address}<br/><br/>
                  <strong>Unit</strong><br/>
                  {bill.Unit}<br/><br/>
                  <strong>City, State, Zip</strong><br/>
                  {bill.City}, {bill.State} {bill.Zip}<br/><br/>
                  </td> : null }

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
                <td>{bill.Notes}</td>

                <td><Button className='btn btn-lg btn-warning' 
                onClick={() => this.redirectToBill(bill.id)}>
                <FontAwesomeIcon icon={faFileInvoiceDollar} /></Button></td>

                <td><Button className='btn btn-lg btn-success' 
                onClick={() => this.reverse(bill.id)}>
                <FontAwesomeIcon icon={faHandshakeSlash} /></Button></td>

                <td><Button className='btn btn-lg btn-info' 
                onClick={() => this.contactClick(bill.id)}>
                <FontAwesomeIcon icon={faAddressCard} /></Button></td>
                { bill.ContactShow === true ? 
                <td className='center text-left'> 
                  <strong>Phone</strong><br/>
                  {bill.Phone}<br/><br/>
                  <strong>Address</strong><br/>
                  {bill.Address}<br/><br/>
                  <strong>Unit</strong><br/>
                  {bill.Unit}<br/><br/>
                  <strong>City, State, Zip</strong><br/>
                  {bill.City}, {bill.State} {bill.Zip}<br/><br/>
                  </td> : null }
              </tr>
              
        }
      }
    )

    return (
      <>
      <AmplifySignOut/>
      <div className={ isBackgroundGreen ? 'background-green' : 'background-red' }>

        {/* UN-PAID BILLS TABLE */}
        <div className='container center'>
          <br/>
          <h1 style={{color: 'white'}} className='center text-left'>billtrakk</h1>
          <h5 style={{color: 'silver'}}>a place where bills get organized</h5>
          <br/>
          <div className='row'>
            <div className='center text-center'>
              <Table dark responsive striped bordered hover>
                <thead>
                  <tr>
                  <th className='center text-left' colSpan='8'>UNPAID</th>
                  </tr>
                  <tr>
                    <th>Bill Name</th>
                    <th>Due Date</th> 
                    <th>Notes</th>
                    <th>Bill Link</th>
                    <th>Mark Paid</th>
                    <th><small>(click to show)<br/></small>Show Contact</th>
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
        <div className='container center'>
          <div className='row'>
            <div className='center text-center'>
              <Table className='border border-white' dark responsive striped bordered hover>
                <thead>
                <tr>
                  <th className='center text-left' colSpan='8'>PAID</th>
                </tr>
                  <tr>
                    <th>Bill Name</th>
                    <th>Due Date</th>
                    <th>Date Paid</th>
                    <th>Notes</th>
                    <th>Bill Link</th>
                    <th>Reverse</th>
                    <th><small>(click to show)<br/></small>Show Contact</th>
                    
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
      {/* <NewBill /> */}
      </>
    
    );
  }
}

export default withAuthenticator(App);