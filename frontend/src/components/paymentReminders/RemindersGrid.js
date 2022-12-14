/**
 * @author ${Vatsal Yadav}
 */

import 'bootstrap/dist/css/bootstrap.css';
import {Col, Container, Form, Modal, Row, Stack} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {useEffect, useState} from "react";
import {isSuccessfulResponse, routes, showPopup} from "../../constants";
import {useHistory} from "react-router-dom";
import StickyNote from "../../assets/sticky-notes.png";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import {useDispatch, useSelector} from "react-redux";
import {deleteReminder, editReminder, viewReminders} from "../../redux/actions";
import {usePrevious} from "react-use";
import moment from "moment";
import {useAuth} from "../../contexts/Auth";
import {supabase} from "../../supabase";

// The component purpose is to view a list of payment reminders and provide ability for modifying and deleting them
export default function RemindersGrid() {

    const [remindersList, setRemindersList] = useState([]);
    const {user} = useAuth();
    const dispatch = useDispatch();

    const viewRemindersResponseData = useSelector(
        (state) => {
            return state.reminder.viewRemindersResponseData
        }
    );

    const isViewRemindersResponseReceived = useSelector(
        (state) => {
            return state.reminder.isViewRemindersResponseReceived
        }
    );

    const prevIsViewRemindersResponseReceived = usePrevious(isViewRemindersResponseReceived);

    // show the success message only if view reminders response is received successfully
    useEffect(() => {
        if (prevIsViewRemindersResponseReceived !== undefined && prevIsViewRemindersResponseReceived !== isViewRemindersResponseReceived) {
            if (isSuccessfulResponse(viewRemindersResponseData)) {
                setRemindersList(viewRemindersResponseData.success.filter(reminder => new Date(reminder.date) > new Date()).map(reminder => {
                    let dateFormatted = reminder
                    dateFormatted.formattedDate = moment(new Date(reminder.date)).format('MMMM Do YYYY, h:mm a')
                    return dateFormatted
                }))
            }
        }

    }, [isViewRemindersResponseReceived]);


    useEffect(() => {
        dispatch(viewReminders({user_id: user().user.identities[0].id}));
    }, []);


    const deleteReminderResponseData = useSelector(
        (state) => {
            return state.reminder.deleteReminderResponseData
        }
    );

    const isDeleteReminderResponseReceived = useSelector(
        (state) => {
            return state.reminder.isDeleteReminderResponseReceived
        }
    );

    const prevIsDeleteReminderResponseReceived = usePrevious(isDeleteReminderResponseReceived);

    // show the success message only if delete reminder response is received successfully and refresh the reminders list
    useEffect(() => {
        if (prevIsDeleteReminderResponseReceived !== undefined && prevIsDeleteReminderResponseReceived !== isDeleteReminderResponseReceived) {
            if (isSuccessfulResponse(deleteReminderResponseData)) {
                showPopup("success", "Success", "Payment Reminder Successfully Deleted!");
            }
        }
    }, [isDeleteReminderResponseReceived]);

    const editReminderResponseData = useSelector(
        (state) => {
            return state.reminder.editReminderResponseData
        }
    );

    const isEditReminderResponseReceived = useSelector(
        (state) => {
            return state.reminder.isEditReminderResponseReceived
        }
    );

    const prevIsEditReminderResponseReceived = usePrevious(isEditReminderResponseReceived);

    // show the success message only if edit reminder response is received successfully and refresh the reminders list
    useEffect(() => {
        if (prevIsEditReminderResponseReceived !== undefined && prevIsEditReminderResponseReceived !== isEditReminderResponseReceived) {
            if (isSuccessfulResponse(editReminderResponseData)) {
                showPopup("success", "Success", "Payment Reminder Successfully Modified!");
            }
        }
    }, [isEditReminderResponseReceived]);


    const history = useHistory();

    const [updateReminder, setUpdateReminder] = useState({reminder: "", show: false});

    const handleClose = () => setUpdateReminder(prevState => {
        return {reminder: prevState.reminder, show: false}
    });
    const handleShow = (reminder) => setUpdateReminder(prevState => {
        return {reminder: reminder, show: true}
    });

    const [currentReminder, setCurrentReminder] = useState(null)
    const [show, setShow] = useState(false);

    const handleDeleteClose = () => {
        setShow(false);
    }


    // Prompt user to verify payment reminder deletion
    function showDeleteAlert(id) {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteReminder(id));
                remindersList.splice(remindersList.findIndex(function (i) {
                    return i.id === id;
                }), 1);
            }
        });
    }

    const [validated, setValidated] = useState(false);
    const [reminderName, setReminderName] = useState('');
    const [reminderAmount, setReminderAmount] = useState('');
    const [reminderDesc, setReminderDesc] = useState('');
    const [date, setDate] = useState(new Date());


    const handleReminderAmount = (e) => {
        if (e.target.value.match(/^[0-9.]*$/)) {
            setReminderAmount(e.target.value);
        }
    };

    const handleReminderDesc = (e) => {
        if (e.target.value.match(/^[a-zA-Z0-9 ]*$/)) {
            setReminderDesc(e.target.value);
        }
    };

    // Submit modified reminder details
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (date <= new Date()) {
            alert("Reminder cannot be set in past.")
        } else if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            remindersList.map(reminder => {
                let updateReminderList = reminder
                if (reminder.id === updateReminder.reminder.id) {
                    updateReminderList.formattedDate = moment(new Date(date)).format('MMMM Do YYYY, h:mm a')
                    updateReminderList.amount = reminderAmount
                    updateReminderList.desc = reminderDesc
                    updateReminderList.date = date
                }
                return updateReminderList
            })
            dispatch(editReminder({
                id: updateReminder.reminder.id,
                name: reminderName,
                amount: reminderAmount,
                user_id: user().user.identities[0].id,
                desc: reminderDesc,
                date: date,
                email: supabase.auth.user().email
            }));
            handleClose();
        }
        setValidated(true);

    };

    // filter the selected time that is passed
    const filterPassedTime = (time) => {
        const currentDate = new Date();
        const selectedDate = new Date(time);

        return currentDate.getTime() < selectedDate.getTime();
    };

    return (
        <Container fluid>
            <Row className=" mt-3 text-black container-fluid justify-content-around">
                <Button
                    className="rounded-3" style={{width: "250px"}}
                    onClick={() => history.push(routes.createReminder.path)}>Create Reminder
                </Button>
            </Row>
            <Row className="text-center" hidden={remindersList.length !== 0}>
                <label> No reminders found, please create a new Payment Reminder! </label>
            </Row>

            {/* Payment reminders list */}

            <Row className=" m-0 ps-0 pe-0 pe-sm-5 ps-sm-5 pt-2 text-black justify-content-center container-fluid">
                {remindersList.map(reminder =>
                    <div className="col-sm-10 col-12 col-md-10 col-lg-8 m-2">

                        <div className="p-2 rounded-3  border" style={{backgroundColor: "#ffffff"}}>
                            <Row>
                                <Col md={3} className="d-none d-md-block pt-4 ">
                                    <img className="w-75" alt="Reminder Icon"
                                         src={StickyNote}/>
                                </Col>
                                <Col className="p-3">
                                    <Stack gap={1}>
                                        <Row style={{fontSize: 20, fontWeight: "bold"}}>
                                            <Col>{reminder.formattedDate}</Col>
                                            <Col className="text-end"> ${reminder.amount}</Col>

                                        </Row>
                                        <div>{reminder.name}</div>
                                        <div>{reminder.desc}</div>
                                        <Stack direction="horizontal" className="justify-content-end" gap={2}>
                                            <Button variant="danger"
                                                    onClick={() => {
                                                        setCurrentReminder(reminder);
                                                        showDeleteAlert(reminder.id)}}>Remove
                                            </Button>
                                            <Button
                                                onClick={() => {
                                                    handleShow(reminder);
                                                    setReminderAmount(reminder.amount);
                                                    setReminderDesc(reminder.desc);
                                                    setReminderName(reminder.name);
                                                    setDate(new Date(reminder.date))
                                                }}>Edit
                                            </Button>
                                        </Stack>
                                    </Stack>

                                </Col>
                            </Row>

                        </div>
                    </div>
                )}
            </Row>


            {/* Delete reminder modal */}

            <Modal show={show}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Reminder</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete payment reminder for {currentReminder?.name}?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleDeleteClose}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>


            {/* Modify reminder modal*/}

            <Modal size="lg" show={updateReminder.show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Payment Reminder</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>

                        <Form.Group controlId="reminderName">
                            <Form.Label className="mt-2">Reminder Name</Form.Label>
                            <Form.Control required value={reminderName} type="text"
                                          placeholder="Reminder Name"
                                          maxLength="50"
                                          disabled
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a reminder name
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mt-2" controlId="reminderAmount">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control
                                required
                                onChange={handleReminderAmount} value={reminderAmount}
                                type="number"
                                min="0"
                                max="99999"
                                placeholder="Amount"
                                maxLength="5"
                            />
                            <Form.Control.Feedback type="invalid">
                                Amount should be between 0 and 99,999
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mt-2" controlId="reminderDesc">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                onChange={handleReminderDesc} value={reminderDesc}
                                type="text"
                                placeholder="Description"
                                required
                                as="textarea" rows={3}
                                maxLength="200"
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a reminder description
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="date">
                            <Form.Label className="mt-1">Time</Form.Label>
                            <DatePicker
                                showTimeSelect
                                selected={date}
                                onChange={setDate}
                                dateFormat="Pp"
                                value={new Date(date)}
                                minDate={new Date()}
                                filterTime={filterPassedTime}
                            />
                        </Form.Group>
                        <Button className="m-3" variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button className="m-3" type="submit">Submit</Button>

                    </Form>
                </Modal.Body>
            </Modal>


        </Container>
    );


}