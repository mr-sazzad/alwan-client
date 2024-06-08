import MaxWidth from "@/components/max-width";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const PrivacyPolicy = () => {
  return (
    <MaxWidth>
      <div className="mt-[100px] flex md:flex-row flex-col gap-5 md:px-[120px] px-3">
        <div className="flex-1">
          <h2 className="md:text-2xl text-xl md:font-semibold font-medium text-gray-700">
            Privacy Policy
          </h2>
          <p className="text-sm mb-5 text-gray-700">alwan clothing</p>
          <p className="text-gray-600">
            We are committed to protecting your privacy and ensuring the
            security of your personal information. This Privacy Policy outlines
            how we collect, use, disclose, and protect the information you
            provide to us when you use our website or interact with our brand.
            We collect personal information to provide and improve our services,
            respond to your inquiries, and communicate with you about our
            offerings. We implement a variety of security measures to maintain
            the safety of your personal information. Your information is only
            accessible to a limited number of authorized personnel who are
            required to keep the information confidential. We do not sell,
            trade, or otherwise transfer your personal information to outside
            parties without your consent, except as required by law. By using
            our website, you consent to the terms of this Privacy Policy. We may
            update this policy from time to time, and any changes will be posted
            on this page. We encourage you to review our Privacy Policy
            periodically to stay informed about how we are protecting your
            information. If you have any questions or concerns about our Privacy
            Policy, please contact us.
          </p>
        </div>
        <div className="flex-1">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>1. Information We Collect:</AccordionTrigger>
              <AccordionContent>
                <strong>Personal Information:</strong>
                <p className="mb-3">
                  When you make a purchase, register for an account, sign up for
                  our newsletter, or interact with us in any way, we may collect
                  personal information such as your name, email address,
                  shipping address, phone number, and payment details.
                </p>
                <strong>Cookies:</strong>
                <p>
                  We use cookies and similar tracking technologies to enhance
                  your browsing experience, analyze website traffic, and
                  personalize content and advertisements.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                2. How We Use Your Information
              </AccordionTrigger>
              <AccordionContent>
                <p className="mb-3">
                  <strong>To Process Orders:</strong> We use your personal
                  information to process and fulfill your orders, communicate
                  with you about your purchases, and provide customer support.
                </p>

                <p className="mb-3">
                  <strong>Marketing Communication:</strong> With your consent,
                  we may send you promotional emails about new products, special
                  offers, and other updates related to our brand.
                </p>
                <p className="mb-3">
                  <strong>Improving Our Services:</strong> We analyze usage data
                  to improve our website, products, and services, and to tailor
                  our marketing efforts to your preferences.{" "}
                </p>
                <p>
                  <strong>Legal Compliance:</strong>We may use your information
                  to comply with legal obligations, enforce our terms and
                  policies, and protect the rights, property, or safety of ALWAN
                  and our customers.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                3. Data Sharing and Disclosure
              </AccordionTrigger>
              <AccordionContent>
                <p className="mb-3">
                  <strong>Third-Party Service Providers:</strong> We may share
                  your information with trusted third-party service providers
                  who assist us in operating our website, processing payments,
                  and delivering products to you.
                </p>
                <p className="mb-3">
                  <strong>Legal Requirements:</strong> We may disclose your
                  information in response to legal requests or to comply with
                  applicable laws, regulations, or court orders.
                </p>
                <p>
                  <strong>Business Transfers:</strong> If ALWAN is involved in a
                  merger, acquisition, or sale of assets, your information may
                  be transferred as part of the transaction. We will notify you
                  via email or prominent notice on our website if your
                  information becomes subject to a different privacy policy.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>4. Data Security</AccordionTrigger>
              <AccordionContent>
                <p className="mb-3">
                  We implement industry-standard security measures to protect
                  your personal information from unauthorized access,
                  alteration, disclosure, or destruction.
                </p>
                <p>
                  However, please note that no method of transmission over the
                  internet or electronic storage is 100% secure, and we cannot
                  guarantee the absolute security of your data.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger> 5. Your Privacy Choices</AccordionTrigger>
              <AccordionContent>
                <p className="mb-3">
                  You have the right to access, update, or delete your personal
                  information at any time. You can manage your account settings
                  and communication preferences through your account dashboard
                  or by contacting us directly.
                </p>
                <p>
                  You may opt out of receiving marketing communications from us
                  by following the unsubscribe instructions provided in our
                  emails or by contacting us.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger>6. Children&apos;s Privacy</AccordionTrigger>
              <AccordionContent>
                <p>
                  Our website and services are not directed to children under
                  the age of 13. We do not knowingly collect personal
                  information from children. If you believe that we have
                  inadvertently collected information from a child, please
                  contact us immediately.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-7">
              <AccordionTrigger>
                7. Changes to This Privacy Policy
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  We reserve the right to update or modify this Privacy Policy
                  at any time. Any changes will be effective immediately upon
                  posting the updated policy on our website. We encourage you to
                  review this policy periodically for any updates.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-8">
              <AccordionTrigger> 8. Contact Us</AccordionTrigger>
              <AccordionContent>
                <p>
                  If you have any questions, concerns, or requests regarding
                  this Privacy Policy or our privacy practices, please contact
                  us at alwan.bd@gmail.com.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </MaxWidth>
  );
};

export default PrivacyPolicy;
