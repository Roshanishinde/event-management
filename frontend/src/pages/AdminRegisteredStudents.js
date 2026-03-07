import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/adminRegisteredStudents.css";

const AdminRegisteredStudents = () => {

  const { eventId } = useParams();

  const [students,setStudents] = useState([]);
  const [eventInfo,setEventInfo] = useState(null);

  useEffect(()=>{

    const allRegs = JSON.parse(localStorage.getItem("registrations")) || [];
    const events = JSON.parse(localStorage.getItem("events")) || [];

    const filtered = allRegs.filter(r => r.eventId === Number(eventId));

    setStudents(filtered);
    setEventInfo(events[eventId]);

  },[eventId]);


  // APPROVE
  const handleApprove = (email) => {

    let allRegs = JSON.parse(localStorage.getItem("registrations")) || [];

    const updated = allRegs.map(r=>{
      if(r.email === email && r.eventId === Number(eventId)){
        return {...r,status:"approved"};
      }
      return r;
    });

    localStorage.setItem("registrations",JSON.stringify(updated));
    setStudents(updated.filter(r=>r.eventId === Number(eventId)));

    // notification
    addNotification(email,"approved");

  };


  // REJECT
  const handleReject = (email) => {

    let allRegs = JSON.parse(localStorage.getItem("registrations")) || [];

    const updated = allRegs.map(r=>{
      if(r.email === email && r.eventId === Number(eventId)){
        return {...r,status:"rejected"};
      }
      return r;
    });

    localStorage.setItem("registrations",JSON.stringify(updated));
    setStudents(updated.filter(r=>r.eventId === Number(eventId)));

    addNotification(email,"rejected");

  };


  // PRIVATE NOTIFICATION
  const addNotification = (email,status)=>{

    const allNoti = JSON.parse(localStorage.getItem("notifications")) || [];

    const newNoti = {
      id:Date.now(),
      user:email,
      message: status === "approved"
        ? `🎉 Payment Approved for ${eventInfo?.eventName}`
        : `❌ Payment Rejected for ${eventInfo?.eventName}`,
      read:false,
      date:new Date().toISOString()
    };

    localStorage.setItem("notifications",
      JSON.stringify([...allNoti,newNoti])
    );

  }


  // DELETE
  const handleDelete = (email)=>{

    if(!window.confirm("Delete this student?")) return;

    let allRegs = JSON.parse(localStorage.getItem("registrations")) || [];

    const updated = allRegs.filter(
      r=>!(r.email===email && r.eventId===Number(eventId))
    );

    localStorage.setItem("registrations",JSON.stringify(updated));

    setStudents(updated.filter(r=>r.eventId===Number(eventId)));

  }


  return (

<div className="admin-page">

<div className="admin-container">

<h2>Registered Students</h2>

{students.length===0 ? (

<p>No students registered yet</p>

) : (

<table className="admin-table">

<thead>

<tr>

<th>#</th>
<th>Name</th>
<th>Class</th>
<th>Division</th>
<th>Contact</th>
<th>Email</th>

{eventInfo?.type === "paid" && (
<>
<th>Screenshot</th>
<th>Status</th>
<th>Action</th>
</>
)}

<th>Delete</th>

</tr>

</thead>

<tbody>

{students.map((s,index)=>(

<tr key={index}>

<td>{index+1}</td>

<td>{s.firstName} {s.middleName} {s.lastName}</td>

<td>{s.className}</td>

<td>{s.division}</td>

<td>{s.contact}</td>

<td>{s.email}</td>

{eventInfo?.type === "paid" && (

<>

<td>
{s.paymentScreenshot ? (
<a href={s.paymentScreenshot} target="_blank" rel="noreferrer">
View
</a>
) : "No Screenshot"}
</td>

<td>{s.status || "pending"}</td>

<td>

{s.status !== "approved" && (
<button
className="approve-btn"
onClick={()=>handleApprove(s.email)}
>
Approve
</button>
)}

{s.status !== "rejected" && (
<button
className="reject-btn"
onClick={()=>handleReject(s.email)}
>
Reject
</button>
)}

</td>

</>

)}

<td>

<button
className="delete-btn"
onClick={()=>handleDelete(s.email)}
>
Delete
</button>

</td>

</tr>

))}

</tbody>

</table>

)}

</div>

</div>

  );

};

export default AdminRegisteredStudents;