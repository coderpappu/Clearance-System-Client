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
        Instructions
      </h3>
      <Accordion flush={true} type="single" collapsible>
        <AccordionItem value="value-1">
          <AccordionAction>
            <AccordionTitle className="first-letter:text-primary-500">
              Q. What is the purpose of the Keep React?
            </AccordionTitle>
            <AccordionIcon />
          </AccordionAction>
          <AccordionContent>
            The Keep React is a collection of UI components, styles, and
            guidelines that ensure consistency and a unified user experience
            across our products. It simplifies the design and development
            process by providing ready-to-use components that can be easily
            customized and integrated into various applications.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="value-2">
          <AccordionAction>
            <AccordionTitle className="first-letter:text-primary-500">
              Q. How do I customize the color scheme of components?
            </AccordionTitle>
            <AccordionIcon />
          </AccordionAction>
          <AccordionContent>
            The Keep React offers a range of color variants for components. To
            customize the color scheme, you can use the available color options
            such as gray,info,error,warning and success. Simply set the desired
            color variant as a prop when using the component, and it will
            reflect the chosen color.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="value-3">
          <AccordionAction>
            <AccordionTitle className="first-letter:text-primary-500">
              Q. Can I add additional content to notifications?
            </AccordionTitle>
            <AccordionIcon />
          </AccordionAction>
          <AccordionContent>
            Yes, the Notification component in the Keep React allows you to
            include extra content alongside the primary message. The
            additionalContent prop can be used to display supplementary
            information, such as buttons, links, or icons, within the
            notification to provide users with more context and options.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
