require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');

const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (images, CSS, JS, etc.) from the project directory
app.use(express.static(__dirname));

// Serve the portfolio HTML at the root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Ronald Portfolio.html'));
});

// Rate limiting - max 5 requests per 15 minutes per IP
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: {
        success: false,
        message: 'Too many requests from this IP, please try again later.'
    }
});

// Apply rate limiting to contact endpoint
app.use('/api/contact', limiter);

// Email transporter configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Verify transporter configuration
transporter.verify((error, success) => {
    if (error) {
        console.log('❌ Email configuration error:', error);
        console.log('⚠️  Please check your .env file and email credentials');
    } else {
        console.log('✅ Email server is ready to send messages');
    }
});

// Validation function
function validateContactForm(data) {
    const errors = [];

    if (!data.name || data.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
    }

    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.push('Valid email address is required');
    }

    if (!data.subject || data.subject.trim().length < 3) {
        errors.push('Subject must be at least 3 characters long');
    }

    if (!data.message || data.message.trim().length < 10) {
        errors.push('Message must be at least 10 characters long');
    }

    return errors;
}

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Validate form data
        const validationErrors = validateContactForm(req.body);
        if (validationErrors.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: validationErrors
            });
        }

        // Email to you (receiving the contact form submission)
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.RECIPIENT_EMAIL || 'ronaldlimo23@gmail.com',
            subject: `Portfolio Contact: ${subject}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 10px;">
                    <div style="background: linear-gradient(90deg, #3B82F6, #10B981); padding: 20px; border-radius: 10px 10px 0 0;">
                        <h2 style="color: white; margin: 0;">New Contact Form Submission</h2>
                    </div>
                    <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                        <p style="font-size: 16px; color: #1F2937; margin-bottom: 20px;">You have received a new message from your portfolio website:</p>
                        
                        <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                            <p style="margin: 5px 0; color: #6B7280; font-size: 14px;"><strong style="color: #1F2937;">Name:</strong></p>
                            <p style="margin: 5px 0; color: #1F2937; font-size: 16px;">${name}</p>
                        </div>
                        
                        <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                            <p style="margin: 5px 0; color: #6B7280; font-size: 14px;"><strong style="color: #1F2937;">Email:</strong></p>
                            <p style="margin: 5px 0; color: #1F2937; font-size: 16px;"><a href="mailto:${email}" style="color: #3B82F6; text-decoration: none;">${email}</a></p>
                        </div>
                        
                        <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                            <p style="margin: 5px 0; color: #6B7280; font-size: 14px;"><strong style="color: #1F2937;">Subject:</strong></p>
                            <p style="margin: 5px 0; color: #1F2937; font-size: 16px;">${subject}</p>
                        </div>
                        
                        <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                            <p style="margin: 5px 0; color: #6B7280; font-size: 14px;"><strong style="color: #1F2937;">Message:</strong></p>
                            <p style="margin: 5px 0; color: #1F2937; font-size: 16px; white-space: pre-wrap;">${message}</p>
                        </div>
                        
                        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                            <p style="color: #6B7280; font-size: 14px; margin: 0;">
                                <strong>Reply to:</strong> <a href="mailto:${email}" style="color: #3B82F6; text-decoration: none;">${email}</a>
                            </p>
                        </div>
                    </div>
                    <div style="text-align: center; margin-top: 20px; color: #6B7280; font-size: 12px;">
                        <p>This message was sent from your portfolio contact form</p>
                    </div>
                </div>
            `,
            replyTo: email
        };

        // Send email
        await transporter.sendMail(mailOptions);

        console.log(`✅ Contact form submission from ${name} (${email})`);

        res.status(200).json({
            success: true,
            message: 'Message sent successfully! I will get back to you soon.'
        });

    } catch (error) {
        console.error('❌ Error sending email:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send message. Please try again later or contact me directly via email.'
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
    console.log('='.repeat(50));
    console.log(`🚀 Backend server is running on port ${PORT}`);
    console.log(`📧 Contact form endpoint: http://localhost:${PORT}/api/contact`);
    console.log(`💚 Health check: http://localhost:${PORT}/api/health`);
    console.log('='.repeat(50));
});
