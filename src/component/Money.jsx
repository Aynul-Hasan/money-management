import React ,{useState } from 'react'
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { FaTrashAlt} from 'react-icons/fa';
import {  BiReset} from "react-icons/bi";
 



export const Money = () => {

    const [text, setText] = useState('');
    const [amount, setAmount] = useState('')
    const [allData, setAllData] = useState([])
    const [totalAmount, setTotalAmount] = useState(0)
    const [income, setIncome] = useState(0)
    const [expace, setExpace] = useState(0)
    const [resetBtn, setresetBtn] = useState(true)
    // console.log(totalAmount)
    // console.log(amount)
    // console.log(allData);
    // console.log(income);
    // console.log(expace);
    
    const deleteItem=(i)=>{
        const del=allData.filter((crrEl)=>{return crrEl.id !==i})
        setAllData(del);
        if(allData===[{}]){
            setTotalAmount(0)
            setExpace(0)
            setIncome(0)

        }

    }
    const clearAllData=()=>{
        setAllData([])
        setTotalAmount(0)
        setExpace(0)
        setIncome(0)
        setresetBtn(true)

    }
  
    const managementControl=(event)=>{
        event.preventDefault();
       
        if(text&&amount){

            
            const newData={id: new Date().getTime().toString(), text,amount};

             setAllData([...allData,newData]);
            setresetBtn(false)
             
            if(amount>0){
                setIncome(income+amount)
                setTotalAmount(totalAmount+amount)
                setAmount('')
            }else{
               setExpace(expace+amount)
               setTotalAmount(totalAmount+amount)   
               setAmount('')         
            }
           
            setAmount('');
            setText('')

        }else{
            alert(`please fill the input fild`)
        }
        // setTotalAmount(income +expace)

    }

    return (
        <>
             <div className=" container-fluid pt-4 bg-dark">
             <div className="row d-flex justify-content-center ">
            <div className="col-lg-6 col-8">
            <h1 className="text-center text-white">Money Management</h1>
            <h4 className="bg-success text-center d-block w-100">Current Balance</h4>
            <div className="bg-white text-center py-2" >
                <h5 className={totalAmount>0?"text-center text-success fw-bolder ":"text-center text-danger fw-bolder"}>{totalAmount}</h5>
            </div>
            <div className=" bg-white mx-0 my-3 py-3 d-flex  justify-content-around">
                <div className=" ">
                    <h5 className="text-success">Income</h5>
                    <strong className="  text-success" id="income">{income}</strong>
                </div>
                <div className="">
                    <h5 className=" text-danger">Expencen</h5>
                    <strong className="text-danger" id="expense">{expace}</strong>
                </div>
            </div>
            <div className=" ">
                <h4 className=" text-center py-2 bg-warning w-100 his">
                    History
                </h4>
                <div className=" py-4 px-3 bg  overflow-auto height  position-relative" >
                <button type="button" onClick={clearAllData}
                 className={resetBtn===false?"btn btn-danger position-absolute  start-0 mt-0":"btn btn-danger  d-none"}><BiReset></BiReset>
                    <span class="position-absolute top-0 start-75 translate-middle badge rounded-pill bg-secondary">{allData.length}</span>
                </button>
               
              
                {/* <button onClick={clearAllData} className={resetBtn===false?"btn btn-danger position-absolute top-0 start-0":"btn btn-danger  d-none"}><BiReset></BiReset> </button> */}

                    <ul className=" ">

                        {allData.map((curElm)=>{
                            const{text,amount,id}=curElm;
                            return(
                                <li
                                    key={id} className=
                                    {amount>0?" d-flex flex-wrap justify-content-between bg-success shadow-sm p-2 my-3 rounded minus":" d-flex flex-wrap justify-content-between bg-danger shadow-sm p-2 my-3 rounded minus"}
                                    >
                                    <span className="item-name p-2 text-dark" id="item-name">{text}</span
                                    ><span className="item-amount ms-auto p-2 text-dark" id="amount" >{amount}</span
                                    ><span class="delete-history-item bg-secondary  p-2 rounded" onClick={()=>deleteItem(id)}
                                        > <FaTrashAlt className="text-white trash-hover"></FaTrashAlt></span>
                                </li>
                            )
                        })}

                    </ul>
                </div>
            </div>


            <div class="form-section my-3">
                <h4 class=" bg-warning   text-center py-2 w-100"> Add Transaction</h4>

                <form onSubmit={managementControl}>
                    <div class="form-group mb-3">
                    
                      <input type="text" value={text} onChange={(e)=>{setText(e.target.value)}}  placeholder="Text" class="form-control" id="text-input" aria-describedby="emailHelp"/>
                   
                    </div>
                    <div class="form-group">
                      <input type="number"  value={amount}
                      onChange={
                          (e)=>{e>0?setAmount(-e.target.value):setAmount(+e.target.value)}
                        } 
                          placeholder="amount" class="form-control" id="amount-input"/>
                      <small id="emailHelp" class="form-text text-muted">Note: use <span class="text-danger">negative(-)</span> value for expence</small>
                    </div>
                   
                    <button type="submit "  class="btn btn-primary my-2 d-block w-100">Submit</button>
                  </form>
            </div>
        </div>

        </div>

           
        </div>

    

        </>
    )
    
}
