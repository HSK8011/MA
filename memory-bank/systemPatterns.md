# System Patterns

## Architecture Overview

### Frontend Architecture
```
src/
├── assets/          # Static assets
├── components/      # Reusable UI components
├── layouts/         # Page layouts
├── pages/          # Route components
├── services/       # API integration services
├── store/          # State management
├── utils/          # Helper functions
└── hooks/          # Custom React hooks
```

### Backend Architecture
```
src/
├── config/         # Configuration files
├── controllers/    # Request handlers
├── middleware/     # Custom middleware
├── models/         # Database models
├── routes/         # API routes
├── services/      # Business logic
├── utils/         # Helper functions
└── validation/    # Request validation
```

## Component Architecture

### Modal System
1. Base Modal Pattern
   ```jsx
   <BaseModal>
     <ModalContent />
   </BaseModal>
   ```
   - Reusable overlay and close functionality
   - Handles backdrop clicks
   - Manages z-index layering
   - Controls animations

2. SignupModal Pattern
   ```jsx
   <SignupModal
     isOpen={isOpen}
     onClose={handleClose}
     onSubmit={handleSubmit}
   />
   ```
   - Extends BaseModal
   - Form field management
   - Validation logic
   - Terms integration

### Navigation System
1. Responsive Navigation Pattern
   ```jsx
   <Nav>
     <NavBrand />
     <NavToggle />
     <NavMenu>
       <NavItem />
     </NavMenu>
   </Nav>
   ```
   - Compound component pattern
   - Context-based state management
   - Responsive breakpoint handling

2. Mobile Menu Pattern
   ```jsx
   <MobileMenu
     isOpen={isOpen}
     onClose={handleClose}
   >
     <MenuItems />
   </MobileMenu>
   ```
   - Slide-in animation
   - Touch interaction handling
   - State management
   - Event propagation control

## Design Patterns

### Frontend Patterns
1. Component Patterns
   - Functional Components
   - Container/Presenter Pattern
   - Higher-Order Components (when needed)
   - Custom Hooks for logic reuse

2. State Management
   - React Context for global state
   - Local state for component-specific data
   - Custom hooks for complex state logic

3. Code Organization
   - Feature-based organization
   - Shared components in components/
   - Page-specific components with pages

### Backend Patterns
1. MVC Architecture
   - Models: Database schemas and business logic
   - Controllers: Request handling and response
   - Services: Business logic implementation

2. Middleware Pattern
   - Authentication middleware
   - Error handling middleware
   - Request validation middleware
   - Logging middleware

3. Repository Pattern
   - Abstraction for database operations
   - Centralized data access logic
   - Easier testing and maintenance

### Responsive Design
1. Fluid Typography
   ```css
   .fluid-text {
     font-size: clamp(min, preferred, max);
   }
   ```
   - Scales smoothly between breakpoints
   - Maintains readability
   - Prevents text overflow

2. Mobile-First Grid
   ```css
   .grid {
     display: grid;
     grid-template-columns: repeat(auto-fit, minmax(min, 1fr));
     gap: var(--spacing);
   }
   ```
   - Responsive without media queries
   - Self-adjusting columns
   - Consistent spacing

### State Management
1. Modal Context
   ```jsx
   const ModalContext = createContext();
   const useModal = () => useContext(ModalContext);
   ```
   - Centralized modal state
   - Shared functionality
   - Consistent behavior

2. Navigation State
   ```jsx
   const NavContext = createContext();
   const useNav = () => useContext(NavContext);
   ```
   - Menu state management
   - Breakpoint awareness
   - Animation state control

## Event Handling

### Touch Interactions
1. Touch Target Pattern
   ```css
   .touch-target {
     min-width: 44px;
     min-height: 44px;
     padding: var(--spacing);
   }
   ```
   - WCAG compliant sizes
   - Clear hit areas
   - Proper spacing

2. Swipe Detection
   ```jsx
   const handleTouchStart = (e) => {
     setTouchStart(e.touches[0].clientX);
   };
   ```
   - Direction detection
   - Threshold handling
   - Momentum scrolling

## Animation Patterns

### Modal Animations
1. Fade Pattern
   ```css
   .modal-overlay {
     opacity: 0;
     transition: opacity 200ms ease-in-out;
   }
   ```
   - Smooth transitions
   - Performance optimized
   - Hardware acceleration

2. Slide Pattern
   ```css
   .mobile-menu {
     transform: translateX(100%);
     transition: transform 300ms ease-in-out;
   }
   ```
   - Direction-based slides
   - Timing functions
   - State management

## Accessibility Patterns

### ARIA Integration
1. Modal Pattern
   ```jsx
   <dialog
     role="dialog"
     aria-modal="true"
     aria-labelledby="modal-title"
   >
   ```
   - Proper role assignment
   - Focus management
   - Keyboard navigation

2. Navigation Pattern
   ```jsx
   <button
     aria-expanded={isOpen}
     aria-controls="mobile-menu"
   >
   ```
   - State communication
   - Screen reader support
   - Keyboard accessibility

## Best Practices

### Code Quality
1. DRY (Don't Repeat Yourself)
   - Reusable components
   - Utility functions
   - Shared hooks
   - Common middleware

2. SOLID Principles
   - Single Responsibility
   - Open/Closed
   - Liskov Substitution
   - Interface Segregation
   - Dependency Inversion

3. Clean Code
   - Meaningful variable names
   - Function length < 20 lines
   - Clear file structure
   - Comprehensive comments
   - Proper error handling

### Testing Strategy
1. Frontend Testing
   - Component unit tests
   - Integration tests
   - Hook testing
   - User interaction testing

2. Backend Testing
   - API endpoint testing
   - Service layer testing
   - Database operation testing
   - Middleware testing

### Security Practices
1. Authentication
   - JWT implementation
   - Secure password handling
   - Session management
   - 2FA implementation

2. Data Protection
   - Input validation
   - XSS prevention
   - CSRF protection
   - Rate limiting

### API Design
1. RESTful Principles
   - Resource-based URLs
   - Proper HTTP methods
   - Consistent response format
   - Status codes usage

2. Documentation
   - Swagger documentation
   - API versioning
   - Error response format
   - Rate limit information

## Authentication Flow

### User Authentication
- JWT-based authentication system
- Token stored in localStorage
- Automatic token inclusion in protected API requests
- Session management through token expiration

### Password Reset Flow
1. Request OTP
   - User enters email
   - Backend generates OTP (000000 for development)
   - OTP sent to user's email (disabled in development)

2. OTP Verification
   - User enters 6-digit OTP
   - Backend validates OTP and expiration
   - Returns reset token on success

3. Password Reset
   - User enters new password
   - Reset token validated
   - Password updated in database

## Error Handling Pattern

### API Error Handling
```javascript
const handleApiError = (error, operation) => {
  console.error(`${operation} failed:`, error);
  
  if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
    throw new Error('Unable to connect to the server. Please check your internet connection.');
  }

  if (error.response) {
    throw new Error(error.response.message || `${operation} failed`);
  }

  throw error;
};
```

### Error Categories
1. Network Errors
   - Connection failures
   - Timeout issues
   - Server unreachable

2. API Errors
   - Invalid credentials
   - Resource not found
   - Validation errors
   - Server errors

3. Client-side Errors
   - Local storage issues
   - Form validation
   - State management errors

### Error Response Format
```javascript
{
  status: 'error',
  message: 'User-friendly error message',
  data?: {
    // Optional additional error details
  }
}
```

## Form Validation Patterns

### Client-side Validation
- Required field checks
- Password strength requirements
- Email format validation
- Cross-field validation (password confirmation)

### Server-side Validation
- Data type validation
- Business rule validation
- Security checks
- Duplicate checks

## Component Patterns

### Modal Components
- Consistent close button placement
- Backdrop click handling
- Loading state management
- Error message display
- Success feedback

### Form Components
- Consistent layout
- Proper label association
- Accessibility compliance
- Loading state indicators
- Error message placement

## Security Patterns

### Password Security
- Minimum 8 characters
- Password hashing (bcrypt)
- No password exposure in responses
- Secure reset flow

### API Security
- CORS configuration
- Rate limiting
- Input sanitization
- Token-based authentication
- XSS prevention 