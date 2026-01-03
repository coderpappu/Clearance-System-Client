import {
    Accordion,
    AccordionAction,
    AccordionContent,
    AccordionIcon,
    AccordionItem,
    AccordionTitle,
} from "keep-react";

export const AccordionComponent = () => {
  return (
    <div className="p-4 rounded bg-white dark:bg-dark-card">
      <h3 className="text-lg font-semibold mb-2 text-dark-box  dark:text-dark-heading-color">
        Clearance System Guide
      </h3>
      <Accordion flush={true} type="single" collapsible>
        <AccordionItem value="value-1">
          <AccordionAction>
            <AccordionTitle className="first-letter:text-primary-500">
              How do students get clearance?
            </AccordionTitle>
            <AccordionIcon />
          </AccordionAction>
          <AccordionContent>
            Students must complete all requirements for each department and clearance category. 
            Teachers will review and approve clearances for their respective departments. 
            Once all clearances are approved and signed, students can download their clearance certificate.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="value-2">
          <AccordionAction>
            <AccordionTitle className="first-letter:text-primary-500">
              How do I manage student dues?
            </AccordionTitle>
            <AccordionIcon />
          </AccordionAction>
          <AccordionContent>
            Teachers can add dues for students through the student profile page. 
            Students can view their dues on the student verification page and submit payment 
            details (transaction ID and mobile number). Teachers can then verify and approve 
            the payment from the Payment Verify page.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="value-3">
          <AccordionAction>
            <AccordionTitle className="first-letter:text-primary-500">
              What are digital signatures for?
            </AccordionTitle>
            <AccordionIcon />
          </AccordionAction>
          <AccordionContent>
            Digital signatures are used to authenticate clearance approvals. Each teacher/admin 
            can upload their signature in their profile. When approving clearances, the signature 
            is applied to the clearance document, ensuring authenticity and preventing unauthorized modifications.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
