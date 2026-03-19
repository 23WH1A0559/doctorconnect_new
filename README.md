# DoctorConnect
Doctor Appointment booking system
## **1. Introduction**

### **1.1 Purpose**

This document defines the complete **software requirements, system architecture, database design, and technical specifications** for **MediConnect**, a web-based Doctor Appointment Booking System.

The system enables **patients to book appointments online**, **doctors to manage schedules**, and **administrators to control the platform efficiently**.
The application is designed as a **full-stack web application** using **MongoDB as the database**.

---
### **1.2 Target Audience**

* Patients seeking medical appointments
* Doctors managing consultations
* Hospital/Admin staff
* Students learning full-stack development
* Faculty evaluating academic projects

---

### **1.3 Objectives**

* Reduce manual appointment booking
* Provide online scheduling convenience
* Improve doctor-patient interaction
* Ensure secure and role-based access

---

## **2. System Overview**

### **2.1 User Roles**

| Role        | Description                                           |
| ----------- | ----------------------------------------------------- |
| **Patient** | Registers, logs in, books appointments, views history |
| **Doctor**  | Manages availability, views appointments              |
| **Admin**   | Manages doctors, users, and system data               |

---

### **2.2 Core Features**

* User authentication and authorization
* Doctor listing with specialization
* Appointment booking with time slots
* Dashboards for each role
* Secure data storage using MongoDB

---

## **3. High-Level Architecture**

```
[ Frontend (React / HTML-CSS-JS) ]
              |
          REST APIs
              |
     [ Backend (Node.js + Express) ]
              |
        [ MongoDB Database ]
```

### **Architecture Principle**

* Client–Server Architecture
* RESTful APIs
* Role-Based Access Control (RBAC)

---

## **4. Database Design (MongoDB)**

### **4.1 Database**

* **Database:** MongoDB
* **ODM:** Mongoose

---

### **4.2 Collections**

---

### **4.2.1 users Collection**

```json
{
  "_id": "ObjectId",
  "name": "string",
  "email": "string",
  "password": "string",
  "role": "patient | doctor | admin",
  "phone": "string",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

**Indexes:**

* email (unique)

---

### **4.2.2 doctors Collection**

```json
{
  "_id": "ObjectId",
  "userId": "ObjectId (ref users)",
  "specialization": "string",
  "experience": "number",
  "availableSlots": [
    {
      "date": "string",
      "time": "string",
      "isBooked": "boolean"
    }
  ]
}
```

---

### **4.2.3 appointments Collection**

```json
{
  "_id": "ObjectId",
  "patientId": "ObjectId (ref users)",
  "doctorId": "ObjectId (ref doctors)",
  "appointmentDate": "string",
  "appointmentTime": "string",
  "status": "Booked | Completed | Cancelled",
  "createdAt": "Date"
}
```

---

## **5. Backend Design (Node.js + Express)**

### **5.1 Technology Stack**

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt for password hashing

---

### **5.2 Backend Folder Structure**

```
backend/
│── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── services/
│   └── app.js
│── .env
│── package.json
```

---

### **5.3 Authentication Flow**

1. User registers or logs in
2. Password is encrypted using bcrypt
3. JWT token is generated
4. Token is verified for protected routes
5. Role-based access applied

---

### **5.4 API Endpoints**

#### **Auth APIs**

| Method | Endpoint       | Description       |
| ------ | -------------- | ----------------- |
| POST   | /auth/register | User registration |
| POST   | /auth/login    | User login        |

#### **Doctor APIs**

| Method | Endpoint | Description        |
| ------ | -------- | ------------------ |
| GET    | /doctors | Get doctor list    |
| POST   | /doctors | Add doctor (admin) |

#### **Appointment APIs**

| Method | Endpoint              | Description          |
| ------ | --------------------- | -------------------- |
| POST   | /appointments         | Book appointment     |
| GET    | /appointments/patient | Patient appointments |
| GET    | /appointments/doctor  | Doctor appointments  |

---

### **5.5 Role-Based Access Control**

* Middleware checks user role
* Admin-only APIs protected
* Doctor-only appointment views
* Patient-only booking allowed

---

## **6. Frontend Design**

### **6.1 Technology Stack**

* React.js / HTML, CSS, JavaScript
* Axios for API calls
* React Router

---

### **6.2 Frontend Folder Structure**

```
src/
├── components/
├── pages/
├── services/
├── context/
└── App.js
```

---

### **6.3 Key Pages**

* Home Page
* Login / Register
* Doctor List Page
* Book Appointment Page
* Patient Dashboard
* Doctor Dashboard
* Admin Dashboard

---

## **7. Functional Requirements**

1. Users must be able to register and log in
2. Patients must be able to view doctors
3. Patients must book appointments
4. Doctors must view their schedules
5. Admin must manage doctors and users

---

## **8. Non-Functional Requirements**

* Secure authentication
* Fast response time
* Scalable architecture
* Data consistency
* High availability

---

## **9. Security Considerations**

* JWT-based authentication
* Password encryption
* Input validation
* Protected APIs

---

## **10. Future Enhancements**

* Online payment integration
* Video consultation
* Email/SMS notifications
* Prescription upload
* Medical history tracking

---

## **11. Conclusion**

MediConnect provides a **secure, scalable, and user-friendly platform** for managing doctor appointments online.
The system demonstrates **real-world full-stack development**, effective use of **MongoDB**, and role-based access control.
---
### 📌 **Project Name:** MediConnect

### 📌 **Document Type:** SRS & Technical Documentation

### 📌 **Database:** MongoDB
