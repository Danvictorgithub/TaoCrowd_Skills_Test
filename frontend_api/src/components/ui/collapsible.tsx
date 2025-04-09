import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { useState } from "react";

function Collapsible({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />;
}

function CollapsibleTrigger({
  className,
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      data-slot="collapsible-trigger"
      onClick={() => setIsOpen(!isOpen)}
      {...props}
    >
      <button
        type="button"
        className={`px-4 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200 ease-in-out ${className}`}
      >
        {isOpen ? "Hide" : "Show"}
      </button>
    </CollapsiblePrimitive.CollapsibleTrigger>
  );
}

function CollapsibleContent({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>) {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      data-slot="collapsible-content"
      {...props}
    />
  );
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
