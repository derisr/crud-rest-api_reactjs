import { React, useEffect, useState } from "react";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
} from '@coreui/react';
import "bootstrap/dist/css/bootstrap.min.css";

function Halaman3() {

    //menyiapkan array untuk menyimpan data yang diambil dari API
    const [data_mahasiswa, setDataMahasiswa] = useState([]);

    const [id, setId] = useState("");
    const [nama, setNama] = useState("");
    const [nim, setNim] = useState("");
    const [alamat, setAlamat] = useState("");

    const [show, setShow] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    //method get data
    const GetDataMahasiwa = async () => {
        const getData = await axios.get(`
        http://localhost:8080/mahasiswa/
        `);
        setDataMahasiswa(getData.data.data);
        console.log(getData);
    };

    const UpdateDataMahasiswa = async (event) => {
        event.preventDefault();
        try {
            const putData = await axios.put(
                `http://localhost:8080/update/mahasiswa/${id}`,
                {
                    nama: nama,
                    nim: nim,
                    alamat: alamat
                });
            alert(putData.data.messages)
            window.location.reload();

        } catch (error) {
            alert("Data Gagal diubah")
        }
    };

    const DeleteDataMahasiswa = async (event) => {
        event.preventDefault();
        try {
            const deleteData = await axios.delete(
            `http://localhost:8080/delete/mahasiswa/${id}`);
            alert(deleteData.data.messages)
            window.location.reload();

        } catch (error) {
            alert("Data Gagal dihapus")
        }
    };

    const showModal = (data) => {
        setId(data.id);
        setNama(data.nama);
        setNim(data.nim);
        setAlamat(data.alamat);

        setShow(true);
    }

    const showModalDelete = (data) => {
        setId(data.id);
        setNama(data.nama);
        setNim(data.nim);
        setAlamat(data.alamat);

        setShowDelete(true);
    }

    const closeModal = () => {
        setId("");
        setNama("");
        setNim("");
        setAlamat("");
        setShow(false);
    }

    const closeModalDelete = () => {
        setId("");
        setNama("");
        setNim("");
        setAlamat("");
        setShowDelete(false);
    }


    //method useEffect berfungsi untuk menjalankan menthod yang di panggil 
    //pertama kali saat halaman dibuka
    useEffect(() => {
        //memanggil nethod yang kita buat sebelumnya yaitu GetDataMahasiswa
        GetDataMahasiwa();
    }, []);

    return (
        <div className='body-flex'>
            <div className="flex">
                <div className='p-5'>
                    <h1 className="py-1">
                        Data Mahasiswa
                    </h1>

                    {/* modal edit */}
                    <Modal show={show} onHide={closeModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Form Update Data</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={UpdateDataMahasiswa}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Nama</Form.Label>
                                    <Form.Control
                                        type="text"
                                        autoFocus
                                        onChange={(e) => setNama(e.target.value)}
                                        value={nama}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>NIM</Form.Label>
                                    <Form.Control
                                        type="text"
                                        autoFocus
                                        onChange={(e) => setNim(e.target.value)}
                                        value={nim}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Alamat</Form.Label>
                                    <Form.Control
                                        type="text"
                                        autoFocus
                                        onChange={(e) => setAlamat(e.target.value)}
                                        value={alamat}
                                    />
                                </Form.Group>
                                <Button type='submit' color="primary" className="px-4">
                                    Update
                                </Button>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={closeModal}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    {/* modal delete */}
                    <Modal show={showDelete} onHide={closeModalDelete}>
                        <Modal.Header closeButton>
                            <Modal.Title>Apakah Anda yakin menghapus data ini?</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="col-sm-12">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Detail Data</h5>
                                        <div className="row">
                                            <p className="col-4 card-text">
                                                Nama Mahasiswa
                                            </p>
                                            <p className="col-6 card-text">
                                                : {nama}
                                            </p>
                                        </div>
                                        <div className="row">
                                            <p className="col-4 card-text">
                                                NIM
                                            </p>
                                            <p className="col-6 card-text">
                                                : {nim}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type='submit' color="primary" className="px-4" onClick={DeleteDataMahasiswa}>
                                Hapus Data
                            </Button>
                            <Button variant="danger" onClick={closeModalDelete}>
                                Batal
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Tabel Mahasiswa</strong>
                        </CCardHeader>
                        <CCardBody>
                            <p className="text-medium-emphasis small">
                                Tabel ini menampilkan seluruh data mahasiswa yang masih aktif
                            </p>

                            {/* jangan lupa menambahkan button untuk menampilkan form tambah */}
                            <div className="py-3">
                                <CButton className='btn btn-success text-white me-2' href="form">
                                    Tambah Data
                                </CButton>
                            </div>

                            <CTable striped>
                                <CTableHead>
                                    <CTableRow>
                                        <CTableHeaderCell scope="col">Nama</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">NIM</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Alamat</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {data_mahasiswa.map((item, index) => {
                                        return (
                                            <CTableRow key={index}>
                                                <CTableDataCell> {item.nama} </CTableDataCell>
                                                <CTableDataCell> {item.nim} </CTableDataCell>
                                                <CTableDataCell> {item.alamat} </CTableDataCell>
                                                <CTableDataCell>
                                                    <CButton className='btn btn-primary text-white me-2'
                                                        onClick={() => {
                                                            // handleShow_edit(item.id);
                                                            showModal(item);
                                                        }}>
                                                        Edit
                                                    </CButton>

                                                    <CButton className='btn btn-danger text-white'
                                                        onClick={() => {
                                                            // handleShow_edit(item.id);
                                                            showModalDelete(item);
                                                        }}>
                                                        Hapus
                                                    </CButton>
                                                </CTableDataCell>
                                            </CTableRow>
                                        )
                                    })}
                                </CTableBody>
                            </CTable>
                        </CCardBody>
                    </CCard>

                    <div style={{ 
                            display: 'flex', 
                            flexDirection: 'row', 
                            justifyContent: 'center', 
                            alignItems: 'center', 
                            flexWrap: 'wrap', 
                            padding: '15px' 
                        }}>
                        {data_mahasiswa.map((item, index) => {
                            return (
                                <CCard 
                                    style={{ 
                                            padding:'5px', 
                                            margin:'10px', 
                                            width:'200px' 
                                        }}>
                                    <CCardHeader style={{ fontWeight:'bold' }}>
                                        {item.nama}
                                    </CCardHeader>
                                    <CCardBody>
                                        {item.nim}
                                    </CCardBody>
                                    <CCardFooter style={{ fontWeight:'lighter' }}>
                                        {item.alamat}
                                    </CCardFooter>
                                </CCard>
                            )
                        })}
                    </div>

                </div>
            </div>
        </div>
    );
}


export default Halaman3;