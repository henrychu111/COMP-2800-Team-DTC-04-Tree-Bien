import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import '../../css/ContactUs.css';
import emailjs from 'emailjs-com';


const ContactForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e);

        let templateParams = {
            from_name: name,
            email: email,
            to_name: 'treebien.2800@gmail.com',
            subject: "Contact Form from Tree Bien",
            message: message
        }

        emailjs.send(
            'service_iz9i1lr',
            'template_p5qcetf',
            templateParams,
            'user_QBbRXb0DY0i2KxQ4wZj0W'
        )
        .then((result) => {
            alert("Thanks for sending us a message! We'll get back to you shortly", result.text);
        })
        .catch((error) => {
            alert("We couldn't send this message, please try again later.", error.text);
        })
        clearForm();
    }

    const clearForm = () => {
        document.getElementById("email-input").value = '';
        document.getElementById("name-input").value = '';
        document.getElementById("message-input").value = '';
    }

    return (
        <Container className="contact-container">
            <div>
                <h1 className="contact-header">Contact Us</h1>
            </div>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" onChange={e => setEmail(e.target.value)} htmlFor="email-input" />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput2">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control type="text" name="name" onChange={e => setName(e.target.value)} htmlFor="name-input" />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Message</Form.Label>
                    <Form.Control as="textarea" name="message" rows={3} onChange={e => setMessage(e.target.value)} htmlFor="message-input"/>
                </Form.Group>
                <Button type="submit" className="contact-button">
                    Submit
                </Button>
            </Form>
        </Container>
    )
}

export default ContactForm
