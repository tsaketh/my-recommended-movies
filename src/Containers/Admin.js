import React, { Component } from 'react';
import 'tachyons';
import PageMenu from '../Components/PageMenu';
import SearchBar from '../Components/Searchbar';
import Table from '../Components/Table';
import Actionbutton from '../Components/Actionbutton';
import PaginationTools from '../Components/PaginationTools';
import Modal from '../Components/Modal';
import CreateMovieForm from '../Components/CreateMovieForm';
import Toaster from '../Components/Toaster';
import Confirmation from '../Components/Confirmation';

class Admin extends Component{
constructor(){
    super()
    this.state={
        tableContent:[
            // {name: "test 1", email: "test1.user@mail.com"},
            // {name: "test 2", email: "test2.user@mail.com"},
            // {Id: "260", Title: "Star Wars: The last Jedi", Rating: "4.56", Ratings: "255", Year: "1998", Genre: "Comedy|Action|Fantasy|Thriller|Sci-Fi"},
            // {Id: "262", Title: "Black Widow", Rating: "2.85", Ratings: "25", Year: "2021", Genre: "Comedy|Action|Romance"}
            // "No Results Found"
        ],
        activeOption: 'Users',
        searchfield: '',
        totalRecords: 0,
        currentPage: 1,
        pageLimit: 10,
        modalState: false,
        movieTitle:'',
        movieGenre:'',
        movieYear:'',
        movieCreationStatus:'',
        toasterState: false,
        confirmationPopupState: false,
        optionClickedFor: ''
    }
}
componentDidMount(){
    if (this.state.activeOption==='Users') { //floating-reaches-01708.herokuapp.com
        fetch(`https://floating-reaches-01708.herokuapp.com/users?offset=${(this.state.currentPage-1)*this.state.pageLimit}&limit=${this.state.pageLimit}`)
            .then(res => res.json())
            .then(users => {this.setState({tableContent: users.results, totalRecords: users.totalRecords})})
            .catch(err => {alert("Unkown error occured while fetching users")})
    } else {
        fetch(`https://ts-recommender-api-11798.herokuapp.com/movies?offset=${(this.state.currentPage-1)*this.state.pageLimit+1}&limit=${this.state.pageLimit}`)
            .then(res => res.json())
            .then(movies => {this.setState({tableContent: movies.results, totalRecords: movies.totalRecords[0]})})
            .catch(err => {alert("Unknown error occured while fetching users")})   
    }
}

componentDidUpdate(prevProps, prevState){
    if (prevState.activeOption!==this.state.activeOption || prevState.pageLimit!==this.state.pageLimit || prevState.currentPage!==this.state.currentPage || prevState.movieCreationStatus!==this.state.movieCreationStatus) {
        if (this.state.activeOption==='Users') {
            fetch(`https://floating-reaches-01708.herokuapp.com/users?offset=${(this.state.currentPage-1)*this.state.pageLimit}&limit=${this.state.pageLimit}&search=${this.state.searchfield}`)
                .then(res => res.json())
                .then(users => {this.setState({tableContent: users.results, totalRecords: users.totalRecords})})
                .catch(err => {alert("Unkown error occured while fetching users")})
        } else {
            fetch(`https://ts-recommender-api-11798.herokuapp.com/movies?offset=${(this.state.currentPage-1)*this.state.pageLimit+1}&limit=${this.state.pageLimit}&search=${this.state.searchfield}`)
                .then(res => res.json())
                .then(movies => {this.setState({tableContent: movies.results, totalRecords: movies.totalRecords[0]})})
                .catch(err => {alert("Unknown error occured while fetching users")})   
        }
    }
}
loadResults=()=>{
    if (this.state.searchfield.trim().length>=3) {
        // const results = this.state.tableContent.filter( content => {
        //     // return users.name.toLowerCase().includes(this.state.searchfield.toLowerCase()) ||
        //     //     users.email.toLowerCase().includes(this.state.searchfield.toLowerCase())
        //     let flag = false;
        //     for (const key in content) {
        //         if (Object.hasOwnProperty.call(content, key)) {
        //             const element = content[key];
        //             flag=String(element).toLowerCase().includes(this.state.searchfield.toLowerCase())
        //             if (flag) {
        //                 return flag;
        //             }
        //         }
        //     }
        //     return flag;
        // });
        // this.setState({
        //     tableContentSearched: results
        // })
        this.setState({currentPage: 1})
        if (this.state.activeOption==='Users') {
            fetch(`https://floating-reaches-01708.herokuapp.com/users?offset=${(this.state.currentPage-1)*this.state.pageLimit}&limit=${this.state.pageLimit}&search=${this.state.searchfield}`)
                .then(res => res.json())
                .then(users => {this.setState({tableContent: users.results, totalRecords: users.totalRecords})})
                .catch(err => {alert("Unkown error occured while fetching users")})
        } else {
            fetch(`https://ts-recommender-api-11798.herokuapp.com/movies?offset=${(this.state.currentPage-1)*this.state.pageLimit+1}&limit=${this.state.pageLimit}&search=${this.state.searchfield}`)
                .then(res => res.json())
                .then(movies => {this.setState({tableContent: movies.results, totalRecords: movies.totalRecords[0]})})
                .catch(err => {alert("Unknown error occured while fetching users")})   
        }        
    } else {
        if (this.state.activeOption==='Users') {
            fetch(`https://floating-reaches-01708.herokuapp.com/users?offset=${(this.state.currentPage-1)*this.state.pageLimit}&limit=${this.state.pageLimit}`)
                .then(res => res.json())
                .then(users => {this.setState({tableContent: users.results, totalRecords: users.totalRecords})})
                .catch(err => {alert("Unkown error occured while fetching users")})
        } else {
            fetch(`https://ts-recommender-api-11798.herokuapp.com/movies?offset=${(this.state.currentPage-1)*this.state.pageLimit+1}&limit=${this.state.pageLimit}`)
                .then(res => res.json())
                .then(movies => {this.setState({tableContent: movies.results, totalRecords: movies.totalRecords[0]})})
                .catch(err => {alert("Unknown error occured while fetching users")})   
        }        
    }
}
onSearch=(event)=>{
    this.setState(
        {searchfield: event.target.value}
    )
}
onOptionSelected=(option)=>{
    this.setState(
        {activeOption: option}
    )
}
onPageSelect=(page)=>{
    this.setState(
        {currentPage: page}
    )
}
onPageLimitChange=(event)=>{
    this.setState(
        {pageLimit: event.target.value, 
        currentPage: 1}
    )
}
toggleModalState=()=>{
    this.setState({modalState: !this.state.modalState})
}
setMovieTitle=(event)=>{
    this.setState({movieTitle: event.target.value})
}
setMovieGenre=(event)=>{
    this.setState({movieGenre: event.target.value})
}
setMovieYear=(event)=>{
    this.setState({movieYear: event.target.value})
}
createMovie=()=>{
    fetch(`https://ts-recommender-api-11798.herokuapp.com/createMovie?title=${(this.state.movieTitle)}&genre=${this.state.movieGenre}&year=${this.state.movieYear}`, {
        method: 'POST'
    })
        .then(res => res.json())
        .then(movies => {
            this.toggleModalState()
            this.setState({movieCreationStatus: movies[0]})
            this.toggleToasterState()
        })
        .catch(err => {alert("Unknown error occured while fetching users")})
        .finally(
            this.setState({
                movieTitle:'',
                movieGenre:'',
                movieYear:''
            })
        )
}
toggleToasterState=()=>{
    this.setState({toasterState: !this.state.toasterState})
    setTimeout(() => {
        this.setState({toasterState: !this.state.toasterState})
        this.setState({movieCreationStatus: ''})
    }, 2000);
}
toggleConfirmationPopupState=()=>{
    this.setState({confirmationPopupState: !this.state.confirmationPopupState})
}
setOptionClickedFor=(id, role)=>{
    this.setState({optionClickedFor: {
        'id': id,
        'role': role
    }})
    this.toggleConfirmationPopupState()
}
changeAccess=()=>{
    fetch('https://floating-reaches-01708.herokuapp.com/change-role', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: this.state.optionClickedFor.id,
            role: (this.state.optionClickedFor.role==='User')?'Admin':'User'
        })
    })
    .then(res=>res.json())
    .then(value=>{
        this.setState({movieCreationStatus: value})
        this.toggleConfirmationPopupState()
        this.toggleToasterState()
    })
    .catch(err=>{alert("Unkown Error occured")})
}
render(){
    return(
        <div className="flex">
            <PageMenu Options={['Users', 'Movies']} active={this.state.activeOption} onOptionSelected={this.onOptionSelected}/>
            <div style={{width: '100%', height: '100%'}}>
                <div className="flex justify-end tc">
                    <div style={{width: '50vw', display: 'flex'}}>
                        <SearchBar searchChange={this.onSearch} loadResults={this.loadResults}/>
                        {(this.state.activeOption==='Movies')?<Actionbutton action='Create Movie' takeAction={this.toggleModalState}/>:<></>}
                    </div>
                </div>
                <Modal modalState={this.state.modalState} toggle={this.toggleModalState}>
                    <CreateMovieForm toggle={this.toggleModalState} setMovieTitle={this.setMovieTitle} setMovieGenre={this.setMovieGenre} setMovieYear={this.setMovieYear} onFormSubmit={this.createMovie}/>
                </Modal>
                <Toaster toasterState={this.state.toasterState} toggle={this.toggleToasterState} message={this.state.movieCreationStatus}/>
                {(this.state.totalRecords==0)
                    ?<div className = 'tc' style={{height: '70vh', paddingTop: '22vh'}}>
                        <h3 className='f2'>No Results Found</h3>
                     </div>
                    :<div className="table-scroll tc">
                        <Table contents={this.state.tableContent} onOptionClick={this.setOptionClickedFor}/>
                    </div>}
                <Modal modalState={this.state.confirmationPopupState} toggle={this.toggleConfirmationPopupState}>
                    <Confirmation legend="Confirmation required" label={`Are you sure to change access for user with id ${this.state.optionClickedFor.id}`} onConfirmation={this.changeAccess}/>
                </Modal>
                <PaginationTools totalRecords={this.state.totalRecords} pageLimit={this.state.pageLimit} onPageSelect={this.onPageSelect} onPageLimitChange={this.onPageLimitChange} currentPage={this.state.currentPage}/>
            </div>
        </div>
    )
}
}

export default Admin;