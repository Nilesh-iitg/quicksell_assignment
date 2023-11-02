import React from 'react'
import './todolist.css'
import TodoCard from '../TodoCard/TodoCard'
import AdditionIcon from '../../Shared/Icon/AdditionIcon'
import LoadMoreIcon from '../../Shared/Icon/LoadMoreIcon'
import Avatar from '../../Shared/Avatar/Avatar'
import NoPriorityIcon from '../../Shared/Icon/NoPriorityIcon'
import LowPriorityIcon from '../../Shared/Icon/LowPriorityIcon'
import MediumPriorityIcon from '../../Shared/Icon/MediumPriorityIcon'
import HighPriorityIcon from '../../Shared/Icon/HighPriorityIcon'
import UrgentIcon from '../../Shared/Icon/UrgentIcon'
import InProgressIcon from '../../Shared/Icon/InProgressIcon'
import DoneIcon from '../../Shared/Icon/DoneIcon'
import DotIcon from '../../Shared/Icon/DotIcon'

const TodoList = ({groupName='',tickets=[],displayOption}) => {
  const numberOfTickets = tickets.length;
  const getIcon = () => {
    if(displayOption==='user'){
      return <Avatar name={groupName}/>
    }else{
      switch(groupName){
        case '0':
          return <NoPriorityIcon />
        case '1':
          return <LowPriorityIcon />
        case '2':
          return <MediumPriorityIcon />
        case '3':
          return <HighPriorityIcon />
        case '4':
          return <UrgentIcon />
        case 'In progress':
          return <InProgressIcon />
        case 'Todo':
          return <DotIcon />
        case 'Backlog':
          return <DotIcon />
        case 'Done':
           return <DoneIcon />
        default:
          return <DotIcon />
      }
    }
  };
  
  return (
    <div style={{maxWidth:'450px',width:'100%',marginBottom:'2rem'}}>
        <div className='flex-row space-between' style={{marginBottom:"2rem"}}>
          <div className='flex-row item-gap centre'>
          {getIcon()}
           <h4 className='text-primary'>{groupName}</h4>
           <h4 className='text-primary'>{numberOfTickets}</h4>
          </div>
          <div className='flex-row item-gap' style={{alignItems:'center'}}>
            <AdditionIcon />
            <LoadMoreIcon />
          </div>
        </div>
        <div className='flex-col'>
        {
          tickets.map((ticket)=>{
            return <TodoCard displayOption={displayOption} key={ticket.id} ticket={ticket}/>
          })
        }
        </div>
    </div>
  )
}

export default TodoList