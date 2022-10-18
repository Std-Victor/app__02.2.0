import React, { Component } from "react";
import "./App.css";
import { SearchBox } from "./components/Search-box/search-box.component";
import { View } from "./components/View/view.component";
import { Form } from "./components/Form/form.component";
import { connect } from "react-redux";
import { fetchStudentsData } from "./redux/student_asyncThunk/students.api.calls";
import { toggleModal } from "./redux/student_asyncThunk/students.slice";


class App extends Component {
  componentDidMount() {
    this.props.fetchData()
  }

  render() {
    return (
      <div className="App">
        <h1>Students List</h1>
        <div className="table--up">
          {this.props.dataFetched ? <SearchBox /> : null}
          <button className="btn__add" onClick={() => this.props.toggleModal()}>
            <i className="fa-solid fa-user-plus"></i>
          </button>
        </div>
        <View />
        <Form />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  dataFetched : state.student.dataFetched
})

const mapDispatchToProps = (dispatch) => ({
  fetchData: () => dispatch(fetchStudentsData()),
  toggleModal: () => dispatch(toggleModal()),
});

export default connect(mapStateToProps,mapDispatchToProps)(App);
