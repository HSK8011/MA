import React from 'react';
import { Link } from 'react-router-dom';
import './Terms.css';

const Terms = () => {
  return (
    <div className="terms-page">
      {/* Hero Section */}
      <section className="terms-hero">
        <h1>Terms & Conditions</h1>
        <Link to="/" className="back-link">Back to Home</Link>
      </section>

      {/* Content Section */}
      <section className="terms-content">
        <div className="container">
          <div className="terms-text">
            <h2>Service & Account</h2>
            
            <h3>Service Overview</h3>
            <p>
              The Service provides a social media management tool that enables users to release posts on social platforms at a scheduled time, in addition to other design and analytics tools to help bolster users' social media content.
            </p>

            <h3>Modification of the Service</h3>
            <p>
              MAT reserves the right to modify or discontinue all or any portion of the Service at any time (including by limiting or discontinuing certain features of the Service), temporarily or permanently without notice to you. MAT will have no liability for any change to the Service, including any paid-for functionalities of the Service, or any suspension or termination of your access to or use of the Service. Service fees are not refundable. You should retain copies of any User Content you Posted to the Service so that you have permanent copies in the event the Service is modified in such a way that you lose access to User Content you Posted to the Service.
            </p>

            <h2>Eligibility</h2>
            <p>
              You must be at least 18-years old to use the Service. By agreeing to these Terms, you represent and warrant to us that: (a) you are at least 18-years old; (b) you have not previously been suspended or removed from the applicable Service; and (c) your registration and your use of the Service is in compliance with any and all laws and regulations. If you are an entity, organization, or company, the individual accepting these Terms on your behalf represents and warrants that they have authority to bind you to these Terms and you agree to be bound by these Terms.
            </p>

            <h2>Accounts and Registration</h2>
            <p>
              To access most features of the Service, you must register for an account. When you register for an account, you may be required to provide us with some information about yourself, such as your name, email address, or other contact information. You agree that the information you provide to us is accurate, complete, and not misleading, and that you will keep it accurate and up to date at all times. When you register, you will be asked to create a password. You are solely responsible for maintaining the confidentiality of your account and password, and you accept responsibility for all activities that occur under your account. If you believe that your account is no longer secure, then you should immediately notify us at hello@mat.com
            </p>

            <h2>Payment Terms</h2>
            <p>
              Some features of the Service may require you to pay fees upon registering for the applicable subscription. Before you pay any fees, you will have an opportunity to review and accept the fees that you will be charged. All fees are in U.S. Dollars and are non-refundable unless otherwise specifically provided for in these Terms. Fees vary based on the plan, with different pricing schemes for individual users and organizations.
            </p>

            <h3>Price</h3>
            <p>
              MAT reserves the right to determine pricing for the Service. MAT will make reasonable efforts to keep pricing information published on our website up to date. We encourage you to check our pricing page periodically for current pricing information, located here: https://mat.com/pricing. If you cancel your subscription you may forego your current price. If you reactivate at a later date, please check https://mat.com/pricing for our current pricing. MAT may change fees for any feature of the Service. MAT, at its sole discretion, may make promotional offers with different features and different pricing to any of MAT's customers. These promotional offers, unless made to you, will not apply to your offer or these Terms. Quotes provided for our Service are subject to change at any time.
            </p>

            <h3>Authorization</h3>
            <p>
              You authorize MAT to charge all sums for the orders that you make and any level of Service you select as described in these Terms or published by MAT, including all applicable taxes, to the payment method specified in your account. If you pay any fees with a credit card, then MAT may seek pre-authorization of your credit card account prior to your purchase to verify that the credit card is valid and has the necessary funds or credit available to cover your purchase.
            </p>

            <h3>Subscription Service</h3>
            <p>
              The Service may include certain subscription-based plans with automatically recurring payments for periodic charges ("Subscription Service"). The "Subscription Billing Date" is the date when you purchase your first subscription to the Service. The Subscription Service will begin on the Subscription Billing Date and continue for the subscription period that you select on your account (such period, the "Initial Subscription Period"), and will automatically renew for successive periods of the same duration as the Initial Subscription Period (the Initial Subscription Period and each such renewal period, each a "Subscription Period") unless you cancel the Subscription Service or we terminate it. If you activate a Subscription Service, then you authorize MAT and its third-party payment processors to periodically charge, on a going-forward basis and until cancellation of the Subscription Service, all accrued sums on or before the payment due date. For information on the "Subscription Fee", please see our pricing page at https://mat.com/pricing. Your account will be charged automatically on the Subscription Billing Date and thereafter on the renewal date of your Subscription Service for all applicable fees and taxes for the next Subscription Period. You must cancel your Subscription Service before it renews in order to avoid billing of the next periodic Subscription Fee to your account. MAT or its third-party payment processor will bill the periodic Subscription Fee to the payment method associated with your account (or to a different payment method if you change your payment information). You may cancel the Subscription Service by accessing your account settings at: https://account.mat.com/billing and clicking on the "Cancel Plan" option or by contacting us at: hello@mat.com. Your cancellation must be received before the renewal date in order to avoid charge for the next subscription period.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Terms; 