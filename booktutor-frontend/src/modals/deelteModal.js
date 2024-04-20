import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteModal = ({show , handleClose , title , sub,  deleteData}) => {
  return (
//     <Modal show={show} onHide={handleClose}>
//     <Modal.Header closeButton>
//       <Modal.Title>{title}</Modal.Title>
//     </Modal.Header>
//     <Modal.Body>
//      {sub}
//     </Modal.Body>
//     <Modal.Footer>
//       <Button variant="primary" onClick={handleClose}>
//         CLOSE
//       </Button>
//       <Button variant="danger" onClick={deleteData}>
//        DELETE
//       </Button>
//     </Modal.Footer>
//   </Modal>
<div style={{position:"absolute" , zIndex:"2000"  , display:"flex" , justifyContent:"center" , alignItems:"center" , height:"100%", width:"100%" , top:"0" , padding:"10px"}}>
{ show && <div style={{ width:"300px", background:"#000" }}>
 <h5>Delete Modal</h5>
</div>}
</div>

  
  )
}

export default DeleteModal
