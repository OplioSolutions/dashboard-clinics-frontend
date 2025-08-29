-- Database design for a multi-tenant SaaS system for aesthetic clinics, 
-- focusing on client management, appointments, and interactions.

-- Create ENUM types
CREATE TYPE company_status AS ENUM ('active', 'inactive');
CREATE TYPE user_role AS ENUM ('admin', 'staff');
CREATE TYPE user_status AS ENUM ('active', 'inactive');
CREATE TYPE appointment_status AS ENUM ('scheduled', 'confirmed', 'completed', 'cancelled');
CREATE TYPE interaction_channel AS ENUM ('whatsapp', 'email', 'sms');
CREATE TYPE interaction_direction AS ENUM ('inbound', 'outbound');
CREATE TYPE interaction_status AS ENUM ('sent', 'delivered', 'read', 'failed');
CREATE TYPE engagement_level AS ENUM ('high', 'medium', 'low');
CREATE TYPE payment_status_company AS ENUM ('active', 'pending', 'overdue');
CREATE TYPE payment_method AS ENUM ('credit_card', 'debit_card', 'cash', 'pix', 'bank_transfer', 'other');
CREATE TYPE payment_status_transaction AS ENUM ('paid', 'pending', 'refunded', 'failed');
CREATE TYPE conversation_status AS ENUM ('active', 'closed');
CREATE TYPE assignment_status AS ENUM ('unassigned', 'assigned', 'in_progress', 'resolved');

-- Companies table
-- Stores information about each aesthetic clinic in the multi-tenant system.
CREATE TABLE companies (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL, -- Name of the aesthetic clinic
    owner_name VARCHAR NOT NULL, -- Name of the clinic owner
    email VARCHAR UNIQUE NOT NULL, -- Contact email of the clinic
    phone VARCHAR, -- Contact phone number of the clinic
    address TEXT, -- Physical address of the clinic
    logo_url VARCHAR, -- URL to the clinic logo
    status company_status NOT NULL DEFAULT 'active', -- Current status of the clinic (active, inactive)
    cnpj VARCHAR UNIQUE NOT NULL, -- CNPJ (Brazilian company registration number) of the clinic
    created_at TIMESTAMP NOT NULL DEFAULT NOW(), -- Timestamp when the clinic record was created
    updated_at TIMESTAMP NOT NULL DEFAULT NOW() -- Timestamp when the clinic record was last updated
);

-- Users table
-- Stores user accounts for each clinic, with roles for access control and multi-tenancy.
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    company_id INTEGER NOT NULL REFERENCES companies(id), -- Foreign key to the associated clinic
    name VARCHAR NOT NULL, -- Full name of the user
    email VARCHAR UNIQUE NOT NULL, -- Unique email address of the user
    password_hash VARCHAR NOT NULL, -- Hashed password for user authentication
    role user_role NOT NULL, -- Role of the user within the clinic (admin, staff)
    status user_status NOT NULL DEFAULT 'active', -- Current status of the user account (active, inactive)
    created_at TIMESTAMP NOT NULL DEFAULT NOW(), -- Timestamp when the user record was created
    updated_at TIMESTAMP NOT NULL DEFAULT NOW() -- Timestamp when the user record was last updated
);

-- Clients table
-- Manages client/patient information for each clinic, ensuring data isolation per tenant.
CREATE TABLE clients (
    id SERIAL PRIMARY KEY,
    company_id INTEGER NOT NULL REFERENCES companies(id), -- Foreign key to the associated clinic
    full_name VARCHAR NOT NULL, -- Full name of the client/patient
    phone VARCHAR, -- Contact phone number of the client
    email VARCHAR, -- Email address of the client
    birth_date DATE, -- Date of birth of the client
    notes TEXT, -- Free-form field for additional relevant information (medical conditions, aesthetic history, etc.)
    cpf VARCHAR UNIQUE, -- CPF (Brazilian individual taxpayer registry) of the client
    created_at TIMESTAMP NOT NULL DEFAULT NOW(), -- Timestamp when the client record was created
    updated_at TIMESTAMP NOT NULL DEFAULT NOW() -- Timestamp when the client record was last updated
);

-- Services table
-- Defines the aesthetic services offered by each clinic.
CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    company_id INTEGER NOT NULL REFERENCES companies(id), -- Foreign key to the associated clinic
    name VARCHAR NOT NULL, -- Name of the service offered by the clinic
    description TEXT, -- Detailed description of the service
    price DECIMAL(10, 2) NOT NULL, -- Price of the service
    duration_minutes INTEGER NOT NULL, -- Estimated duration of the service in minutes
    is_active BOOLEAN NOT NULL DEFAULT TRUE, -- Indicates if the service is currently active and offered
    created_at TIMESTAMP NOT NULL DEFAULT NOW(), -- Timestamp when the service record was created
    updated_at TIMESTAMP NOT NULL DEFAULT NOW() -- Timestamp when the service record was last updated
);

-- Appointments table
-- Handles scheduling of appointments for clients with clinic professionals, linked to specific clinics and services.
CREATE TABLE appointments (
    id SERIAL PRIMARY KEY,
    company_id INTEGER NOT NULL REFERENCES companies(id), -- Foreign key to the associated clinic
    client_id INTEGER NOT NULL REFERENCES clients(id), -- Foreign key to the client associated with the appointment
    user_id INTEGER NOT NULL REFERENCES users(id), -- Foreign key to the professional responsible for the appointment
    service_id INTEGER NOT NULL REFERENCES services(id), -- Foreign key to the service being provided in the appointment
    title VARCHAR NOT NULL, -- Title of the appointment (e.g., "Botox Application")
    description TEXT, -- Detailed description of the appointment
    date DATE NOT NULL, -- Date of the appointment
    time TIME NOT NULL, -- Time of the appointment
    status appointment_status NOT NULL DEFAULT 'scheduled', -- Current status of the appointment (scheduled, confirmed, completed, cancelled)
    created_at TIMESTAMP NOT NULL DEFAULT NOW(), -- Timestamp when the appointment record was created
    updated_at TIMESTAMP NOT NULL DEFAULT NOW() -- Timestamp when the appointment record was last updated
);

-- Conversation threads table
-- Manages conversation threads with clients, grouping related interactions and tracking their status and assignment.
CREATE TABLE conversation_threads (
    id SERIAL PRIMARY KEY,
    company_id INTEGER NOT NULL REFERENCES companies(id), -- Foreign key to the associated clinic
    client_id INTEGER NOT NULL REFERENCES clients(id), -- Foreign key to the client involved in the conversation
    started_at TIMESTAMP NOT NULL, -- Timestamp when the conversation thread started
    ended_at TIMESTAMP, -- Timestamp when the conversation thread ended (null if still active)
    channels_used JSON NOT NULL, -- JSON array of channels used in this conversation (e.g., ["whatsapp", "email"])
    context_summary TEXT, -- Summary of the conversation context
    status conversation_status NOT NULL DEFAULT 'active', -- Current status of the conversation thread (active, closed)
    assigned_user_id INTEGER REFERENCES users(id), -- Foreign key to the user assigned to handle this conversation
    assignment_status assignment_status NOT NULL DEFAULT 'unassigned', -- Status of the conversation assignment (unassigned, assigned, in_progress, resolved)
    created_at TIMESTAMP NOT NULL DEFAULT NOW(), -- Timestamp when the conversation thread record was created
    updated_at TIMESTAMP NOT NULL DEFAULT NOW() -- Timestamp when the conversation thread record was last updated
);

-- Interactions table
-- Records all communication interactions with clients, categorized by channel and direction, and linked to conversation threads.
CREATE TABLE interactions (
    id SERIAL PRIMARY KEY,
    company_id INTEGER NOT NULL REFERENCES companies(id), -- Foreign key to the associated clinic
    client_id INTEGER NOT NULL REFERENCES clients(id), -- Foreign key to the client involved in the interaction
    conversation_id INTEGER NOT NULL REFERENCES conversation_threads(id), -- Foreign key to the conversation thread this interaction belongs to
    channel interaction_channel NOT NULL, -- Communication channel used (WhatsApp, Email, SMS)
    direction interaction_direction NOT NULL, -- Direction of the message (inbound, outbound)
    message TEXT NOT NULL, -- Content of the interaction message
    status interaction_status NOT NULL, -- Status of the message (sent, delivered, read, failed)
    timestamp TIMESTAMP NOT NULL, -- Timestamp of the interaction event
    created_at TIMESTAMP NOT NULL DEFAULT NOW(), -- Timestamp when the interaction record was created
    updated_at TIMESTAMP NOT NULL DEFAULT NOW() -- Timestamp when the interaction record was last updated
);

-- Insights table
-- Stores analytical insights generated by the Analyst Agent for clients, linked to specific clinics.
CREATE TABLE insights (
    id SERIAL PRIMARY KEY,
    company_id INTEGER NOT NULL REFERENCES companies(id), -- Foreign key to the associated clinic
    client_id INTEGER NOT NULL REFERENCES clients(id), -- Foreign key to the client for whom the insight was generated
    risk_score INTEGER NOT NULL, -- Calculated risk score for the client (0-100)
    engagement_level engagement_level NOT NULL, -- Engagement level of the client (high, medium, low)
    summary TEXT NOT NULL, -- Summary of the analysis provided by the AI agent
    recommendations TEXT NOT NULL, -- Actionable recommendations based on the analysis
    created_at TIMESTAMP NOT NULL DEFAULT NOW(), -- Timestamp when the insight record was created
    updated_at TIMESTAMP NOT NULL DEFAULT NOW() -- Timestamp when the insight record was last updated
);

-- Payments table
-- Records all financial transactions made by clients, linked to clinics and optionally appointments.
CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    company_id INTEGER NOT NULL REFERENCES companies(id), -- Foreign key to the associated clinic
    client_id INTEGER NOT NULL REFERENCES clients(id), -- Foreign key to the client making the payment
    appointment_id INTEGER REFERENCES appointments(id), -- Optional foreign key to the associated appointment, if payment is for a specific service
    amount DECIMAL(10, 2) NOT NULL, -- Amount of the payment
    payment_date TIMESTAMP NOT NULL DEFAULT NOW(), -- Date and time when the payment was made
    payment_method payment_method NOT NULL, -- Method used for the payment (credit_card, debit_card, cash, pix, etc.)
    status payment_status_transaction NOT NULL DEFAULT 'pending', -- Current status of the payment (paid, pending, refunded, failed)
    transaction_id VARCHAR UNIQUE, -- Unique identifier for the payment transaction from the payment gateway
    created_at TIMESTAMP NOT NULL DEFAULT NOW(), -- Timestamp when the payment record was created
    updated_at TIMESTAMP NOT NULL DEFAULT NOW() -- Timestamp when the payment record was last updated
);

-- Settings table
-- Manages clinic-specific configurations and preferences, accessible only by clinic administrators.
CREATE TABLE settings (
    id SERIAL PRIMARY KEY,
    company_id INTEGER UNIQUE NOT NULL REFERENCES companies(id), -- Foreign key to the associated clinic, ensuring one settings record per clinic
    working_hours JSONB NOT NULL, -- JSON object containing the clinic's working hours configuration
    contact_email VARCHAR, -- Clinic-specific contact email for general inquiries
    contact_phone VARCHAR, -- Clinic-specific contact phone number for general inquiries
    support_ticket_enabled BOOLEAN NOT NULL DEFAULT FALSE, -- Boolean indicating if support ticket functionality is enabled for the clinic
    payment_status payment_status_company NOT NULL DEFAULT 'active', -- Current payment status of the clinic subscription
    created_at TIMESTAMP NOT NULL DEFAULT NOW(), -- Timestamp when the settings record was created
    updated_at TIMESTAMP NOT NULL DEFAULT NOW() -- Timestamp when the settings record was last updated
);

-- AI context snapshots table
-- Stores AI-generated context snapshots for clients, providing a summarized view of their history and important flags.
CREATE TABLE ai_context_snapshots (
    id SERIAL PRIMARY KEY,
    company_id INTEGER NOT NULL REFERENCES companies(id), -- Foreign key to the associated clinic
    client_id INTEGER NOT NULL REFERENCES clients(id), -- Foreign key to the client for whom the snapshot was generated
    last_updated TIMESTAMP NOT NULL, -- Timestamp when this context snapshot was last updated
    summary TEXT NOT NULL, -- Summary of the AI-generated context for the client
    important_flags JSON, -- JSON array of important flags or alerts related to the client context
    source_conversation_id INTEGER REFERENCES conversation_threads(id), -- Optional foreign key to the conversation thread that triggered this snapshot update
    created_at TIMESTAMP NOT NULL DEFAULT NOW(), -- Timestamp when the AI context snapshot record was created
    updated_at TIMESTAMP NOT NULL DEFAULT NOW() -- Timestamp when the AI context snapshot record was last updated
);