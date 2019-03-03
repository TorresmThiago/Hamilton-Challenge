import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { listCustomers, listCustomersWeather } from '../../actions';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

import Header from '../../components/header/';
import Footer from '../../components/footer/';
import CustomerListHeader from '../../components/customerListHeader/';
import CustomerListItem from '../../components/customerRainingListItem/';
import CityList from '../../assets/cityList.json';
import './style.css'

class Home extends Component {

  constructor(props) {
    super(...arguments)
    this.state = {
      rainingList: [  ]
    }
  }

  componentWillMount() {
    this.props.listCustomers();
    this.listRainingCustomers()
  }

  componentDidMount() {
    let chart = am4core.create("top-clients-chart", am4charts.XYChart3D);

    // Add data
    chart.data = this.props.customers;

    // Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "company";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.title.text = "Number of employees";
    valueAxis.renderer.labels.template.adapter.add("text", function (text) {
      return text;
    });

    // Create series
    let series = chart.series.push(new am4charts.ColumnSeries3D());
    series.dataFields.valueY = "employees";
    series.dataFields.categoryX = "company";
    series.name = "Top 4 Clients";
    series.columns.template.fillOpacity = 1;

    // Check if it is going to rain in one of the top 4
    series.columns.template.adapter.add("fill", function (fill, target) {
      let isItRaining = Math.random() * 10;
      if (target.dataItem && (isItRaining > 4)) {
        return am4core.color("#aa0000");
      }
      else {
        return am4core.color("#00aa00");
      }
    });

    this.chart = chart;
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  componentDidUpdate(oldProps) {
    const sorted = this.listTopCustomers();
    const data = sorted.map(customer => {
      return customer = {
        "company": customer.company_name,
        "employees": customer.number_employees
      }
    });
    this.chart.data = data;
  }

  listRainingCustomers = () => {
    if (this.props.customers !== undefined) {
      return this.props.customers.map((customer, index) => {
        let cityId;
        const location = CityList.filter(city => {
          return city.name === customer.location;
        })
        if (typeof (location) === 'object') {
          cityId = location[0].id;
        } else {
          cityId = location.id;
        }

        listCustomersWeather(cityId).then((resolve, reject) => {
          this.setState({
            rainingList: [...this.state.rainingList, resolve]
          })
        })

        return <CustomerListItem key={index} companyName={customer.company_name} contact={customer.contact} phoneNumber={customer.phone_number} rainAt={"Soon"/* resolve[0].dt_txt */} />
      })
    }
  }

  listTopCustomers = () => {
    const sorted = this.props.customers.sort((a, b) => parseFloat(b.number_employees) - parseFloat(a.number_employees));
    return sorted.slice(0, 4)
  }

  render() {
    return (
      <div className="home-component">
        <Header />
        <div className="home-content">
          <div className="top-clients-container">
            <h1> Top 4 Clients </h1>
            <div className="top-clients-chart"></div>
          </div>
          <div className="raining-locations-container">
            <h1> Where is it Raining </h1>
            <table>
              <tbody>
                <CustomerListHeader headerItens={['Company', 'Contact', 'Telephone', 'Next Rain']} />
                {this.listRainingCustomers()}
              </tbody>
            </table>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = store => ({
  customers: store.customerState.customersList
})

const mapDispatchToProps = dispatch => bindActionCreators({ listCustomers, listCustomersWeather }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);