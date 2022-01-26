
import React, {useState, useEffect} from 'react';
import List from './List';
import Alert from './Alert';
function getLocalStorage(){
	let list=localStorage.getItem('list');
	if(list){
		return JSON.parse(list);
	}
	else{
		return [];
	}
}
function App(){
	let [name,setName]=useState('');
	let [list, setList]=useState(getLocalStorage());
	let [isEditing, setIsEditing]=useState(false);
	let [editId,setEditId]=useState(null);
	let [alert,setAlert]=useState({show:false,msg:'hello!',type:'danger'});
	function handleSubmit(event){
		event.preventDefault();
		console.log("hello!");
		if(!name){
			showAlert(true,'Please Enter a Value!','danger');
		}
		else if(name && isEditing){
			setList(list.map((item)=>{
				if(item.id===editId){
					return {...item,title:name};
				}
				else{
					return item;
				}
			}))
			setName('');
			setEditId(null);
			setIsEditing(false);
			showAlert(true,'Item edited!','success');
		}
		else{
			showAlert(true,'Item Added!','success');

			let newItems={id:new Date().getTime().toString(),title:name}
			setList([...list,newItems]);
			setName('');
		}
	}
	function showAlert(show=false,msg='',type=''){
		setAlert({show,msg,type});
	}
	function clearList(){
		showAlert(true,'List emptied!','danger');
		setList([]);
	}
	function removeItem(id){
		showAlert(true,'Item Removed!','danger');
		setList(list.filter((item)=>item.id!=id));
	}
	function editItem(id){
		let specifiedItem= list.find((item)=>item.id===id);
		setIsEditing(true);
		setEditId(id);
		setName(specifiedItem.title);
	}
	useEffect(()=>{
		localStorage.setItem('list',JSON.stringify(list));
	},[list])
	return (
		<section className='section-center'>
			<form className='grocery-form' onSubmit={handleSubmit}>
				{alert.show&& <Alert {...alert} removeAlert={showAlert} list={list}/>}
				<h3>grocery bucket</h3>
				<div className='form-control'>
					<input 
					type='text' 
					className='grocery' 
					placeholder='eg. eggs' 
					value={name}
					onChange={(e)=>{setName(e.target.value)}}
					/>
					<button type='submit' className='submit-btn'>{isEditing?'edit':'submit'}</button>
				</div>

			</form>
			{list.length>0&&
				<div className='grocery-container'>
					<List items={list} removeItem={removeItem} editItem={editItem}/>
					<button className='clear-btn' onClick={clearList}>Clear all items</button>
				</div>
			}
		</section>
	)
}
	export default App;