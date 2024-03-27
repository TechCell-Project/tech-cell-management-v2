'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';
import { ReactNode } from 'react';

/**
 * Tab Type
 *
 * Defines the structure of a single tab within the TabsDisplay component.
 *
 * @property {string} value - A unique identifier for the tab (used for switching between tabs).
 * @property {string} name - The title displayed for the tab.
 * @property {ReactNode} component - The content to be rendered within the tab panel.
 */
type Tab = { value: string; name: string; component: ReactNode };

/**
 * TabsDisplayProps Type
 *
 * Defines the props for the TabsDisplay component.
 *
 * @property {Tab[]} tabs - An array of Tab objects representing the available tabs.
 * @property {string} [className] (optional) - CSS classes to apply for custom styling of the tabs component.
 */
type TabsDisplayProps = {
  tabs: Tab[];
  className?: string;
};

/**
 * TabsDisplay Component
 *
 * Provides a reusable tabbed interface for switching between different content sections.
 *
 * @param {TabsDisplayProps} props - Props object for the TabsDisplay component.
 * @returns {JSX.Element} - JSX element containing the entire tabbed interface structure.
 */
export const TabsDisplay = ({ tabs, className }: TabsDisplayProps): JSX.Element => {
  return (
    <Tabs defaultValue={tabs[0].value} className={className}>
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger value={tab.value} key={tab.value}>
            {tab.name}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.component}
        </TabsContent>
      ))}
    </Tabs>
  );
};
