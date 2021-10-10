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
        tableContent:[],
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
    if (this.props.user.role==="Admin") {
        if (this.props.activeOption==='Users') { //floating-reaches-01708.herokuapp.com
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

componentDidUpdate(prevProps, prevState){
    if (this.props.user.role==="Admin" && (prevProps.activeOption!==this.props.activeOption || prevState.pageLimit!==this.state.pageLimit || prevState.currentPage!==this.state.currentPage || prevState.movieCreationStatus!==this.state.movieCreationStatus)) {
        if (prevProps.activeOption!==this.props.activeOption) {
            this.setState({currentPage: 1, pageLimit: 10, searchfield: ''})
        }
        if (this.props.activeOption==='Users') {
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
        this.setState({currentPage: 1})
        if (this.props.activeOption==='Users') {
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
        if (this.props.activeOption==='Users') {
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
        this.setState({toasterState: false})
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
        <>
           {(this.props.user.role==="Admin")?<div className="flex">
                <PageMenu Options={['Users', 'Movies']} active={this.props.activeOption}/>
                <div style={{width: '100%', height: '100%'}}>
                    <div className="flex justify-end tc">
                        <div style={{width: '50vw', display: 'flex'}}>
                            <SearchBar searchChange={this.onSearch} loadResults={this.loadResults}/>
                            {(this.props.activeOption==='Movies')?<Actionbutton action='Create Movie' takeAction={this.toggleModalState}/>:<></>}
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
            </div>:<div className = 'tc' style={{height: '70vh', paddingTop: '22vh'}}>
                        <h3 className='f6'>You have lost or don't have permission to view this page. Please contact your administrator for access</h3>
                    </div>}
        </>
    )
}
}

export default Admin;