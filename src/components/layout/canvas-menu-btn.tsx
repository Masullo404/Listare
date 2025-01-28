"use client"
import Link from 'next/link';
import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';

export default function OffCanvasMenuBtn() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className='bg-green button' onClick={handleShow}><i className="bi bi-list fs-1"></i></button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton className='bg-green'>
          <Offcanvas.Title><Link href={"/dashboard"} className='text-white text-decoration-none fs-1'>Listare</Link></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className='bg-green'>
            <div className='d-flex flex-column fs-5 gap-3'>
                <Link href={"/dashboard/lists"} className='text-white text-decoration-none'>Lists</Link>
                <Link href={"/dashboard/social"} className='text-white text-decoration-none'>Social</Link>
                <Link href={"/dashboard/profile"} className='text-white text-decoration-none'>My Profile</Link>
            </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

